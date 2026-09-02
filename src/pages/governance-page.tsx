import { motion } from 'framer-motion';
import { CtaBand, PageHero, PlatformPager, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export default function GovernancePage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <PageHero
        eyebrow={t.governance.eyebrow}
        title={t.governance.title}
        accent={t.governance.accent}
        lede={t.governance.lede}
      />

      <section className="shell-x aurora aurora--soft mesh-lines surface-light relative overflow-hidden section-pb">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-6 md:grid-cols-2">
            {t.governance.cards.map((card, position) => (
              <motion.article
                key={card.title}
                className="glass card-topline group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] p-9 sm:p-10"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.6, delay: (position % 2) * 0.1, ease: [0.22, 0.85, 0.24, 1] }}
              >
                <span className="editorial-row__num pointer-events-none absolute -right-3 -top-5 font-display opacity-25 transition-opacity duration-500 group-hover:opacity-60">
                  {String(position + 1).padStart(2, '0')}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] group-hover:shadow-[0_16px_34px_-16px_hsl(var(--accent))]">
                  <Icon name={card.icon} className="text-[19px]" />
                </span>

                <h2 className="relative mt-9 font-display t-h3 leading-snug text-[hsl(var(--primary))]">
                  {card.title}
                </h2>
                <p className="relative mt-4 t-md leading-8 text-[hsl(var(--muted-foreground))]">{card.body}</p>

                <span className="relative mt-8 h-px w-full bg-gradient-to-r from-[hsl(var(--foreground)/.12)] to-transparent" />
              </motion.article>
            ))}
          </div>

          {/* Bandeau de réassurance */}
          <motion.div
            className="surface-deep glow-edge relative mt-14 overflow-hidden rounded-[2rem] px-9 py-12 text-white sm:px-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="grid gap-10 lg:grid-cols-3">
              {[
                { icon: 'lock' as const, value: '100 %', label: t.governance.cards[1].title },
                { icon: 'roles' as const, value: '03', label: t.cockpit.points[0].title },
                { icon: 'fingerprint' as const, value: '24/7', label: t.governance.cards[3].title },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--accent))]/14 text-[hsl(var(--accent))]">
                    <Icon name={item.icon} className="text-[16px]" />
                  </span>
                  <div>
                    <p className="font-display t-h2s leading-none text-white">{item.value}</p>
                    <p className="mt-2.5 max-w-[190px] t-sm leading-6 text-white/60">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <PlatformPager current="/solution/gouvernance" />
      <CtaBand />
    </div>
  );
}
