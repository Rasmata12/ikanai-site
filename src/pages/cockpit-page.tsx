import { CtaBand, PageHero, PlatformPager, useReveals } from '@/components/brand-shared';
import { useLang } from '@/i18n/language-context';

export default function CockpitPage() {
  useReveals();
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden">
      <PageHero
        eyebrow={t.cockpit.eyebrow}
        title={t.cockpit.title}
        accent={t.cockpit.accent}
        lede={t.cockpit.lede}
        image="/assets/qr-code-feature.jpg"
        imagePosition="50% 38%"
        badge={{ value: '01', label: t.cockpit.eyebrow }}
      />

      <section className="shell-x aurora aurora--soft surface-light relative section-pb">
        <div className="mx-auto max-w-[1240px]">
          {/* POINTS CLÉS */}
          <div className="grid gap-6 sm:grid-cols-2">
            {t.cockpit.points.map((point, position) => (
              <div
                key={point.title}
                className="reveal glass rounded-[1.6rem] p-8"
                style={{ transitionDelay: `${position * 80}ms` }}
              >
                <span className="pill-index">{String(position + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-display t-h3 text-[hsl(var(--primary))]">{point.title}</h3>
                <p className="mt-3.5 t-md leading-7 text-[hsl(var(--muted-foreground))]">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PlatformPager current="/solution/cockpit" />
      <CtaBand />
    </div>
  );
}
