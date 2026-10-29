import Image from "next/image";
import { profile } from "@/content/profile";

export default function ProfileCard() {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <section
      aria-labelledby="profil-nom"
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(42,36,33,0.06)]"
    >
      {/* Bannière */}
      <div className="banner-texture relative h-36 sm:h-52">
        <div className="absolute inset-y-0 right-4 flex flex-col items-end justify-center text-right sm:right-10">
          <p
            aria-hidden="true"
            className="font-display text-xl font-bold uppercase leading-[1.05] tracking-tight text-accent sm:text-4xl"
          >
            {profile.bannerTitle[0]}
            <br />
            {profile.bannerTitle[1]}
          </p>
          <ul aria-hidden="true" className="mt-3 hidden gap-2 sm:flex">
            {profile.bannerTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-card/80 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative px-5 pb-6 sm:px-8">
        {/* Photo qui déborde sur la bannière */}
        <div className="-mt-16 mb-3 sm:-mt-24">
          <Image
            src={profile.photo}
            alt={`Portrait de ${fullName}`}
            width={176}
            height={176}
            priority
            className="size-32 rounded-full border-4 border-card object-cover shadow-md sm:size-44"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h1 id="profil-nom" className="font-display text-3xl font-semibold tracking-tight">
              {fullName}
            </h1>
            <p className="mt-1 text-lg leading-snug">{profile.headline}</p>
            <p className="text-lg leading-snug text-muted">{profile.subline}</p>

            <p className="mt-2 text-sm text-muted">
              {profile.location} ·{" "}
              <a href={`mailto:${profile.email}`} className="font-semibold text-accent underline-offset-2 hover:underline">
                Coordonnées
              </a>
            </p>
            <p className="mt-1 text-sm font-semibold text-accent">{profile.connections} relations</p>
          </div>

          <ul className="flex flex-col gap-2 text-sm md:pt-1" aria-label="Formation">
            {profile.education.map((edu) => (
              <li key={edu.school} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-md bg-accent text-[10px] font-bold text-card"
                >
                  {edu.school.slice(0, 5)}
                </span>
                <span className="font-semibold">{edu.school}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2 text-sm">
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-moss" />
          {profile.openTo}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-5 py-2 font-semibold text-card transition-colors hover:bg-accent-deep"
          >
            Me contacter
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent px-5 py-2 font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            Voir mon vrai profil LinkedIn
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
          <a
            href="#creuser"
            className="rounded-full border border-line px-5 py-2 font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
          >
            Et en dessous ?
          </a>
        </div>
      </div>
    </section>
  );
}
