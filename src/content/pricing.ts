// Tarife: einzige Quelle für Preise, Fahrzeuglimits und Leistungen. PLATZHALTER – noch nicht final.
//
// Leistungen mit status "planned" gibt es in RentBase noch nicht. Sie werden öffentlich nur angezeigt,
// wenn SHOW_PLANNED_FEATURES auf true steht (dann mit dem Hinweis „in Vorbereitung“).

export const PRICING_IS_PLACEHOLDER = true;
export const SHOW_PLANNED_FEATURES = false;
export const PRICE_NOTE = "Alle Preise zzgl. MwSt.";
export const PLACEHOLDER_NOTE = "Tarife und Preise dienen aktuell als Platzhalter.";

export type PlanFeature = { label: string; status?: "available" | "planned" };

export type Plan = {
  id: "start" | "business" | "pro";
  name: string;
  pricePerMonth: number;
  vehicleLimit: number;
  tagline: string;
  recommended?: boolean;
  /** Tarif, dessen Leistungen vollständig enthalten sind */
  includes?: string;
  features: PlanFeature[];
};

export const PLANS: Plan[] = [
  {
    id: "start",
    name: "Start",
    pricePerMonth: 19,
    vehicleLimit: 5,
    tagline: "Für kleine Vermieter.",
    features: [
      { label: "Buchungen und Dispo-Kalender" },
      { label: "Kundenverwaltung" },
      { label: "Digitale Mietverträge" },
      { label: "Rechnungen" },
      { label: "Digitale Übergabe und Rückgabe" },
    ],
  },
  {
    id: "business",
    name: "Business",
    pricePerMonth: 39,
    vehicleLimit: 25,
    tagline: "Für Vermieter mit Team.",
    recommended: true,
    includes: "Start",
    features: [
      { label: "Mitarbeiter mit Rollen" },
      { label: "Schadenakten mit Fotos" },
      { label: "Zahlungen und Kaution" },
      { label: "Tagesübersicht mit Kennzahlen" },
      { label: "Mahnwesen mit Zahlungserinnerung und Mahnstufen" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    pricePerMonth: 69,
    vehicleLimit: 100,
    tagline: "Für größere Flotten.",
    includes: "Business",
    features: [
      { label: "Bußgeld- und Behördenvorgänge" },
      { label: "Eigenes Logo und eigener E-Mail-Absender" },
      { label: "Prioritäts-Support" },
      { label: "Mehrere Standorte", status: "planned" },
      { label: "Erweiterte Auswertungen", status: "planned" },
    ],
  },
];

export const visibleFeatures = (plan: Plan) => plan.features.filter((f) => SHOW_PLANNED_FEATURES || f.status !== "planned");

export const formatPrice = (euro: number) => `${euro.toLocaleString("de-DE")} €`;
