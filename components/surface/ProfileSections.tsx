import { profile } from "@/content/profile";
import type { ReactNode } from "react";

function Card({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      className="scroll-mt-24 rounded-2xl border border-line bg-card px-5 py-6 sm:px-8"
    >
      <h2 id={`${id}-titre`} className="font-display text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ProfileSections() {
  return (
    <>
      <Card id="infos" title="Infos">
        <p className="max-w-prose leading-relaxed">{profile.about}</p>
      </Card>

      <Card id="experience" title="Expérience">
        <ol className="flex flex-col gap-5">
          {profile.experiences.map((xp) => (
            <li key={`${xp.org}-${xp.role}`} className="flex gap-4">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-md border border-line bg-paper font-display text-lg font-semibold text-accent"
              >
                {xp.org.charAt(0)}
              </span>
              <div>
                <h3 className="font-semibold">{xp.role}</h3>
                <p className="text-sm">{xp.org}</p>
                <p className="text-sm text-muted">
                  {xp.period}
                  {xp.place ? ` · ${xp.place}` : ""}
                </p>
                <p className="mt-2 max-w-prose text-sm leading-relaxed">{xp.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card id="formation" title="Formation">
        <ul className="flex flex-col gap-4">
          {profile.education.map((edu) => (
            <li key={edu.school}>
              <h3 className="font-semibold">{edu.school}</h3>
              <p className="text-sm">{edu.degree}</p>
              <p className="text-sm text-muted">{edu.period}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card id="competences" title="Compétences">
        <ul className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <li key={skill} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
