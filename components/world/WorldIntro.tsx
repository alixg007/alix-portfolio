import { profile } from "@/content/profile";
import { worldIntro } from "@/content/world";

/** La présentation posée sur la scène : toujours sur un panneau uni, lisible. */
export default function WorldIntro() {
  return (
    <div className="rounded-2xl border-[1.5px] border-w-ink bg-white p-5 shadow-[4px_4px_0_var(--color-w-ink)] sm:p-6">
      <p className="inline-flex items-center gap-2 rounded-full border border-w-green/40 bg-w-green-soft px-3 py-1 text-sm font-medium text-w-ink">
        <span aria-hidden="true" className="size-2 rounded-full bg-w-green" />
        {worldIntro.status}
      </p>
      <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-w-ink sm:text-4xl">
        {worldIntro.title}
      </h1>
      <p className="mt-2 text-base leading-relaxed text-w-ink">{worldIntro.text}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="#plan"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-w-ink px-5 font-semibold text-white transition-colors hover:bg-black"
        >
          <span className="lg:hidden">
            {worldIntro.planButtonMobile} <span aria-hidden="true">↓</span>
          </span>
          <span className="hidden lg:inline">{worldIntro.planButtonDesktop}</span>
        </a>
        {/* En attendant la page Contact (étape 4), le bouton ouvre un e-mail */}
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-w-ink bg-white px-5 font-semibold text-w-ink transition-colors hover:bg-w-bg"
        >
          {worldIntro.contactButton}
        </a>
      </div>
    </div>
  );
}
