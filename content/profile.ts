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
    "Je fais le lien entre les personnes, les messages et les outils. Mon terrain de jeu : la communication interne, la conduite du changement et les contenus qui donnent envie d'agir. Je m'intéresse de près à l'IA générative, non pas comme un gadget, mais comme un levier concret pour mieux informer, embarquer et créer.",

  // TODO Alix : complète / corrige dates et intitulés.
  experiences: [
    {
      role: "Chargée de communication interne (alternance)",
      org: "Orange",
      period: "À compléter",
      place: "Lyon",
      summary:
        "Accompagnement de projets de transformation : contenus éditoriaux, animation d'événements internes et appui à la conduite du changement.",
    },
  ] satisfies Experience[],

  education: [
    {
      school: "MBway",
      degree: "Mastère communication & stratégie (à préciser)",
      period: "À compléter",
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
