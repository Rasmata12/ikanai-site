import { env } from '../env.js';
import { createPostgresStore } from './postgres.js';
import { createSqliteStore } from './sqlite.js';
import type { ContactMessageInput, Store, Subscriber } from './types.js';

export type { ContactMessageInput, Subscriber };

/** PostgreSQL est utilisé dès que DATABASE_URL est renseigné (recommandé en production) ;
 *  sinon l'API fonctionne directement avec un fichier SQLite local, sans rien à configurer. */
export const store: Store = env.databaseUrl
  ? createPostgresStore(env.databaseUrl)
  : createSqliteStore(env.databasePath);

export const activeDatabase = env.databaseUrl ? 'postgresql' : 'sqlite';

export function insertContactMessage(input: ContactMessageInput, emailSent: boolean) {
  return store.insertContactMessage(input, emailSent);
}

export function insertNewsletterSubscriber(email: string, langue: 'fr' | 'en') {
  return store.insertNewsletterSubscriber(email, langue);
}

export function listActiveSubscribers() {
  return store.listActiveSubscribers();
}

export function countActiveSubscribers() {
  return store.countActiveSubscribers();
}

export function unsubscribeByToken(token: string) {
  return store.unsubscribeByToken(token);
}
