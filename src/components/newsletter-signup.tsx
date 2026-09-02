import { useState, type FormEvent } from 'react';
import { subscribeNewsletter } from '@/lib/api';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export function NewsletterSignup() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const result = await subscribeNewsletter(email, lang);
    if (result.ok) {
      setStatus('done');
      setMessage(result.data.alreadySubscribed ? t.footer.newsletterAlready : t.footer.newsletterDone);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.error);
    }
  };

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-full border border-[hsl(var(--accent)/.35)] bg-white/[.06] px-5 py-3.5">
        <Icon name="check" className="text-[13px] text-[hsl(var(--accent))]" />
        <p className="t-sm font-medium text-white/80">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[330px]">
      <p className="t-md leading-7 text-white/60">{t.footer.newsletterLede}</p>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] p-1.5 pl-4 focus-within:border-[hsl(var(--accent)/.5)]">
        <Icon name="mail" className="shrink-0 text-[12px] text-white/40" />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.footer.newsletterPlaceholder}
          data-testid="input-newsletter-email"
          className="w-full min-w-0 bg-transparent py-1.5 t-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          data-testid="button-newsletter-submit"
          className="focus-ring shrink-0 rounded-full bg-[hsl(var(--accent))] px-4 py-2 t-sm font-bold text-[hsl(var(--primary))] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? t.footer.newsletterSending : t.footer.newsletterSubmit}
        </button>
      </div>
      {status === 'error' ? <p className="mt-2.5 t-xs text-red-300">{message}</p> : null}
    </form>
  );
}
