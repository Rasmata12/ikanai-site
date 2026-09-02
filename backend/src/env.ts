import 'dotenv/config';

function parseOrigins(raw: string | undefined): string[] {
  const base = raw
    ? raw.split(',').map((origin) => origin.trim()).filter(Boolean)
    : ['http://localhost:5173'];

  // localhost et 127.0.0.1 sont deux origines distinctes pour un navigateur,
  // même si elles pointent vers la même machine. On accepte systématiquement
  // les deux pour chaque adresse locale déclarée, pour éviter un blocage CORS
  // qui n'a rien à voir avec la configuration de l'utilisateur.
  const withLocalVariants = new Set<string>();
  for (const origin of base) {
    withLocalVariants.add(origin);
    if (origin.includes('localhost')) {
      withLocalVariants.add(origin.replace('localhost', '127.0.0.1'));
    } else if (origin.includes('127.0.0.1')) {
      withLocalVariants.add(origin.replace('127.0.0.1', 'localhost'));
    }
  }
  return [...withLocalVariants];
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN),
  databasePath: process.env.DATABASE_PATH ?? './data/ikanai-site.db',
  /** Si renseigné (ex. fourni par Supabase, Neon ou Render), PostgreSQL remplace SQLite. */
  databaseUrl: process.env.DATABASE_URL || '',

  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPassword: process.env.SMTP_PASSWORD || '',
  mailFrom: process.env.MAIL_FROM || 'IKAN AI <contact@ikanai.app>',
  mailTo: process.env.MAIL_TO || 'contact@ikanai.app',

  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 20),

  /** Jeton secret pour accéder à la page d'administration de la newsletter.
   *  Sans lui, les routes /api/admin/* refusent toute requête. */
  adminToken: process.env.ADMIN_TOKEN || '',

  /** Adresse publique de cette API, utilisée pour construire le lien de
   *  désinscription dans les e-mails groupés. En développement, l'adresse
   *  locale suffit ; en production, indiquez l'URL réelle de l'API déployée. */
  publicApiUrl: (process.env.PUBLIC_API_URL || `http://localhost:${Number(process.env.PORT ?? 4000)}`).replace(
    /\/$/,
    '',
  ),
};

/** La page d'administration n'est utilisable que si un jeton a été défini. */
export const adminIsConfigured = Boolean(env.adminToken);

/** L'envoi d'e-mail n'est actif que si un serveur SMTP a été renseigné. */
export const mailIsConfigured = Boolean(env.smtpHost && env.smtpUser && env.smtpPassword);
