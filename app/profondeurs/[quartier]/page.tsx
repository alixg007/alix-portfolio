import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quarters } from "@/content/world";
import WorldNav from "@/components/world/WorldNav";
import IllustrationPlaceholder from "@/components/world/IllustrationPlaceholder";

/**
 * Page d'attente d'un quartier : elle évite les liens morts depuis l'accueil.
 * Le vrai gabarit des quartiers (wireframes 03 à 06) arrive à l'étape 2.
 */

// Les 4 quartiers sont préparés à l'avance ; une autre adresse affiche « page introuvable »
export function generateStaticParams() {
  return quarters.map((quarter) => ({ quartier: quarter.slug }));
}

export async function generateMetadata({ params }: PageProps<"/profondeurs/[quartier]">): Promise<Metadata> {
  const { quartier } = await params;
  const quarter = quarters.find((q) => q.slug === quartier);
  return { title: quarter ? `${quarter.name} — Alix Gruel` : "Alix Gruel" };
}

export default function QuarterPage({ params }: PageProps<"/profondeurs/[quartier]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-w-bg" />}>
      {params.then(({ quartier }) => (
        <QuarterContent slug={quartier} />
      ))}
    </Suspense>
  );
}

function QuarterContent({ slug }: { slug: string }) {
  const quarter = quarters.find((q) => q.slug === slug);
  if (!quarter) notFound();

  return (
    <div className="min-h-screen bg-w-bg text-w-ink">
      <WorldNav current={quarter.slug} />

      <main id="contenu" className="pb-[calc(96px+env(safe-area-inset-bottom))] lg:pb-16 lg:pt-24">
        <IllustrationPlaceholder className="h-64 lg:h-80" label={`Décor du quartier : ${quarter.landmark}`} />

        <div className="mx-auto -mt-10 max-w-xl px-4">
          <div className="rounded-2xl border-[1.5px] border-w-ink bg-white p-5 shadow-[4px_4px_0_var(--color-w-ink)]">
            <h1 className="text-[28px] font-bold leading-tight">{quarter.name}</h1>
            <p className="mt-1 text-w-muted">{quarter.promise}</p>
            <p className="mt-4 rounded-lg bg-w-bg p-3 font-mono text-xs uppercase text-w-muted">
              [À VENIR] Ce quartier se construit à l&apos;étape suivante.
            </p>
            <Link
              href="/profondeurs#plan"
              className="mt-4 inline-flex min-h-11 items-center rounded-full border-[1.5px] border-w-ink px-5 font-semibold hover:bg-w-bg"
            >
              ← Retour au plan du monde
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
