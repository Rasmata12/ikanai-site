import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'wouter';
import { SectionHeading } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export function IntelligenceSection() {
  const { t } = useLang();
  const { intelligence } = t.tech;

  return (
    <section className="shell-x aurora aurora--soft mesh-lines surface-tint relative overflow-hidden section-y">
      <div className="relative mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={intelligence.eyebrow}
          title={intelligence.title}
          accent={intelligence.accent}
          lede={intelligence.lede}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <ProductCard
            icon="magic"
            label={intelligence.yam.label}
            title={intelligence.yam.title}
            body={intelligence.yam.body}
            tags={intelligence.yam.tags}
            previewLabel={intelligence.yam.previewLabel}
          >
            <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-4">
              <img
                src="/assets/yam-mascot.png"
                alt="YAM"
                width="120"
                height="181"
                loading="lazy"
                decoding="async"
                className="float-gently h-auto w-full object-contain"
              />
              <div className="min-w-0">
                <p className="ml-auto w-fit max-w-full rounded-2xl rounded-br-sm bg-[hsl(var(--primary))] px-3 py-2.5 text-left text-[11px] leading-5 text-white sm:px-4 sm:text-[13px]">
                  {intelligence.yam.question}
                </p>
                <div className="mt-2.5 flex items-start gap-2.5 rounded-2xl rounded-tl-sm border border-[hsl(var(--border)/.65)] bg-white p-3 shadow-sm sm:mt-3 sm:gap-3 sm:p-4">
                  <img
                    src="/assets/yam-avatar.png"
                    alt=""
                    aria-hidden="true"
                    width="69"
                    height="65"
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 shrink-0 rounded-full object-cover sm:h-8 sm:w-8"
                  />
                  <p className="text-[11px] leading-5 text-[hsl(var(--muted-foreground))] sm:text-[13px] sm:leading-6">
                    {intelligence.yam.answer}
                  </p>
                </div>
              </div>
            </div>
          </ProductCard>

          <ProductCard
            icon="broadcast"
            label={intelligence.watch.label}
            title={intelligence.watch.title}
            body={intelligence.watch.body}
            tags={intelligence.watch.tags}
            previewLabel={intelligence.watch.previewLabel}
          >
            <div className="space-y-2.5">
              {intelligence.watch.mentions.map((mention, index) => (
                <div
                  key={`${mention.time}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--border)/.65)] bg-white p-3.5 shadow-sm sm:p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
                    <Icon name="comments" className="text-xs" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[hsl(var(--secondary))]">
                        {mention.source}
                      </span>
                      <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{mention.time}</span>
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-5 text-[hsl(var(--primary))] sm:text-[13px]">
                      {mention.text}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </ProductCard>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="focus-ring shine group inline-flex items-center gap-2.5 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_hsl(176_91%_10%/.9)]"
          >
            {intelligence.cta}
            <Icon name="arrowRight" className="btn-arrow text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  icon,
  label,
  title,
  body,
  tags,
  previewLabel,
  children,
}: {
  icon: 'magic' | 'broadcast';
  label: string;
  title: string;
  body: string;
  tags: string[];
  previewLabel: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col rounded-[1.8rem] border border-[hsl(var(--border)/.65)] bg-white/90 p-5 shadow-[0_22px_60px_-40px_hsl(176_91%_10%/.32)] sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
          <Icon name={icon} className="text-base" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[.16em] text-[hsl(var(--secondary))]">
          {label}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl leading-snug text-[hsl(var(--primary))] sm:text-2xl">{title}</h3>
      <p className="mt-3 min-h-[4.5rem] text-[13px] leading-6 text-[hsl(var(--muted-foreground))] sm:text-sm sm:leading-7">
        {body}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[hsl(var(--muted))] px-3 py-1.5 text-[10px] font-semibold text-[hsl(var(--secondary))] sm:text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-7 flex-1 rounded-[1.35rem] border border-[hsl(var(--border)/.5)] bg-[hsl(60_33%_98%)] p-3.5 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">
            {previewLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-[hsl(var(--secondary))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            IKAN AI
          </span>
        </div>
        {children}
      </div>
    </motion.article>
  );
}
