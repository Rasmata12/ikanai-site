import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CtaBand, SectionHeading, useReveals } from '@/components/brand-shared';
import { HeroLight } from '@/components/hero-light';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export default function HomePage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <HeroLight />

      {/* LES QUATRE BRIQUES */}
      <section className="shell-x aurora aurora--soft mesh-lines surface-light relative overflow-hidden section-y-sm">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow={t.home.pillars.eyebrow}
            title={t.home.pillars.title}
            accent={t.home.pillars.accent}
            lede={t.home.pillars.lede}
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {t.routes.map((route, position) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (position % 2) * 0.12 }}
              >
                <Link
                  href={route.href}
                  data-testid={`link-block-${route.href.split('/').pop()}`}
                  className="glass group flex h-full items-start gap-6 rounded-[1.9rem] p-8 transition-transform duration-200 active:scale-[0.97] sm:p-9"
                >
                  <span className="pill-index mt-1 shrink-0">{String(position + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] group-active:bg-gradient-to-br group-active:from-[hsl(75_70%_55%)] group-active:to-[hsl(var(--accent))] group-active:text-[hsl(var(--primary))]">
                        <Icon name={route.icon} className="text-[16px]" />
                      </span>
                      <span className="font-display t-h3 text-[hsl(var(--primary))]">{route.label}</span>
                    </span>
                    <span className="mt-5 block t-md leading-7 text-[hsl(var(--muted-foreground))]">
                      {route.blurb}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2 t-sm font-semibold text-[hsl(var(--secondary))]">
                      {t.home.pillars.link}
                      <Icon name="arrowRight" className="btn-arrow text-[11px]" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="shell-x aurora surface-tint relative overflow-hidden section-y">
        <div className="mx-auto max-w-[1240px] px-0 sm:px-3 lg:px-11">
          <SectionHeading
            eyebrow={t.home.sectors.eyebrow}
            align="center"
            title={t.home.sectors.title}
            accent={t.home.sectors.accent}
            lede={t.home.sectors.lede}
          />
        </div>

        <div className="marquee-soft mt-14">
          <div className="marquee-soft-track">
            {[...t.home.sectors.list, ...t.home.sectors.list].map((sector, position) => (
              <span key={`${sector.label}-${position}`} className="sector-chip">
                <Icon name={sector.icon} className="text-[13px]" />
                {sector.label}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-soft mt-4">
          <div className="marquee-soft-track" style={{ animationDirection: 'reverse', animationDuration: '46s' }}>
            {[...t.home.sectors.list]
              .reverse()
              .concat([...t.home.sectors.list].reverse())
              .map((sector, position) => (
                <span key={`rev-${sector.label}-${position}`} className="sector-chip">
                  <Icon name={sector.icon} className="text-[13px]" />
                  {sector.label}
                </span>
              ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
