import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/brand-shared';
import { Icon, type IconName } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

/** Le prix et l'habillage montent avec la formule : plus l'offre est haute,
 *  plus la carte est marquée visuellement. */
const PLANS: {
  monthly: number | null;
  annual: number | null;
  icon: IconName;
  free?: boolean;
  featured?: boolean;
  dark?: boolean;
}[] = [
  { monthly: 0, annual: 0, icon: 'qr', free: true },
  { monthly: 30000, annual: 25000, icon: 'bolt' },
  { monthly: 50000, annual: 40000, icon: 'crown', featured: true, dark: true },
  { monthly: null, annual: null, icon: 'shield' },
];

export function OffersSection({ onSelect }: { onSelect?: (offer: string) => void }) {
  const { t, lang } = useLang();
  const [annual, setAnnual] = useState(false);

  const formatAmount = (value: number | null, free?: boolean) => {
    if (free) return lang === 'fr' ? 'Gratuit' : 'Free';
    if (value === null) return lang === 'fr' ? 'Sur devis' : 'On request';
    return value.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US').replace(/[\u202f\u00a0,]/g, ' ');
  };

  return (
    <section
      id="offres"
      className="shell-x aurora surface-tint relative scroll-mt-24 overflow-hidden section-y"
    >
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow={t.offers.eyebrow}
          align="center"
          title={t.offers.title}
          accent={t.offers.accent}
          lede={t.offers.lede}
        />

        {/* Bascule mensuel / annuel */}
        <div className="mb-14 mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center rounded-full border border-[hsl(var(--foreground)/.08)] bg-white p-1.5">
            {[
              { label: t.offers.monthly, value: false },
              { label: t.offers.annual, value: true },
            ].map(({ label, value }) => {
              const active = annual === value;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(value)}
                  className={`focus-ring relative z-10 rounded-full px-7 py-2.5 t-sm font-bold transition-colors duration-300 ${ active ? 'text-white' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]' }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="billingPill"
                      className="absolute inset-0 rounded-full bg-[hsl(var(--primary))]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  ) : null}
                  {label}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {annual ? (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-full bg-[hsl(var(--accent))]/25 px-4 py-1.5 t-xs font-bold text-[hsl(var(--secondary))]"
              >
                {t.offers.save}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Les quatre formules */}
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.offers.plans.map((plan, position) => {
            const config = PLANS[position];
            const amount = annual ? config.annual : config.monthly;
            const dark = Boolean(config.dark);

            return (
              <motion.article
                key={plan.name}
                className={`plan-card group relative flex h-full flex-col rounded-[1.9rem] p-6 sm:p-7 xl:p-8 ${ dark ? 'plan-card--featured surface-deep text-white' : 'glass' }`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: dark ? -10 : 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.55, delay: position * 0.09, ease: [0.22, 0.85, 0.24, 1] }}
                style={{ zIndex: 1 }}
                whileHover={{
                  scale: 1.06,
                  zIndex: 20,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.15 },
                }}
              >
                {config.featured ? (
                  <span className="absolute right-7 top-8 rounded-full bg-[hsl(var(--accent))] px-3 py-1.5 t-2xs font-bold uppercase tracking-[.14em] text-[hsl(var(--primary))]">
                    {t.offers.featured}
                  </span>
                ) : null}

                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 ${ dark ? 'bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))]' }`}
                >
                  <Icon name={config.icon} className="text-[17px]" />
                </span>

                <h3 className={`mt-7 font-display text-[1.5rem] ${dark ? 'text-white' : 'text-[hsl(var(--primary))]'}`}>
                  {plan.name}
                </h3>
                <p
                  className={`mt-3 min-h-[56px] t-sm leading-6 ${ dark ? 'text-white/60' : 'text-[hsl(var(--muted-foreground))]' }`}
                >
                  {plan.tagline}
                </p>

                {/* Prix */}
                <div className={`mt-6 border-t pt-6 ${dark ? 'border-white/12' : 'border-[hsl(var(--foreground)/.08)]'}`}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={String(amount) + String(annual)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-baseline gap-2"
                    >
                      <span
                        className={`whitespace-nowrap font-display text-[1.45rem] sm:t-h2s leading-none tracking-tight ${ dark ? 'text-white' : 'text-[hsl(var(--primary))]' }`}
                      >
                        {formatAmount(amount, config.free)}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <p
                    className={`mt-2 t-xs sm:t-xs font-semibold uppercase tracking-[.14em] ${ dark ? 'text-white/45' : 'text-[hsl(var(--muted-foreground))]' }`}
                  >
                    {config.free ? t.offers.unitFree : amount === null ? t.offers.unitCustom : t.offers.unitMonth}
                  </p>
                </div>

                {/* Capacité de la formule, mise en avant */}
                <p
                  className={`mt-5 rounded-xl px-4 py-3 t-xs font-bold leading-5 ${ dark ? 'bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]' }`}
                >
                  {plan.highlight}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${ dark ? 'bg-[hsl(var(--accent))]/25 text-[hsl(var(--accent))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]' }`}
                        style={{ height: '1.05rem', width: '1.05rem' }}
                      >
                        <Icon name="check" className="text-[8px]" />
                      </span>
                      <span
                        className={`t-sm leading-6 ${dark ? 'text-white/75' : 'text-[hsl(var(--muted-foreground))]'}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelect?.(plan.name)}
                  data-testid={`button-offer-${plan.name.toLowerCase()}`}
                  className={`focus-ring shine mt-8 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 t-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${ dark ? 'bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'border border-[hsl(var(--primary)/.22)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white' }`}
                >
                  <span>
                    {config.free ? t.offers.startFree : amount === null ? t.offers.quote : t.offers.choose}
                  </span>
                  <Icon name="arrowRight" className="btn-arrow text-[11px]" />
                </button>
              </motion.article>
            );
          })}
        </div>

        {/* Ce qui est inclus partout */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.offers.included.map((item, position) => (
            <div
              key={item.title}
              className="reveal glass flex items-start gap-5 rounded-[1.6rem] p-7"
              style={{ transitionDelay: `${position * 80}ms` }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
                <Icon name={item.icon} className="text-[15px]" />
              </span>
              <div>
                <h3 className="font-display t-h3 text-[hsl(var(--primary))]">{item.title}</h3>
                <p className="mt-2 t-sm leading-7 text-[hsl(var(--muted-foreground))]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
