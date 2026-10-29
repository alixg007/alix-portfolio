"use client";

import { useState } from "react";

/** Flèche « partager » de LinkedIn : partage natif sur mobile, sinon copie du lien. */
export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Partage annulé par le visiteur : rien à faire
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="mt-3 flex items-center gap-1 rounded-full p-2 text-li-muted transition-colors hover:bg-black/5 hover:text-li-text"
    >
      {copied && <span className="text-sm font-semibold">Lien copié</span>}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 5l7 6-7 6M21 11H10a6 6 0 00-6 6v2" />
      </svg>
      <span className="sr-only">Partager ce profil</span>
    </button>
  );
}
