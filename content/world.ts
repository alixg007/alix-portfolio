/**
 * Les textes du monde illustré (tout ce qui suit la page LinkedIn).
 * Ils viennent de docs/wireframes.md et docs/brief-portfolio.md : pour modifier un texte,
 * il suffit d'éditer ce fichier. Ce qui manque est marqué [À ÉCRIRE] : ne rien inventer.
 */

export type QuarterIcon = "camera" | "phone" | "boat" | "record";

export type Quarter = {
  slug: string;
  /** Nom complet du quartier */
  name: string;
  /** Nom court, dans la barre de navigation mobile */
  navLabel: string;
  /** L'objet géant qui permet de repérer le quartier dans la scène */
  landmark: string;
  icon: QuarterIcon;
  /** Ce que le quartier promet */
  promise: string;
  /** La preuve phare, affichée sur la carte du plan */
  proof: string;
};

export const quarters: Quarter[] = [
  {
    slug: "coulisses",
    name: "Les coulisses",
    navLabel: "Coulisses",
    landmark: "Caméra géante",
    icon: "camera",
    promise: "Vidéo, événementiel, relationnel",
    proof: "Preuve phare : vidéo Club DRH · Filme ton job (20/20)",
  },
  {
    slug: "ia",
    name: "L'IA, avec une âme",
    navLabel: "IA",
    landmark: "Téléphone-bâtiment",
    icon: "phone",
    promise: "Communication interne, IA générative",
    proof: "Preuve phare : mon mémoire · ce site",
  },
  {
    slug: "barque",
    name: "Mener la barque",
    navLabel: "Barque",
    landmark: "Rivière + barque",
    icon: "boat",
    promise: "Gestion de projet, autonomie",
    proof: "Preuve phare : 2 ans à distance · Keeply'on",
  },
  {
    slug: "chez-moi",
    name: "Chez moi",
    navLabel: "Chez moi",
    landmark: "Tourne-disque sur le toit",
    icon: "record",
    promise: "Personnalité, atomes crochus",
    proof: "Playlist, films, Rummikub, Vietnam",
  },
];

/** La présentation posée sur la scène, visible sans défiler. */
export const worldIntro = {
  status: "Disponible · Lyon et région lyonnaise",
  title: "Bonjour, je suis Alix.",
  text: "Communication et gestion de projet : contenus, événementiel et IA générative. Ici, je vous montre comment je travaille et qui je suis.",
  // Les wireframes utilisent deux textes : mobile (02) et ordinateur (08)
  planButtonMobile: "Voir le plan",
  planButtonDesktop: "Explorer le monde",
  contactButton: "Me contacter",
};

/** Le bloc « En ce moment ». */
export const rightNow = {
  listening: { title: "Coming Up", artist: "Paul McCartney" },
  looking: "Je cherche un poste en communication à Lyon",
  building: "Je construis ce site avec Claude Code",
};
