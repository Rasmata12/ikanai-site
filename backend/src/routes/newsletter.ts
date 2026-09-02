import { Router } from 'express';
import { insertNewsletterSubscriber, unsubscribeByToken } from '../db/index.js';
import { newsletterSchema } from '../lib/validation.js';

export const newsletterRouter = Router();

newsletterRouter.post('/', async (req, res) => {
  const parsed = newsletterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Adresse électronique invalide.',
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, langue } = parsed.data;

  try {
    const { isNew } = await insertNewsletterSubscriber(email.toLowerCase(), langue);
    return res.status(201).json({ ok: true, alreadySubscribed: !isNew });
  } catch (error) {
    console.error("[newsletter] Échec de l'enregistrement :", error);
    return res.status(500).json({ ok: false, error: "L'inscription n'a pas pu être enregistrée." });
  }
});

/**
 * Lien cliqué directement depuis l'e-mail : on répond en HTML, pas en JSON,
 * puisqu'il n'y a personne côté navigateur pour interpréter du JSON ici.
 */
newsletterRouter.get('/unsubscribe', async (req, res) => {
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  const page = (title: string, body: string) => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f3f6f0;color:#12261d;
    display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;}
  .card{background:#fff;border-radius:20px;padding:40px 32px;max-width:420px;text-align:center;
    box-shadow:0 30px 60px -30px rgba(12,61,36,.25);}
  h1{font-size:19px;margin:0 0 12px;}
  p{font-size:14px;line-height:1.6;color:#4b5a4d;margin:0;}
</style></head>
<body><div class="card"><h1>${title}</h1><p>${body}</p></div></body></html>`;

  if (!token) {
    return res.status(400).send(page('Lien invalide', 'Ce lien de désinscription est incomplet.'));
  }

  try {
    const result = await unsubscribeByToken(token);
    if (!result) {
      return res
        .status(404)
        .send(page('Déjà fait', 'Cette adresse est déjà désinscrite, ou le lien a déjà été utilisé.'));
    }
    return res.send(page('Désinscription confirmée', `${result.email} ne recevra plus nos e-mails.`));
  } catch (error) {
    console.error('[newsletter] Échec de la désinscription :', error);
    return res.status(500).send(page('Erreur', "La désinscription n'a pas pu être traitée. Réessayez plus tard."));
  }
});
