import type { QuarterIcon } from "@/content/world";

// Tracés simples, au trait, dans l'esprit des wireframes
const paths: Record<QuarterIcon | "mail", string> = {
  camera: "M3 7h12v10H3zM15 10.5l6-3.5v10l-6-3.5",
  phone: "M7 2.5h10v19H7zM10.5 18.5h3",
  boat: "M3 16h18l-3 4H6zM12 16V4l6 9h-6M12 6l-5 7h5",
  record: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  mail: "M3 5.5h18v13H3zM3 6l9 7 9-7",
};

export default function WorldIcon({ name, className = "size-6" }: { name: QuarterIcon | "mail"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
