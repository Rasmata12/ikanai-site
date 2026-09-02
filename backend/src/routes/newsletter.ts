import { Router, type Request, type Response } from 'express';
import {
  insertNewsletterSubscriber,
  unsubscribeByToken,
} from '../db/index.js';
import { newsletterSchema } from '../lib/validation.js';

export const newsletterRouter = Router();

/**
 * Inscription à la newsletter
 *
 * POST /newsletter
 *
 * Reçoit :
 * {
 *   "email": "client@example.com",
 *   "langue": "fr"
 * }
 */
newsletterRouter.post(
  '/',
  async (req: Request, res: Response) => {
    const parsed = newsletterSchema.safeParse(req.body);

    // Vérification des données envoyées
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'Adresse électronique invalide.',
        issues: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, langue } = parsed.data;

    try {
      // Enregistrement de l'abonné dans la base de données
      const { isNew } = await insertNewsletterSubscriber(
        email.toLowerCase(),
        langue
      );

      return res.status(201).json({
        ok: true,
        alreadySubscribed: !isNew,
      });
    } catch (error) {
      console.error(
        "[newsletter] Échec de l'enregistrement :",
        error
      );

      return res.status(500).json({
        ok: false,
        error:
          "L'inscription n'a pas pu être enregistrée.",
      });
    }
  }
);

/**
 * Désinscription de la newsletter
 *
 * GET /newsletter/unsubscribe?token=...
 *
 * Cette route est ouverte lorsqu'une personne clique
 * sur le lien "Se désinscrire" présent dans un e-mail.
 */
newsletterRouter.get(
  '/unsubscribe',
  async (req: Request, res: Response) => {
    const token =
      typeof req.query.token === 'string'
        ? req.query.token
        : '';

    /**
     * Petite page HTML affichée directement dans
     * le navigateur après la désinscription.
     */
    const page = (
      title: string,
      body: string
    ) => `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${title}</title>

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <style>
    body {
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif;

      background: #f3f6f0;
      color: #12261d;

      display: flex;
      min-height: 100vh;

      align-items: center;
      justify-content: center;

      margin: 0;
      padding: 24px;
    }

    .card {
      background: #ffffff;
      border-radius: 20px;

      padding: 40px 32px;

      max-width: 420px;

      text-align: center;

      box-shadow:
        0 30px 60px -30px
        rgba(12, 61, 36, 0.25);
    }

    h1 {
      font-size: 19px;
      margin: 0 0 12px;
    }

    p {
      font-size: 14px;
      line-height: 1.6;

      color: #4b5a4d;

      margin: 0;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${body}</p>
  </div>
</body>
</html>`;

    // Aucun token fourni
    if (!token) {
      return res
        .status(400)
        .send(
          page(
            'Lien invalide',
            'Ce lien de désinscription est incomplet.'
          )
        );
    }

    try {
      // Recherche et désinscription avec le token
      const result = await unsubscribeByToken(token);

      // Token invalide ou déjà utilisé
      if (!result) {
        return res
          .status(404)
          .send(
            page(
              'Déjà fait',
              "Cette adresse est déjà désinscrite, ou le lien a déjà été utilisé."
            )
          );
      }

      // Désinscription réussie
      return res.send(
        page(
          'Désinscription confirmée',
          `${result.email} ne recevra plus nos e-mails.`
        )
      );
    } catch (error) {
      console.error(
        '[newsletter] Échec de la désinscription :',
        error
      );

      return res
        .status(500)
        .send(
          page(
            'Erreur',
            "La désinscription n'a pas pu être traitée. Réessayez plus tard."
          )
        );
    }
  }
);