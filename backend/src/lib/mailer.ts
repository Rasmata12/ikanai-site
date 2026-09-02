import nodemailer from 'nodemailer';
import { env, mailIsConfigured } from '../env.js';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!mailIsConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: { user: env.smtpUser, pass: env.smtpPassword },
      // Sans ces limites, un SMTP mal configuré (mauvais mot de passe, hôte
      // injoignable) peut faire attendre une requête pendant plusieurs
      // minutes — inacceptable pour un envoi groupé ou un hébergeur qui
      // coupe les requêtes trop longues. On échoue vite et proprement à la place.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

/**
 * Envoie un e-mail si un serveur SMTP est configuré.
 * Retourne `false` sans erreur si l'envoi n'est pas configuré ou échoue :
 * le message reste enregistré en base dans tous les cas, l'e-mail est un bonus.
 */
export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const client = getTransporter();
  if (!client) {
    console.log(`[mail] SMTP non configuré — message pour "${options.subject}" uniquement enregistré en base.`);
    return false;
  }
  try {
    await client.sendMail({
      from: env.mailFrom,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error('[mail] Échec de l\'envoi :', error);
    return false;
  }
}
