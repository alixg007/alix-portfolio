/**
 * Géographie du monde des âmes : relief du sol et position des îlots.
 * Partagée entre l'affichage 3D et les déplacements du visiteur,
 * pour que la petite âme marche toujours exactement sur le sol.
 */

export const ISLAND_RING = 38; // distance des îlots au centre
export const MOUND_RADIUS = 7; // rayon des plateaux des îlots
export const MOUND_FLATNESS = 0.35; // 1 = demi-sphère, plus petit = plus plat
export const WORLD_LIMIT = 95; // le visiteur ne peut pas aller plus loin
export const NEAR_DISTANCE = 13; // distance à laquelle un îlot « s'ouvre »

/** Collines douces : quelques vagues superposées, sans hasard. */
export function baseHeight(x: number, z: number) {
  return (
    1.6 * Math.sin(x * 0.08) * Math.cos(z * 0.07) +
    0.9 * Math.sin(x * 0.17 + 1.3) * Math.sin(z * 0.13 + 0.4) +
    0.35 * Math.sin((x + z) * 0.31)
  );
}

/** Les 5 îlots, en cercle autour du point de départ (le 1er droit devant). */
export const islandCenters = Array.from({ length: 5 }, (_, i) => {
  const angle = (i / 5) * Math.PI * 2;
  const x = -Math.sin(angle) * ISLAND_RING;
  const z = -Math.cos(angle) * ISLAND_RING;
  return { x, z, y: baseHeight(x, z) };
});

/** Hauteur du sol, plateaux des îlots compris. */
export function groundHeight(x: number, z: number) {
  let h = baseHeight(x, z);
  for (const c of islandCenters) {
    const d2 = (x - c.x) ** 2 + (z - c.z) ** 2;
    if (d2 < MOUND_RADIUS ** 2) {
      h = Math.max(h, c.y + MOUND_FLATNESS * Math.sqrt(MOUND_RADIUS ** 2 - d2));
    }
  }
  return h;
}

/** Index de l'îlot le plus proche s'il est à portée, sinon null. */
export function nearestIsland(x: number, z: number) {
  let best: number | null = null;
  let bestD = NEAR_DISTANCE;
  islandCenters.forEach((c, i) => {
    const d = Math.hypot(x - c.x, z - c.z);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/** Hasard reproductible : le décor est identique à chaque visite. */
export function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
