# Site IKAN AI

Site vitrine bilingue (français / anglais) d'IKAN AI, plateforme d'intelligence client de l'équipe NovaX.

Le projet a deux parties :

- **le site** (ce dossier) : React + Vite + TypeScript ;
- **`/backend`** : une petite API Node qui fait fonctionner le formulaire de
  contact et l'inscription à la newsletter — voir `backend/README.md`.

## Démarrer le site

```bash
npm install
npm run dev        # développement sur http://localhost:5173
npm run build      # génère le dossier dist/
npm run typecheck  # vérification TypeScript
```

## Démarrer le backend

Le formulaire de contact et la newsletter ont besoin de l'API pour fonctionner
réellement (sans elle, le site s'affiche normalement mais ces deux formulaires
afficheront une erreur de connexion). Dans un second terminal :

```bash
cd backend
npm install
cp .env.example .env
npm run dev         # démarre l'API sur http://localhost:4000
```

Détails complets — routes, envoi d'e-mail, déploiement — dans `backend/README.md`.

## Pages

| Route                        | Fichier                          | Contenu                                        |
| ---------------------------- | -------------------------------- | ---------------------------------------------- |
| `/`                          | `src/pages/home-page.tsx`        | Carrousel, chiffres clés, constat, 4 briques   |
| `/plateforme`                | `src/pages/platform-page.tsx`    | Sommaire des quatre briques                    |
| `/plateforme/methode`        | `src/pages/method-page.tsx`      | La méthode en quatre temps                     |
| `/plateforme/technologie`    | `src/pages/technology-page.tsx`  | Le traitement du langage et l'analyse en direct|
| `/plateforme/cockpit`        | `src/pages/cockpit-page.tsx`     | Le tableau de bord                             |
| `/plateforme/gouvernance`    | `src/pages/governance-page.tsx`  | Accès, confidentialité, traçabilité            |
| `/a-propos`                  | `src/pages/about-page.tsx`       | Vision, histoire, équipe, valeurs              |
| `/contact`                   | `src/pages/contact-page.tsx`     | Nos offres, formulaire, questions fréquentes   |

L'ancienne adresse `/nos-offres` redirige vers `/contact#offres`.

## Traductions

Tout le texte du site vient de deux dictionnaires :

- `src/i18n/fr.ts` (référence, définit aussi le type `Dict`)
- `src/i18n/en.ts` (doit respecter exactement la même structure)

Pour modifier un texte, cherchez-le dans `fr.ts` puis reportez la modification dans
`en.ts`. TypeScript signale toute clé manquante à la compilation.

Le sélecteur FR / EN se trouve dans l'en-tête. Le choix est mémorisé dans le
navigateur ; la langue par défaut est le français.

## Icônes

Toutes les icônes viennent de Font Awesome (version gratuite). Le registre est dans
`src/components/icon.tsx` : ajoutez l'import puis une entrée dans `ICONS`, et
utilisez `<Icon name="maCle" />`.

## Personnaliser

- **Carrousel d'accueil** : images dans `public/assets/scene-*.jpg`, textes dans `fr.ts` / `en.ts` (`hero.slides`).
- **Photos de l'équipe** : `public/assets/equipe/`, tableau `MEMBERS` en haut de `about-page.tsx`.
- **Tarifs** : montants dans `PRICES` (`src/components/offers-section.tsx`), libellés dans les dictionnaires.
- **Couleurs et effets** : variables et classes utilitaires dans `src/index.css`
  (`surface-light`, `surface-tint`, `surface-deep`, `glass`, `aurora`, `shine`).

## Mise en ligne

Application à page unique : le serveur doit renvoyer `index.html` pour toute route
inconnue, sinon un accès direct à `/plateforme/methode` renvoie une erreur 404.

- **Render (Static Site)** : Build `npm run build`, Publish `dist`, puis une règle
  de réécriture `/*` vers `/index.html` (type Rewrite).
- **Netlify / Cloudflare Pages** : `public/_redirects` est déjà présent.
