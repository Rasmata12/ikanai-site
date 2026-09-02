import type { IconName } from '@/components/icon';

export type Lang = 'fr' | 'en';

type Step = { number: string; title: string; body: string; detail: string; icon: IconName };
type Card = { title: string; body: string; icon: IconName };
type Faq = { q: string; a: string };

export type Dict = {
  nav: {
    home: string;
    platform: string;
    about: string;
    contact: string;
    cta: string;
    menu: string;
    close: string;
    langLabel: string;
    onThisPage: string;
  };
  routes: { label: string; href: string; blurb: string; icon: IconName }[];
  hero: {
    slides: { tab: string; eyebrow: string; titleTop: string; titleAccent: string; text: string; marker: string }[];
    primary: string;
    secondary: string;
    scroll: string;
  };
  home: {
    facts: { value: string; label: string }[];
    pillars: { eyebrow: string; title: string; accent: string; lede: string; cards: Card[]; link: string };
    sectors: { eyebrow: string; title: string; accent: string; lede: string; list: { label: string; icon: IconName }[] };
    caption: { eyebrow: string; text: string; stat: string; statLabel: string };
  };
  platform: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    overviewNote: string;
  };
  method: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    steps: Step[];
    closing: { title: string; body: string; badge: string; caption: string };
    closingStats: { value: string; label: string }[];
  };
  tech: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    pipeline: Card[];
    stack: string[];
    demo: {
      eyebrow: string;
      title: string;
      accent: string;
      lede: string;
      inputLabel: string;
      placeholder: string;
      examplesLabel: string;
      examples: { label: string; text: string }[];
      run: string;
      running: string;
      privacy: string;
      resultLabel: string;
      tone: string;
      theme: string;
      severity: string;
      discordance: string;
      discordanceYes: string;
      discordanceNo: string;
      ratingLabel: string;
      ratingHint: string;
      action: string;
    };
  };
  cockpit: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    points: { title: string; body: string }[];
  };
  governance: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    cards: Card[];
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    vision: { eyebrow: string; title: string; accent: string; lede: string; pillars: Card[] };
    history: { eyebrow: string; title: string; accent: string; items: { period: string; title: string; body: string }[] };
    team: { eyebrow: string; title: string; accent: string; lede: string; roles: string[]; bios: string[] };
    values: { eyebrow: string; title: string; accent: string; cards: Card[] };
  };
  offers: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    monthly: string;
    annual: string;
    save: string;
    featured: string;
    choose: string;
    startFree: string;
    quote: string;
    unitMonth: string;
    unitCustom: string;
    unitFree: string;
    plans: { name: string; tagline: string; highlight: string; features: string[] }[];
    included: Card[];
  };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    lede: string;
    anchors: { offers: string; write: string; faq: string };
    channels: { label: string; value: string; icon: IconName }[];
    officeLabel: string;
    office: string;
    officeNote: string;
    hours: string;
    formTitle: string;
    fields: {
      first: string;
      last: string;
      email: string;
      phone: string;
      org: string;
      subject: string;
      message: string;
    };
    placeholders: { first: string; last: string; email: string; phone: string; org: string; message: string };
    subjects: string[];
    submit: string;
    sending: string;
    privacy: string;
    sentTitle: string;
    sentBody: string;
    sentAgain: string;
    faqTitle: string;
    faqAccent: string;
    faqLede: string;
    faqs: Faq[];
    steps: { number: string; title: string; body: string }[];
    stepsTitle: string;
    stepsEyebrow: string;
  };
  cta: { title: string; lede: string; primary: string; secondary: string };
  footer: {
    platform: string;
    company: string;
    reach: string;
    plans: string;
    story: string;
    team: string;
    rights: string;
    made: string;
    newsletterLede: string;
    newsletterPlaceholder: string;
    newsletterSubmit: string;
    newsletterSending: string;
    newsletterDone: string;
    newsletterAlready: string;
  };
  notFound: { eyebrow: string; title: string; lede: string; home: string; platform: string };
  common: { discover: string; readMore: string; previous: string; next: string };
};

export const fr: Dict = {
  nav: {
    home: 'Accueil',
    platform: 'La solution',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Démo gratuite',
    menu: 'Ouvrir le menu',
    close: 'Fermer le menu',
    langLabel: 'Langue',
    onThisPage: 'Sur cette page',
  },
  routes: [
    {
      label: 'La méthode',
      href: '/solution/methode',
      blurb: 'Les quatre temps de la boucle, du comptoir à la décision.',
      icon: 'loop',
    },
    {
      label: 'La technologie',
      href: '/solution/technologie',
      blurb: "Le traitement du langage, de la phrase brute à la consigne.",
      icon: 'chip',
    },
    {
      label: 'Le cockpit',
      href: '/solution/cockpit',
      blurb: 'Le tableau de bord des responsables de réseau et de terrain.',
      icon: 'gauge',
    },
    {
      label: 'La gouvernance',
      href: '/solution/gouvernance',
      blurb: 'Les accès, la confidentialité et la maîtrise de vos données.',
      icon: 'shield',
    },
  ],
  hero: {
    slides: [
      {
        tab: 'Collecter',
        eyebrow: 'Collecte instantanée',
        titleTop: 'Un QR code suffit',
        titleAccent: 'pour ouvrir le dialogue.',
        text: "Vos clients partagent leur ressenti en moins de trente secondes, sans application à installer ni formulaire interminable.",
        marker: 'Moins de 30 secondes',
      },
      {
        tab: 'Écouter',
        eyebrow: 'Intelligence client',
        titleTop: 'La voix de vos clients,',
        titleAccent: 'enfin exploitable.',
        text: "Nous captons l'expérience vécue en agence au moment où elle compte, puis nous la transformons en décisions claires.",
        marker: 'Chaque signal compte',
      },
      {
        tab: 'Piloter',
        eyebrow: 'Pilotage en temps réel',
        titleTop: 'Décidez avec des données,',
        titleAccent: 'plus avec des impressions.',
        text: "Scores, thématiques et signaux critiques réunis dans un tableau de bord pensé pour le siège comme pour l'agence.",
        marker: 'Vue siège et vue agence',
      },
      {
        tab: 'Progresser',
        eyebrow: 'Impact sur le terrain',
        titleTop: 'Des équipes qui savent',
        titleAccent: 'exactement quoi améliorer.',
        text: "Chaque agence reçoit des priorités d'action concrètes et mesure l'effet de ses efforts, semaine après semaine.",
        marker: 'Des actions, pas des rapports',
      },
    ],
    primary: 'Démo gratuite',
    secondary: 'La solution',
    scroll: 'Faire défiler',
  },
  home: {
    facts: [
      { value: '30 s', label: "pour déposer un avis complet" },
      { value: '15', label: 'thématiques métier reconnues' },
      { value: '3', label: 'niveaux de pilotage' },
      { value: '24/7', label: 'analyse continue des retours' },
    ],
    pillars: {
      eyebrow: 'Comment ça marche',
      title: 'Quatre briques,',
      accent: 'une seule solution.',
      lede: "Prenez le chemin qui vous intéresse, ou parcourez-les dans l'ordre.",
      cards: [],
      link: 'Découvrir',
    },
    sectors: {
      eyebrow: 'Pour qui',
      title: 'Pensé pour les réseaux',
      accent: 'à forte affluence.',
      lede: "Partout où des clients patientent, sont reçus puis repartent sans rien dire, nous leur redonnons la parole.",
      list: [
        { label: 'Banque et microfinance', icon: 'bank' },
        { label: 'Télécommunications', icon: 'antenna' },
        { label: 'Assurance', icon: 'shield' },
        { label: 'Santé et cliniques', icon: 'health' },
        { label: 'Hôtellerie et restauration', icon: 'hotel' },
        { label: 'Commerce et distribution', icon: 'retail' },
        { label: 'Services publics', icon: 'sitemap' },
        { label: 'Services aux entreprises', icon: 'briefcase' },
      ],
    },
    caption: {
      eyebrow: 'Au comptoir',
      text: 'Le moment de vérité se joue en agence.',
      stat: '+ 18,4 %',
      statLabel: 'sur trois mois de suivi',
    },
  },
  platform: {
    eyebrow: "Tout le produit en un coup d'œil",
    title: 'La méthode et la technologie',
    accent: 'qui rendent la parole client utile.',
    lede: "Quatre briques complémentaires : la façon de recueillir un avis, la manière dont il est compris, l'outil qui permet d'agir et les règles qui protègent vos données.",
    overviewNote: 'Voir toute la solution',
  },
  method: {
    eyebrow: 'Étape par étape',
    title: 'Une boucle courte,',
    accent: 'du comptoir à la décision.',
    lede: "La méthode a été pensée pour tenir dans le quotidien d'une agence : peu de gestes, aucun rapport à produire, un résultat visible dès la première semaine.",
    steps: [
      {
        number: '01',
        title: 'Collecter',
        body: "Un chevalet, un sticker ou une affiche portant un QR code propre à chaque agence. Le client note son passage, laisse un commentaire libre, propose une amélioration et peut demander à être rappelé.",
        detail: 'Sans application, sans compte à créer, en français ou en langue locale.',
        icon: 'qr',
      },
      {
        number: '02',
        title: 'Comprendre',
        body: "Chaque message est analysé : tonalité du propos, thématique concernée, niveau de criticité, et cohérence entre la note attribuée et le contenu écrit.",
        detail: "Une note de 5 sur 5 accompagnée d'un commentaire sévère ne passe plus inaperçue.",
        icon: 'magic',
      },
      {
        number: '03',
        title: 'Décider',
        body: "Les retours sont regroupés par sujet et par agence, hiérarchisés par impact. Les cas urgents déclenchent une alerte adressée au responsable concerné.",
        detail: 'Chaque niveau hiérarchique voit exactement ce qui le concerne.',
        icon: 'target',
      },
      {
        number: '04',
        title: 'Progresser',
        body: "Les plans d'action sont suivis dans le temps. Vous comparez vos agences, mesurez l'effet des corrections et valorisez les équipes qui progressent.",
        detail: 'La satisfaction devient un indicateur piloté, pas une intuition.',
        icon: 'chart',
      },
    ],
    closing: {
      title: 'Une boucle qui se referme en quelques jours',
      body: "Là où une enquête classique demande des semaines de préparation puis de dépouillement, la méthode produit ses premiers enseignements dès la première semaine d'affichage des QR codes.",
      badge: 'Au comptoir',
      caption: "Le moment de vérité se joue en agence.",
    },
    closingStats: [
      { value: '01', label: 'Semaine avant les premiers résultats' },
      { value: '30 s', label: 'Pour déposer un avis complet' },
      { value: '04', label: "Étapes, du QR code à l'action" },
    ],
  },
  tech: {
    eyebrow: 'Sous le capot',
    title: 'Ce qui se passe entre le commentaire',
    accent: 'et la décision.',
    lede: "Un traitement en quatre passages, exécuté en continu, pour transformer une phrase écrite au comptoir en information structurée.",
    pipeline: [
      {
        title: 'Détection de la langue',
        body: "Le message est identifié puis, si nécessaire, traduit pour être traité avec la même finesse quelle que soit la langue employée.",
        icon: 'language',
      },
      {
        title: 'Classification',
        body: "Un modèle de traitement du langage attribue un sentiment, une thématique métier et un niveau de criticité au verbatim.",
        icon: 'tags',
      },
      {
        title: 'Mise en cohérence',
        body: "La note chiffrée et le contenu du commentaire sont confrontés afin de repérer les insatisfactions masquées.",
        icon: 'gears',
      },
      {
        title: 'Recommandation',
        body: "À partir des tendances observées sur l'agence, la plateforme propose des pistes d'action concrètes et priorisées.",
        icon: 'idea',
      },
    ],
    stack: [
      'Traitement du langage naturel',
      'Modèles multilingues',
      'API sécurisée',
      'Tableaux de bord temps réel',
      'Cartographie du réseau',
      'Gestion fine des rôles',
    ],
    demo: {
      eyebrow: 'À vous d\'essayer',
      title: "D'une phrase écrite au comptoir",
      accent: 'à une consigne exploitable.',
      lede: "Saisissez un commentaire client, ou chargez l'un des exemples, pour visualiser la lecture qu'en fait la plateforme.",
      inputLabel: 'Commentaire à analyser',
      placeholder: "Saisissez ici le commentaire d'un client.",
      examplesLabel: 'Exemples',
      examples: [
        {
          label: 'Incident technique',
          text: "Le terminal de paiement est en panne depuis ce matin, impossible de régler par carte. Très déçu du passage.",
        },
        {
          label: "Temps d'attente",
          text: "J'ai attendu plus de quarante minutes au guichet alors qu'il n'y avait que deux conseillers disponibles.",
        },
        {
          label: 'Retour positif',
          text: "Très bon accueil, la conseillère a été souriante et efficace pour régler mon dossier. Merci beaucoup.",
        },
      ],
      run: 'Analyser',
      running: 'Analyse en cours',
      privacy: "Aucune donnée saisie ici n'est conservée.",
      resultLabel: 'Lecture de la plateforme',
      tone: 'Tonalité',
      theme: 'Thématique',
      severity: 'Criticité',
      discordance: 'Discordance',
      discordanceYes: 'Détectée',
      discordanceNo: 'Aucune',
      ratingLabel: 'Note laissée par le client',
      ratingHint: 'sur 5',
      action: 'Action recommandée',
    },
  },
  cockpit: {
    eyebrow: 'Voir clair en trente secondes',
    title: 'Piloter la satisfaction',
    accent: 'sans quitter le terrain des yeux.',
    lede: "Un tableau de bord sobre, conçu pour être lu en trente secondes le matin : la tendance, les points de tension, les sujets qui reviennent.",
    points: [
      {
        title: 'Comparatif entre agences',
        body: "Repérez immédiatement les points de vente en difficulté et ceux dont les pratiques méritent d'être diffusées.",
      },
      {
        title: 'Alertes de seuil',
        body: "Dès qu'une agence passe sous le seuil défini, le responsable concerné est prévenu, sans attendre le bilan mensuel.",
      },
      {
        title: 'Suggestions clients',
        body: "Les idées formulées par vos clients sont regroupées, qualifiées et suivies jusqu'à leur traitement.",
      },
      {
        title: 'Demandes de rappel',
        body: "Un client qui souhaite être recontacté remonte directement dans la file de son agence, avec le contexte de son message.",
      },
    ],
  },
  governance: {
    eyebrow: 'Confiance et confidentialité',
    title: 'Chacun voit ce qui le concerne,',
    accent: 'rien de plus.',
    lede: "La confiance d'un réseau se construit sur des règles d'accès claires et sur le respect de la parole du client.",
    cards: [
      {
        title: 'Un accès par responsabilité',
        body: "Direction, siège et agence disposent chacun d'une vue strictement limitée à leur périmètre de décision.",
        icon: 'roles',
      },
      {
        title: 'Réponses anonymes',
        body: "Le client n'a ni compte ni identifiant. Seule une demande de rappel volontaire associe un numéro à un message.",
        icon: 'lock',
      },
      {
        title: 'Données maîtrisées',
        body: "Durée de conservation paramétrable, export à la demande et hébergement conforme aux exigences de vos directions.",
        icon: 'database',
      },
      {
        title: 'Traçabilité des actions',
        body: "Chaque alerte traitée, chaque suggestion instruite et chaque recommandation suivie laisse une trace exploitable.",
        icon: 'fingerprint',
      },
    ],
  },
  about: {
    eyebrow: 'Qui sommes-nous',
    title: 'Nous voulons rendre utile',
    accent: 'ce que vos clients disent déjà.',
    lede: "IKAN AI est né d'une observation simple faite dans les files d'attente et aux guichets : les clients disent l'essentiel, mais personne n'a le temps de les écouter à grande échelle.",
    vision: {
      eyebrow: 'Ce que nous cherchons',
      title: 'Faire de la parole client',
      accent: 'une véritable ressource de décision.',
      lede: "Les entreprises investissent beaucoup pour attirer des clients et très peu pour comprendre ceux qui poussent déjà leur porte. Nous voulons inverser ce rapport.",
      pillars: [
        {
          title: 'Écouter au bon moment',
          body: "Recueillir l'avis pendant que l'expérience est encore fraîche, sur le lieu même où elle a été vécue.",
          icon: 'ear',
        },
        {
          title: 'Comprendre sans effort',
          body: "Lire des milliers de commentaires n'est pas un travail humain. Les faire parler, oui.",
          icon: 'magic',
        },
        {
          title: 'Agir au bon niveau',
          body: "Une information utile est une information qui arrive à la personne capable de décider.",
          icon: 'target',
        },
      ],
    },
    history: {
      eyebrow: 'Comment tout a commencé',
      title: "D'une intuition partagée",
      accent: 'à une plateforme déployée.',
      items: [
        {
          period: 'Juillet 2026',
          title: 'Le point de départ',
          body: "Le projet naît dans le cadre de l'Orange Summer Challenge. Six profils complémentaires se réunissent autour d'un constat partagé : la parole du client se perd entre le comptoir et la direction.",
        },
        {
          period: 'Août 2026',
          title: 'Les premiers modèles',
          body: "Le moteur d'analyse est entraîné puis validé : reconnaissance de la tonalité, classification en thématiques métier et détection des écarts entre la note et le commentaire.",
        },
        {
          period: 'Septembre 2026',
          title: 'La plateforme complète',
          body: "Collecte par QR code, tableaux de bord adaptés à chaque niveau de responsabilité, alertes de seuil et recommandations. Le premier déploiement pilote est lancé.",
        },
        {
          period: "Aujourd'hui",
          title: 'Le déploiement',
          body: "Nous accompagnons les organisations qui veulent écouter leurs clients en continu et préparons l'ouverture aux langues locales d'Afrique de l'Ouest.",
        },
      ],
    },
    team: {
      eyebrow: 'Les visages du projet',
      title: 'NovaX, le collectif',
      accent: 'derrière IKAN AI.',
      lede: 'Six compétences complémentaires : produit, ingénierie logicielle, intelligence artificielle, design et développement commercial.',
      roles: [
        'Product Owner',
        'Développeur back-end',
        'Intelligence artificielle',
        'Intelligence artificielle',
        'Développement commercial',
        'Interfaces et design',
      ],
      bios: [
        "Porte la vision produit et fait le lien permanent entre les réalités du terrain et les arbitrages de conception.",
        "Conçoit l'architecture de la plateforme, les interfaces de programmation et l'orchestration des traitements.",
        "Responsable des modèles de langage : reconnaissance du sentiment et classification des thématiques métier.",
        "Développe le moteur de recommandation et son intégration dans les traitements de la plateforme.",
        "Accompagne les réseaux partenaires, du premier échange jusqu'au déploiement sur leurs points de vente.",
        "Garante de l'expérience d'utilisation, des interfaces du cockpit et de l'identité visuelle de la marque.",
      ],
    },
    values: {
      eyebrow: 'Ce à quoi nous tenons',
      title: 'Ce qui guide nos choix,',
      accent: 'produit comme commerciaux.',
      cards: [
        {
          title: 'Écoute du terrain',
          body: "Les meilleurs axes d'amélioration viennent rarement des comités. Ils viennent du guichet.",
          icon: 'ear',
        },
        {
          title: 'Ancrage local',
          body: "Nous concevons des outils adaptés aux usages, aux langues et aux contraintes des entreprises africaines.",
          icon: 'globe',
        },
        {
          title: 'Exigence technique',
          body: "Une analyse imprécise est pire que pas d'analyse. Nous mesurons et corrigeons nos modèles en continu.",
          icon: 'gauge',
        },
        {
          title: 'Simplicité assumée',
          body: "Un outil n'a de valeur que s'il est utilisé. Nous retirons tout ce qui n'aide pas à décider.",
          icon: 'bolt',
        },
      ],
    },
  },
  offers: {
    eyebrow: 'Combien ça coûte',
    title: 'Des formules lisibles,',
    accent: 'à la taille de votre réseau.',
    lede: "Un tarif clair, aucun frais d'activation, aucun coût variable au nombre de réponses. Vous changez de formule au rythme de votre croissance.",
    monthly: 'Mensuel',
    annual: 'Annuel',
    save: 'Deux mois offerts sur le paiement annuel',
    featured: 'Le plus choisi',
    choose: 'Choisir cette formule',
    startFree: 'Commencer gratuitement',
    quote: 'Demander un devis',
    unitMonth: 'FCFA / mois',
    unitCustom: 'accompagnement sur mesure',
    unitFree: 'sans engagement',
    plans: [
      {
        name: 'Gratuit',
        tagline: "Pour tester IKAN AI sur un premier point de vente.",
        highlight: '1 CX Manager · 1 Agence · 20 feedbacks',
        features: [
          '1 CX Manager, 1 agence',
          '20 feedbacks par mois',
          'QR code et formulaire client',
          'Analyse du sentiment',
          'Support communautaire',
        ],
      },
      {
        name: 'Starter',
        tagline: "Pour les petits réseaux et franchises locales.",
        highlight: '1 CX Manager · 3 Agences · Feedbacks illimités',
        features: [
          'Tout de la formule Gratuit',
          '1 CX Manager, 3 agences',
          'Feedbacks illimités',
          'Classification thématique (IA)',
          'Alerte de criticité en direct',
          'Support par email (48h)',
        ],
      },
      {
        name: 'Pro',
        tagline: "Pour les réseaux en expansion exigeant un pilotage avancé.",
        highlight: '2-3 CX Managers · 10 Agences · Feedbacks illimités',
        features: [
          'Tout de la formule Starter',
          '2 à 3 CX Managers, 10 agences',
          'Détection de discordance (IA)',
          'Agent IA conversationnel',
          'Analyse prédictive (IA)',
          'Support prioritaire (24h)',
        ],
      },
      {
        name: 'Entreprise',
        tagline: "Pour les grands réseaux bancaires et de services.",
        highlight: 'Managers & Agences illimités',
        features: [
          'Tout de la formule Pro',
          'Managers & agences illimités',
          'Modèle IA adapté au secteur',
          'Intégration CRM & WhatsApp',
          'Rapports IA exécutifs automatiques',
          'Account Manager dédié & SLA',
        ],
      },
    ],
    included: [
      {
        title: 'Mise en service rapide',
        body: "Vos QR codes sont générés et prêts à être posés en moins d'une semaine.",
        icon: 'clock',
      },
      { title: 'Sans frais cachés', body: "Aucun frais d'activation, aucun coût par réponse collectée.", icon: 'loop' },
      {
        title: 'Accompagnement humain',
        body: 'Une prise en main avec vos équipes est incluse dans toutes les formules.',
        icon: 'headset',
      },
    ],
  },
  contact: {
    eyebrow: 'Écrivons-nous',
    title: 'Parlons de vos clients',
    accent: "et de ce qu'ils ont à vous dire.",
    lede: "Découvrez nos formules, puis écrivez-nous : notre équipe vous répond sous vingt-quatre heures ouvrées, que vous vouliez une démonstration, un devis ou simplement un avis sur votre réseau.",
    anchors: { offers: 'Nos offres', write: 'Nous écrire', faq: 'Questions fréquentes' },
    channels: [
      { label: 'Nous écrire', value: 'contact@ikanai.app', icon: 'mail' },
      { label: 'Nous appeler', value: '+226 70 00 00 00', icon: 'phone' },
      { label: 'Nous suivre', value: 'IKAN AI sur LinkedIn', icon: 'linkedin' },
    ],
    officeLabel: 'Nos bureaux',
    office: 'Ouagadougou, Burkina Faso',
    officeNote: "Nous accompagnons les réseaux d'agences au Burkina Faso et dans l'ensemble de l'Afrique de l'Ouest.",
    hours: 'Du lundi au vendredi, de 8 h à 18 h.',
    formTitle: 'Formulaire de contact',
    fields: {
      first: 'Prénom',
      last: 'Nom',
      email: 'Adresse électronique',
      phone: 'Téléphone',
      org: 'Organisation',
      subject: 'Objet de votre demande',
      message: 'Votre message',
    },
    placeholders: {
      first: 'Aminata',
      last: 'Sawadogo',
      email: 'nom@entreprise.com',
      phone: '+226 70 00 00 00',
      org: 'Nom de votre entreprise',
      message: 'Décrivez votre réseau, vos points de vente et ce que vous cherchez à améliorer.',
    },
    subjects: [
      'Demander une démo',
      'Formule Starter',
      'Formule Premium',
      'Formule Entreprise',
      'Tester sur mon réseau',
      'Question sur la plateforme',
      'Partenariat ou presse',
    ],
    submit: 'Envoyer',
    sending: 'Envoi en cours',
    privacy: 'Vos informations servent uniquement à vous répondre.',
    sentTitle: 'Votre message est parti.',
    sentBody: "Un membre de l'équipe revient vers vous sous vingt-quatre heures ouvrées.",
    sentAgain: 'Envoyer un autre message',
    faqTitle: 'Les réponses',
    faqAccent: 'aux questions qui reviennent.',
    faqLede: "Une interrogation qui ne figure pas ici ? Posez-la dans le formulaire, nous répondons sous vingt-quatre heures.",
    faqs: [
      {
        q: "L'abonnement engage-t-il sur une durée ?",
        a: "Les formules Starter et Premium sont sans engagement en paiement mensuel : vous pouvez suspendre ou changer de formule à tout moment. Le paiement annuel vous engage sur douze mois et vous fait bénéficier d'une remise de vingt pour cent.",
      },
      {
        q: 'Comment se passe la mise en place sur le terrain ?',
        a: "Nous générons pour chacun de vos points de vente un QR code qui lui est propre, à imprimer sur chevalet, sticker ou affiche. Le client scanne avec son téléphone et répond directement, sans installer d'application.",
      },
      {
        q: 'La plateforme comprend-elle les expressions locales ?',
        a: "Oui. Le moteur d'analyse est adapté aux tournures régionales du français ainsi qu'aux principales langues d'Afrique de l'Ouest, ce qui évite de perdre le sens des commentaires les plus spontanés.",
      },
      {
        q: "Peut-on essayer avant de s'engager ?",
        a: "Nous ouvrons un accès d'essai de quatorze jours aux réseaux qualifiés. Nous fournissons les supports, vous ouvrez un accès complet au tableau de bord et vous mesurez l'impact réel avant toute décision.",
      },
      {
        q: 'Qui a accès aux données collectées ?',
        a: "Vous seuls. Les accès sont attribués par niveau de responsabilité : la direction voit la structure, le siège voit son réseau, chaque responsable d'agence voit uniquement son point de vente.",
      },
    ],
    stepsEyebrow: 'Et ensuite',
    stepsTitle: 'Ce qui se passe après votre message',
    steps: [
      {
        number: '01',
        title: 'Nous vous rappelons',
        body: "Un membre de l'équipe revient vers vous sous vingt-quatre heures ouvrées pour cadrer votre besoin.",
      },
      {
        number: '02',
        title: 'Nous vous montrons la plateforme',
        body: 'Trente minutes de démonstration, avec vos cas de figure et vos types de points de vente.',
      },
      {
        number: '03',
        title: 'Nous équipons deux agences',
        body: "Quatorze jours de collecte réelle, puis un bilan chiffré présenté à vos équipes.",
      },
    ],
  },
  cta: {
    title: "Vos clients ont la parole. À vous de l'entendre.",
    lede: "Un pilote sur une ou deux agences suffit pour mesurer l'impact avant de décider du déploiement.",
    primary: 'Démo gratuite',
    secondary: 'La solution',
  },
  footer: {
    platform: 'La solution',
    company: "L'entreprise",
    reach: 'Nous joindre',
    plans: 'Nos offres',
    story: 'Notre histoire',
    team: "L'équipe",
    rights: 'Tous droits réservés.',
    made: 'Conçu et développé au Burkina Faso.',
    newsletterLede: "Recevez nos actualités et nos conseils sur l'écoute client, une fois par mois.",
    newsletterPlaceholder: 'Votre adresse e-mail',
    newsletterSubmit: "S'abonner",
    newsletterSending: 'Envoi...',
    newsletterDone: 'Merci ! Votre inscription est confirmée.',
    newsletterAlready: 'Cette adresse est déjà inscrite.',
  },
  notFound: {
    eyebrow: 'Erreur 404',
    title: "Cette page semble avoir changé d'adresse.",
    lede: "Le lien que vous avez suivi n'existe plus ou comporte une erreur.",
    home: "Retour à l'accueil",
    platform: 'La solution',
  },
  common: { discover: 'Découvrir', readMore: 'En savoir plus', previous: 'Précédent', next: 'Suivant' },
};
