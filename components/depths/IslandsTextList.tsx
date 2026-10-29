import { islands, profile } from "@/content/profile";

/** Version texte des îlots : pour lire sans 3D, et quand le navigateur ne sait pas l'afficher. */
export default function IslandsTextList() {
  return (
    <div className="soul-veil min-h-screen px-4 pb-16 pt-24 text-soul-deep">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">De l&apos;autre côté du profil</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Les cinq îlots</h1>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {islands.map((island, i) => (
            <li key={island.slug} className="rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur">
              <p className="font-display font-semibold text-soul-violet">Îlot {i + 1}</p>
              <h2 className="mt-1 text-lg font-semibold">{island.title}</h2>
              <p className="mt-1 text-sm text-soul-deep/80">{island.teaser}</p>
              {island.slug === "contact" && (
                <a href={`mailto:${profile.email}`} className="mt-3 inline-block font-semibold text-li-blue underline">
                  {profile.email}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
