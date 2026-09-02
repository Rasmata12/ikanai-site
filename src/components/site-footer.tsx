import { Link } from 'wouter';
import { BrandLogo } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { useLang } from '@/i18n/language-context';

export function SiteFooter() {
  const { t } = useLang();

  const company = [
    { href: '/a-propos', label: t.nav.about },
    { href: '/a-propos#histoire', label: t.footer.story },
    { href: '/a-propos#equipe', label: t.footer.team },
    { href: '/contact#offres', label: t.footer.plans },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="shell-x surface-deep relative overflow-hidden pb-[clamp(2rem,4vw,3rem)] pt-[clamp(3.25rem,6vw,5.5rem)] text-white">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/12 pb-12 sm:gap-x-10 lg:grid-cols-[1.4fr_.8fr_.8fr_1.1fr]">
          <div className="col-span-2 lg:col-span-1">
            <BrandLogo light />
            <div className="mt-6 max-w-[460px]">
              <NewsletterSignup />
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="t-xs font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">
              {t.footer.platform}
            </h3>
            <div className="mt-5 flex flex-col gap-3 t-md text-white/65">
              {t.routes.map((route) => (
                <Link key={route.href} href={route.href} className="w-fit transition hover:text-[hsl(var(--accent))]">
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="t-xs font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">
              {t.footer.company}
            </h3>
            <div className="mt-5 flex flex-col gap-3 t-md text-white/65">
              {company.map(({ href, label }) => (
                <Link key={label} href={href} className="w-fit transition hover:text-[hsl(var(--accent))]">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className="t-xs font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">
              {t.footer.reach}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-3.5 t-md text-white/65 sm:grid-cols-2 lg:flex lg:flex-col lg:gap-4">
              <a href="mailto:contact@ikanai.app" className="flex items-center gap-2.5 transition hover:text-[hsl(var(--accent))]">
                <Icon name="mail" className="shrink-0 text-[13px] text-[hsl(var(--accent))]" />
                <span>contact@ikanai.app</span>
              </a>
              <a href="tel:+22670000000" className="flex items-center gap-2.5 transition hover:text-[hsl(var(--accent))]">
                <Icon name="phone" className="shrink-0 text-[13px] text-[hsl(var(--accent))]" />
                <span>+226 70 00 00 00</span>
              </a>
              <p className="flex items-start gap-2.5 sm:col-span-2 lg:col-span-1">
                <Icon name="pin" className="mt-0.5 shrink-0 text-[13px] text-[hsl(var(--accent))]" />
                <span>{t.contact.office}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-8 t-xs text-white/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} IKAN AI · NovaX. {t.footer.rights}</span>
          <span>{t.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}
