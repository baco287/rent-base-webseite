import Image from "next/image";
import appHeute from "../../../public/bilder/app-heute.webp";

/**
 * Laptop in leichter Perspektive wie im Referenzbild. Der Bildschirm ist ein hochaufgelöstes Bild der echten
 * Startseite „Heute“ (aus der Website-Nachbildung gerendert, 3600 px breit), damit er auch geneigt scharf bleibt.
 * Alle Maße in em; die Schriftgröße setzt der umgebende Container über cqw.
 */
export function Laptop3D({ tilt = true, className = "" }: { tilt?: boolean; className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div style={{ fontSize: "calc(100cqw / 52)" }} className="[perspective:2400px]">
        <div className={`origin-[60%_60%] transition-transform duration-700 ease-[var(--ease-out-expo)] ${tilt ? "[transform:rotateY(-17deg)_rotateX(7deg)_rotateZ(1.2deg)]" : ""}`}>
          {/* Bildschirm */}
          <div className="relative rounded-t-[1.2em] bg-[linear-gradient(160deg,#2a2e33,#0d0f12_40%)] p-[0.65em] pb-[0.8em] shadow-[0_2em_4em_-1em_rgb(0_0_0/0.75)] ring-1 ring-white/15">
            <span className="absolute top-[0.22em] left-1/2 size-[0.28em] -translate-x-1/2 rounded-full bg-[#30353b]" />
            <div className="relative overflow-hidden rounded-[0.25em] bg-white">
              <Image src={appHeute} alt="RentBase Startseite „Heute“: Abholungen und Rückgaben des Tages, aktive Mieten, Flotte, offene Punkte und Termine auf dem Hof (Beispieldaten)" sizes="(min-width: 1280px) 900px, 95vw" className="block h-auto w-full" />
              {/* Spiegelung auf dem Glas */}
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.10)_0%,rgb(255_255_255/0)_38%)]" />
            </div>
          </div>
          {/* Unterteil */}
          <div className="relative mx-[-6%] h-[1.25em] rounded-b-[1em] bg-[linear-gradient(180deg,#4a5058_0%,#262a2f_40%,#121417_100%)] shadow-[0_1.6em_2.4em_-0.6em_rgb(0_0_0/0.7)] ring-1 ring-white/10">
            <span className="absolute top-0 left-1/2 h-[0.42em] w-[15%] -translate-x-1/2 rounded-b-[0.45em] bg-[#16191d]" />
          </div>
        </div>
      </div>
    </div>
  );
}
