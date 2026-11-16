# Portfolio d'Alix Gruel : à lire avant toute modification

@AGENTS.md

## Les documents de référence

Avant de coder, lis ces fichiers. Ils font foi :
- `docs/brief-portfolio.md` : le concept, les quatre pôles, l'identité visuelle, les choix techniques ;
- `docs/wireframes.md` et les images de `docs/wireframes/` : la structure de chaque écran, en mobile et en desktop.

En cas de conflit entre le code existant et ces documents, **ce sont les documents qui priment**.

## Décisions qui changent le code existant

- **Le monde est une ville illustrée en 2D, avec quatre quartiers.** Ce n'est plus un monde 3D à cinq îlots.
- Le « monde des âmes en 3D » (React Three Fiber, `components/depths/SoulWorld.tsx`, `lib/soulTerrain.ts`) ne correspond plus au projet. **Ne le supprime pas sans l'accord d'Alix,** mais ne construis plus rien dessus.
- La profondeur vient de couches 2D qui bougent au défilement, et non de la 3D.
- Les illustrations viendront de Claude Design (SVG en calques nommés). En attendant, utilise des zones de remplacement neutres.

## Règles de contenu

- **N'invente rien sur Alix.** Utilise uniquement ce qui figure dans `docs/` et `content/profile.ts`. Si une information manque, laisse un emplacement `[À ÉCRIRE]` et signale-le.
- **Rien de confidentiel sur Orange :** ni données, ni noms d'outils internes, ni captures internes, ni logo.
- Le site **vouvoie** le visiteur. Tous les textes sont en français.

## Règles d'expérience

- Mobile d'abord : 390 px, barre de navigation fixe en bas, cibles tactiles d'au moins 44 px.
- Le texte reste toujours sur un panneau uni, lisible au-dessus de l'illustration.
- Respect de `prefers-reduced-motion`. Tout le contenu existe en HTML accessible.
- Aucune lecture automatique de son. Le lecteur Spotify se lance seulement au clic.

## Façon de travailler avec Alix

C'est son premier projet de code. Explique tes choix simplement, avance par petites étapes et vérifie que le site compile (`npm run build`) avant de conclure.
