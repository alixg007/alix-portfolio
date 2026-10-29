import type { Metadata } from "next";
import DepthsExperience from "@/components/depths/DepthsExperience";

export const metadata: Metadata = {
  title: "De l'autre côté du profil — Alix Gruel",
};

/**
 * Le monde des âmes : un monde 3D où l'on se déplace pour découvrir les îlots.
 * `?version=texte` ouvre directement la version texte, accessible sans 3D.
 */
export default function DepthsPage() {
  return <DepthsExperience />;
}
