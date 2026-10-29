"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DESTINATION = "/profondeurs";
const DIVE_DURATION = 1200; // doit correspondre à l'animation .is-diving dans globals.css

// Positions fixes (pas de Math.random) pour éviter les écarts serveur / navigateur
const fireflies = [
  { left: "12%", bottom: "18%", delay: "0s" },
  { left: "28%", bottom: "8%", delay: "1.6s" },
  { left: "47%", bottom: "22%", delay: "3.1s" },
  { left: "63%", bottom: "12%", delay: "0.8s" },
  { left: "79%", bottom: "26%", delay: "2.4s" },
  { left: "90%", bottom: "6%", delay: "4s" },
];

export default function DigButton() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const [diving, setDiving] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const divingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function dig() {
    if (divingRef.current) return;
    divingRef.current = true;
    setDiving(true);
    if (reduceMotion) {
      router.push(DESTINATION);
      return;
    }
    // Le zoom part du centre de l'écran, là où se trouve le visiteur dans la page
    const page = document.querySelector<HTMLElement>(".dive-target");
    if (page) page.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;

    document.body.classList.add("is-diving");
    window.setTimeout(() => router.push(DESTINATION), DIVE_DURATION);
  }
  // Toujours la version à jour de dig() pour les observateurs ci-dessous
  const digRef = useRef(dig);
  useEffect(() => {
    digRef.current = dig;
  });

  // On précharge la page suivante pour une transition sans attente.
  // Au départ (ou au retour depuis les profondeurs), la page redevient normale.
  useEffect(() => {
    router.prefetch(DESTINATION);
    return () => {
      document.body.classList.remove("is-diving");
      divingRef.current = false;
      setDiving(false);
    };
  }, [router]);

  // Arrivé tout en bas en faisant défiler, on traverse le profil.
  // « armed » évite de repartir aussitôt quand on revient des profondeurs déjà en bas de page.
  useEffect(() => {
    const bottom = bottomRef.current;
    const section = sectionRef.current;
    if (!bottom || !section) return;
    let armed = false;
    const bottomObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) armed = true;
      else if (armed) digRef.current();
    });
    const sectionObserver = new IntersectionObserver(([entry]) => setSectionInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    bottomObserver.observe(bottom);
    sectionObserver.observe(section);
    return () => {
      bottomObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Aura rose-violette qui monte du bas de l'écran : il y a quelque chose en dessous */}
      <div
        aria-hidden="true"
        className={`aura pointer-events-none fixed inset-x-0 bottom-0 z-20 h-[32vh] transition-opacity duration-700 ${
          sectionInView ? "opacity-0" : "opacity-100"
        }`}
      />

      <section
        ref={sectionRef}
        id="creuser"
        aria-labelledby="creuser-titre"
        className="strata relative mt-4 flex min-h-[120svh] flex-col items-center overflow-hidden px-4 pt-24 text-center sm:pt-32"
      >
        {fireflies.map((f, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="firefly absolute size-2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.8)]"
            style={{ left: f.left, bottom: f.bottom, animationDelay: f.delay }}
          />
        ))}

        <h2 id="creuser-titre" className="font-display text-2xl font-semibold text-soul-deep sm:text-3xl">
          Ce profil n&apos;est que la surface.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-soul-deep/80">
          Passez à travers : cinq îlots vous attendent de l&apos;autre côté, avec mes méthodes, mes
          projets et ma personnalité.
        </p>

        <button
          type="button"
          onClick={dig}
          aria-busy={diving}
          className="group relative mt-8 inline-flex items-center gap-3 rounded-full bg-soul-deep px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_-8px_rgba(59,47,115,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-white disabled:opacity-80"
          disabled={diving}
        >
          <span>{diving ? "Traversée en cours…" : "Traverser le profil"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="animate-nudge size-6 text-soul-pink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v14m0 0-6-6m6 6 6-6" />
          </svg>
        </button>

        <p className="mt-6 text-sm text-soul-deep/80">
          Vous préférez lire ?{" "}
          <a href={`${DESTINATION}?version=texte`} className="underline underline-offset-2">
            Version texte des îlots
          </a>
        </p>

        <p aria-hidden="true" className="mt-auto pb-10 text-sm font-medium text-white">
          … ou continuez de descendre
          <span className="animate-nudge mt-1 block text-xl">↓</span>
        </p>
        {/* Atteindre ce point en faisant défiler déclenche la traversée */}
        <div ref={bottomRef} aria-hidden="true" className="h-px w-full" />
      </section>
    </>
  );
}
