export type ContactMessageInput = {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  organisation?: string;
  sujet: string;
  message: string;
  langue: 'fr' | 'en';
};

export type Subscriber = {
  id: number;
  email: string;
  langue: 'fr' | 'en';
  unsubscribeToken: string;
};

/** Interface commune : SQLite (par défaut) et PostgreSQL (production) l'implémentent
 *  toutes les deux de la même façon, pour que le reste du code n'ait jamais à savoir
 *  laquelle des deux est active. */
export interface Store {
  insertContactMessage(input: ContactMessageInput, emailSent: boolean): Promise<void>;
  insertNewsletterSubscriber(email: string, langue: 'fr' | 'en'): Promise<{ isNew: boolean }>;
  /** Abonnés actifs (jamais désinscrits), pour l'envoi groupé. */
  listActiveSubscribers(): Promise<Subscriber[]>;
  countActiveSubscribers(): Promise<number>;
  /** Retire un abonné suite à un clic sur le lien de désinscription. Renvoie
   *  l'e-mail concerné si le jeton était valide, sinon `null`. */
  unsubscribeByToken(token: string): Promise<{ email: string } | null>;
}
