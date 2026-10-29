import Link from "next/link";
import type { Metadata } from "next";
import { islands } from "@/content/profile";

export const metadata: Metadata = {
  title: "Sous la surface — Alix Gruel",
};

/**
 * ÉTAPE 1 : page d'arrivée provisoire.
 * À l'étape 2, le canvas 3D (React Three Fiber) viendra se poser derrière ce contenu,
 * qui restera la version HTML accessible des îles.
 */
export default function DepthsPage() {
  return (
    <main
      id="contenu"
      className="min-h-screen bg-gradient-to-b from-abyss via-dusk to-abyss px-4 py-16 text-card"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-glow">Sous la surface</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Bienvenue dans les profondeurs</h1>
        <p className="mt-4 max-w-prose text-card/80">
          Le monde 3D est en construction. En attendant, voici les cinq îles qui le composeront.
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {islands.map((island, i) => (
            <li
              key={island.slug}
              className="rounded-2xl border border-card/15 bg-card/5 p-5 backdrop-blur"
            >
              <p className="font-display text-glow">Île {i + 1}</p>
              <h2 className="mt-1 text-lg font-semibold">{island.title}</h2>
              <p className="mt-1 text-sm text-card/75">{island.teaser}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-card/30 px-5 py-2 font-semibold hover:bg-card/10"
        >
          ↑ Remonter à la surface
        </Link>
      </div>
    </main>
  );
}
