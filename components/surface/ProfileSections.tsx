"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

/**
 * Section « À propos » façon LinkedIn : seul le premier paragraphe est visible,
 * suivi de « …voir plus » qui déplie le texte complet.
 */
export default function ProfileSections() {
  const [expanded, setExpanded] = useState(false);
  const [preview] = profile.about.split("\n\n");

  return (
    <section id="infos" aria-labelledby="infos-titre" className="scroll-mt-16 bg-white px-4 py-4">
      <h2 id="infos-titre" className="text-xl text-li-text">
        À propos
      </h2>

      {expanded ? (
        <p id="infos-texte" className="mt-3 whitespace-pre-line text-base leading-normal text-li-text">
          {profile.about}
        </p>
      ) : (
        <p id="infos-texte" className="mt-3 text-base leading-normal text-li-text">
          {preview}
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={false}
            aria-controls="infos-texte"
            className="text-li-muted hover:text-li-blue hover:underline"
          >
            …voir plus
          </button>
        </p>
      )}
    </section>
  );
}
