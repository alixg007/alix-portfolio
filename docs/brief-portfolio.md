# Brief portfolio Alix Gruel (validé le 2 novembre 2026, mis à jour le 16 novembre)

## Concept
Entrée : une page qui reprend un profil LinkedIn stylisé (le ton sérieux), puis un bouton « Creuser sous la surface » qui fait basculer dans un univers illustré, plus léger, qui ressemble à Alix. L'humain est au centre. Mot d'ordre : ne pas se prendre au sérieux tout en restant sérieuse.
- Les visiteurs arrivent par le QR code du CV, donc le site est pensé d'abord pour le téléphone.
- Le site vouvoie le visiteur.
- Une version anglaise viendra une fois la version française terminée.
- C'est un site personnel plus qu'un portfolio classique : il montre une manière de penser et de travailler, prouvée par quelques exemples bien choisis.

## Le monde
- **Abandonnés :** les îles flottantes et tout monde en 3D, puis la coupe souterraine (Claude Design en a fait un terrier réaliste et vide, qu'Alix a rejeté).
- **Retenu :** une ville imaginaire empilée et foisonnante, avec des objets géants du quotidien d'Alix au milieu des maisons. Référence principale : un triptyque généré par ChatGPT (tourne-disque, valise, cabinet d'objets sous une lampe, ville empilée avec ponts et rivière), complété par General Condition.
- **Un seul monde, quatre quartiers.** Chaque pôle est un quartier de la scène globale, repérable par un objet géant. Un clic zoome dans ce quartier, qui révèle des objets cliquables et son contenu :
  - Les coulisses : un théâtre ouvert en coupe, une caméra géante ;
  - L'IA, avec une âme : le téléphone géant devenu bâtiment ;
  - Mener la barque : la rivière qui traverse tout le monde, la barque ;
  - Chez moi : la maison ouverte, le tourne-disque sur le toit.
- « Creuser sous la surface » reste le nom de la transition, mais le monde n'est plus souterrain.

## Répartition du travail
- **Claude Design :** uniquement les illustrations, en SVG découpé en calques nommés, dans cet ordre :
  1. la scène globale en **desktop** (1440 × 900), ajustée jusqu'à validation par Alix ;
  2. **seulement ensuite**, la version **mobile** (390 de large, recomposée à la verticale) ;
  3. puis un décor par quartier, un par un.
- **Claude Code :** les liaisons, la navigation, les textes et les animations, en suivant `docs/wireframes.md`.

## Les 4 pôles (validés, noms provisoires)
1. **Les coulisses** : Club DRH « Ce que veulent les jeunes » (vidéo publique), Filme ton job (YouTube, noté 20/20), aftermovies, micro-trottoirs. Postes visés : chargée de com, événementiel, marque employeur.
2. **L'IA, avec une âme** : mémoire sur l'IA générative en communication interne (3 préconisations, 6 actions, démarche présentée sans données), formation de Sonia Vignon-Riocreux, le site lui-même comme preuve. Plus tard : des projets personnels d'automatisation et de dashboard.
3. **Mener la barque** : alternance à distance (seule à Lyon, équipe à Marseille), Keeply'on (BizDev, coordination de l'équipe, pitch et executive summary montrables, 14e sur environ 50), entrée chez Orange grâce à un portfolio Wix.
4. **Chez moi** : personnalité. Le 20 m² à Saxe-Gambetta, une playlist Spotify dédiée au site, les films, les plantes, les parties de Rummikub chez les grands-parents à Bourg-en-Bresse, le Vietnam seule, les jeux de mots.
- **Contact** : bouton visible en permanence, plus un point d'arrivée en fin de parcours.
- **Navigation** : une barre fixe avec des icônes claires (en bas sur mobile).

## Ce qu'on peut montrer
Tout ce qui ne nuit ni à la recherche d'emploi ni à l'image d'Alix, et qui ajoute une touche humaine. Rien de confidentiel sur Orange (données, équipe, entreprises étudiées dans le benchmark).
- Recommandation LinkedIn publique de sa tutrice (Orange Business, Direction Entreprises Grand Sud Est), citable telle quelle.

## Identité
- **Personnalité :** drôle, jeux de mots, mimiques très expressives, « boring puis révélée ». Goûts datés et assumés : Paul McCartney, les Beatles, Fleetwood Mac, Mika, du disco-rock en ce moment, les Sims, Animal Crossing.
- **Elle aime :** la profusion, les objets géants, la ville empilée, les petites créatures inventées et attachantes, un trait d'encre fait main avec un léger grain d'impression, des couleurs franches et chaudes, la profondeur en plans, un personnage guide, les personnages qui réagissent au survol.
- **Elle rejette :** le réalisme, le vide, les palettes terre, ce qui est sans âme, aseptisé, luxueux ou futuriste. Les personnages lisses façon émojis. Le grain trop fort. Le formalisme.
- **Principe :** s'appuyer fortement sur le triptyque, dont on peut reprendre les éléments (objets, architectures, créatures inventées). Alix dira ensuite ce qu'il faut retirer. Pour General Condition, on s'inspire des codes sans copier leurs éléments.

## Choix techniques
- Parcours en couches 2D qui bougent au défilement, avec des décors de quartier explorables (objets cliquables, à la manière de Genially).
- **Pas de 3D** (ni React Three Fiber ni modèles 3D).
- Respect de prefers-reduced-motion. Le contenu reste en HTML accessible.
- Musique : playlist Spotify intégrée avec le lecteur officiel (extraits de 30 secondes pour les visiteurs non connectés à Spotify). Jamais de lecture automatique.
- Illustrations finales en vecteur (Claude Design), en s'appuyant largement sur le triptyque ChatGPT.
