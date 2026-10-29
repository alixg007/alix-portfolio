import SurfaceHeader from "@/components/surface/SurfaceHeader";
import ProfileCard from "@/components/surface/ProfileCard";
import ProfileSections from "@/components/surface/ProfileSections";
import DigButton from "@/components/surface/DigButton";

export default function SurfacePage() {
  return (
    <div className="dive-root relative min-h-screen">
      <div className="dive-target">
        <SurfaceHeader />

        {/* Même aperçu que LinkedIn sur mobile, centré sur ordinateur */}
        <main id="contenu" className="mx-auto flex max-w-[600px] flex-col gap-2 bg-li-sep pb-2 sm:mt-4 sm:overflow-hidden sm:rounded-lg sm:border sm:border-li-sep">
          <ProfileCard />
          <ProfileSections />
        </main>

        <p className="mx-auto max-w-[600px] px-4 pt-3 text-center text-xs text-li-muted">
          Portfolio inspiré de LinkedIn, sans lien avec LinkedIn Corporation.
        </p>

        <DigButton />
      </div>

      {/* Ciel du monde des âmes qui recouvre l'écran pendant la traversée */}
      <div aria-hidden="true" className="dive-veil soul-veil fixed inset-0 z-40" />
    </div>
  );
}
