import Link from "next/link";
import { quarters } from "@/content/world";
import WorldIcon from "@/components/world/WorldIcon";

/** Le plan du site : une carte par quartier, avec sa promesse et sa preuve phare. */
export default function WorldPlan() {
  return (
    <section id="plan" aria-labelledby="plan-titre" className="scroll-mt-4 lg:scroll-mt-24">
      <h2 id="plan-titre" className="font-mono text-xs uppercase tracking-widest text-w-muted">
        Le plan du monde · 4 quartiers
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quarters.map((quarter) => (
          <li key={quarter.slug}>
            <Link
              href={`/profondeurs/${quarter.slug}`}
              className="flex h-full gap-3 rounded-xl border-[1.5px] border-w-line bg-white p-4 text-w-ink transition-colors hover:border-w-ink"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border-[1.5px] border-w-ink">
                <WorldIcon name={quarter.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-base font-bold">{quarter.name}</span>
                <span className="mt-0.5 block text-sm text-w-muted">{quarter.promise}</span>
                <span className="mt-0.5 block text-sm">{quarter.proof}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
