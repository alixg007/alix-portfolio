"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { islands, profile } from "@/content/profile";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import IslandsTextList from "@/components/depths/IslandsTextList";
import type { WorldControls } from "@/components/depths/SoulWorld";

// La 3D ne se charge que dans le navigateur (elle a besoin de WebGL)
const SoulWorld = dynamic(() => import("@/components/depths/SoulWorld"), { ssr: false });

let webglSupport: boolean | undefined;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noSubscribe = () => () => {};
const askedForText = () => new URLSearchParams(window.location.search).get("version") === "texte";

export default function DepthsExperience() {
  const webgl = useSyncExternalStore(noSubscribe, hasWebGL, () => null);
  const startInText = useSyncExternalStore(noSubscribe, askedForText, () => false);
  const reduceMotion = usePrefersReducedMotion();
  // null = pas encore choisi par le visiteur : on suit l'adresse (?version=texte)
  const [textChoice, setTextChoice] = useState<boolean | null>(null);
  const textMode = textChoice ?? startInText;
  const [near, setNear] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState<number | null>(null);
  const controls = useRef<WorldControls | null>(null);

  const show3D = webgl === true && !textMode;
  const openIsland = near !== null && near !== dismissed ? near : null;

  function handleNear(index: number | null) {
    setNear(index);
    setDismissed(null);
  }

  return (
    <main id="contenu" className="relative min-h-screen">
      {show3D ? (
        <div className="fixed inset-0 overflow-hidden">
          <SoulWorld controlsRef={controls} onNearChange={handleNear} reduceMotion={reduceMotion} />
          {/* Le ciel de la traversée se dissipe à l'arrivée */}
          <div aria-hidden="true" className="soul-veil veil-out pointer-events-none absolute inset-0 z-40" />
        </div>
      ) : webgl === null && !textMode ? (
        <div className="soul-veil fixed inset-0" />
      ) : (
        <IslandsTextList />
      )}

      {/* Barre du haut */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-2 p-3 sm:p-4">
        <Link
          href="/"
          className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-soul-deep shadow-sm backdrop-blur hover:bg-white"
        >
          ↑ Remonter à la surface
        </Link>
        {webgl && (
          <button
            type="button"
            onClick={() => setTextChoice(!textMode)}
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-soul-deep shadow-sm backdrop-blur hover:bg-white"
          >
            {textMode ? "Version 3D" : "Version texte"}
          </button>
        )}
      </div>

      {show3D && (
        <>
          {/* Panneau de l'îlot le plus proche */}
          {openIsland !== null && (
            <section
              aria-live="polite"
              aria-labelledby="ilot-titre"
              className="fixed inset-x-3 bottom-24 z-30 mx-auto max-w-md rounded-2xl bg-white/90 p-5 text-soul-deep shadow-xl backdrop-blur sm:bottom-28"
            >
              <button
                type="button"
                onClick={() => setDismissed(openIsland)}
                className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-soul-deep/60 hover:bg-soul-mist hover:text-soul-deep"
              >
                <span aria-hidden="true">✕</span>
                <span className="sr-only">Fermer</span>
              </button>
              <p className="font-display text-sm font-semibold text-soul-violet">Îlot {openIsland + 1}</p>
              <h2 id="ilot-titre" className="mt-1 pr-8 text-xl font-semibold">
                {islands[openIsland].title}
              </h2>
              <p className="mt-2 text-soul-deep/80">{islands[openIsland].teaser}</p>
              {islands[openIsland].slug === "contact" ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="rounded-full bg-li-blue px-4 py-1.5 font-semibold text-white hover:bg-li-blue-deep"
                  >
                    M&apos;écrire
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-li-blue px-4 py-1.5 font-semibold text-li-blue hover:bg-li-blue-soft"
                  >
                    LinkedIn<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-soul-deep/60">Contenu détaillé bientôt ici.</p>
              )}
            </section>
          )}

          {/* Menu des îlots + aide */}
          <nav aria-label="Aller à un îlot" className="fixed inset-x-0 bottom-0 z-30 p-3 sm:p-4">
            <ul className="mx-auto flex max-w-xl justify-center gap-2">
              {islands.map((island, i) => (
                <li key={island.slug}>
                  <button
                    type="button"
                    onClick={() => controls.current?.travelTo(i)}
                    aria-current={near === i ? "location" : undefined}
                    title={island.title}
                    className={`grid size-11 place-items-center rounded-full font-display text-lg font-semibold shadow-md backdrop-blur transition-colors ${
                      near === i ? "bg-soul-deep text-white" : "bg-white/80 text-soul-deep hover:bg-white"
                    }`}
                  >
                    {i + 1}
                    <span className="sr-only"> : {island.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgba(59,47,115,0.6)]">
              Touchez ou cliquez le sol pour avancer · glissez pour regarder autour · flèches du clavier
            </p>
          </nav>
        </>
      )}
    </main>
  );
}
