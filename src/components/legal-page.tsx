import type { ReactNode } from "react";
import { LEGAL_UPDATED } from "@/content/company";
import { Container } from "./ui/primitives";

/** Gemeinsamer Rahmen für Impressum, Datenschutz und AGB: ruhige, gut lesbare Textspalte. */
export function LegalPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <Container className="py-20 lg:py-28">
      <article className="max-w-3xl">
        <p className="eyebrow">Rechtliches</p>
        <h1 className="display mt-4 text-[2.6rem] sm:text-[3.2rem]">{title}</h1>
        {intro && <div className="mt-6 text-[17px] leading-relaxed text-ink-2">{intro}</div>}
        <div className="legal-prose mt-12">{children}</div>
        <p className="mt-16 border-t border-line pt-6 text-sm text-ink-3">Stand: {LEGAL_UPDATED}</p>
      </article>
    </Container>
  );
}

export function Address({ lines }: { lines: (string | null | undefined)[] }) {
  return (
    <p>
      {lines.filter(Boolean).map((l, i) => (
        <span key={i} className="block">{l}</span>
      ))}
    </p>
  );
}
