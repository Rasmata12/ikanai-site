import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { CtaBand, PageHero, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

const EASE = [0.22, 0.85, 0.24, 1] as const;

/* Un visuel par brique, choisi pour coller au sujet traité. */
const PREVIEWS = [
  { src: '/assets/plat-methode.jpg', position: '55% 45%' },
  { src: '/assets/plat-technologie.jpg', position: '58% 45%' },
  { src: '/assets/plat-cockpit.jpg', position: '50% 40%' },
  { src: '/assets/plat-gouvernance.jpg', position: '50% 50%' },
];

export default function PlatformPage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <PageHero
        eyebrow={t.platform.eyebrow}
        title={t.platform.title}
        accent={t.platform.accent}
        lede={t.platform.lede}
      />

      <section className="shell-x aurora aurora--soft mesh-lines surface-light relative section-pb">
        <div className="mx-auto max-w-[1240px] space-y-24 lg:space-y-32">
          {t.routes.map((route, position) => (
            <PlatformRow
              key={route.href}
              index={position}
              route={route}
              preview={PREVIEWS[position]}
              cta={t.common.readMore}
            />
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

function PlatformRow({
  index,
  route,
  preview,
  cta,
}: {
  index: number;
  route: { href: string; label: string; blurb: string; icon: Parameters<typeof Icon>[0]['name'] };
  preview: { src: string; position: string };
  cta: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const flipped = index % 2 === 1;

  // Léger effet de profondeur : l'image glisse plus lentement que la page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <motion.article
      ref={ref}
      className="editorial-row grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-110px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {/* Texte */}
      <motion.div
        className={flipped ? 'lg:order-2' : ''}
        variants={{
          hidden: { opacity: 0, x: flipped ? 44 : -44 },
          show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
        }}
      >
        <div className="flex items-baseline gap-5">
          <span className="editorial-row__num font-display">{String(index + 1).padStart(2, '0')}</span>
          <motion.span
            className="h-px flex-1 origin-left bg-gradient-to-r from-[hsl(var(--accent))] to-transparent"
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.15 } },
            }}
          />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
            <Icon name={route.icon} className="text-[17px]" />
          </span>
          <h2 className="font-display text-[clamp(1.6rem,2.7vw,2.3rem)] leading-tight text-[hsl(var(--primary))]">
            {route.label}
          </h2>
        </div>

        <p className="mt-6 max-w-[440px] text-[14.5px] leading-8 text-[hsl(var(--muted-foreground))]">{route.blurb}</p>

        <Link
          href={route.href}
          data-testid={`link-platform-${route.href.split('/').pop()}`}
          className="focus-ring shine group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] px-7 py-3.5 t-md font-semibold text-white transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_50px_-18px_hsl(176_91%_10%/.95)]"
        >
          <span>{cta}</span>
          <Icon name="arrowRight" className="btn-arrow text-[12px]" />
        </Link>
      </motion.div>

      {/* Visuel */}
      <motion.div
        className={flipped ? 'lg:order-1' : ''}
        variants={{
          hidden: { opacity: 0, scale: 0.92, y: 40 },
          show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
        }}
      >
        <Link href={route.href} aria-hidden="true" tabIndex={-1} className="group relative block">
          <span
            className={`pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${ flipped ? 'bg-gradient-to-tr from-[hsl(var(--accent))]/25 to-transparent opacity-70' : 'bg-gradient-to-tl from-[hsl(var(--secondary))]/22 to-transparent opacity-70' }`}
          />
          <div className={`frame-photo ${flipped ? 'rounded-tr-[6rem]' : 'rounded-bl-[6rem]'}`}>
            <motion.img
              src={preview.src}
              alt=""
              loading="lazy"
              style={{ objectPosition: preview.position, y: imageY }}
              className="h-[290px] w-full scale-110 object-cover lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/55 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 rounded-full bg-white/92 px-4 py-2 t-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))] backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
              {route.label}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
