import { HANDOVER_STEPS, PhoneSignature, TabletDamage } from "../mockups/device-screens";
import { Container, SectionHead } from "../ui/primitives";
import { Parallax } from "../ui/parallax";

// Was am Fahrzeug erfasst wird (im Übergabe-Assistenten der App vorhanden, Stand 07.10.2026).
const CAPTURE: [string, string][] = [
  ["Kilometerstand", "mit letztem Stand aus der Fahrzeugakte"],
  ["Tankstand", "in Achteln, bei E-Fahrzeugen in Prozent"],
  ["Schäden", "auf der Fahrzeugskizze, mit Fotos"],
  ["Fotos", "Pflichtfotos rundum, Tacho und Tank"],
  ["Checkliste", "Zubehör und Fahrzeugzustand"],
  ["Fahrer & Dokumente", "Identität und Führerschein geprüft"],
  ["Unterschrift", "Mieter, auf Wunsch auch Vermieter"],
];

/** Mobile Übergabe: großes Tablet als Bühne, daneben ein Datenblatt dessen, was erfasst wird. */
export function Handover() {
  return (
    <section id="uebergabe" aria-labelledby="handover-title" className="on-dark relative isolate scroll-mt-16 overflow-hidden bg-night py-24 lg:py-36">
      <div aria-hidden className="absolute top-1/2 right-[-10%] -z-10 h-[80%] w-[70%] -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_178_122/0.09),transparent)]" />
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead id="handover-title" no="03" label="Übergabe & Rückgabe" size="xl" title="Direkt am Fahrzeug." />
          <p className="lead max-w-md lg:justify-self-end lg:pb-3" data-reveal>
            Übergabe und Rückgabe erledigst du dort, wo sie stattfinden. Auf dem Tablet oder Smartphone, Schritt für Schritt.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[1.55fr_0.75fr] lg:items-center lg:gap-16">
          <div className="relative pb-[8%] sm:pr-[10%]" data-reveal>
            <Parallax amount={24}>
              <div className="rounded-[1.6em] shadow-product">
                <TabletDamage />
              </div>
            </Parallax>
            <div className="absolute right-0 bottom-0 w-[30%] max-sm:w-[38%] max-sm:right-[-2%]">
              <Parallax amount={56}>
                <div className="rounded-[2em] shadow-product">
                  <PhoneSignature />
                </div>
              </Parallax>
            </div>
          </div>

          <div data-reveal>
            <p className="label">Erfasst in {HANDOVER_STEPS.length} Schritten</p>
            <dl className="mt-6 border-t border-night-line">
              {CAPTURE.map(([k, v], i) => (
                <div key={k} className="grid grid-cols-[2.2rem_1fr] border-b border-night-line py-3.5">
                  <dt className="contents">
                    <span className="font-mono text-[0.75rem] text-gold-300/80">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">{k}</span>
                  </dt>
                  <dd className="col-start-2 text-sm text-white/55">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/55">Bei der Rückgabe vergleicht RentBase mit der Übergabe und schlägt Mehrkilometer und Betankung vor.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
