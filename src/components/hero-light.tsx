import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowButton, SCENES } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

const SLIDE_DURATION = 4200;
const IMAGES = [SCENES.qr, SCENES.accueil, SCENES.pilotage, SCENES.conseil];
// Cadrage grand écran : la photo est large, on peut se permettre un point de
// focalisation décalé.
const POSITIONS = ['58% 42%', '58% 42%', '55% 34%', '58% 35%'];
// Cadrage mobile : sur un écran étroit et haut, object-fit:cover ne rogne
// quasiment que la largeur (la hauteur tient déjà en entier). Il faut donc un
// point de focalisation resserré sur le sujet réel de chaque photo, sinon on
// se retrouve à ne voir qu'un bout de fenêtre ou de mur.
const POSITIONS_MOBILE = ['58% 42%', '80% 44%', '22% 62%', '68% 28%'];
const EASE = [0.22, 0.85, 0.24, 1] as const;

export function HeroLight() {
  const { t } = useLang();
  const slides = t.hero.slides;
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  // Précharge les quatre visuels dès le montage pour que le fondu ne marque jamais d'arrêt.
  useEffect(() => {
    IMAGES.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, []);

  const goTo = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, previous]);

  const slide = slides[index];

  return (
    <section
      className="hero-bright relative flex flex-col justify-end overflow-hidden"
      aria-roledescription="carousel"
      aria-label="IKAN AI"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 60) (delta < 0 ? next : previous)();
        touchStart.current = null;
      }}
    >
      {IMAGES.map((image, position) => (
        <div key={image} className={`hero-bright__slide ${position === index ? 'is-active' : ''}`} aria-hidden={position !== index}>
          <img
            src={image}
            alt={slides[position]?.eyebrow ?? ''}
            style={
              {
                '--pos-desktop': POSITIONS[position],
                '--pos-mobile': POSITIONS_MOBILE[position],
              } as React.CSSProperties
            }
            loading={position === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      <div className="hero-bright__veil" aria-hidden="true" />
      <div className="hero-bright__glow" aria-hidden="true" />
      <div className="hero-bright__grid" aria-hidden="true" />

      <div className="shell-x hero-bright__content relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end">
        <div className="hero-bright__copy max-w-[760px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="chip-eyebrow"
            >
              <span className="chip-eyebrow__dot" />
              {slide.eyebrow}
            </motion.div>
          </AnimatePresence>

          <h1 className="hero-bright__title title-xl font-display text-[hsl(var(--primary))]">
            <AnimatePresence mode="wait">
              <motion.span
                key={`title-${index}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="block"
              >
                {slide.titleTop}
                <span className="text-gradient block">{slide.titleAccent}</span>
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={`text-${index}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="hero-bright__text max-w-[54ch] text-[hsl(var(--muted-foreground))]"
            >
              {slide.text}
            </motion.p>
          </AnimatePresence>

          <div className="hero-bright__buttons flex flex-wrap items-center">
            <ArrowButton href="/contact" variant="primary" testId="button-hero-demo">
              {t.hero.primary}
            </ArrowButton>
            <ArrowButton href="/solution" variant="outline" testId="button-hero-platform">
              {t.hero.secondary}
            </ArrowButton>
          </div>
        </div>

        {/* Bas du carrousel : repères chiffrés, marqueur, navigation */}
        <div className="hero-bright__footer flex flex-col border-t border-[hsl(var(--foreground)/.12)] lg:flex-row lg:items-end lg:justify-between">
          <div className="hero-facts w-full max-w-[620px]">
            {t.home.facts.slice(0, 3).map((fact, position) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + position * 0.1, ease: EASE }}
              >
                <p className="hero-facts__value numeral-gradient font-display">
                  {fact.value}
                </p>
                <p className="hero-facts__label text-[hsl(var(--muted-foreground))]">{fact.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 lg:justify-end">
            <div className="flex items-center gap-3 rounded-full border border-[hsl(176_91%_10%/.1)] bg-white/78 px-4 py-2 backdrop-blur-md sm:gap-4 sm:px-5 sm:py-2.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`marker-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="hidden t-xs font-semibold uppercase tracking-[.2em] text-[hsl(var(--secondary))] xl:block"
                >
                  {slide.marker}
                </motion.span>

                <div key="dots" className="flex items-center gap-2">
                  {slides.map((item, position) => (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => goTo(position)}
                      aria-label={item.tab}
                      aria-current={position === index ? 'true' : undefined}
                      data-testid={`button-slide-${position}`}
                      className="focus-ring group py-1.5"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-700 ${ position === index ? 'w-9 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--accent))]' : 'w-1.5 bg-[hsl(var(--foreground)/.22)] group-hover:bg-[hsl(var(--secondary)/.6)]' }`}
                      />
                    </button>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            <div className="hidden items-center gap-2.5 sm:flex">
              <button type="button" onClick={previous} aria-label="Previous" className="hero-arrow-bright focus-ring">
                <Icon name="arrowLeft" className="text-[12px]" />
              </button>
              <button type="button" onClick={next} aria-label="Next" className="hero-arrow-bright focus-ring">
                <Icon name="arrowRight" className="text-[12px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
