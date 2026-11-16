import Link from "next/link";
import { quarters } from "@/content/world";
import IllustrationPlaceholder from "@/components/world/IllustrationPlaceholder";
import WorldIntro from "@/components/world/WorldIntro";
import RightNow from "@/components/world/RightNow";

/**
 * Emplacement des étiquettes de quartier sur la scène, comme sur les wireframes :
 * en pixels sur mobile (scène recomposée à la verticale), en % sur ordinateur.
 */
const pinPlacement: Record<string, string> = {
  coulisses: "top-[72px] left-5 lg:top-[23%] lg:left-[12.5%]",
  ia: "top-[150px] right-4 lg:right-auto lg:top-[18%] lg:left-[57%]",
  barque: "top-[740px] left-6 lg:top-[51%] lg:left-[69.5%]",
  "chez-moi": "top-[850px] right-6 lg:right-auto lg:top-[39%] lg:left-[82%]",
};

/** La scène globale du monde, avec ses quatre quartiers repérables. */
export default function WorldScene() {
  return (
    <section aria-label="La scène du monde" className="relative min-h-[960px] lg:h-svh lg:min-h-[680px]">
      <IllustrationPlaceholder
        className="absolute inset-0 pt-6 lg:pt-28"
        label="Scène globale : ville empilée · objets géants · créatures · rivière"
      />

      {/* Le personnage guide (illustration à venir) */}
      <p
        aria-hidden="true"
        className="absolute left-1/2 top-[620px] -translate-x-1/2 rounded-lg border-[1.5px] border-dashed border-w-ink bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase text-w-muted lg:left-[44.5%] lg:top-[58%] lg:translate-x-0"
      >
        Guide Alix · sur une échelle, lampe à la main
      </p>

      {/* Toucher un quartier = y entrer */}
      <ul>
        {quarters.map((quarter) => (
          <li key={quarter.slug} className={`absolute ${pinPlacement[quarter.slug]}`}>
            <Link
              href={`/profondeurs/${quarter.slug}`}
              className="flex min-h-11 flex-col justify-center gap-0.5 rounded-lg border-[1.5px] border-w-ink bg-white px-3 py-1.5 text-sm font-semibold text-w-ink shadow-[3px_3px_0_var(--color-w-ink)] transition-transform hover:-translate-y-0.5 lg:text-[15px]"
            >
              {quarter.name}
              <span className="font-mono text-[9px] font-medium uppercase tracking-wide text-w-muted lg:text-[10px]">
                {quarter.landmark}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* La présentation, visible sans défiler */}
      <div className="relative z-10 mx-4 pt-[230px] lg:absolute lg:bottom-[104px] lg:left-8 lg:mx-0 lg:w-[510px] lg:pt-0">
        <WorldIntro />
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden lg:block">
        <RightNow variant="band" />
      </div>
    </section>
  );
}
