import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CtaBand, PageHero, PlatformPager, SectionHeading, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import {
  actionFor,
  analyseFeedback,
  SENTIMENT_LABELS,
  SEVERITY_LABELS,
  THEME_LABELS,
  type AnalysisResult,
} from '@/lib/feedback-analysis';
import { useLang } from '@/i18n/language-context';

/** Habillage visuel du verdict, dérivé du résultat de l'analyse. */
const SENTIMENT_DOT = {
  positive: 'bg-emerald-400',
  neutral: 'bg-amber-400',
  negative: 'bg-red-400',
} as const;

const SEVERITY_BADGE = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-red-50 text-red-700 border-red-200',
} as const;

export default function TechnologyPage() {
  useReveals();
  const { t, lang } = useLang();
  const [verbatim, setVerbatim] = useState(t.tech.demo.examples[0].text);
  const [rating, setRating] = useState(2);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(() =>
    analyseFeedback(t.tech.demo.examples[0].text, 2),
  );

  const run = (text = verbatim, note = rating) => {
    if (!text.trim()) return;
    setPending(true);
    window.setTimeout(() => {
      setResult(analyseFeedback(text, note));
      setPending(false);
    }, 420);
  };

  return (
    <div className="relative overflow-hidden">
      <PageHero eyebrow={t.tech.eyebrow} title={t.tech.title} accent={t.tech.accent} lede={t.tech.lede} />

      {/* PIPELINE */}
      <section className="shell-x aurora aurora--dark mesh-lines mesh-lines--dark surface-deep relative overflow-hidden text-white section-y">
        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.tech.pipeline.map((stage, position) => (
              <motion.div
                key={stage.title}
                className="glass-dark relative rounded-[1.6rem] p-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: position * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))]/14 text-[hsl(var(--accent))]">
                    <Icon name={stage.icon} className="text-[15px]" />
                  </span>
                  <span className="t-xs font-bold tracking-[.2em] text-white/25">
                    {String(position + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-7 font-display t-h3 leading-snug text-white">{stage.title}</h2>
                <p className="mt-3.5 t-sm leading-7 text-white/60">{stage.body}</p>
                {position < t.tech.pipeline.length - 1 ? (
                  <Icon
                    name="arrowRight"
                    className="absolute -right-[11px] top-1/2 hidden -translate-y-1/2 text-[13px] text-[hsl(var(--accent))]/60 lg:block"
                  />
                ) : null}
              </motion.div>
            ))}
          </div>

          <div className="reveal mt-14 flex flex-wrap gap-3">
            {t.tech.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/12 px-4 py-2 t-xs font-semibold text-white/65">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYSE EN DIRECT */}
      <section className="shell-x aurora surface-tint relative section-y">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow={t.tech.demo.eyebrow}
            align="center"
            title={t.tech.demo.title}
            accent={t.tech.demo.accent}
            lede={t.tech.demo.lede}
          />

          <motion.div
            className="glass glow-edge mt-14 overflow-hidden rounded-[2.25rem]"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-[1.05fr_.95fr]">
              <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
                <div>
                  <label htmlFor="verbatim" className="block t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                    {t.tech.demo.inputLabel}
                  </label>
                  <textarea
                    id="verbatim"
                    rows={5}
                    value={verbatim}
                    onChange={(event) => setVerbatim(event.target.value)}
                    placeholder={t.tech.demo.placeholder}
                    className="field-input mt-4 resize-none leading-7"
                  />

                  <div className="mt-6">
                    <p className="t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                      {t.tech.demo.ratingLabel}
                    </p>
                    <div className="mt-3.5 flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setRating(value);
                            run(verbatim, value);
                          }}
                          aria-label={`${value}/5`}
                          data-testid={`button-rating-${value}`}
                          className={`focus-ring flex h-10 w-10 items-center justify-center rounded-xl border t-sm font-bold transition-all duration-300 ${ value <= rating ? 'border-transparent bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'border-[hsl(var(--foreground)/.14)] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/.4)]' }`}
                        >
                          {value}
                        </button>
                      ))}
                      <span className="ml-2 t-xs text-[hsl(var(--muted-foreground))]">
                        {t.tech.demo.ratingHint}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                      {t.tech.demo.examplesLabel}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2.5">
                      {t.tech.demo.examples.map((example) => (
                        <button
                          key={example.label}
                          type="button"
                          onClick={() => {
                            setVerbatim(example.text);
                            run(example.text, rating);
                          }}
                          className="focus-ring rounded-full border border-[hsl(var(--foreground)/.14)] px-4 py-2 t-xs font-semibold text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
                        >
                          {example.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => run()}
                    disabled={pending}
                    data-testid="button-analyse"
                    className="focus-ring shine group inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{pending ? t.tech.demo.running : t.tech.demo.run}</span>
                    <Icon name="arrowRight" className="btn-arrow text-[12px]" />
                  </button>
                  <span className="t-xs font-medium text-[hsl(var(--muted-foreground))]">
                    {t.tech.demo.privacy}
                  </span>
                </div>
              </div>

              <div className="surface-deep relative p-8 text-white sm:p-10">
                <p className="t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--accent))]">
                  {t.tech.demo.resultLabel}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${result.sentiment}-${result.theme}-${result.severity}-${result.discordance}-${pending}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32 }}
                    className="mt-8 space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="t-sm font-semibold text-white/55">{t.tech.demo.tone}</span>
                      <span className="flex items-center gap-2.5 font-display t-h3">
                        <span className={`h-2.5 w-2.5 rounded-full ${SENTIMENT_DOT[result.sentiment]}`} />
                        {SENTIMENT_LABELS[lang][result.sentiment]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="t-sm font-semibold text-white/55">{t.tech.demo.theme}</span>
                      <span className="text-right t-md font-semibold">
                        {THEME_LABELS[lang][result.theme]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="t-sm font-semibold text-white/55">{t.tech.demo.severity}</span>
                      <span
                        className={`rounded-full border px-3.5 py-1.5 t-xs font-bold ${SEVERITY_BADGE[result.severity]}`}
                      >
                        {SEVERITY_LABELS[lang][result.severity]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="t-sm font-semibold text-white/55">{t.tech.demo.discordance}</span>
                      <span
                        className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 t-xs font-bold ${ result.discordance ? 'bg-amber-400/20 text-amber-200' : 'bg-white/[.06] text-white/50' }`}
                      >
                        <Icon name={result.discordance ? 'warning' : 'check'} className="text-[10px]" />
                        {result.discordance ? t.tech.demo.discordanceYes : t.tech.demo.discordanceNo}
                      </span>
                    </div>

                    <div>
                      <span className="t-sm font-semibold text-white/55">{t.tech.demo.action}</span>
                      <div className="mt-4 flex items-start gap-4 rounded-2xl bg-white/[.06] p-5">
                        <Icon name="idea" className="mt-0.5 text-[15px] text-[hsl(var(--accent))]" />
                        <p className="t-sm leading-7 text-white/80">{actionFor(result, lang)}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PlatformPager current="/solution/technologie" />
      <CtaBand />
    </div>
  );
}
