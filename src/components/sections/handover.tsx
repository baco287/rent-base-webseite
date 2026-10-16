import Image from "next/image";
import { ArrowRight } from "lucide-react";
import uebergabeFoto from "../../../public/bilder/uebergabe-smartphone.webp";

// Foto: KI-Bild (Hand, Smartphone, Transporter, siehe assets-ki/LIZENZ.md). Auf dem Display ist die echte RentBase-
// Übergabe eingesetzt, Schritt 8 von 8 „Abschluss“ (scripts/foto-montage.py, Beispieldaten).

/** Collage-Fläche nach dem Referenzbild: helles Feld, Text oben links, das Foto mit dem Smartphone füllt die Fläche. */
export function Handover() {
  return (
    <section id="uebergabe" aria-labelledby="handover-title" className="@container relative isolate flex scroll-mt-20 flex-col overflow-hidden bg-[#efebe4] 2xl:col-span-12 2xl:min-h-[calc(100svh-2rem)]">
      <div className="flex flex-1 flex-col @3xl:flex-row">
        <div className="relative z-10 px-7 pt-9 sm:px-10 sm:pt-11 @3xl:w-[46%] @3xl:self-center @3xl:py-14 2xl:pl-[max(4rem,calc(50vw-840px+4rem))]">
          <p className="label" data-reveal>Digitale Übergabe</p>
          <h2 id="handover-title" className="display mt-4 text-[clamp(2rem,4.6cqw,3.9rem)]" data-reveal>
            Direkt
            <br />
            am Fahrzeug.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2 @3xl:max-w-md @3xl:text-[17px]" data-reveal>
            Übergabe und Rückgabe erledigst du dort, wo sie stattfinden – mit Smartphone oder Tablet.
          </p>
          <a href="#protokoll" className="btn-gold group mt-6 inline-flex h-11 cursor-pointer items-center gap-2 rounded-[5px] px-4 text-[14px] font-semibold" data-reveal>
            Mehr zur Übergabe
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        {/* Foto: schmal unter dem Text und bis zum unteren Rand, breit als rechte Hälfte */}
        <div className="relative mt-6 min-h-[340px] flex-1 @3xl:mt-0 @3xl:min-h-[420px]">
          <Image
            src={uebergabeFoto}
            alt="Smartphone in der Hand vor einem Transporter, auf dem Display die RentBase-Übergabe im Schritt Abschluss mit Kilometerstand, Tankstand, Schäden, Fotos, Checkliste, Zubehör und Unterschrift (Beispieldaten)"
            fill
            sizes="(min-width: 1536px) 34vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-[64%_42%] @3xl:object-[60%_45%]"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#efebe4_0%,rgb(239_235_228/0)_20%)] @3xl:bg-[linear-gradient(90deg,#efebe4_0%,rgb(239_235_228/0)_25%)]" />
        </div>
      </div>
    </section>
  );
}
