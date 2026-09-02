# API du site IKAN AI

Petite API qui fait fonctionner trois éléments du site vitrine :

- le **formulaire de contact**, qui enregistre chaque message et l'envoie par
  e-mail à `ikanai.marketing@gmail.com` ;
- l'**inscription à la newsletter**, dans le pied de page de chaque page ;
- une **page d'administration** (`/admin`) pour composer et envoyer une
  diffusion groupée à tous les abonnés, avec désinscription en un clic.

## Démarrer en local

```bash
cd backend
npm install
cp .env.example .env      # puis ajustez les valeurs si besoin
npm run dev                # démarre l'API sur http://localhost:4000
```

Sans rien configurer, l'API fonctionne déjà : les messages sont enregistrés
dans un fichier SQLite local (`data/ikanai-site.db`), seuls l'envoi d'e-mail
et l'administration newsletter sont désactivés (visible dans les logs au
démarrage).

---

## 1. Activer l'envoi d'e-mail avec `ikanai.marketing@gmail.com`

Gmail refuse le mot de passe habituel du compte pour se connecter depuis une
application externe : il faut un **mot de passe d'application**, généré une
seule fois.

1. Sur le compte `ikanai.marketing@gmail.com`, activez la validation en deux
   étapes si ce n'est pas déjà fait : **myaccount.google.com/security**.
2. Puis allez sur **myaccount.google.com/apppasswords**, choisissez un nom
   (« IKAN AI site » par exemple) et cliquez sur *Créer*.
3. Google affiche un code à 16 caractères (du type `abcd efgh ijkl mnop`).
   Copiez-le **sans les espaces**.
4. Dans `backend/.env`, complétez :

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=ikanai.marketing@gmail.com
   SMTP_PASSWORD=abcdefghijklmnop
   MAIL_FROM="IKAN AI <ikanai.marketing@gmail.com>"
   MAIL_TO=ikanai.marketing@gmail.com
   ```

5. Relancez l'API (`npm run dev`). Le log au démarrage doit afficher
   *Envoi d'e-mail : activé*.

**Comportement en cas de souci réseau ou de mauvais mot de passe :** l'envoi
échoue proprement après 10 secondes (jamais de blocage prolongé), et le
message reste enregistré en base dans tous les cas — testé volontairement
avec un mauvais mot de passe pendant le développement pour vérifier ce point.

### Comment voir les messages de contact reçus

Chaque message du formulaire arrive directement dans la boîte
`ikanai.marketing@gmail.com`, avec le *Répondre à* déjà réglé sur l'adresse
de la personne qui a écrit. La base de données garde aussi une copie de
secours de tous les messages (voir la section suivante pour la consulter).

---

## 2. Envoyer une diffusion à tous les abonnés de la newsletter

### Activer la page d'administration

Dans `backend/.env`, définissez un jeton secret :

```
ADMIN_TOKEN=une-longue-chaine-aleatoire-a-vous
```

Une commande simple pour en générer une, dans un terminal :

```bash
openssl rand -hex 24
```

Copiez le résultat dans `ADMIN_TOKEN`, relancez l'API. Le log doit afficher
*Administration newsletter : activée sur /admin*.

**Gardez ce jeton secret** : quiconque le connaît peut envoyer un e-mail à
toute votre liste d'abonnés. Ne le partagez pas, ne le mettez pas dans un
message public.

### Utiliser la page

1. Ouvrez `http://localhost:4000/admin` (ou l'adresse de votre API une fois
   déployée, voir plus bas).
2. Collez votre jeton, cliquez sur *Se connecter*.
3. Le nombre d'abonnés actifs s'affiche (total, francophones, anglophones).
4. Composez l'objet et le message, choisissez les destinataires, cliquez sur
   *Envoyer la diffusion*. Une confirmation est demandée avant l'envoi
   effectif.
5. Un résumé s'affiche à la fin : nombre envoyé, nombre en échec.

Testé en conditions réelles : inscription, filtrage par langue, protection
par jeton (refus sans jeton et avec un mauvais jeton), désinscription (avec
page de confirmation et retrait immédiat du compte), et ré-inscription après
désinscription.

### Ce que reçoit chaque abonné

Un e-mail avec la mise en forme de la marque (logo, titre, message), et en
bas un lien **« Se désinscrire »** propre à chaque destinataire — en cliquant
dessus, la personne est retirée immédiatement, sans jamais revoir de message.
C'est indispensable pour rester crédible aux yeux des fournisseurs de
messagerie (Gmail, Outlook...) et éviter que vos e-mails finissent en spam.

### Limite à connaître avec Gmail

Un compte Gmail standard limite l'envoi à environ 500 messages par jour, et
les mots de passe d'application ne sont pas prévus pour du très gros volume.
Pour une petite liste (quelques centaines d'abonnés), ça suffit largement.
Si votre liste grandit beaucoup, remplacez Gmail par un service pensé pour
l'envoi en masse (Brevo, Mailgun, SendGrid...) — il suffit de changer les
variables `SMTP_*` dans `.env`, aucun code à modifier.

### Comment voir la liste des abonnés directement dans la base

- **En SQLite** : avec l'application gratuite [DB Browser for SQLite](https://sqlitebrowser.org/),
  ouvrez `backend/data/ikanai-site.db` — la table `newsletter_subscribers`
  s'affiche comme un tableur (une colonne `unsubscribed_at` vide signifie que
  l'abonné est toujours actif).
- **En PostgreSQL** (recommandé en production, voir ci-dessous) : le tableau
  de bord web de Supabase ou Neon montre la même chose, sans rien installer.

---

## 3. Quelle base de données pour un vrai déploiement ?

**Par défaut, l'API utilise SQLite** : un simple fichier, aucune installation
à faire, parfait pour développer et tester. Mais un vrai déploiement pose un
piège fréquent : la plupart des hébergeurs (Render, Railway...) repartent
d'un disque vide à chaque redéploiement. Un fichier SQLite non protégé serait
donc **effacé** au prochain déploiement — y compris votre liste d'abonnés.

**Recommandation : PostgreSQL hébergé, via [Supabase](https://supabase.com)**
(gratuit pour ce volume). Trois raisons :

1. **Rien n'est jamais perdu** au redéploiement — la base vit en dehors du
   serveur de l'API.
2. **Un tableau de bord web inclus** : ouvrez le projet Supabase, cliquez sur
   *Table Editor*, et les messages de contact et les abonnés apparaissent
   comme un tableur, sans rien installer.
3. **Aucun changement de code à faire** : ce backend bascule automatiquement
   sur PostgreSQL dès qu'une adresse `DATABASE_URL` est renseignée.

### Mettre en place Supabase (10 minutes)

1. Créez un compte sur [supabase.com](https://supabase.com) et un nouveau
   projet (gratuit).
2. Dans *Project Settings → Database → Connection string*, copiez l'URL au
   format `URI` (commence par `postgresql://`).
3. Collez-la dans `backend/.env` :

   ```
   DATABASE_URL=postgresql://postgres:VOTRE_MOT_DE_PASSE@VOTRE_PROJET.supabase.co:5432/postgres
   ```

4. Relancez l'API. Le log affiche *Base de données : postgresql*, et les
   deux tables sont créées automatiquement au premier démarrage.

Alternatives équivalentes si vous préférez : [Neon](https://neon.tech)
(PostgreSQL gratuit, aussi avec tableau de bord) ou une base PostgreSQL
ajoutée directement sur Render.

Ce choix a été testé en conditions réelles (SQLite et PostgreSQL, avec une
vraie base PostgreSQL locale) pendant le développement : les deux modes
fonctionnent de façon identique côté site, seule la variable d'environnement
change.

---

## 4. Héberger le site (guide complet)

Le projet a deux parties à déployer séparément :

- **le site** (React, fichiers statiques) → un hébergeur de sites statiques ;
- **cette API** (Node/Express, doit rester allumée) → un hébergeur de
  services Node.

### A. Le backend (cette API), sur Render

[Render](https://render.com) propose un plan gratuit adapté à ce projet.

1. Poussez ce projet sur un dépôt GitHub (ou GitLab).
2. Sur Render, *New → Web Service*, connectez le dépôt, et réglez :
   - **Root directory** : `backend`
   - **Build command** : `npm install && npm run build`
   - **Start command** : `npm start`
3. Dans l'onglet *Environment*, ajoutez toutes les variables de
   `.env.example` avec leurs vraies valeurs de production, en particulier :

   | Variable | Valeur en production |
   | --- | --- |
   | `DATABASE_URL` | l'adresse Supabase/Neon (voir section 3) |
   | `SMTP_USER`, `SMTP_PASSWORD` | vos identifiants Gmail (voir section 1) |
   | `ADMIN_TOKEN` | votre jeton secret (voir section 2) |
   | `FRONTEND_ORIGIN` | l'adresse réelle du site, ex. `https://ikanai.netlify.app` |
   | `PUBLIC_API_URL` | l'adresse que Render donne à cette API, ex. `https://ikanai-api.onrender.com` |

   `FRONTEND_ORIGIN` accepte plusieurs adresses séparées par une virgule : si
   vous gardez aussi une adresse de test, écrivez par exemple
   `https://ikanai.netlify.app,https://autre-adresse.netlify.app`.

4. Déployez. Render vous donne une URL du type
   `https://ikanai-api.onrender.com` — c'est celle à utiliser pour
   `PUBLIC_API_URL` (variable ci-dessus) et pour `VITE_API_URL` côté site
   (étape suivante).

**À savoir sur le plan gratuit de Render** : le service peut se mettre en
veille après une quinzaine de minutes sans requête, et met quelques dizaines
de secondes à se relancer à la prochaine visite. Pour un site qui démarre,
c'est un compromis raisonnable ; un plan payant supprime cette mise en veille
si ça devient gênant.

### B. Le site, sur Netlify

Vous déployez déjà sur Netlify — un seul réglage à ajouter pour que le
formulaire de contact et la newsletter fonctionnent une fois en ligne :

1. Sur Netlify, *Site settings → Environment variables*, ajoutez :

   ```
   VITE_API_URL=https://ikanai-api.onrender.com
   ```

   (l'adresse réelle donnée par Render à l'étape précédente).

2. Redéployez le site (*Trigger deploy*) — cette variable n'est lue qu'au
   moment de la construction du site, un simple redémarrage ne suffit pas.

Sans cette variable, le site cherche l'API sur `http://localhost:4000`, ce
qui ne fonctionne que sur votre propre ordinateur — exactement l'erreur
« Impossible de joindre le serveur » que vous obtiendriez sinon une fois en
ligne.

### Checklist avant de considérer le déploiement terminé

- [ ] `DATABASE_URL` renseigné (PostgreSQL, pas SQLite, en production)
- [ ] `SMTP_USER` / `SMTP_PASSWORD` renseignés, log *Envoi d'e-mail : activé*
- [ ] `ADMIN_TOKEN` renseigné et gardé secret
- [ ] `FRONTEND_ORIGIN` = l'adresse Netlify réelle
- [ ] `PUBLIC_API_URL` = l'adresse Render réelle (pour les liens de
      désinscription dans les e-mails)
- [ ] `VITE_API_URL` défini côté Netlify, site reconstruit après l'ajout
- [ ] Formulaire de contact testé sur le site en ligne (pas seulement en
      local)
- [ ] Inscription newsletter testée sur le site en ligne
- [ ] `/admin` accessible à l'adresse Render, connexion avec le jeton testée

---

## Routes

| Méthode | Route | Description |
| ------- | ----- | ----------- |
| GET | `/api/health` | Vérifie que l'API répond, indique la base active |
| POST | `/api/contact` | Enregistre (et envoie par e-mail) un message du formulaire |
| POST | `/api/newsletter` | Inscrit une adresse e-mail à la newsletter |
| GET | `/api/newsletter/unsubscribe?token=...` | Lien cliqué depuis l'e-mail, désinscrit immédiatement |
| GET | `/api/admin/newsletter/subscribers` | *(protégé)* Nombre d'abonnés actifs, par langue |
| POST | `/api/admin/newsletter/send` | *(protégé)* Envoie une diffusion à tous les abonnés actifs |
| GET | `/admin` | Page web pour composer et envoyer une diffusion |

Les routes marquées *(protégé)* exigent l'en-tête `x-admin-token` avec la
valeur d'`ADMIN_TOKEN` — la page `/admin` s'en charge automatiquement une
fois connecté.

Toutes les entrées publiques sont validées (Zod) et un plafond de requêtes
par adresse IP protège contre le spam (`RATE_LIMIT_MAX` dans `.env`, 20 par
défaut sur 15 minutes).
