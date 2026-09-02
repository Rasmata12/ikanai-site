const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000';

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
