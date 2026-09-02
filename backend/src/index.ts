import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { activeDatabase } from './db/index.js';
import { adminIsConfigured, env, mailIsConfigured } from './env.js';
import { adminRouter } from './routes/admin.js';
import { contactRouter } from './routes/contact.js';
import { newsletterRouter } from './routes/newsletter.js';

const app = express();

app.use(
  cors({
    origin: env.frontendOrigins,
    methods: ['GET', 'POST'],
  }),
);
// La diffusion groupée peut contenir un message assez long : on laisse un peu
// plus de marge que pour le formulaire de contact public.
app.use(express.json({ limit: '128kb' }));

// Limite raisonnable par IP pour éviter le spam du formulaire et de la newsletter.
// Ne s'applique qu'aux routes publiques : l'espace admin est protégé par jeton.
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Trop de requêtes, réessayez plus tard.' },
});
app.use('/api/contact', publicLimiter);
app.use('/api/newsletter', publicLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailConfigured: mailIsConfigured, database: activeDatabase, adminConfigured: adminIsConfigured });
});

app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/admin', adminRouter);

// Page d'administration de la newsletter (composer + envoyer un e-mail groupé).
// Fichiers statiques simples, sans étape de build : servis tels quels.
app.use('/admin', express.static(path.join(process.cwd(), 'public/admin')));

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Route introuvable.' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] Erreur non gérée :', err);
  res.status(500).json({ ok: false, error: 'Erreur interne.' });
});

app.listen(env.port, () => {
  console.log(`API IKAN AI en écoute sur http://localhost:${env.port}`);
  console.log(`Base de données : ${activeDatabase}`);
  console.log(`Envoi d'e-mail : ${mailIsConfigured ? 'activé' : 'désactivé (SMTP non configuré)'}`);
  console.log(`Administration newsletter : ${adminIsConfigured ? `activée sur /admin` : 'désactivée (ADMIN_TOKEN manquant)'}`);
  console.log(`Origines autorisées : ${env.frontendOrigins.join(', ')}`);
});
