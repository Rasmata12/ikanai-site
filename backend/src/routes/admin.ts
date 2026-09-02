import { Router } from 'express';
import { listActiveSubscribers } from '../db/index.js';
import { sendMail } from '../lib/mailer.js';
import { buildBroadcastEmail } from '../lib/newsletter-template.js';
import { requireAdmin } from '../middleware/admin-auth.js';
import { newsletterBroadcastSchema } from '../lib/validation.js';
import { mailIsConfigured } from '../env.js';

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get('/newsletter/subscribers', async (_req, res) => {
  try {
    const subscribers = await listActiveSubscribers();
    return res.json({
      ok: true,
      total: subscribers.length,
      byLangue: {
        fr: subscribers.filter((s) => s.langue === 'fr').length,
        en: subscribers.filter((s) => s.langue === 'en').length,
      },
      mailConfigured: mailIsConfigured,
      // La liste complète des adresses, pour un affichage direct côté admin
      // sans avoir besoin d'ouvrir la base de données.
      subscribers: subscribers.map((s) => ({ email: s.email, langue: s.langue })),
    });
  } catch (error) {
    console.error('[admin] Échec de la lecture des abonnés :', error);
    return res.status(500).json({ ok: false, error: "Impossible de récupérer la liste des abonnés." });
  }
});

/** Petite pause entre deux envois pour ne pas se faire limiter par le
 *  fournisseur SMTP (Gmail notamment) sur un envoi groupé. */
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

adminRouter.post('/newsletter/send', async (req, res) => {
  const parsed = newsletterBroadcastSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Requête invalide.',
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  if (!mailIsConfigured) {
    return res.status(503).json({
      ok: false,
      error: "L'envoi d'e-mail n'est pas configuré côté serveur (SMTP manquant dans .env).",
    });
  }

  const { subject, message, langue } = parsed.data;

  let subscribers = await listActiveSubscribers();
  if (langue !== 'all') {
    subscribers = subscribers.filter((s) => s.langue === langue);
  }

  if (subscribers.length === 0) {
    return res.status(200).json({ ok: true, total: 0, sent: 0, failed: 0 });
  }

  let sent = 0;
  const failedEmails: string[] = [];

  for (const subscriber of subscribers) {
    const { html, text } = buildBroadcastEmail({
      subject,
      message,
      langue: subscriber.langue,
      unsubscribeToken: subscriber.unsubscribeToken,
    });
    const ok = await sendMail({ to: subscriber.email, subject, text, html });
    if (ok) sent += 1;
    else failedEmails.push(subscriber.email);
    // Pause courte entre deux envois — évite de saturer le serveur SMTP.
    await wait(300);
  }

  console.log(`[newsletter] Diffusion "${subject}" : ${sent}/${subscribers.length} envoyés.`);

  return res.status(200).json({
    ok: true,
    total: subscribers.length,
    sent,
    failed: failedEmails.length,
    failedEmails,
  });
});
