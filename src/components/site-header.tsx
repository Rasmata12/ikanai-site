import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowButton, BrandLogo } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { useLang } from '@/i18n/language-context';

export function SiteHeader() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: '/', label: t.nav.home, active: location === '/' },
    { href: '/solution', label: t.nav.platform, active: location.startsWith('/solution') },
    { href: '/a-propos', label: t.nav.about, active: location === '/a-propos' },
    { href: '/contact', label: t.nav.contact, active: location === '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="site-header site-header--solid fixed inset-x-0 top-0 z-50">
      <div
        className={`shell-x mx-auto flex max-w-[1500px] items-center justify-between gap-6 transition-all duration-300 ${ scrolled ? 'py-3' : 'py-5' }`}
      >
        <Link href="/" data-testid="link-logo" className="focus-ring rounded-xl">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label={t.nav.platform}>
          {links.map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              data-testid={`link-nav-${href.replace(/\//g, '')}`}
              aria-current={active ? 'page' : undefined}
              className={`nav-link t-md font-semibold transition-colors duration-300 ${ active ? 'is-active text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground)/.72)] hover:text-[hsl(var(--primary))]' }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch lang={lang} onChange={setLang} />
          <ArrowButton href="/contact" variant="primary" testId="button-header-cta" compact>
            {t.nav.cta}
          </ArrowButton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitch lang={lang} onChange={setLang} />
          <button
            type="button"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            data-testid="button-menu"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--foreground)/.14)] text-[hsl(var(--primary))] transition"
          >
            <Icon name={open ? 'close' : 'menu'} className="text-[15px]" />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="menu-panel mx-4 mb-4 rounded-[1.75rem] border border-[hsl(var(--foreground)/.1)] bg-white p-5 shadow-soft lg:hidden"
          aria-label={t.nav.menu}
        >
          <div className="divide-y divide-[hsl(var(--foreground)/.08)]">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="block py-3.5 t-lg font-semibold text-[hsl(var(--primary))]">
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <ArrowButton href="/contact" testId="button-mobile-cta">
              {t.nav.cta}
            </ArrowButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function LanguageSwitch({ lang, onChange }: { lang: 'fr' | 'en'; onChange: (next: 'fr' | 'en') => void }) {
  return (
    <div role="group" aria-label="Language" className="lang-switch" data-testid="switch-language">
      {(['fr', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-pressed={lang === code}
          data-testid={`button-lang-${code}`}
          className={`lang-switch__item focus-ring ${lang === code ? 'is-active' : ''}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
