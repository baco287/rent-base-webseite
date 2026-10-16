// Tarife: einzige Quelle für Preise, Fahrzeuglimits und Leistungen.
// Stand 16.10.2026 (Preiserhöhung 150 / 230 / 499 €, Business bis 45 Fahrzeuge): Alle Funktionen sind derzeit in jedem Tarif enthalten; die Tarife unterscheiden sich nur nach Flottengröße.

export const PRICING_IS_PLACEHOLDER = false;
export const PRICE_NOTE = "Alle Preise monatlich, zzgl. MwSt.";
export const PLACEHOLDER_NOTE = "Tarife und Preise dienen aktuell als Platzhalter.";
export const ALL_FEATURES_NOTE = "Alle Funktionen sind derzeit in jedem Tarif enthalten.";
export const LARGER_FLEET_NOTE = "Mehr als 100 Fahrzeuge? Sprich uns an, wir finden einen passenden Tarif.";

export type Plan = {
  id: "start" | "business" | "pro";
  name: string;
  pricePerMonth: number;
  vehicleLimit: number;
  tagline: string;
  recommended?: boolean;
};

export const PLANS: Plan[] = [
  { id: "start", name: "Start", pricePerMonth: 150, vehicleLimit: 10, tagline: "Für kleine Vermieter." },
  { id: "business", name: "Business", pricePerMonth: 230, vehicleLimit: 45, tagline: "Für wachsende Flotten.", recommended: true },
  { id: "pro", name: "Pro", pricePerMonth: 499, vehicleLimit: 100, tagline: "Für große Flotten." },
];

/** In jedem Tarif enthalten. Nur Funktionen, die es in RentBase tatsächlich gibt. */
export const INCLUDED_FEATURES: string[] = [
  "Buchungen und Dispo-Kalender",
  "Fuhrpark mit Wartung und HU-Fälligkeiten",
  "Kundenakte mit Import bestehender Daten",
  "Digitale Mietverträge mit Unterschrift",
  "Digitale Übergabe und Rückgabe mit Fotos",
  "Schadenakten mit Fahrzeugskizze",
  "Rechnungen, Gutschriften und Stornobelege",
  "Zahlungen, Kaution und Auszahlungen",
  "Mahnwesen mit Zahlungserinnerung und Mahnstufen",
  "Bußgeld- und Behördenvorgänge",
  "Mitarbeiter mit Rollen",
  "Eigenes Logo und eigener E-Mail-Absender",
];

export const formatPrice = (euro: number) => `${euro.toLocaleString("de-DE")} €`;
