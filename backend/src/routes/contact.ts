import { Router } from 'express';
import { insertContactMessage } from '../db/index.js';
import { sendMail } from '../lib/mailer.js';
import { contactSchema } from '../lib/validation.js';
import { env } from '../env.js';

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Requête invalide.',
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;

  const emailText = [
    `Nouveau message depuis le site IKAN AI (${data.langue.toUpperCase()})`,
    '',
    `Nom : ${data.prenom} ${data.nom}`,
    `E-mail : ${data.email}`,
    data.telephone ? `Téléphone : ${data.telephone}` : null,
    data.organisation ? `Organisation : ${data.organisation}` : null,
    `Objet : ${data.sujet}`,
    '',
    data.message,
  ]
    .filter(Boolean)
    .join('\n');

  const emailSent = await sendMail({
    to: env.mailTo,
    subject: `[Site IKAN AI] ${data.sujet} — ${data.prenom} ${data.nom}`,
    text: emailText,
    replyTo: data.email,
  });

  try {
    await insertContactMessage(data, emailSent);
  } catch (error) {
    console.error('[contact] Échec de l\'enregistrement en base :', error);
    return res.status(500).json({ ok: false, error: "Le message n'a pas pu être enregistré." });
  }

  return res.status(201).json({ ok: true, emailSent });
});
