const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000';
const CHECKOUT_API_URL = (import.meta.env.VITE_CHECKOUT_API_URL as string | undefined) ?? 'https://ikan-772d.onrender.com';

export type ContactPayload = {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  organisation?: string;
  sujet: string;
  message: string;
  langue: 'fr' | 'en';
};

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await response.json().catch(() => null);
    if (!response.ok || !json?.ok) {
      const message = json?.error ?? "Une erreur est survenue. Merci de réessayer.";
      return { ok: false, error: message };
    }
    return { ok: true, data: json as T };
  } catch {
    return { ok: false, error: "Impossible de joindre le serveur. Vérifiez votre connexion." };
  }
}

export function submitContact(payload: ContactPayload) {
  return postJson<{ ok: true; emailSent: boolean }>('/api/contact', payload);
}

export function subscribeNewsletter(email: string, langue: 'fr' | 'en') {
  return postJson<{ ok: true; alreadySubscribed: boolean }>('/api/newsletter', { email, langue });
}

export type SignupPayload = {
  nom_organisation: string;
  secteur_activite: string;
  pays_region: string;
  email_organisation: string;
  prenom_contact: string;
  nom_contact: string;
  email_contact: string;
  telephone?: string;
  plan_code: 'free' | 'starter' | 'pro';
  success_url: string;
  cancel_url: string;
};

export async function createSignupCheckout(payload: SignupPayload): Promise<ApiResult<{ checkout_url?: string; dashboard_url?: string; access_url?: string }>> {
  try {
    const response = await fetch(`${CHECKOUT_API_URL}/api/v1/public/inscription-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 404) {
        return { ok: false, error: "Le service d'inscription n'est pas encore disponible sur l'API. Merci de réessayer après son déploiement." };
      }
      return { ok: false, error: json?.error ?? json?.detail ?? "Une erreur est survenue. Merci de réessayer." };
    }

    const checkoutUrl = json?.checkout_url ?? json?.url;
    const accessUrl = json?.dashboard_url ?? json?.access_url;
    if (!checkoutUrl && !accessUrl) {
      return { ok: false, error: "Le lien de paiement n'a pas pu être créé. Merci de réessayer." };
    }
    return { ok: true, data: { checkout_url: checkoutUrl, dashboard_url: accessUrl } };
  } catch {
    return { ok: false, error: "Impossible de joindre le serveur. Vérifiez votre connexion." };
  }
}
