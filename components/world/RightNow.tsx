import { rightNow } from "@/content/world";

function Items() {
  return (
    <>
      <li>
        <span aria-hidden="true">♪ </span>J&apos;écoute <cite>{rightNow.listening.title}</cite>, {rightNow.listening.artist}
      </li>
      <li>
        <span aria-hidden="true">⌕ </span>
        {rightNow.looking}
      </li>
      <li>
        <span aria-hidden="true">✎ </span>
        {rightNow.building}
      </li>
    </>
  );
}

/**
 * Le bloc « En ce moment » : un encadré sous le plan sur mobile (wireframe 02),
 * un bandeau sombre en bas de la scène sur ordinateur (wireframe 08).
 */
export default function RightNow({ variant }: { variant: "block" | "band" }) {
  if (variant === "band") {
    return (
      <section
        aria-labelledby="en-ce-moment-bandeau"
        className="flex items-center gap-8 bg-w-ink px-8 py-5 text-[15px] text-white"
      >
        <h2 id="en-ce-moment-bandeau" className="shrink-0 font-mono text-xs uppercase tracking-widest text-white/70">
          En ce moment
        </h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-1">
          <Items />
        </ul>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="en-ce-moment"
      className="rounded-xl border-[1.5px] border-dashed border-w-ink bg-white p-4 text-[15px] text-w-ink"
    >
      <h2 id="en-ce-moment" className="font-mono text-xs uppercase tracking-widest text-w-muted">
        En ce moment
      </h2>
      <ul className="mt-2 flex flex-col gap-1">
        <Items />
      </ul>
    </section>
  );
}
