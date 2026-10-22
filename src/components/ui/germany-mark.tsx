/**
 * Zurückhaltende Deutschlandkennzeichnung: drei feine Streifen in Schwarz, Rot und Gold, keine Flagge, kein Siegel.
 * Auf dunklem Grund bekommt der schwarze Streifen eine helle Kontur, damit er sichtbar bleibt.
 */
export function GermanyMark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex h-[11px] w-[16px] shrink-0 flex-col overflow-hidden rounded-[2px] ${tone === "dark" ? "ring-1 ring-white/25" : "ring-1 ring-black/10"} ${className}`}>
      <span className="flex-1 bg-[#111315]" />
      <span className="flex-1 bg-[#c8102e]" />
      <span className="flex-1 bg-[#e3b33b]" />
    </span>
  );
}
