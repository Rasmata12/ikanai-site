import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ScrollProgress } from '@/components/brand-shared';
import { ErrorBoundary } from '@/components/error-boundary';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { LanguageProvider } from '@/i18n/language-context';
import HomePage from '@/pages/home-page';
import NotFound from '@/pages/not-found';

const PlatformPage = lazy(() => import('@/pages/platform-page'));
const MethodPage = lazy(() => import('@/pages/method-page'));
const TechnologyPage = lazy(() => import('@/pages/technology-page'));
const CockpitPage = lazy(() => import('@/pages/cockpit-page'));
const GovernancePage = lazy(() => import('@/pages/governance-page'));
const AboutPage = lazy(() => import('@/pages/about-page'));
const ContactPage = lazy(() => import('@/pages/contact-page'));

function PageLoader() {
  return (
    <div className="surface-light flex min-h-[70vh] items-center justify-center">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[hsl(var(--foreground)/.12)] border-t-[hsl(var(--accent))]" />
    </div>
  );
}

function LegacyOffersRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate('/contact', { replace: true });
    window.setTimeout(() => document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' }), 260);
  }, [navigate]);
  return <PageLoader />;
}

/** Les anciennes adresses /plateforme et /plateforme/... redirigent vers /solution... */
function LegacyPlatformRedirect() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    const rest = location.replace(/^\/plateforme/, '');
    navigate(`/solution${rest}`, { replace: true });
  }, [location, navigate]);
  return <PageLoader />;
}

function ScrollManager() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 140);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);
  return null;
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return (
    <div className="page-grain flex min-h-[100dvh] flex-col bg-[hsl(var(--background))]">
      <ScrollProgress />
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location}
          className="flex-1"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <ScrollManager />
      <Shell>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/solution" component={PlatformPage} />
            <Route path="/solution/methode" component={MethodPage} />
            <Route path="/solution/technologie" component={TechnologyPage} />
            <Route path="/solution/cockpit" component={CockpitPage} />
            <Route path="/solution/gouvernance" component={GovernancePage} />
            <Route path="/a-propos" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/nos-offres" component={LegacyOffersRedirect} />
            <Route path="/plateforme" component={LegacyPlatformRedirect} />
            <Route path="/plateforme/:rest*" component={LegacyPlatformRedirect} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Shell>
    </RoutedErrorBoundary>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </LanguageProvider>
  );
}
