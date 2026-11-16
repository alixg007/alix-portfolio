# Wireframes du site

Structure validée le 16 novembre 2026. Les images sont dans `docs/wireframes/` et les sources du canevas dans `docs/wireframes/source/`.

Les zones hachurées des images sont des emplacements d'illustration : elles seront remplacées par les dessins de Claude Design. Les étiquettes rouges sont des annotations, pas des éléments du site. Les textes entre crochets `[À ÉCRIRE]` ou `[À PRÉCISER]` attendent le contenu d'Alix : ne pas les inventer.

## Règles communes à tous les écrans

- **Mobile d'abord** (390 px de large). Le desktop réorganise le même contenu.
- **Barre de navigation fixe** en bas sur mobile, toujours visible dans le monde illustré : Coulisses, IA, Barque, Chez moi, Contact (Contact mis en avant). Cibles tactiles d'au moins 44 px. L'onglet du quartier courant est marqué (`aria-current="page"`).
- **Le texte est toujours posé sur un panneau uni,** jamais directement sur l'illustration.
- **Chaque quartier suit le même gabarit :**
  1. le zoom dans le décor, avec des objets numérotés cliquables ;
  2. le titre et une phrase d'intention ;
  3. « La preuve en 5 secondes » (vidéo, citation ou chiffre) ;
  4. des cartes de projet au format **Contexte / Mon rôle / Résultat** ;
  5. un lien vers le quartier suivant, pour qu'il n'y ait jamais d'impasse.
- Le détail d'un projet s'ouvre dans un **panneau qui glisse par-dessus le décor** et se referme en un geste.
- Le site vouvoie le visiteur.
- Respect de `prefers-reduced-motion` : tout reste en place, sans mouvement.

## Les écrans

### 01 · Surface LinkedIn (mobile) — `01-surface-linkedin-mobile.png`
La page déjà construite : profil sobre, puis strates de terre et bouton « Creuser sous la surface ». C'est le contraste avant la surprise.

### 02 · Accueil du monde (mobile) — `02-accueil-monde-mobile.png`
- Une courte transition : les strates défilent, la page LinkedIn s'efface.
- La scène globale, recomposée à la verticale, avec les quatre quartiers repérables.
- **① La présentation est posée sur la scène, dans le premier écran,** visible sans défiler : statut « Disponible · Lyon et région lyonnaise », « Bonjour, je suis Alix. », une phrase, et les boutons « Voir le plan ↓ » et « Me contacter ».
- **② Le plan du site** juste sous la scène : quatre cartes de quartier, chacune avec son icône, sa promesse et sa preuve phare.
- Un bloc **« En ce moment »** : ce qu'Alix écoute, ce qu'elle cherche, ce qu'elle construit.
- **③ La barre fixe** en bas.

### 03 · Quartier « Les coulisses » (mobile) — `03-quartier-coulisses-mobile.png`
- Le zoom sur le théâtre ouvert en coupe.
- La preuve en 5 secondes : la vidéo du Club DRH « Ce que veulent les jeunes ».
- Les cartes : Filme ton job (20/20), la couverture d'événements (séminaires de 400+ personnes, conférences clients, vœux, aftermovies) et « Ce que j'en retiens » `[À ÉCRIRE]`.

### 04 · Quartier « Mener la barque » (mobile) — `04-quartier-barque-mobile.png`
- Le zoom sur la rivière et la barque.
- La preuve en 5 secondes : la recommandation de la tutrice.
- Les cartes : l'alternance à distance (seule à Lyon, équipe à Marseille), Keeply'on (BizDev, coordination, 14e sur une cinquantaine d'équipes, lien vers le pitch), et l'entrée chez Orange grâce au portfolio Wix.

### 05 · Panneau projet ouvert (mobile) — `05-panneau-projet-mobile.png`
Exemple avec le mémoire (quartier IA) : la problématique, les trois préconisations A, B et C, l'accueil reçu, la mention « sans données confidentielles », puis les boutons « Retour au décor » et « Projet suivant ».

### 06 · Quartier « Chez moi » (mobile) — `06-quartier-chez-moi-mobile.png`
- La maison ouverte, avec des objets cliquables : tourne-disque, vidéoprojecteur, plantes, valise du Vietnam, fenêtre sur Bourg-en-Bresse.
- Un exemple d'objet ouvert (les films préférés).
- Le lecteur Spotify officiel, qui ne démarre qu'au clic, avec la liste des titres aussi en texte.
- **La liste de tous les objets en texte,** pour l'accessibilité.
- Un appel « Un film ou un album en commun ? ».

### 07 · Contact (mobile) — `07-contact-mobile.png`
- « On se rencontre ? », l'e-mail en texte sélectionnable avec un bouton Copier, LinkedIn, le CV en PDF et les postes visés.
- La recommandation de la tutrice, placée juste avant la décision.
- Un pied de page « Remonter à la surface » et quelques mots sur la fabrication du site.

### 08 · Accueil du monde (desktop) — `08-accueil-monde-desktop.png`
- La scène en pleine largeur, avec la navigation en étiquettes en haut à droite.
- La présentation sur un panneau uni en bas à gauche.
- Le bandeau « En ce moment » en bas de l'écran.

### 09 · Quartier ouvert (desktop) — `09-quartier-ouvert-desktop.png`
Le décor zoomé à gauche (environ 58 %), le contenu qui défile à droite (environ 42 %). Exemple avec « Mener la barque ».

## Ce qui n'est pas dessiné

Le quartier « L'IA, avec une âme » suit exactement le gabarit des écrans 03 et 04 :
- en preuve, le mémoire et ce site lui-même ;
- le panneau de l'écran 05 ;
- la formation de Sonia Vignon-Riocreux ;
- un emplacement « bientôt » pour les futurs projets d'automatisation et de dashboard.
