import Image from "next/image";
import { TRIAL } from "@/content/site";
import bueroNacht from "../../../public/bilder/buero-nacht.webp";
import { Laptop3D } from "../mockups/laptop-3d";
import { Button } from "../ui/primitives";
import { Parallax } from "../ui/parallax";

// Bereiche der echten Startseite „Heute“ (src/app/(app)/heute, Stand origin/main 16.10.2026)
const AREAS = ["Abholungen und Rückgaben heute", "Aktive Mieten und Flotte", "Was braucht Aufmerksamkeit?", "Termine heute auf dem Hof"];

/** Collage-Fläche nach dem Referenzbild: dunkel mit Büro bei Nacht (KI-Bild), links Text, rechts Laptop in Perspektive. */
export function Control() {
  return (
    <section aria-labelledby="control-title" className="on-dark relative isolate overflow-hidden bg-night px-6 py-11 sm:px-10 sm:py-12 2xl:col-span-8 2xl:pr-14 2xl:pl-[max(4rem,calc(50vw-840px+4rem))] 2xl:min-h-[calc(100svh-2rem)] 2xl:flex 2xl:flex-col 2xl:justify-center">
      <Image src={bueroNacht} alt="" sizes="(min-width: 1280px) 66vw, 100vw" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0d0f_0%,rgb(11_13_15/0.9)_35%,rgb(11_13_15/0.45)_75%,rgb(11_13_15/0.3)_100%)]" />
      <div className="@container">
        <div className="grid items-center gap-10 @3xl:grid-cols-[0.75fr_1.25fr] @3xl:gap-6">
          <div className="min-w-0" data-reveal>
            <p className="label label-dark">Dashboard</p>
            <h2 id="control-title" className="display mt-4 text-[clamp(2rem,3.6vw,3.1rem)]">
              Deine Vermietung
              <br />
              auf einen Blick.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">Die Startseite „Heute“ zeigt, was ansteht und was liegen geblieben ist. Jede Zeile führt direkt in den Vorgang.</p>
            <ul className="mt-6 space-y-2 border-l border-gold-400/40 pl-4">
              {AREAS.map((a) => (
                <li key={a} className="text-[14px] text-white/80">{a}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={TRIAL.href} variant="gold" size="lg" arrow>{TRIAL.label}</Button>
            </div>
          </div>
          <div className="min-w-0 @3xl:pr-[2%]" data-reveal>
            <Parallax amount={14}>
              <Laptop3D className="drop-shadow-[0_34px_60px_rgb(0_0_0/0.7)]" />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
