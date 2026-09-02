import { env } from '../env.js';

const LABELS = {
  fr: { unsubscribe: 'Se désinscrire', footer: 'Vous recevez cet e-mail car vous êtes abonné aux actualités IKAN AI.' },
  en: { unsubscribe: 'Unsubscribe', footer: 'You are receiving this email because you subscribed to IKAN AI news.' },
} as const;

/** Transforme le texte saisi par l'administrateur en HTML basique :
 *  échappe le HTML dangereux, puis convertit les sauts de ligne en <br>/<p>. */
function textToHtml(message: string): string {
  const escaped = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p style="margin:0 0 16px;">${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function buildBroadcastEmail(options: {
  subject: string;
  message: string;
  langue: 'fr' | 'en';
  unsubscribeToken: string;
}) {
  const labels = LABELS[options.langue];
  const unsubscribeUrl = `${env.publicApiUrl}/api/newsletter/unsubscribe?token=${options.unsubscribeToken}`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#12261d;">
      <div style="padding:28px 4px 8px;">
        <span style="display:inline-block;font-weight:800;font-size:18px;color:#0c3d24;">IKAN AI</span>
      </div>
      <div style="background:#ffffff;border:1px solid #e7ecdf;border-radius:16px;padding:28px;">
        <h1 style="font-size:20px;line-height:1.35;margin:0 0 18px;color:#0c3d24;">${options.subject}</h1>
        <div style="font-size:14.5px;line-height:1.7;color:#334339;">${textToHtml(options.message)}</div>
      </div>
      <div style="padding:20px 4px;font-size:11.5px;line-height:1.6;color:#7c8a7e;">
        <p style="margin:0 0 6px;">${labels.footer}</p>
        <a href="${unsubscribeUrl}" style="color:#4c7a3f;">${labels.unsubscribe}</a>
      </div>
    </div>
  `;

  const text = [
    options.subject,
    '',
    options.message,
    '',
    '---',
    labels.footer,
    `${labels.unsubscribe} : ${unsubscribeUrl}`,
  ].join('\n');

  return { html, text };
}
