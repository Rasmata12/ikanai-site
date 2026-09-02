import type { Lang } from '@/i18n/fr';

export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Severity = 'low' | 'medium' | 'high';
export type ThemeKey =
  | 'accueil'
  | 'attente'
  | 'equipements'
  | 'tarifs'
  | 'proprete'
  | 'disponibilite'
  | 'competence'
  | 'general';

export type AnalysisResult = {
  sentiment: Sentiment;
  /** Score de tonalité, entre -1 (très négatif) et +1 (très positif). */
  score: number;
  theme: ThemeKey;
  severity: Severity;
  /** Vrai quand la note chiffrée contredit le contenu du commentaire. */
  discordance: boolean;
};

/* ------------------------------------------------------------------ */
/*  Lexiques pondérés (français et anglais)                            */
/* ------------------------------------------------------------------ */

const POSITIVE_TERMS: Record<string, number> = {
  // français
  excellent: 2, parfait: 2, impeccable: 2, formidable: 2, ravi: 2, 'très satisfait': 2,
  satisfait: 1.5, bon: 1, bonne: 1, super: 1.5, agréable: 1.5, aimable: 1.5, souriant: 1.5,
  souriante: 1.5, chaleureux: 1.5, professionnel: 1.5, efficace: 1.5, rapide: 1.2, propre: 1.2,
  merci: 1, bravo: 1.5, recommande: 1.5, courtois: 1.5, patient: 1.2, clair: 1, accueillant: 1.5,
  // anglais
  perfect: 2, great: 1.5, wonderful: 2, pleased: 1.5, satisfied: 1.5,
  good: 1, friendly: 1.5, helpful: 1.5, efficient: 1.5, quick: 1.2, clean: 1.2, thanks: 1,
  thank: 1, recommend: 1.5, polite: 1.5, welcoming: 1.5,
};

const NEGATIVE_TERMS: Record<string, number> = {
  // français
  inacceptable: 2.5, inadmissible: 2.5, scandaleux: 2.5, honteux: 2.5, catastrophique: 2.5,
  horrible: 2.5, nul: 2, pire: 2, mauvais: 1.8, mauvaise: 1.8, déçu: 1.8, déçue: 1.8,
  décevant: 1.8, lent: 1.5, lente: 1.5, retard: 1.5, attente: 1.2, panne: 2, cassé: 1.8,
  impoli: 2, désagréable: 1.8, incompétent: 2, erreur: 1.5, problème: 1.5, sale: 1.8,
  cher: 1.2, 'trop cher': 1.8, fermé: 1.2, indisponible: 1.5, rupture: 1.5, plainte: 2,
  interminable: 1.8, insupportable: 2.2,
  // anglais
  unacceptable: 2.5, disgraceful: 2.5, awful: 2.5, terrible: 2.5, worst: 2, bad: 1.8,
  disappointed: 1.8, disappointing: 1.8, slow: 1.5, delay: 1.5, broken: 1.8, rude: 2,
  unhelpful: 1.8, incompetent: 2, mistake: 1.5, error: 1.5, dirty: 1.8, expensive: 1.2,
  closed: 1.2, unavailable: 1.5, complaint: 2, endless: 1.8,
};

/** Mots qui inversent le sens du terme qui suit ("pas satisfait", "never helpful"). */
const NEGATIONS = ['pas', 'ne', "n'", 'jamais', 'aucun', 'aucune', 'sans', 'plus', 'rien',
  'not', 'no', 'never', 'without', 'nothing'];

/** Mots qui renforcent le terme suivant ("très lent", "vraiment excellent"). */
const INTENSIFIERS: Record<string, number> = {
  très: 1.5, vraiment: 1.5, extrêmement: 1.8, trop: 1.4, totalement: 1.5, complètement: 1.5,
  particulièrement: 1.4, franchement: 1.4,
  very: 1.5, really: 1.5, extremely: 1.8, totally: 1.5, completely: 1.5, absolutely: 1.6,
};

const THEME_TERMS: Record<Exclude<ThemeKey, 'general'>, string[]> = {
  accueil: ['accueil', 'accueilli', 'conseiller', 'conseillère', 'personnel', 'agent', 'hôtesse',
    'réception', 'souriant', 'souriante', 'aimable', 'impoli', 'courtois', 'chaleureux',
    'welcome', 'welcomed', 'staff', 'adviser', 'advisor', 'reception', 'friendly', 'rude', 'polite'],
  attente: ['attente', 'attendu', 'attendre', 'file', 'queue', 'lent', 'lente', 'retard',
    'délai', 'delai', 'minutes', 'heures', 'heure', 'rapidité', 'longtemps', 'interminable',
    'wait', 'waited', 'waiting', 'slow', 'delay', 'minutes', 'hours', 'long', 'endless'],
  equipements: ['terminal', 'tpe', 'distributeur', 'guichet automatique', 'gab', 'application',
    'appli', 'panne', 'machine', 'climatisation', 'clim', 'ascenseur', 'écran', 'imprimante',
    'système', 'atm', 'app', 'broken', 'down', 'printer', 'screen', 'system', 'kiosk'],
  tarifs: ['tarif', 'tarifs', 'prix', 'frais', 'commission', 'cher', 'coût', 'cout', 'facture',
    'agios', 'price', 'fee', 'fees', 'cost', 'expensive', 'charges', 'billing'],
  proprete: ['propreté', 'proprete', 'sale', 'propre', 'hygiène', 'hygiene', 'toilettes',
    'poussière', 'clean', 'dirty', 'hygienic', 'toilet', 'restroom'],
  disponibilite: ['disponible', 'indisponible', 'stock', 'rupture', 'fermé', 'ferme', 'ouvert',
    'horaires', 'horaire', 'available', 'unavailable', 'closed', 'open', 'hours', 'stock'],
  competence: ['information', 'informations', 'explication', 'expliqué', 'dossier', 'erreur',
    'compétent', 'competent', 'incompétent', 'professionnel', 'conseil', 'renseignement',
    'explanation', 'explained', 'mistake', 'error', 'knowledge', 'advice'],
};

/** Termes qui déclenchent une criticité élevée quel que soit le thème. */
const CRITICAL_TERMS = ['inacceptable', 'inadmissible', 'scandaleux', 'honteux', 'catastrophique',
  'plainte', 'fraude', 'vol', 'volé', 'jamais plus', 'plus jamais', 'litige', 'avocat',
  'unacceptable', 'disgraceful', 'complaint', 'fraud', 'stolen', 'never again', 'lawyer', 'legal'];

/* ------------------------------------------------------------------ */
/*  Analyse                                                            */
/* ------------------------------------------------------------------ */

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFC')
    .replace(/['']/g, "'")
    .split(/[^a-zà-öø-ÿ']+/i)
    .filter(Boolean);
}

/** Renvoie le mot et ses formes courantes (pluriel, féminin) pour retrouver
 *  "sales" à partir de "sale", ou "lentes" à partir de "lent". */
function wordVariants(token: string): string[] {
  const variants = [token];
  if (token.endsWith('es')) variants.push(token.slice(0, -2), token.slice(0, -1));
  else if (token.endsWith('s')) variants.push(token.slice(0, -1));
  if (token.endsWith('e')) variants.push(token.slice(0, -1));
  return variants;
}

/** Calcule un score de tonalité en tenant compte des négations et des intensificateurs. */
function scoreSentiment(text: string): number {
  const lower = text.toLowerCase();
  const tokens = tokenize(text);
  let total = 0;
  let matches = 0;

  // Expressions de plusieurs mots, testées sur le texte entier.
  for (const [term, weight] of Object.entries(POSITIVE_TERMS)) {
    if (term.includes(' ') && lower.includes(term)) {
      total += weight;
      matches += 1;
    }
  }
  for (const [term, weight] of Object.entries(NEGATIVE_TERMS)) {
    if (term.includes(' ') && lower.includes(term)) {
      total -= weight;
      matches += 1;
    }
  }

  tokens.forEach((token, index) => {
    const variants = wordVariants(token);
    const positive = variants.map((v) => POSITIVE_TERMS[v]).find(Boolean);
    const negative = variants.map((v) => NEGATIVE_TERMS[v]).find(Boolean);
    if (!positive && !negative) return;

    let weight = positive ?? -(negative as number);

    // Un intensificateur juste avant renforce le terme.
    const previous = tokens[index - 1];
    if (previous && INTENSIFIERS[previous]) {
      weight *= INTENSIFIERS[previous];
    }

    // Une négation dans les trois mots précédents inverse le sens.
    const window = tokens.slice(Math.max(0, index - 3), index);
    if (window.some((word) => NEGATIONS.includes(word))) {
      weight = -weight * 0.9;
    }

    total += weight;
    matches += 1;
  });

  if (matches === 0) return 0;
  // Normalisation douce : on borne entre -1 et 1 sans écraser les avis très marqués.
  return Math.max(-1, Math.min(1, total / (matches * 3)));
}

function detectTheme(text: string): ThemeKey {
  const lower = text.toLowerCase();
  let best: ThemeKey = 'general';
  let bestCount = 0;

  (Object.keys(THEME_TERMS) as Exclude<ThemeKey, 'general'>[]).forEach((theme) => {
    const count = THEME_TERMS[theme].reduce((acc, term) => (lower.includes(term) ? acc + 1 : acc), 0);
    if (count > bestCount) {
      bestCount = count;
      best = theme;
    }
  });

  return best;
}

/**
 * Analyse un commentaire client.
 * @param rating note de 1 à 5 laissée par le client, utilisée pour repérer les discordances.
 */
export function analyseFeedback(text: string, rating: number): AnalysisResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { sentiment: 'neutral', score: 0, theme: 'general', severity: 'low', discordance: false };
  }

  const score = scoreSentiment(trimmed);
  const sentiment: Sentiment = score > 0.15 ? 'positive' : score < -0.15 ? 'negative' : 'neutral';
  const theme = detectTheme(trimmed);

  const lower = trimmed.toLowerCase();
  const hasCriticalTerm = CRITICAL_TERMS.some((term) => lower.includes(term));

  // Nombre de signaux négatifs distincts : un seul mot dur ne suffit pas
  // à déclencher une criticité élevée, il en faut plusieurs ou un mot d'alerte.
  const negativeHits = tokenize(trimmed).reduce((acc, token) => {
    const found = wordVariants(token).some((variant) => NEGATIVE_TERMS[variant]);
    return found ? acc + 1 : acc;
  }, 0);

  // La criticité combine l'intensité négative, les mots d'alerte et la note.
  let severity: Severity = 'low';
  if (sentiment === 'negative') {
    const stronglyNegative = score <= -0.6 && negativeHits >= 2;
    if (hasCriticalTerm || stronglyNegative || (rating <= 1 && negativeHits >= 2)) severity = 'high';
    else severity = 'medium';
  } else if (hasCriticalTerm) {
    severity = 'high';
  } else if (sentiment === 'neutral' && rating <= 2) {
    severity = 'medium';
  }

  // Discordance : la note et le texte racontent deux histoires différentes.
  const discordance =
    (rating >= 4 && sentiment === 'negative') || (rating <= 2 && sentiment === 'positive');

  return { sentiment, score, theme, severity, discordance };
}

/* ------------------------------------------------------------------ */
/*  Libellés affichés                                                  */
/* ------------------------------------------------------------------ */

export const SENTIMENT_LABELS: Record<Lang, Record<Sentiment, string>> = {
  fr: { positive: 'Positif', neutral: 'Neutre', negative: 'Négatif' },
  en: { positive: 'Positive', neutral: 'Neutral', negative: 'Negative' },
};

export const SEVERITY_LABELS: Record<Lang, Record<Severity, string>> = {
  fr: { low: 'Faible', medium: 'Moyenne', high: 'Élevée' },
  en: { low: 'Low', medium: 'Medium', high: 'High' },
};

export const THEME_LABELS: Record<Lang, Record<ThemeKey, string>> = {
  fr: {
    accueil: 'Accueil et relation',
    attente: "Délai et temps d'attente",
    equipements: 'Équipements et technique',
    tarifs: 'Tarifs et frais',
    proprete: 'Propreté et confort',
    disponibilite: 'Disponibilité et horaires',
    competence: 'Compétence et information',
    general: 'Général',
  },
  en: {
    accueil: 'Welcome and relations',
    attente: 'Delay and waiting time',
    equipements: 'Equipment and technical',
    tarifs: 'Pricing and fees',
    proprete: 'Cleanliness and comfort',
    disponibilite: 'Availability and hours',
    competence: 'Competence and information',
    general: 'General',
  },
};

const ACTIONS: Record<Lang, Record<ThemeKey, string>> = {
  fr: {
    accueil:
      "Insatisfaction relationnelle détectée. Transmettre au responsable d'agence pour un point avec l'équipe d'accueil.",
    attente:
      "Tension sur les délais identifiée. Ajuster le planning des conseillers sur ce créneau et suivre l'évolution sur sept jours.",
    equipements:
      "Incident matériel signalé sur le point de vente. Ouvrir un ticket de maintenance prioritaire et informer le responsable d'agence.",
    tarifs:
      "Incompréhension tarifaire exprimée. Vérifier la lisibilité de l'affichage des frais et rappeler le client si nécessaire.",
    proprete:
      "Signalement sur l'état des locaux. Planifier une vérification et renforcer la fréquence d'entretien.",
    disponibilite:
      "Problème de disponibilité relevé. Vérifier les horaires affichés et l'approvisionnement du point de vente.",
    competence:
      "Besoin d'information non couvert. Renforcer le script de réponse et former l'équipe sur ce sujet précis.",
    general:
      "Retour à qualifier. Intégrer le commentaire à l'analyse hebdomadaire et surveiller la répétition du sujet.",
  },
  en: {
    accueil:
      'Relational dissatisfaction detected. Pass to the branch manager for a review with the front-desk team.',
    attente:
      'Pressure on waiting times identified. Adjust adviser scheduling for this slot and track the change over seven days.',
    equipements:
      'Hardware incident reported at the outlet. Open a priority maintenance ticket and inform the branch manager.',
    tarifs:
      'Pricing confusion expressed. Check how clearly fees are displayed and call the customer back if needed.',
    proprete:
      'Report on the state of the premises. Schedule an inspection and increase the cleaning frequency.',
    disponibilite:
      'Availability issue raised. Check the displayed opening hours and the outlet supply.',
    competence:
      'Information need not covered. Reinforce the response script and train the team on this specific topic.',
    general:
      'Feedback to qualify. Add the comment to the weekly analysis and watch whether the subject recurs.',
  },
};

const POSITIVE_ACTION: Record<Lang, string> = {
  fr: "Aucune action corrective requise. Relayer ce retour à l'équipe concernée et le valoriser dans le suivi mensuel.",
  en: 'No corrective action required. Share this feedback with the team involved and highlight it in the monthly review.',
};

const DISCORDANCE_ACTION: Record<Lang, string> = {
  fr: "Écart entre la note et le commentaire : le texte contredit la note laissée. À vérifier en priorité avant toute conclusion statistique.",
  en: 'Gap between the score and the comment: the text contradicts the rating given. Review this first before drawing any conclusion.',
};

export function actionFor(result: AnalysisResult, lang: Lang): string {
  if (result.discordance) return DISCORDANCE_ACTION[lang];
  if (result.sentiment === 'positive') return POSITIVE_ACTION[lang];
  return ACTIONS[lang][result.theme];
}
