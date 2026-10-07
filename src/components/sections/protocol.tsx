import Image from "next/image";
import { Check, FileText } from "lucide-react";
import { Container, SectionHeader } from "../ui/primitives";

// Beispiel-Übergabeprotokoll: erzeugt mit dem echten RentBase-PDF-Renderer und ausschließlich fiktiven Daten
// (scripts/beispielprotokoll.mts). Die Bilder sind gerasterte Seiten genau dieses PDFs.
const PDF = "/beispiel/uebergabeprotokoll-beispiel.pdf";
const A4 = { w: 1654, h: 2339 };

const POINTS = [
  "Kilometer- und Tankstand zum Zeitpunkt der Übergabe",
  "Schäden auf der Fahrzeugskizze, bestehende und neue getrennt",
  "Checkliste mit Zubehör und Anzahl der Schlüssel",
  "Fahrerprüfung, Fotos und Unterschriften von Mieter und Vermieter",
  "Versiegelt mit Prüfsumme, im Mietvorgang abgelegt und per E-Mail versendbar",
];

export function Protocol() {
  return (
    <section id="protokoll" aria-labelledby="protocol-title" className="scroll-mt-20 overflow-hidden bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader
            id="protocol-title"
            eyebrow="Übergabeprotokoll"
            title="Dokumentiert. Nachvollziehbar. Direkt im Mietvorgang."
            text="Mit dem Abschluss der Übergabe erzeugt RentBase das Protokoll als PDF. Alles, was am Fahrzeug erfasst wurde, steht darin strukturiert und vollständig: vom Kilometer- und Tankstand bis zu Schäden, Zubehör und Unterschriften."
          />
          <ul className="mt-8 space-y-3" data-reveal>
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-ink">
                <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-500" strokeWidth={2.25} />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
            <a
              href={PDF}
              target="_blank"
              rel="noopener"
              className="group inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-line-strong bg-white px-5 text-sm font-medium whitespace-nowrap text-ink transition-[background-color,border-color] duration-200 hover:border-ink-3 hover:bg-surface sm:w-auto"
            >
              <FileText aria-hidden className="size-4 text-gold-600" strokeWidth={1.8} />
              Beispielprotokoll ansehen
              <span className="text-ink-3">(PDF)</span>
            </a>
          </div>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-ink-3" data-reveal>
            Beispiel mit fiktiven Daten. In deinen Protokollen stehen im Kopf deine Firmendaten, auf Wunsch mit deinem Logo.
          </p>
        </div>

        <figure className="relative mx-auto w-full max-w-[560px] sm:mb-[10%] lg:max-w-none" data-reveal>
          <div className="relative pr-[7%] pb-[6%]">
            {/* Seite 2 dahinter, leicht versetzt */}
            <div aria-hidden className="absolute top-[5%] right-0 bottom-0 left-[7%] overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_rgb(20_24_27/0.06),0_18px_40px_-18px_rgb(20_24_27/0.28)] ring-1 ring-black/5">
              <Image src="/beispiel/uebergabeprotokoll-seite-2.webp" alt="" width={A4.w} height={A4.h} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full" />
            </div>
            {/* Seite 1 vorne; antippen öffnet das vollständige PDF (auf kleinen Bildschirmen die lesbare Fassung) */}
            <a
              href={PDF}
              target="_blank"
              rel="noopener"
              aria-label="Beispielprotokoll als PDF öffnen"
              className="relative block cursor-pointer overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_rgb(20_24_27/0.08),0_28px_60px_-24px_rgb(20_24_27/0.35)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_1px_2px_rgb(20_24_27/0.08),0_32px_70px_-24px_rgb(20_24_27/0.42)]"
            >
              <Image
                src="/beispiel/uebergabeprotokoll-seite-1.webp"
                alt="Beispiel eines RentBase-Übergabeprotokolls, Seite 1: Mieter und Fahrzeug, Übergabedaten mit Kilometerstand 42.318 km und Tankstand 7/8, Fahrer- und Führerscheinprüfung sowie Fahrzeugskizze mit markierten Schäden"
                width={A4.w}
                height={A4.h}
                sizes="(min-width: 1024px) 560px, 90vw"
                className="h-auto w-full"
              />
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-ink-3 sm:hidden">Antippen öffnet das vollständige Protokoll als PDF.</p>

          {/* Detail: bei der Übergabe dokumentierter Schaden auf der Skizze (Seite 2) */}
          <div className="relative mx-auto mt-6 w-[78%] max-w-[300px] rounded-md border border-gold-300 bg-white p-3 shadow-lift sm:absolute sm:bottom-[-12%] sm:left-[-6%] sm:mt-0 sm:w-[40%] lg:left-[-10%]">
            <Image
              src="/beispiel/uebergabeprotokoll-detail-schaden.webp"
              alt="Ausschnitt aus dem Protokoll: Fahrzeugskizze rechte Seite mit Schaden Nummer 3 als Raute markiert"
              width={467}
              height={444}
              sizes="300px"
              className="h-auto w-full"
            />
            <figcaption className="mt-2.5 border-t border-line pt-2.5 text-xs leading-snug text-ink-2">
              <span className="eyebrow mb-1 block text-[10px]">Detail · Seite 2</span>
              Schaden 3 als Raute: bei der Übergabe gemeinsam dokumentiert, getrennt von bereits bekannten Schäden.
            </figcaption>
          </div>
        </figure>
      </Container>
    </section>
  );
}
