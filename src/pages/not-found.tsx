import { ArrowButton, Eyebrow } from '@/components/brand-shared';
import { useLang } from '@/i18n/language-context';

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="shell-x aurora aurora--soft surface-light relative flex min-h-[70vh] items-center overflow-hidden section-pb header-offset">
      <div className="mx-auto w-full max-w-[1240px]">
        <Eyebrow>{t.notFound.eyebrow}</Eyebrow>
        <h1 className="title-xl mt-7 max-w-[720px] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] text-[hsl(var(--primary))]">
          {t.notFound.title}
        </h1>
        <p className="mt-6 max-w-[520px] t-lg leading-8 text-[hsl(var(--muted-foreground))]">{t.notFound.lede}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ArrowButton href="/" testId="button-404-home">
            {t.notFound.home}
          </ArrowButton>
          <ArrowButton href="/solution" variant="outline" testId="button-404-platform">
            {t.notFound.platform}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
