const navItems = [
  { href: "#infos", label: "Infos", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
  { href: "#experience", label: "Expérience", icon: "M4 8h16v11H4zM9 8V5h6v3" },
  { href: "#competences", label: "Compétences", icon: "M12 3l2.6 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.4-.7z" },
  { href: "#creuser", label: "Sous la surface", icon: "M12 4v14m0 0-5-5m5 5 5-5" },
];

export default function SurfaceHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a
          href="#contenu"
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent font-display text-lg font-semibold text-card"
          aria-label="Alix Gruel, retour en haut du profil"
        >
          AG
        </a>
        <p className="hidden truncate text-sm text-muted md:block">
          Portfolio · version « surface »
        </p>

        <nav aria-label="Sections du profil" className="ml-auto">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 rounded-md px-2 py-1 text-muted transition-colors hover:text-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="hidden text-xs sm:block">{item.label}</span>
                  <span className="sr-only sm:hidden">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
