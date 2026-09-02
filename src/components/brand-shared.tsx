import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export const markPath = '/assets/ikanai-mark.png';

export const SCENES = {
  accueil: '/assets/scene-accueil.jpg',
  qr: '/assets/scene-pilotage (1).jpg',
  pilotage: '/assets/scene-pilotage (1).jpg',
  conseil: '/assets/scene-conseil.jpg',
};

export function useReveals() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="group inline-flex items-center gap-3" aria-label="IKAN AI">
      <img
        src={markPath}
        alt=""
        aria-hidden="true"
        className="h-9 w-9 shrink-0 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10"
      />
      <span
        className={`font-display t-h3 leading-none tracking-[.01em] ${ light ? 'text-white' : 'text-[hsl(var(--primary))]' }`}
      >
        IKAN AI
      </span>
    </span>
  );
}

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost-light';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] text-white shadow-[0_18px_40px_-20px_hsl(176_91%_10%/.9)] hover:shadow-[0_24px_50px_-18px_hsl(176_91%_10%/.95)]',
  accent:
    'bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] text-[hsl(var(--foreground))] shadow-[0_18px_44px_-18px_hsl(var(--accent)/.9)] hover:shadow-[0_24px_54px_-16px_hsl(var(--accent))]',
  outline:
    'border border-[hsl(var(--primary)/.22)] text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white',
  'ghost-light': 'border border-white/28 text-white hover:bg-white hover:text-[hsl(var(--primary))]',
};

export function ArrowButton({
  children,
  href,
  onClick,
  testId,
  variant = 'primary',
  type = 'button',
  disabled = false,
  compact = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  testId: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  compact?: boolean;
}) {
  const className = `focus-ring shine group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2.5 ${
    compact ? 'px-4 py-2 text-[12px] sm:px-5 sm:py-2.5 sm:text-[13px]' : 'px-4 py-2.5 text-[12.5px] sm:px-7 sm:py-3.5 sm:text-sm'
  } ${VARIANTS[variant]}`;
  const inner = (
    <>
      <span>{children}</span>
      <Icon name="arrowRight" className="btn-arrow text-[12px]" />
    </>
  );

  if (href && href.startsWith('/')) {
    return (
      <Link href={href} onClick={onClick} data-testid={testId} className={className}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} data-testid={testId} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} data-testid={testId} className={className}>
      {inner}
    </button>
  );
}

export function Eyebrow({
  children,
  tone = 'dark',
  centered = false,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  centered?: boolean;
}) {
  return (
    <span
      className={`eyebrow ${centered ? 'eyebrow--center' : ''} ${ tone === 'light' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--secondary))]' }`}
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  image,
  imagePosition = 'center',
  badge,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  image?: string;
  imagePosition?: string;
  badge?: { value: string; label: string };
  children?: ReactNode;
}) {
  const split = Boolean(image);
  return (
    <section className="shell-x header-offset page-hero aurora aurora--soft mesh-lines surface-light relative overflow-hidden section-pb">
      <span className="page-hero__orb" aria-hidden="true" />
      <div
        className={`relative mx-auto max-w-[1300px] ${ split ? 'grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20' : 'max-w-[1240px]' }`}
      >
        <div>
          <div className="hero-enter">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1
            className={`hero-enter-delay title-xl mt-7 font-display text-[hsl(var(--primary))] ${ split ? 'text-[clamp(1.95rem,3.4vw,3.05rem)]' : 'max-w-[980px] text-[clamp(2.3rem,4.7vw,4.2rem)]' }`}
          >
            {title} <span className="text-gradient">{accent}</span>
          </h1>
          <p className="hero-enter-delay-2 mt-7 max-w-[620px] t-lg leading-8 text-[hsl(var(--muted-foreground))]">
            {lede}
          </p>
          {children}
        </div>

        {image ? (
          <div className="hero-enter-delay-2 relative">
            <span className="page-hero__arc" aria-hidden="true" />
            <div className="frame-photo rounded-bl-[6rem] shadow-[0_50px_110px_-55px_hsl(176_91%_10%/.85)]">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                style={{ objectPosition: imagePosition }}
                className="h-[300px] w-full object-cover lg:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/45 via-transparent to-transparent" />
            </div>

            {badge ? (
              <div className="glass float-gently absolute bottom-6 left-5 w-[12.5rem] rounded-2xl p-5 sm:bottom-7 sm:-left-8 xl:-left-12">
                <p className="numeral-gradient font-display t-h2s leading-none">{badge.value}</p>
                <p className="mt-2 t-xs leading-5 text-[hsl(var(--muted-foreground))]">{badge.label}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  tone = 'dark',
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
}) {
  const light = tone === 'light';
  const centered = align === 'center';
  return (
    <div className={`reveal ${centered ? 'mx-auto flex max-w-[880px] flex-col items-center text-center' : 'max-w-[800px]'}`}>
      <Eyebrow tone={light ? 'light' : 'dark'} centered={centered}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={`mt-6 font-display text-[clamp(1.85rem,3.1vw,2.85rem)] leading-[1.2] ${ light ? 'text-white' : 'text-[hsl(var(--primary))]' }`}
      >
        {title}{' '}
        {accent ? <span className={light ? 'text-gradient-light' : 'text-gradient'}>{accent}</span> : null}
      </h2>
      {lede ? (
        <p
          className={`mt-5 max-w-[600px] t-lg leading-8 ${centered ? 'mx-auto' : ''} ${ light ? 'text-white/65' : 'text-[hsl(var(--muted-foreground))]' }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="shell-x aurora aurora--dark mesh-lines mesh-lines--dark surface-deep relative overflow-hidden section-y">
      <div className="reveal relative mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-[640px]">
          <h2 className="font-display text-[clamp(2rem,3.8vw,3.3rem)] leading-[1.18] text-white">
            {t.cta.title}
          </h2>
          <p className="mt-5 max-w-[500px] t-lg leading-8 text-white/65">{t.cta.lede}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ArrowButton href="/contact" variant="accent" testId="button-cta-primary">
            {t.cta.primary}
          </ArrowButton>
          <ArrowButton href="/solution" variant="ghost-light" testId="button-cta-secondary">
            {t.cta.secondary}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

export function Counter({ to, suffix = '', duration = 1500 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular">
      {value}
      {suffix}
    </span>
  );
}

/** Affiche une valeur du type "30 s", "24/7" en animant sa partie numérique. */
export function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return <span>{value}</span>;
  return <Counter to={Number(match[1])} suffix={match[2]} />;
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(window.scrollY / height, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

/** Navigation entre les briques de la solution, en bas de chaque page. */
export function PlatformPager({ current }: { current: string }) {
  const { t } = useLang();
  const index = t.routes.findIndex((route) => route.href === current);
  const previous = index > 0 ? t.routes[index - 1] : null;
  const next = index >= 0 && index < t.routes.length - 1 ? t.routes[index + 1] : null;

  return (
    <section className="shell-x surface-light border-t border-[hsl(var(--foreground)/.07)] section-y-sm">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {(
            <Link
              href={previous ? previous.href : '/solution'}
              className="glass group flex items-center gap-5 rounded-[1.5rem] p-6 text-left transition-transform duration-200 active:scale-[0.97]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] group-active:bg-gradient-to-br group-active:from-[hsl(75_70%_55%)] group-active:to-[hsl(var(--accent))] group-active:text-[hsl(var(--primary))]">
                <Icon name="arrowLeft" className="text-[13px]" />
              </span>
              <span>
                <span className="block t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                  {t.common.previous}
                </span>
                <span className="mt-1.5 block font-display t-h3 text-[hsl(var(--primary))]">
                  {previous ? previous.label : t.platform.overviewNote}
                </span>
              </span>
            </Link>
          )}

          {next ? (
            <Link
              href={next.href}
              className="glass group flex items-center justify-end gap-5 rounded-[1.5rem] p-6 text-right transition-transform duration-200 active:scale-[0.97]"
            >
              <span>
                <span className="block t-xs font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">
                  {t.common.next}
                </span>
                <span className="mt-1.5 block font-display t-h3 text-[hsl(var(--primary))]">{next.label}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--secondary))] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[hsl(75_70%_55%)] group-hover:to-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] group-active:bg-gradient-to-br group-active:from-[hsl(75_70%_55%)] group-active:to-[hsl(var(--accent))] group-active:text-[hsl(var(--primary))]">
                <Icon name="arrowRight" className="text-[13px]" />
              </span>
            </Link>
          ) : null}
        </div>

        <div className="mt-9 flex items-center justify-center gap-2">
          {t.routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-label={route.label}
              className={`h-1.5 rounded-full transition-all duration-500 ${ route.href === current ? 'w-8 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--accent))]' : 'w-1.5 bg-[hsl(var(--foreground)/.18)] hover:bg-[hsl(var(--secondary)/.5)]' }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
