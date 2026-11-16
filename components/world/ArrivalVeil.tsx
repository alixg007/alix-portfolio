"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Quand on arrive depuis la page LinkedIn, le ciel de la traversée recouvre l'écran :
 * il se dissipe pour révéler le monde. Les autres arrivées se font sans voile.
 *
 * La page LinkedIn ajoute « is-diving » au <body> pendant la traversée (voir DigButton) ;
 * l'effet se relance chaque fois que la page du monde réapparaît, même gardée en mémoire.
 */
export default function ArrivalVeil() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const veil = ref.current;
    if (!veil || !document.body.classList.contains("is-diving")) return;
    // Pas d'annulation au nettoyage : React peut relancer l'effet aussitôt (la classe a alors
    // déjà disparu) et le fondu doit quand même aller jusqu'au bout.
    veil.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 1600,
      delay: 200,
      easing: "ease-out",
      fill: "both",
    });
  }, []);

  return <div ref={ref} aria-hidden="true" className="soul-veil pointer-events-none fixed inset-0 z-40 opacity-0" />;
}
