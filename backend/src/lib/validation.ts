import { z } from 'zod';

export const contactSchema = z.object({
  prenom: z.string().trim().min(1, 'Le prénom est requis.').max(80),
  nom: z.string().trim().min(1, 'Le nom est requis.').max(80),
  email: z.string().trim().email('Adresse électronique invalide.').max(160),
  telephone: z.string().trim().max(40).optional().or(z.literal('')),
  organisation: z.string().trim().max(160).optional().or(z.literal('')),
  sujet: z.string().trim().min(1, "L'objet est requis.").max(160),
  message: z.string().trim().min(10, 'Le message est trop court.').max(4000),
  langue: z.enum(['fr', 'en']).default('fr'),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email('Adresse électronique invalide.').max(160),
  langue: z.enum(['fr', 'en']).default('fr'),
});

export const newsletterBroadcastSchema = z.object({
  subject: z.string().trim().min(3, "L'objet est trop court.").max(200),
  message: z.string().trim().min(10, 'Le message est trop court.').max(20000),
  langue: z.enum(['fr', 'en', 'all']).default('all'),
});

export type ContactPayload = z.infer<typeof contactSchema>;
export type NewsletterPayload = z.infer<typeof newsletterSchema>;
export type NewsletterBroadcastPayload = z.infer<typeof newsletterBroadcastSchema>;
