import { islands } from "@/content/profile";

export default function SideRail() {
  return (
    <aside aria-label="Informations complémentaires" className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Ce profil a un sous-sol</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Un CV dit ce que j&apos;ai fait. Sous la surface, je vous montre comment je pense, ce que
          je crée et ce qui m&apos;anime.
        </p>
        <a
          href="#creuser"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-dusk px-4 py-2 text-sm font-semibold text-card hover:bg-abyss"
        >
          Descendre voir <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-semibold">À découvrir en profondeur</h2>
          <span className="text-xs text-muted">Sponsorisé par ma curiosité</span>
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          {islands.map((island, i) => (
            <li key={island.slug} className="flex gap-3">
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-dusk font-display text-sm text-glow"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold leading-snug">{island.title}</h3>
                <p className="text-xs text-muted">{island.teaser}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
