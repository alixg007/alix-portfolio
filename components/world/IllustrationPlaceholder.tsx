/**
 * Emplacement d'une illustration de Claude Design.
 * Purement décoratif : le contenu existe toujours en HTML à côté.
 */
export default function IllustrationPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`illustration-placeholder flex items-start justify-center border-y-[1.5px] border-dashed border-[#8e8e8e] px-6 pt-6 text-center font-mono text-[11px] leading-relaxed text-w-muted uppercase ${className}`}
    >
      <p className="max-w-md">{label}</p>
    </div>
  );
}
