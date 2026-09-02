import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CtaBand, PageHero, SectionHeading, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { submitContact } from '@/lib/api';
import { OffersSection } from '@/components/offers-section';
import { useLang } from '@/i18n/language-context';

const HREFS = ['mailto:contact@ikanai.app', 'tel:+22670000000', 'https://www.linkedin.com'];

export default function ContactPage() {
  useReveals();
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
    sujet: t.contact.subjects[0],
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setForm((current) => ({ ...current, sujet: t.contact.subjects[0] }));
  }, [t]);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const chooseOffer = (offer: string) => {
    const match = t.contact.subjects.find((subject) => subject.includes(offer));
    update('sujet', match ?? t.contact.subjects[0]);
    setSent(false);
    document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError(null);
    const result = await submitContact({ ...form, langue: lang });
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} accent={t.contact.accent} lede={t.contact.lede}>
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {[
            { href: '#offres', label: t.contact.anchors.offers },
            { href: '#formulaire', label: t.contact.anchors.write },
            { href: '#questions', label: t.contact.anchors.faq },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="focus-ring rounded-full border border-[hsl(var(--foreground)/.1)] bg-white/50 px-4 py-2 t-sm font-medium text-[hsl(var(--muted-foreground))] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/.25)] hover:text-[hsl(var(--primary))]"
            >
              {label}
            </a>
          ))}
        </div>
      </PageHero>

      <OffersSection onSelect={chooseOffer} />

      {/* FORMULAIRE */}
      <section id="formulaire" className="shell-x aurora aurora--soft surface-light relative scroll-mt-24 section-y">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div className="reveal flex flex-col justify-between gap-10">
            <div>
              <SectionHeading eyebrow={t.contact.formTitle} title={t.contact.anchors.write} />

              <div className="mt-10 space-y-4">
                {t.contact.channels.map((channel, position) => (
                  <motion.a
                    key={channel.label}
                    href={HREFS[position]}
                    target={HREFS[position].startsWith('http') ? '_blank' : undefined}
                    rel={HREFS[position].startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="focus-ring glass group flex items-center gap-5 rounded-2xl p-5"
                    whileHover={{ x: 5 }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-colors duration-300 group-hover:bg-[hsl(var(--primary))] group-hover:text-white">
                      <Icon name={channel.icon} className="text-[15px]" />
                    </span>
                    <span>
                      <span className="block t-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">
                        {channel.label}
                      </span>
                      <span className="mt-1 block t-md font-bold text-[hsl(var(--primary))]">
                        {channel.value}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="glass glow-edge relative overflow-hidden rounded-[2.25rem] p-8 sm:p-11">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] text-[hsl(var(--primary))]">
                      <Icon name="check" className="text-[22px]" />
                    </span>
                    <h3 className="mt-8 font-display t-h2s text-[hsl(var(--primary))]">{t.contact.sentTitle}</h3>
                    <p className="mt-4 max-w-[400px] t-md leading-7 text-[hsl(var(--muted-foreground))]">
                      {t.contact.sentBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          prenom: '',
                          nom: '',
                          email: '',
                          telephone: '',
                          organisation: '',
                          sujet: t.contact.subjects[0],
                          message: '',
                        });
                      }}
                      className="focus-ring mt-9 inline-flex items-center gap-2.5 rounded-full border border-[hsl(var(--primary)/.22)] px-6 py-3 t-sm font-semibold text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--primary))] hover:text-white"
                    >
                      {t.contact.sentAgain}
                      <Icon name="arrowRight" className="text-[11px]" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="send" className="text-[13px] text-[hsl(var(--secondary))]" />
                      <p className="t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                        {t.contact.formTitle}
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="prenom"
                        label={t.contact.fields.first}
                        placeholder={t.contact.placeholders.first}
                        value={form.prenom}
                        onChange={(value) => update('prenom', value)}
                        required
                      />
                      <Field
                        id="nom"
                        label={t.contact.fields.last}
                        placeholder={t.contact.placeholders.last}
                        value={form.nom}
                        onChange={(value) => update('nom', value)}
                        required
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="email"
                        type="email"
                        label={t.contact.fields.email}
                        placeholder={t.contact.placeholders.email}
                        value={form.email}
                        onChange={(value) => update('email', value)}
                        required
                      />
                      <Field
                        id="telephone"
                        label={t.contact.fields.phone}
                        placeholder={t.contact.placeholders.phone}
                        value={form.telephone}
                        onChange={(value) => update('telephone', value)}
                      />
                    </div>

                    <Field
                      id="organisation"
                      label={t.contact.fields.org}
                      placeholder={t.contact.placeholders.org}
                      value={form.organisation}
                      onChange={(value) => update('organisation', value)}
                    />

                    <div>
                      <label htmlFor="sujet" className="mb-2.5 block t-sm font-semibold text-[hsl(var(--primary))]">
                        {t.contact.fields.subject}
                      </label>
                      <select
                        id="sujet"
                        value={form.sujet}
                        onChange={(event) => update('sujet', event.target.value)}
                        className="field-input cursor-pointer"
                      >
                        {t.contact.subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2.5 block t-sm font-semibold text-[hsl(var(--primary))]">
                        {t.contact.fields.message}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={(event) => update('message', event.target.value)}
                        className="field-input resize-none leading-7"
                        placeholder={t.contact.placeholders.message}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pt-2">
                      <button
                        type="submit"
                        disabled={sending}
                        data-testid="button-submit"
                        className="focus-ring shine group inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span>{sending ? t.contact.sending : t.contact.submit}</span>
                        <Icon name="arrowRight" className="btn-arrow text-[12px]" />
                      </button>
                      <span className="t-xs font-medium text-[hsl(var(--muted-foreground))]">
                        {t.contact.privacy}
                      </span>
                    </div>

                    {error ? (
                      <p
                        role="alert"
                        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 t-sm font-medium leading-6 text-red-700"
                      >
                        {error}
                      </p>
                    ) : null}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section id="questions" className="shell-x aurora surface-tint relative scroll-mt-24 section-y">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow={t.contact.anchors.faq}
            title={t.contact.faqTitle}
            accent={t.contact.faqAccent}
            lede={t.contact.faqLede}
          />

          <div className="divide-y divide-[hsl(var(--foreground)/.09)] border-y border-[hsl(var(--foreground)/.09)]">
            {t.contact.faqs.map((faq, position) => {
              const open = openFaq === position;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : position)}
                    aria-expanded={open}
                    className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display t-h3 leading-snug transition-colors duration-300 ${ open ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--primary))]' }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${ open ? 'rotate-180 border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'border-[hsl(var(--foreground)/.14)] text-[hsl(var(--muted-foreground))]' }`}
                    >
                      <Icon name="chevronDown" className="text-[11px]" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[620px] pb-7 t-md leading-7 text-[hsl(var(--muted-foreground))]">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LA SUITE */}
      <section className="shell-x aurora aurora--soft surface-light relative section-y">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow={t.contact.stepsEyebrow} title={t.contact.stepsTitle} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.contact.steps.map((step, position) => (
              <article
                key={step.number}
                className="reveal glass flex h-full flex-col rounded-[1.75rem] p-8"
                style={{ transitionDelay: `${position * 90}ms` }}
              >
                <span className="numeral-gradient font-display text-[2.4rem] leading-none">{step.number}</span>
                <h3 className="mt-8 font-display t-h3 text-[hsl(var(--primary))]">{step.title}</h3>
                <p className="mt-3.5 t-sm leading-7 text-[hsl(var(--muted-foreground))]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = 'text',
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block t-sm font-semibold text-[hsl(var(--primary))]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
        placeholder={placeholder}
      />
    </div>
  );
}
