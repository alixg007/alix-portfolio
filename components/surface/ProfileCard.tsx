import Image from "next/image";
import { profile } from "@/content/profile";
import ShareButton from "@/components/surface/ShareButton";

/** En-tête du profil, calqué sur la version mobile de LinkedIn. */
export default function ProfileCard() {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <section aria-labelledby="profil-nom" className="bg-white">
      {/* Bannière (format 4:1, comme sur LinkedIn) */}
      <div className="banner-texture relative aspect-[4/1] min-h-24">
        <div className="absolute inset-y-0 right-4 flex flex-col items-end justify-center text-right sm:right-6">
          <p
            aria-hidden="true"
            className="text-[clamp(0.95rem,4.6vw,1.6rem)] font-black uppercase leading-[1.05] tracking-tight text-accent"
          >
            {profile.bannerTitle[0]}
            <br />
            {profile.bannerTitle[1]}
          </p>
          <ul aria-hidden="true" className="mt-1.5 flex gap-1.5">
            {profile.bannerTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/80 px-2 py-px text-[8px] font-bold uppercase tracking-wide text-accent sm:text-[10px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 pb-5">
        {/* Photo qui déborde sur la bannière, partage à droite */}
        <div className="flex items-start justify-between">
          <Image
            src={profile.photo}
            alt={`Portrait de ${fullName}`}
            width={256}
            height={256}
            priority
            className="relative -mt-[72px] size-32 rounded-full border-4 border-white bg-white object-cover"
          />
          <ShareButton />
        </div>

        <h1 id="profil-nom" className="mt-3 text-2xl leading-tight text-li-text">
          {fullName}
        </h1>
        <p className="mt-1 text-base leading-snug text-li-text">{profile.headline}</p>
        <p className="mt-1 text-base leading-snug text-li-muted">
          {profile.organizations.join(" · ")}
        </p>
        <p className="text-base leading-snug text-li-muted">
          {profile.location}
          <span aria-hidden="true"> · </span>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-li-blue hover:underline"
          >
            {profile.connections} relations
            <span className="sr-only"> (ouvre mon vrai profil LinkedIn dans un nouvel onglet)</span>
          </a>
        </p>

        <div className="mt-4 flex gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex-1 rounded-full bg-li-blue px-4 py-1.5 text-center text-base font-semibold text-white transition-colors hover:bg-li-blue-deep"
          >
            Me contacter
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-li-blue px-4 py-1.5 text-center text-base font-semibold text-li-blue transition-colors hover:bg-li-blue-soft hover:shadow-[inset_0_0_0_1px_var(--color-li-blue)]"
          >
            Vrai profil
            <span className="sr-only"> LinkedIn (nouvel onglet)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
