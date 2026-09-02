import crypto from 'node:crypto';
import pg from 'pg';
import type { ContactMessageInput, Store, Subscriber } from './types.js';

const { Pool } = pg;

export function createPostgresStore(connectionString: string): Store {
  // La plupart des hébergeurs gratuits (Supabase, Neon, Render) exigent SSL
  // mais fournissent un certificat auto-signé : on désactive donc la vérification stricte.
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
  });

  const ready = (async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        prenom TEXT NOT NULL,
        nom TEXT NOT NULL,
        email TEXT NOT NULL,
        telephone TEXT,
        organisation TEXT,
        sujet TEXT NOT NULL,
        message TEXT NOT NULL,
        langue TEXT NOT NULL DEFAULT 'fr',
        email_envoye BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        email TEXT NOT NULL UNIQUE,
        langue TEXT NOT NULL DEFAULT 'fr',
        unsubscribe_token TEXT,
        unsubscribed_at TIMESTAMPTZ
      );
    `);

    // Migration douce, comme côté SQLite : on ajoute les colonnes si la table
    // existait déjà, sans jamais toucher aux abonnés déjà enregistrés.
    await pool.query(`ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT`);
    await pool.query(`ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ`);

    const missing = await pool.query(`SELECT id FROM newsletter_subscribers WHERE unsubscribe_token IS NULL`);
    for (const row of missing.rows as { id: number }[]) {
      const token = crypto.randomBytes(24).toString('hex');
      await pool.query(`UPDATE newsletter_subscribers SET unsubscribe_token = $1 WHERE id = $2`, [token, row.id]);
    }
  })();

  return {
    async insertContactMessage(input: ContactMessageInput, emailSent: boolean) {
      await ready;
      await pool.query(
        `INSERT INTO contact_messages (prenom, nom, email, telephone, organisation, sujet, message, langue, email_envoye)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          input.prenom,
          input.nom,
          input.email,
          input.telephone ?? null,
          input.organisation ?? null,
          input.sujet,
          input.message,
          input.langue,
          emailSent,
        ],
      );
    },

    async insertNewsletterSubscriber(email: string, langue: 'fr' | 'en') {
      await ready;
      const token = crypto.randomBytes(24).toString('hex');
      const result = await pool.query(
        `INSERT INTO newsletter_subscribers (email, langue, unsubscribe_token) VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL`,
        [email, langue, token],
      );
      return { isNew: (result.rowCount ?? 0) > 0 };
    },

    async listActiveSubscribers(): Promise<Subscriber[]> {
      await ready;
      const result = await pool.query(
        `SELECT id, email, langue, unsubscribe_token AS "unsubscribeToken"
         FROM newsletter_subscribers WHERE unsubscribed_at IS NULL ORDER BY created_at ASC`,
      );
      return result.rows;
    },

    async countActiveSubscribers(): Promise<number> {
      await ready;
      const result = await pool.query(
        `SELECT COUNT(*)::int AS count FROM newsletter_subscribers WHERE unsubscribed_at IS NULL`,
      );
      return result.rows[0].count;
    },

    async unsubscribeByToken(token: string) {
      await ready;
      const result = await pool.query(
        `UPDATE newsletter_subscribers SET unsubscribed_at = now()
         WHERE unsubscribe_token = $1 AND unsubscribed_at IS NULL
         RETURNING email`,
        [token],
      );
      return result.rows[0] ? { email: result.rows[0].email } : null;
    },
  };
}
