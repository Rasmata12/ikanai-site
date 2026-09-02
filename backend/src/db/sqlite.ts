import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { ContactMessageInput, Store, Subscriber } from './types.js';

export function createSqliteStore(databasePath: string): Store {
  const dbDir = path.dirname(databasePath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(databasePath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      email TEXT NOT NULL,
      telephone TEXT,
      organisation TEXT,
      sujet TEXT NOT NULL,
      message TEXT NOT NULL,
      langue TEXT NOT NULL DEFAULT 'fr',
      email_envoye INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      email TEXT NOT NULL UNIQUE,
      langue TEXT NOT NULL DEFAULT 'fr',
      unsubscribe_token TEXT,
      unsubscribed_at TEXT
    );
  `);

  // Migration douce : si la base existait déjà avant l'ajout de ces deux
  // colonnes, on les ajoute sans toucher aux abonnés déjà enregistrés.
  const existingColumns = db.prepare(`PRAGMA table_info(newsletter_subscribers)`).all() as { name: string }[];
  const columnNames = new Set(existingColumns.map((col) => col.name));
  if (!columnNames.has('unsubscribe_token')) {
    db.exec(`ALTER TABLE newsletter_subscribers ADD COLUMN unsubscribe_token TEXT`);
  }
  if (!columnNames.has('unsubscribed_at')) {
    db.exec(`ALTER TABLE newsletter_subscribers ADD COLUMN unsubscribed_at TEXT`);
  }
  // Chaque abonné doit avoir un jeton, y compris ceux inscrits avant cette version.
  const missingToken = db
    .prepare(`SELECT id FROM newsletter_subscribers WHERE unsubscribe_token IS NULL`)
    .all() as { id: number }[];
  if (missingToken.length > 0) {
    const fillToken = db.prepare(`UPDATE newsletter_subscribers SET unsubscribe_token = @token WHERE id = @id`);
    const fillMany = db.transaction((rows: { id: number }[]) => {
      for (const row of rows) {
        fillToken.run({ id: row.id, token: crypto.randomBytes(24).toString('hex') });
      }
    });
    fillMany(missingToken);
  }

  const insertMessageStmt = db.prepare(`
    INSERT INTO contact_messages (prenom, nom, email, telephone, organisation, sujet, message, langue, email_envoye)
    VALUES (@prenom, @nom, @email, @telephone, @organisation, @sujet, @message, @langue, @emailSent)
  `);

  const insertSubscriberStmt = db.prepare(`
    INSERT INTO newsletter_subscribers (email, langue, unsubscribe_token) VALUES (@email, @langue, @token)
    ON CONFLICT(email) DO UPDATE SET unsubscribed_at = NULL
  `);

  const listActiveStmt = db.prepare(`
    SELECT id, email, langue, unsubscribe_token AS unsubscribeToken
    FROM newsletter_subscribers
    WHERE unsubscribed_at IS NULL
    ORDER BY created_at ASC
  `);

  const countActiveStmt = db.prepare(`
    SELECT COUNT(*) AS count FROM newsletter_subscribers WHERE unsubscribed_at IS NULL
  `);

  const findByTokenStmt = db.prepare(`
    SELECT email FROM newsletter_subscribers WHERE unsubscribe_token = @token AND unsubscribed_at IS NULL
  `);

  const unsubscribeStmt = db.prepare(`
    UPDATE newsletter_subscribers SET unsubscribed_at = datetime('now') WHERE unsubscribe_token = @token
  `);

  return {
    async insertContactMessage(input: ContactMessageInput, emailSent: boolean) {
      insertMessageStmt.run({
        prenom: input.prenom,
        nom: input.nom,
        email: input.email,
        telephone: input.telephone ?? null,
        organisation: input.organisation ?? null,
        sujet: input.sujet,
        message: input.message,
        langue: input.langue,
        emailSent: emailSent ? 1 : 0,
      });
    },

    async insertNewsletterSubscriber(email: string, langue: 'fr' | 'en') {
      const token = crypto.randomBytes(24).toString('hex');
      const result = insertSubscriberStmt.run({ email, langue, token });
      return { isNew: result.changes > 0 };
    },

    async listActiveSubscribers(): Promise<Subscriber[]> {
      return listActiveStmt.all() as Subscriber[];
    },

    async countActiveSubscribers(): Promise<number> {
      const row = countActiveStmt.get() as { count: number };
      return row.count;
    },

    async unsubscribeByToken(token: string) {
      const row = findByTokenStmt.get({ token }) as { email: string } | undefined;
      if (!row) return null;
      unsubscribeStmt.run({ token });
      return { email: row.email };
    },
  };
}
