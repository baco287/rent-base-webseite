import { ArrowRight, CalendarDays, CarFront, FileText, UserRound, Wallet } from "lucide-react";
import { Wordmark } from "../ui/logo";

const PARTS = [
  { icon: CalendarDays, label: "Buchung" },
  { icon: UserRound, label: "Kunde" },
  { icon: CarFront, label: "Fahrzeug" },
  { icon: FileText, label: "Dokumente" },
  { icon: Wallet, label: "Zahlung" },
];

/** Collage-Fläche nach dem Referenzbild: fünf Bereiche, feine goldene Linien laufen in RentBase zusammen. */
export function OneSystem() {
  return (
    <section aria-labelledby="one-title" className="@container relative overflow-hidden bg-[#f6f3ee] px-7 py-10 sm:px-10 sm:py-11 2xl:col-span-4 2xl:pl-14 2xl:pr-[max(4rem,calc(50vw-840px+4rem))] 2xl:min-h-[calc(100svh-2rem)] 2xl:flex 2xl:flex-col 2xl:justify-center">
      <div className="flex flex-col gap-12 @3xl:grid @3xl:grid-cols-[0.9fr_1.1fr] @3xl:items-center">
      <div data-reveal>
        <p className="label">Alles in einem System</p>
        <h2 id="one-title" className="display mt-4 text-[clamp(2rem,3vw,2.7rem)]">
          Keine fünf Programme.
          <br />
          RentBase.
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">Buchungen, Fahrzeuge, Kunden, Dokumente, Zahlungen und mehr – in einem System.</p>
      </div>

      <div data-reveal role="img" aria-label="Buchung, Kunde, Fahrzeug, Dokumente und Zahlung laufen in RentBase zusammen">
        <ul aria-hidden className="grid grid-cols-5 gap-1">
          {PARTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white shadow-[0_6px_16px_-10px_rgb(17_19_21/0.3)] sm:size-12">
                <Icon className="size-[20px] text-gold-600" strokeWidth={1.5} />
              </span>
              <span className="text-[11.5px] font-semibold text-ink-2">{label}</span>
            </li>
          ))}
        </ul>
        <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-16 w-full text-gold-400">
          {[100, 300, 500, 700, 900].map((x) => (
            <path key={x} d={`M${x} 0 C ${x} 80, 500 40, 500 120`} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div aria-hidden className="flex items-center justify-center gap-4">
          <div className="flex items-center rounded-[8px] bg-night px-7 py-4 shadow-[0_18px_40px_-18px_rgb(11_13_15/0.7)] ring-1 ring-gold-400/40">
            <Wordmark height={26} tone="dark" />
          </div>
          <ArrowRight className="size-5 text-gold-500" strokeWidth={1.5} />
          <p className="text-[13px] leading-tight font-semibold text-ink-2">
            Deine Vermietung.
            <br />
            <span className="text-gold-600">Ein System.</span>
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
