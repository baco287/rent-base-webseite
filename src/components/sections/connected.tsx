import Image from "next/image";
import { BookingScreen, InvoiceScreen } from "../mockups/desktop-screens";
import { PhonePhotos } from "../mockups/device-screens";
import { Container, SectionHead } from "../ui/primitives";

const STATIONS = [
  { place: "Hof", title: "Am Fahrzeug erfasst", note: "Fotos, Kilometer, Unterschrift" },
  { place: "Vorgang", title: "Sofort im Mietvorgang", note: "für Disposition und Büro" },
  { place: "Protokoll", title: "Als PDF versiegelt", note: "per E-Mail an den Kunden" },
  { place: "Rechnung", title: "In die Abrechnung", note: "Zusatzkosten nach Bestätigung" },
];

function Visual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="mx-auto w-[52%] rounded-[2em] shadow-frame">
        <PhonePhotos />
      </div>
    );
  if (i === 1)
    return (
      <div className="overflow-hidden rounded-[8px] shadow-frame">
        <BookingScreen />
      </div>
    );
  if (i === 2)
    return (
      <div className="mx-auto w-[62%] bg-white shadow-frame ring-1 ring-black/5">
        <Image src="/beispiel/uebergabeprotokoll-seite-1.webp" alt="" width={1654} height={2339} sizes="220px" className="h-auto w-full" />
      </div>
    );
  return (
    <div className="overflow-hidden rounded-[8px] shadow-frame">
      <InvoiceScreen />
    </div>
  );
}

/** Desktop und Mobil zusammen: was draußen passiert, landet im selben Vorgang. Wenig Text, die Bilder erzählen. */
export function Connected() {
  return (
    <section aria-labelledby="connected-title" className="bg-canvas py-24 lg:py-36">
      <Container wide>
        <SectionHead id="connected-title" no="05" label="Ein System" align="center" size="xl" title={<>Draußen erfasst.<br />Im Büro sofort verfügbar.</>} />

        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8" aria-label="Weg der Daten vom Fahrzeug bis zur Rechnung">
          <span aria-hidden className="absolute top-[7px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 lg:block" />
          {STATIONS.map((s, i) => (
            <li key={s.place} className="relative flex flex-col" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex items-center gap-3 lg:flex-col lg:gap-4">
                <span className="relative z-10 size-[15px] rounded-full border-[3px] border-canvas bg-gold-400 ring-1 ring-gold-400" />
                <span className="font-mono text-[0.72rem] tracking-[0.14em] text-gold-600 uppercase">{String(i + 1).padStart(2, "0")} · {s.place}</span>
              </div>
              <div className="mt-6 flex items-center lg:min-h-[260px]">
                <div className="w-full">
                  <Visual i={i} />
                </div>
              </div>
              <h3 className="mt-6 text-[1.1rem] font-semibold tracking-[-0.015em] text-ink lg:text-center">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-3 lg:text-center">{s.note}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
