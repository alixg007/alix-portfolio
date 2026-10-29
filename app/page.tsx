import SurfaceHeader from "@/components/surface/SurfaceHeader";
import ProfileCard from "@/components/surface/ProfileCard";
import ProfileSections from "@/components/surface/ProfileSections";
import SideRail from "@/components/surface/SideRail";
import DigButton from "@/components/surface/DigButton";

export default function SurfacePage() {
  return (
    <div className="dive-root relative min-h-screen">
      <div className="dive-target">
        <SurfaceHeader />

        <main id="contenu" className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-4">
              <ProfileCard />
              <ProfileSections />
            </div>
            <SideRail />
          </div>
        </main>

        <DigButton />
      </div>

      {/* Voile sombre qui recouvre l'écran pendant la plongée */}
      <div aria-hidden="true" className="dive-veil fixed inset-0 z-40 bg-abyss" />
    </div>
  );
}
