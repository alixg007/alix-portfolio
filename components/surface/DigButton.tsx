"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DESTINATION = "/profondeurs";
const DIVE_DURATION = 950; // doit correspondre à l'animation .is-diving dans globals.css

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

  // On précharge la page suivante pour une transition sans attente
  useEffect(() => {
    router.prefetch(DESTINATION);
    return () => document.body.classList.remove("is-diving");
  }, [router]);

  function dig() {
    if (diving) return;
    if (reduceMotion) {
      router.push(DESTINATION);
      return;
    }
    setDiving(true);
    document.body.classList.add("is-diving");
    window.setTimeout(() => router.push(DESTINATION), DIVE_DURATION);
  }

  return (
    <section
      id="creuser"
      aria-labelledby="creuser-titre"
      className="strata relative mt-4 overflow-hidden px-4 pb-20 pt-24 text-center sm:pt-32"
    >
      {fireflies.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="firefly absolute size-1.5 rounded-full bg-glow shadow-[0_0_10px_2px_rgba(242,184,128,0.7)]"
          style={{ left: f.left, bottom: f.bottom, animationDelay: f.delay }}
        />
      ))}

      <h2 id="creuser-titre" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Ce profil n&apos;est que la surface.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-ink/80">
        Cinq îles flottantes vous attendent en dessous : mes méthodes, mes projets, ma personnalité.
      </p>

      <button
        type="button"
        onClick={dig}
        aria-busy={diving}
        className="group relative mt-8 inline-flex items-center gap-3 rounded-full bg-dusk px-8 py-4 text-lg font-semibold text-card shadow-[0_10px_30px_-8px_rgba(22,20,42,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-abyss focus-visible:outline-glow disabled:opacity-80"
        disabled={diving}
      >
        <span>{diving ? "Descente en cours…" : "Creuser sous la surface"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="animate-nudge size-6 text-glow"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4v14m0 0-6-6m6 6 6-6" />
        </svg>
      </button>

      <p className="mt-6 text-sm text-card">
        Vous préférez lire ?{" "}
        <a href={DESTINATION} className="underline underline-offset-2 hover:text-card">
          Version texte des profondeurs
        </a>
      </p>
    </section>
  );
}
