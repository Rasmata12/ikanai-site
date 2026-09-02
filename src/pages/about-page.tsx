import { motion } from 'framer-motion';
import { CtaBand, PageHero, SectionHeading, useReveals } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

/* Photos de l'équipe : déposer les fichiers dans public/assets/equipe/
   et ajuster ce tableau. Laisser photo vide affiche le monogramme. */
const MEMBERS = [
  { name: 'Thomas Ouedraogo', photo: '', initials: 'TO', mail: 'thomas@ikanai.app' },
  { name: 'Alane Jassem Traoré', photo: '/assets/equipe/alane.jpg', initials: 'AT', mail: 'alane@ikanai.app' },
  { name: 'Rasmata Kabré', photo: '/assets/equipe/rasmata.jpg', initials: 'RK', mail: 'rasmata@ikanai.app' },
  {
    name: 'Auguste-Marie Lionel Nitiema',
    photo: '/assets/equipe/auguste.jpg',
    initials: 'AN',
    mail: 'auguste@ikanai.app',
  },
  { name: 'Zana Coulibaly', photo: '/assets/equipe/zana.jpg', initials: 'ZC', mail: 'zana@ikanai.app' },
  {
    name: 'Laura Arianne Kiswindsida Tenkodogo',
    photo: '/assets/equipe/laura.jpg',
    initials: 'LT',
    mail: 'laura@ikanai.app',
  },
];

export default function AboutPage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} accent={t.about.accent} lede={t.about.lede} />

      {/* VISION */}
      <section id="vision" className="shell-x aurora aurora--soft surface-light relative scroll-mt-28 section-pb">
        <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={t.about.vision.eyebrow}
              title={t.about.vision.title}
              accent={t.about.vision.accent}
            />

            <div className="mt-12 space-y-8">
              {t.about.vision.pillars.map((pillar, position) => (
                <motion.div
                  key={pillar.title}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: position * 0.12 }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
                    <Icon name={pillar.icon} className="text-[16px]" />
                  </span>
                  <div>
                    <h3 className="font-display t-h3 text-[hsl(var(--primary))]">{pillar.title}</h3>
                    <p className="mt-2 t-md leading-7 text-[hsl(var(--muted-foreground))]">{pillar.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 0.85, 0.24, 1] }}
          >
            <div className="surface-deep glow-edge relative overflow-hidden rounded-[2.25rem] rounded-tr-[6rem] p-10 text-white sm:p-12">
              <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[hsl(var(--accent))]/16 blur-3xl" />
              <span className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[hsl(var(--secondary))]/25 blur-3xl" />

              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--accent))]/14 text-[hsl(var(--accent))]">
                <Icon name="quote" className="text-[18px]" />
              </span>

              <blockquote className="relative mt-8 font-display text-[clamp(1.25rem,2.1vw,1.7rem)] leading-[1.45] text-white">
                {t.about.vision.lede}
              </blockquote>

              <div className="relative mt-10 grid gap-8 border-t border-white/12 pt-8 sm:grid-cols-3">
                {t.home.facts.slice(0, 3).map((fact) => (
                  <div key={fact.label}>
                    <p className="font-display t-h2s leading-none text-[hsl(var(--accent))]">{fact.value}</p>
                    <p className="mt-3 t-xs leading-5 text-white/60">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section
        id="histoire"
        className="shell-x aurora aurora--dark mesh-lines mesh-lines--dark surface-deep relative scroll-mt-28 overflow-hidden text-white section-y"
      >
        <div className="relative mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow={t.about.history.eyebrow}
            tone="light"
            title={t.about.history.title}
            accent={t.about.history.accent}
          />

          {/* Frise en deux colonnes : l'axe court au centre, les étapes alternent
              de part et d'autre pour occuper toute la largeur. */}
          <div className="tl-grid mt-16">
            {t.about.history.items.map((item, position) => {
              const right = position % 2 === 1;
              return (
                <motion.div
                  key={item.period}
                  className={`tl-item ${right ? 'tl-item--right' : 'tl-item--left'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.6, delay: position * 0.08, ease: [0.22, 0.85, 0.24, 1] }}
                >
                  <span className="tl-item__dot">{String(position + 1).padStart(2, '0')}</span>
                  <div className="glass-dark tl-item__card rounded-[1.5rem] p-7">
                    <span className="t-xs font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">
                      {item.period}
                    </span>
                    <h3 className="mt-3 font-display t-h3 leading-snug text-white">{item.title}</h3>
                    <p className="mt-4 t-md leading-7 text-white/60">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section id="equipe" className="shell-x aurora surface-tint relative scroll-mt-28 section-y">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow={t.about.team.eyebrow}
            align="center"
            title={t.about.team.title}
            accent={t.about.team.accent}
            lede={t.about.team.lede}
          />

          <div className="mx-auto mt-16 grid max-w-[1040px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((member, position) => (
              <motion.article
                key={member.name}
                className="member-card glass group relative overflow-hidden rounded-[1.9rem]"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (position % 3) * 0.08 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 30,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className="relative aspect-square overflow-hidden bg-[hsl(var(--muted))]">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} loading="lazy" className="h-full w-full object-cover object-[center_20%]" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
                      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-[hsl(var(--accent))]/45 font-display text-[2rem] text-[hsl(var(--accent))]">
                        {member.initials}
                      </span>
                      <span className="h-px w-16 bg-white/20" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute right-4 top-4 flex translate-y-2 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href={`mailto:${member.mail}`}
                      aria-label={member.name}
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-white text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--accent))]"
                    >
                      <Icon name="mail" className="text-[13px]" />
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-white text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--accent))]"
                    >
                      <Icon name="linkedin" className="text-[13px]" />
                    </a>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-display t-h3 leading-tight text-[hsl(var(--primary))]">{member.name}</h3>
                  <p className="mt-2.5 t-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--secondary))]">
                    {t.about.team.roles[position]}
                  </p>
                  <p className="mt-4 t-sm leading-7 text-[hsl(var(--muted-foreground))]">
                    {t.about.team.bios[position]}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="shell-x aurora aurora--soft surface-light relative section-y">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow={t.about.values.eyebrow} title={t.about.values.title} accent={t.about.values.accent} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.cards.map((card, position) => (
              <article
                key={card.title}
                className="reveal glass flex h-full flex-col rounded-[1.6rem] p-7"
                style={{ transitionDelay: `${position * 80}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
                  <Icon name={card.icon} className="text-[15px]" />
                </span>
                <h3 className="mt-7 font-display t-h3 text-[hsl(var(--primary))]">{card.title}</h3>
                <p className="mt-3.5 t-sm leading-7 text-[hsl(var(--muted-foreground))]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
