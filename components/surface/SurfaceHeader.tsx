import Image from "next/image";
import { profile } from "@/content/profile";

/** Barre du haut façon LinkedIn mobile : nom de marque, barre de recherche, photo. */
export default function SurfaceHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-li-sep bg-white">
      <div className="mx-auto flex h-14 max-w-[600px] items-center gap-3 px-4">
        <a
          href="#contenu"
          className="shrink-0 text-[22px] font-bold tracking-tight text-li-blue"
          aria-label="Retour en haut du profil"
        >
          LinkedIn
        </a>

        {/* Purement décoratif : rappelle la barre de recherche de LinkedIn */}
        <div
          aria-hidden="true"
          className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md bg-li-search px-3 text-li-muted"
        >
          <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor">
            <path d="M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.85 6.85 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z" />
          </svg>
          <span className="truncate text-base">Rechercher</span>
        </div>

        <Image
          src={profile.photo}
          alt=""
          width={64}
          height={64}
          className="size-8 shrink-0 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
