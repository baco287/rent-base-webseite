// Zentrale Angaben der Website: Links, Kontakt, Navigation, Vertrauenszeile.
// Nur hier ändern; alle Komponenten lesen daraus.

export const SITE = {
  name: "RentBase",
  url: "https://rent-base.de",
  appLoginUrl: "https://app.rent-base.de/login",
  contactEmail: "info@rent-base.de",
  title: "RentBase – Software für moderne Fahrzeugvermietung",
  description:
    "RentBase verbindet Buchungen, Fahrzeuge, Kunden, digitale Übergaben, Rückgaben und Abrechnung in einer zentralen Software für Fahrzeugvermieter.",
} as const;

/** WhatsApp-Kontakt für Anfragen und Testzugänge. Nummer im internationalen Format ohne +, Leerzeichen. */
export const WHATSAPP = {
  number: "491791528109",
  display: "+49 179 1528109",
  href: `https://wa.me/491791528109?text=${encodeURIComponent("Hallo, ich interessiere mich für RentBase und möchte es kostenlos testen.")}`,
  label: "Per WhatsApp anfragen",
} as const;

/**
 * „Kostenlos testen“: Es gibt noch keine Selbstregistrierung. Testzugänge werden persönlich eingerichtet.
 * Alle Knöpfe führen zum Anfrageformular (#anfrage); mailHref ist der Ausweg, falls der Formularversand nicht klappt.
 */
export const TRIAL = {
  label: "RentBase testen",
  href: "/#anfrage",
  mailHref: `mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Testzugang RentBase")}&body=${encodeURIComponent(
    "Guten Tag,\n\nich möchte RentBase kostenlos testen.\n\nFirma:\nAnzahl Fahrzeuge:\nTelefon (optional):\n",
  )}`,
  note: "Wir richten deinen Testzugang persönlich ein und melden uns per E-Mail oder Telefon.",
} as const;

export const NAV = [
  { href: "/#produkt", label: "Produkt" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#uebergabe", label: "Übergabe" },
  { href: "/#funktionen", label: "Funktionen" },
  { href: "/#preise", label: "Preise" },
] as const;

/** Zweiter Einstieg neben „RentBase testen“: springt zur ersten Produkt-Story. */
export const PRODUCT_LINK = { href: "/#produkt", label: "Produkt ansehen" } as const;

/** Nur Aussagen, die technisch belegt sind: Web-App ohne Installation, Server bei Hetzner in Deutschland. */
export const TRUST_POINTS = ["Keine Installation", "Desktop, Tablet und Smartphone", "Hosting in Deutschland"] as const;
