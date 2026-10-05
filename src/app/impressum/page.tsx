import type { Metadata } from "next";
import { Address, LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/content/company";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function ImpressumPage() {
  const c = COMPANY;
  return (
    <LegalPage title="Impressum" intro={<>RentBase ist ein Angebot der {c.name}.</>}>
      <h2>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
      <Address lines={[c.name, c.street, c.zipCity, c.country]} />

      <h2>Vertreten durch</h2>
      <p>Geschäftsführer: {c.managingDirector}</p>

      <h2>Kontakt</h2>
      <p>
        <span className="block">Telefon: <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></span>
        <span className="block">E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a></span>
      </p>

      <h2>Registereintrag</h2>
      <p>
        <span className="block">Registergericht: {c.registerCourt}</span>
        <span className="block">Registernummer: {c.registerNumber}</span>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>{c.vatId ? `Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ${c.vatId}` : "Die Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG ist beantragt und wird nach Erteilung ergänzt."}</p>

      <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
      <Address lines={[c.managingDirector, c.street, c.zipCity]} />

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. RentBase richtet sich ausschließlich an Unternehmer.</p>
    </LegalPage>
  );
}
