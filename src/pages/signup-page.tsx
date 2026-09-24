import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { PageHero } from '@/components/brand-shared';
import { Icon } from '@/components/icon';
import { createSignupCheckout, type SignupPayload } from '@/lib/api';

type PlanCode = SignupPayload['plan_code'];

const PLAN_LABELS: Record<PlanCode, string> = { free: 'Gratuit', starter: 'Starter', pro: 'Pro' };

const initialForm = {
  nom_organisation: '',
  secteur_activite: '',
  pays_region: '',
  email_organisation: '',
  prenom_contact: '',
  nom_contact: '',
  email_contact: '',
  telephone: '',
};

function Field({ label, name, type = 'text', required = true, value, onChange }: {
  label: string;
  name: keyof typeof initialForm;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block t-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--secondary))]">{label}{required ? ' *' : ''}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-xl border border-[hsl(var(--foreground)/.14)] bg-white px-4 py-3.5 t-sm text-[hsl(var(--primary))] outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.65)] focus:border-[hsl(var(--accent))]"
      />
    </label>
  );
}

export default function SignupPage() {
  const plan = new URLSearchParams(window.location.search).get('plan') as PlanCode | null;
  const selectedPlan: PlanCode = plan === 'free' || plan === 'pro' ? plan : 'starter';
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (name: keyof typeof initialForm) => (value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const payload: SignupPayload = {
      ...form,
      prenom_contact: 'Administrateur',
      nom_contact: form.nom_organisation,
      email_contact: form.email_organisation,
      plan_code: selectedPlan,
      success_url: `${window.location.origin}/inscription/succes`,
      cancel_url: `${window.location.origin}/inscription/annule`,
    };
    const result = await createSignupCheckout(payload);
    if (result.ok) {
      const nextUrl = result.data.checkout_url ?? result.data.dashboard_url;
      if (nextUrl) window.location.href = nextUrl;
      return;
    }
    setError(result.error);
    setSubmitting(false);
  }

  return (
    <div className="surface-light min-h-[75vh]">
      <PageHero
        eyebrow="Inscription"
        title="Commencez avec"
        accent={`la formule ${PLAN_LABELS[selectedPlan]}.`}
        lede={selectedPlan === 'free'
          ? "Créez votre accès gratuitement avec les informations de votre organisation."
          : "Quelques informations suffisent pour créer votre espace, puis accéder au paiement sécurisé Stripe."}
      />
      <section className="shell-x section-pb">
        <div className="mx-auto max-w-[820px]">
          <div className="glass rounded-[1.8rem] p-6 sm:p-10">
            <div className="mb-8 flex items-center gap-4 rounded-2xl bg-[hsl(var(--muted))] p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"><Icon name="check" /></span>
              <div>
                <p className="t-xs font-bold uppercase tracking-[.14em] text-[hsl(var(--secondary))]">Formule choisie</p>
                <p className="mt-1 font-display text-xl text-[hsl(var(--primary))]">{PLAN_LABELS[selectedPlan]}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nom de l'organisation" name="nom_organisation" value={form.nom_organisation} onChange={update('nom_organisation')} />
                <Field label="Secteur d'activité" name="secteur_activite" value={form.secteur_activite} onChange={update('secteur_activite')} />
                <Field label="Pays / région" name="pays_region" value={form.pays_region} onChange={update('pays_region')} />
                <Field label="Email professionnel" name="email_organisation" type="email" value={form.email_organisation} onChange={update('email_organisation')} />
              </div>
              {selectedPlan !== 'free' ? (
                <p className="rounded-xl bg-[hsl(var(--muted))] px-4 py-3 t-xs leading-5 text-[hsl(var(--muted-foreground))]">
                  Après ce formulaire, vous serez redirigé vers Stripe pour renseigner votre carte bancaire ou votre autre moyen de paiement. Vos données de paiement restent saisies et sécurisées chez Stripe.
                </p>
              ) : null}
              {error ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 t-sm text-red-700">{error}</p> : null}
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/solution#offres" className="focus-ring t-sm font-semibold text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]">Retour aux formules</Link>
                <button type="submit" disabled={submitting} className="focus-ring shine inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-[hsl(75_70%_55%)] to-[hsl(var(--accent))] px-7 py-3.5 t-sm font-bold text-[hsl(var(--primary))] disabled:cursor-wait disabled:opacity-60">
                  {submitting ? 'Création en cours...' : selectedPlan === 'free' ? 'Créer mon accès' : 'Continuer vers le paiement'}
                  {!submitting ? <Icon name="arrowRight" className="text-[11px]" /> : null}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SignupSuccessPage() {
  return <SignupStatus title="Merci !" body="Vérifiez votre boîte mail, vos identifiants de connexion vous ont été envoyés." linkLabel="Accéder au dashboard" linkHref="https://ikanai-dashboard-fixs.onrender.com" />;
}

export function SignupCancelledPage() {
  return <SignupStatus title="Paiement annulé" body="Vous pouvez réessayer quand vous voulez." linkLabel="Retour aux formules" linkHref="/solution#offres" />;
}

function SignupStatus({ title, body, linkLabel, linkHref }: { title: string; body: string; linkLabel: string; linkHref: string }) {
  return (
    <div className="surface-light flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="glass w-full max-w-[620px] rounded-[1.8rem] p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"><Icon name="check" /></span>
        <h1 className="mt-7 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight text-[hsl(var(--primary))]">{title}</h1>
        <p className="mx-auto mt-5 max-w-[460px] text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">{body}</p>
        <a href={linkHref} className="focus-ring mt-8 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-7 py-3.5 t-sm font-semibold text-white">{linkLabel}<Icon name="arrowRight" className="text-[11px]" /></a>
      </div>
    </div>
  );
}