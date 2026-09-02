import { motion } from 'framer-motion';
import { CtaBand, PageHero, PlatformPager, SCENES, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export default function MethodPage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <PageHero eyebrow={t.method.eyebrow} title={t.method.title} accent={t.method.accent} lede={t.method.lede} />

      {/* LES QUATRE TEMPS */}
      <section className="shell-x aurora aurora--soft mesh-lines surface-light relative overflow-hidden section-pb">
        <div className="rail mx-auto max-w-[1080px]">
          {t.method.steps.map((step, position) => (
            <motion.article
              key={step.number}
              className="group relative grid gap-7 pb-16 last:pb-0 md:grid-cols-[3.1rem_1fr] md:gap-10"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 0.85, 0.24, 1] }}
            >
              <div className="relative z-10">
                <span className="step-bullet">{step.number}</span>
              </div>

              <div className="glass card-topline rounded-[1.75rem] p-8 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))]">
                      <Icon name={step.icon} className="text-[16px]" />
                    </span>
                    <h2 className="font-display text-[1.5rem] text-[hsl(var(--primary))]">{step.title}</h2>
                  </div>
                  <span className="rounded-full bg-[hsl(var(--muted))] px-3.5 py-1.5 t-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">
                    {step.number} / 04
                  </span>
                </div>

                <p className="mt-6 max-w-[640px] text-[14.5px] leading-8 text-[hsl(var(--muted-foreground))]">
                  {step.body}
                </p>

                <div className="mt-7 flex items-start gap-4 rounded-2xl bg-[hsl(var(--muted))]/60 p-5">
                  <Icon name="idea" className="mt-0.5 text-[14px] text-[hsl(var(--accent))]" />
                  <p className="t-sm font-semibold leading-6 text-[hsl(var(--secondary))]">{step.detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="shell-x aurora surface-tint relative overflow-hidden section-y">
        <div className="mx-auto max-w-[1240px]">
          <div className="glass glow-edge grid gap-0 overflow-hidden rounded-[2.25rem] lg:grid-cols-[1.05fr_.95fr]">
            <motion.div
              className="flex flex-col justify-center p-9 sm:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-flex w-fit items-center gap-3 rounded-full border border-[hsl(176_91%_10%/.1)] bg-white px-4 py-2 t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--secondary))]">
                <Icon name="loop" className="text-[11px]" />
                {t.method.eyebrow}
              </span>
              <h2 className="mt-7 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.2] text-[hsl(var(--primary))]">
                {t.method.closing.title}
              </h2>
              <p className="mt-6 max-w-[480px] text-[14.5px] leading-8 text-[hsl(var(--muted-foreground))]">
                {t.method.closing.body}
              </p>

              <div className="mt-9 grid grid-cols-1 gap-5 border-t border-[hsl(var(--foreground)/.08)] pt-8 sm:grid-cols-3">
                {t.method.closingStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="numeral-gradient font-display t-h2s leading-none">{stat.value}</p>
                    <p className="mt-2.5 t-xs leading-5 text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative min-h-[300px]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.75, ease: [0.22, 0.85, 0.24, 1] }}
            >
              <img
                src={SCENES.conseil}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[42%_38%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/55 via-[hsl(var(--primary))]/5 to-transparent lg:bg-gradient-to-l" />
              <div className="absolute bottom-7 left-7 right-7 lg:left-9">
                <p className="t-xs font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">
                  {t.method.closing.badge}
                </p>
                <p className="mt-2 max-w-[280px] font-display text-[1.2rem] leading-snug text-white">
                  {t.method.closing.caption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PlatformPager current="/solution/methode" />
      <CtaBand />
    </div>
  );
}
