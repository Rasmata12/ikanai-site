import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fr, type Dict, type Lang } from '@/i18n/fr';
import { en } from '@/i18n/en';

const DICTS: Record<Lang, Dict> = { fr, en };
const STORAGE_KEY = 'ikanai-lang';

type LanguageValue = { lang: Lang; t: Dict; setLang: (next: Lang) => void; toggle: () => void };

const LanguageContext = createContext<LanguageValue>({ lang: 'fr', t: fr, setLang: () => {}, toggle: () => {} });

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    /* stockage indisponible */
  }
  return 'fr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* stockage indisponible : la langue reste valable pour la session */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((current) => (current === 'fr' ? 'en' : 'fr')), []);

  const value = useMemo<LanguageValue>(() => ({ lang, t: DICTS[lang], setLang, toggle }), [lang, setLang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
