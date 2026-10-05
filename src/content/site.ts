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

/**
 * „Kostenlos testen“: Es gibt noch keine Selbstregistrierung. Testzugänge werden persönlich eingerichtet,
 * deshalb führt der Aufruf vorerst zu einer vorbereiteten E-Mail. Später hier auf eine Registrierungsseite umstellen.
 */
export const TRIAL = {
  label: "Kostenlos testen",
  href: `mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Testzugang RentBase")}&body=${encodeURIComponent(
    "Guten Tag,\n\nich möchte RentBase kostenlos testen.\n\nFirma:\nAnzahl Fahrzeuge:\nTelefon (optional):\n",
  )}`,
  note: "Wir richten deinen Testzugang persönlich ein.",
} as const;

export const NAV = [
  { href: "#produkt", label: "Produkt" },
  { href: "#funktionen", label: "Funktionen" },
  { href: "#loesungen", label: "Lösungen" },
  { href: "#preise", label: "Preise" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Nur Aussagen, die technisch belegt sind: Web-App ohne Installation, Server bei Hetzner in Deutschland. */
export const TRUST_POINTS = ["Keine Installation", "Desktop, Tablet und Smartphone", "Hosting in Deutschland"] as const;
