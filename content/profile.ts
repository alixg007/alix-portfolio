/**
 * Toutes les données texte du portfolio vivent ici.
 * Pour modifier un texte, tu n'as qu'à éditer ce fichier : aucun composant à toucher.
 * ⚠️ Rien de confidentiel lié à Orange : uniquement des formulations génériques
 *    (missions, compétences), jamais de chiffres internes, noms de projets ou outils internes.
 */

export type Experience = {
  role: string;
  org: string;
  period: string;
  place?: string;
  summary: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type Island = {
  slug: string;
  title: string;
  teaser: string;
};

export const profile = {
  firstName: "Alix",
  lastName: "Gruel",
  headline: "Communication & gestion de projet | Contenus, Événementiel, IA",
  subline: "Ex-Orange",
  location: "Lyon, Auvergne-Rhône-Alpes, France",
  connections: 353,
  linkedinUrl: "https://www.linkedin.com/in/alix-gruel",
  email: "alix.gruel07@gmail.com",
  photo: "/images/alix.jpg",
  bannerTitle: ["Communication &", "gestion de projet"],
  bannerTags: ["Contenus", "IA", "Événementiel"],
  openTo: "Ouverte à un poste en communication interne, conduite du changement ou marketing",

  // TODO Alix : remplace par ton vrai texte « Infos » (3 à 5 phrases).
  about:
    `Fraîchement diplômée d'un MBA en Stratégie Marketing & Communication Digitale et tout juste rentrée d'un voyage en solo au Vietnam, me voilà prête à mettre ma créativité et mon sens du projet au service d'une nouvelle entreprise !

Pendant deux ans en alternance chez Orange, j'ai touché à tout ce qui me plaît dans la communication interne : des vidéos, des visuels, un site vitrine refait de A à Z, des séminaires de 450 personnes et une mission de conduite du changement pour aider mon équipe à adopter l’IA.

J’ai découvert que j’aimais piloter des projets autant que créer du contenu, surtout quand il y a une équipe à embarquer.

🌍 Anglais C1 (TOEIC 965) | Espagnol B2 | Russe en cours (commencé à la fac, entretenu sur Duolingo depuis plus de 700 jours, la chouette et moi, c’est du sérieux !)

Je suis ouverte aux postes en communication et en gestion de projet à Lyon. N'hésitez pas à m'écrire !.`,

  // TODO Alix : complète / corrige dates et intitulés.
  experiences: [
    {
      role: "Chargée de communication interne (alternance)",
      org: "Orange",
      period: "2024-2026",
      place: "Lyon",
      summary:
        "Accompagnement de projets de transformation : contenus éditoriaux, animation d'événements internes et appui à la conduite du changement.",
    },
  ] satisfies Experience[],

  education: [
    {
      school: "MBway",
      degree: "MBA Stratégies Marketing et Communication digitale",
      period: "2024-2026",
    },
  ] satisfies Education[],

  skills: [
    "Communication interne",
    "Conduite du changement",
    "IA générative",
    "Stratégie marketing",
    "Gestion de projet",
    "Événementiel",
    "Création de contenus",
  ],
};

/** Les îles du monde 3D (étape 2+). Utilisées aussi pour la version HTML accessible. */
export const islands: Island[] = [
  {
    slug: "communication-interne",
    title: "Communication interne & conduite du changement",
    teaser: "Embarquer les équipes, donner du sens aux transformations.",
  },
  {
    slug: "ia-generative",
    title: "IA générative appliquée à la communication",
    teaser: "Des usages concrets, responsables et utiles.",
  },
  {
    slug: "strategie-marketing",
    title: "Stratégie marketing",
    teaser: "Comprendre un public, construire un message, mesurer.",
  },
  {
    slug: "creativite",
    title: "Créativité & personnalité",
    teaser: "Ce qui me fait vibrer en dehors des tableaux de bord.",
  },
  {
    slug: "contact",
    title: "Contact",
    teaser: "On en parle autour d'un café (ou d'une visio) ?",
  },
];
