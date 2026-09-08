import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowButton, Eyebrow, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

const COPY = {
  fr: {
    eyebrow: 'La démonstration IKAN AI',
    title: 'Écoutez mieux.',
    accent: 'Décidez plus vite.',
    lede: 'Découvrez en quelques minutes comment les retours clients deviennent des décisions concrètes pour vos équipes et vos points de vente.',
    videoLabel: 'Voir la vidéo',
    videoCaption: 'IKAN AI en action',
    duration: 'Présentation produit',
    proof: 'Une plateforme pensée pour le terrain',
    items: [
      { icon: 'qr' as const, title: 'Collecte simple', body: 'Un QR code, une voix client, aucune friction.' },
      { icon: 'chart' as const, title: 'Lecture immédiate', body: 'Les signaux importants ressortent sans bruit.' },
      { icon: 'target' as const, title: 'Action mesurable', body: 'Chaque insight mène vers une décision claire.' },
    ],
    contact: 'Parler à un expert',
    solution: 'Explorer la solution',
    note: 'La vidéo ne se lance pas ?',
    fallback: 'Télécharger la vidéo',
  },
  en: {
    eyebrow: 'The IKAN AI demo',
    title: 'Listen better.',
    accent: 'Decide faster.',
    lede: 'See in a few minutes how customer feedback becomes concrete decisions for your teams and points of sale.',
    videoLabel: 'Watch the video',
    videoCaption: 'IKAN AI in action',
    duration: 'Product overview',
    proof: 'A platform made for the field',
    items: [
      { icon: 'qr' as const, title: 'Simple collection', body: 'One QR code, one customer voice, zero friction.' },
      { icon: 'chart' as const, title: 'Instant clarity', body: 'Important signals rise above the noise.' },
      { icon: 'target' as const, title: 'Measurable action', body: 'Every insight points to a clear decision.' },
    ],
    contact: 'Talk to an expert',
    solution: 'Explore the solution',
    note: "Video won't play?",
    fallback: 'Download the video',
  },
} as const;

export default function DemoPage() {
  useReveals();
  const { lang } = useLang();
  const copy = COPY[lang];

  return (
    <div className="relative overflow-hidden bg-[hsl(var(--primary))] text-white">
      <section className="header-offset relative isolate overflow-hidden px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_15%,hsl(var(--secondary)/.7),transparent_34%),radial-gradient(circle_at_14%_80%,hsl(var(--accent)/.16),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[hsl(var(--accent)/.7)] to-transparent" />

        <div className="mx-auto max-w-[1380px]">
          <div className="mt-16 grid items-end gap-14 lg:mt-24 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 0.85, 0.24, 1] }}
              className="max-w-[570px]"
            >
              <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>
              <h1 className="title-xl mt-7 font-display text-[clamp(2.8rem,6vw,6.4rem)] leading-[.98] text-white">
                {copy.title} <span className="text-gradient-light">{copy.accent}</span>
              </h1>
              <p className="mt-8 max-w-[510px] t-lg leading-8 text-white/65">{copy.lede}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ArrowButton href="/contact" variant="accent" testId="button-demo-contact">
                  {copy.contact}
                </ArrowButton>
                <ArrowButton href="/solution" variant="ghost-light" testId="button-demo-solution">
                  {copy.solution}
                </ArrowButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 0.85, 0.24, 1] }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-[hsl(var(--accent)/.18)] blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/18 bg-black/35 p-2 shadow-[0_35px_100px_-35px_rgba(0,0,0,.9)] sm:rounded-[2.25rem] sm:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[1.2rem] bg-black sm:rounded-[1.75rem]">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/assets/scene-accueil.jpg"
                    aria-label={copy.videoLabel}
                  >
                    <source src="/assets/demo-video.mp4" type="video/mp4" />
                    {copy.note} <a href="/assets/demo-video.mp4" download>{copy.fallback}</a>.
                  </video>
                  <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-white/70 sm:inset-x-7 sm:bottom-7">
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_16px_hsl(var(--accent))]" />{copy.videoCaption}</span>
                    <span>{copy.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-20 border-t border-white/12 pt-8 lg:mt-28">
            <p className="eyebrow text-[hsl(var(--accent))]">{copy.proof}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {copy.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="reveal border-l border-white/15 pl-5 sm:pl-6"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon name={item.icon} className="text-[18px] text-[hsl(var(--accent))]" />
                  <h2 className="mt-5 font-display t-h3 text-white">{item.title}</h2>
                  <p className="mt-2 max-w-[260px] t-sm leading-6 text-white/55">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
