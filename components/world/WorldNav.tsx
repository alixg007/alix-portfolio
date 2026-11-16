import Link from "next/link";
import { profile } from "@/content/profile";
import { quarters } from "@/content/world";
import WorldIcon from "@/components/world/WorldIcon";

// En attendant la page Contact (étape 4), « Contact » ouvre un e-mail
const contactHref = `mailto:${profile.email}`;

/**
 * Navigation du monde, toujours visible :
 * une barre fixe en bas sur mobile (wireframe 02), des étiquettes en haut à droite sur ordinateur (08).
 * `current` marque le quartier où se trouve le visiteur.
 */
export default function WorldNav({ current }: { current?: string }) {
  return (
    <>
      {/* Mobile et tablette */}
      <nav
        aria-label="Quartiers du monde"
        className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-w-ink bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <ul className="mx-auto flex h-[72px] max-w-xl items-center justify-around px-1">
          {quarters.map((quarter) => {
            const active = current === quarter.slug;
            return (
              <li key={quarter.slug}>
                <Link
                  href={`/profondeurs/${quarter.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] font-semibold ${
                    active ? "bg-w-ink text-white" : "text-w-ink hover:bg-w-bg"
                  }`}
                >
                  <WorldIcon name={quarter.icon} className="size-6" />
                  {quarter.navLabel}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={contactHref}
              className="flex min-h-11 min-w-16 flex-col items-center justify-center gap-1 rounded-xl bg-w-red px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-w-red-deep"
            >
              <WorldIcon name="mail" className="size-6" />
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Ordinateur */}
      <header className="fixed inset-x-0 top-0 z-30 hidden items-center justify-between px-8 py-6 lg:flex">
        <Link
          href="/profondeurs"
          aria-label="Accueil du monde"
          className="grid size-12 place-items-center rounded-xl bg-w-ink text-lg font-bold text-white"
        >
          AG
        </Link>
        <nav aria-label="Quartiers du monde">
          <ul className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide">
            {quarters.map((quarter) => {
              const active = current === quarter.slug;
              return (
                <li key={quarter.slug}>
                  <Link
                    href={`/profondeurs/${quarter.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded border-[1.5px] border-w-ink px-2.5 py-1.5 ${
                      active ? "bg-w-ink text-white" : "bg-white text-w-ink hover:bg-w-bg"
                    }`}
                  >
                    {quarter.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={contactHref}
                className="block rounded border-[1.5px] border-w-red bg-w-red px-2.5 py-1.5 text-white hover:bg-w-red-deep"
              >
                Me contacter
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
