import type { Metadata } from "next";
import WorldNav from "@/components/world/WorldNav";
import WorldScene from "@/components/world/WorldScene";
import WorldPlan from "@/components/world/WorldPlan";
import RightNow from "@/components/world/RightNow";
import ArrivalVeil from "@/components/world/ArrivalVeil";

export const metadata: Metadata = {
  title: "Le monde d'Alix — Alix Gruel",
};

/**
 * Accueil du monde illustré (wireframes 02 en mobile, 08 sur ordinateur).
 * Les zones hachurées attendent les illustrations de Claude Design.
 */
export default function WorldHomePage() {
  return (
    <div className="min-h-screen bg-w-bg text-w-ink">
      <WorldNav />

      <main id="contenu" className="pb-[calc(96px+env(safe-area-inset-bottom))] lg:pb-16">
        <WorldScene />

        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6 lg:px-8 lg:pt-12">
          <WorldPlan />
          <div className="lg:hidden">
            <RightNow variant="block" />
          </div>
        </div>
      </main>

      <ArrivalVeil />
    </div>
  );
}
