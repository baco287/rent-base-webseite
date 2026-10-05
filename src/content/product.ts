// Produktinhalte der Website. Jede hier genannte Funktion ist im RentBase-Code vorhanden (Stand 29.09.2026).
// Nicht vorhandene Funktionen (z. B. mehrere Standorte, Auswertungen) stehen bewusst NICHT hier. Stand: App @a1f65a1 (05.10.2026).

import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Camera,
  CarFront,
  ClipboardCheck,
  FileSignature,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  Truck,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

export const BENEFITS: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarDays, label: "Buchungen zentral verwalten" },
  { icon: CarFront, label: "Fahrzeuge im Blick behalten" },
  { icon: ClipboardCheck, label: "Digitale Übergabe und Rückgabe" },
  { icon: Receipt, label: "Rechnungen und Zahlungen" },
  { icon: Camera, label: "Schäden dokumentieren" },
];

export const PROCESS: { no: string; title: string; text: string }[] = [
  { no: "01", title: "Buchung", text: "Zeitraum wählen, Verfügbarkeit geprüft, Preis berechnet." },
  { no: "02", title: "Kunde & Fahrzeug", text: "Kundendaten, Führerschein und Fahrzeug an einem Vorgang." },
  { no: "03", title: "Vertrag", text: "Mietvertrag mit Mietbedingungen digital unterschreiben." },
  { no: "04", title: "Übergabe", text: "Kilometer, Tank, Zubehör, Fotos und Unterschrift am Fahrzeug." },
  { no: "05", title: "Rückgabe", text: "Abgleich mit der Übergabe, Mehrkilometer und neue Schäden." },
  { no: "06", title: "Abrechnung", text: "Rechnung direkt aus dem Vorgang, Zusatzkosten inklusive." },
  { no: "07", title: "Zahlung", text: "Zahlungen und Kaution getrennt und nachvollziehbar erfasst." },
];

/** Große Funktionsbereiche mit Produktdarstellung; visual verweist auf eine Mockup-Komponente. */
export type Showcase = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  visual: "calendar" | "fleet" | "invoice" | "customer";
};

export const SHOWCASES: Showcase[] = [
  {
    id: "buchungen",
    eyebrow: "Buchungsverwaltung",
    title: "Alle Reservierungen und laufenden Mieten an einem Ort.",
    text: "Der Dispo-Kalender zeigt, welches Fahrzeug wann vergeben ist. Doppelbelegungen werden beim Buchen erkannt, bevor sie entstehen.",
    points: ["Dispo-Kalender über die ganze Flotte", "Preisberechnung nach Tag, Woche und Monat", "Status von reserviert bis zurückgegeben"],
    visual: "calendar",
  },
  {
    id: "fuhrpark",
    eyebrow: "Fuhrpark",
    title: "Jedes Fahrzeug mit seiner vollständigen Geschichte.",
    text: "Status, Verfügbarkeit, Kilometerstand, Wartung und HU-Termine in einer Fahrzeugakte. Fahrzeuge in der Werkstatt oder gesperrte Fahrzeuge lassen sich nicht versehentlich vermieten.",
    points: ["Fahrzeugakte mit Vermietungen, Schäden und Dokumenten", "Wartungspläne mit Fälligkeiten nach Datum und Kilometern", "Fahrzeuggruppen mit eigenen Preisen"],
    visual: "fleet",
  },
  {
    id: "abrechnung",
    eyebrow: "Rechnungen, Zahlungen & Kaution",
    title: "Die Rechnung entsteht aus der Vermietung.",
    text: "Mietpreis aus dem Vertrag, Mehrkilometer und Tank aus der Rückgabe: RentBase übernimmt die bestätigten Beträge in die Rechnung. Zahlungen und Kaution werden getrennt geführt, damit nichts versehentlich verrechnet wird.",
    points: ["Rechnungen mit PDF und E-Mail-Versand", "Gutschriften und Stornobelege mit eigener Nummer", "Teilzahlungen, Kaution und Auszahlungen nachvollziehbar"],
    visual: "invoice",
  },
  {
    id: "kunden",
    eyebrow: "Kundenverwaltung",
    title: "Kunden mit allen Vermietungen und Belegen.",
    text: "Die Kundenakte bündelt Stammdaten, Ausweis- und Führerscheinangaben, vergangene Mieten, Rechnungen und Zahlungen. Bestehende Kundenlisten lassen sich aus CSV- oder Excel-Dateien übernehmen.",
    points: ["Kundenakte mit Vermietungen, Rechnungen und Zahlungen", "Führerscheinprüfung bei der Übergabe", "Import bestehender Kundendaten"],
    visual: "customer",
  },
];

/** Weitere Funktionen, kompakt dargestellt. */
export const MORE_FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileSignature, title: "Verträge & Dokumente", text: "Mietverträge mit versionierten Mietbedingungen, digitaler Unterschrift und PDF direkt aus dem Vorgang." },
  { icon: ShieldCheck, title: "Schäden", text: "Schadenakten mit Fotos, Skizze, Haftungsprüfung und Reparaturstand, nachvollziehbar bis zur Abrechnung." },
  { icon: LayoutDashboard, title: "Tagesübersicht", text: "Abholungen, Rückgaben, offene Rechnungen, Kautionen und Fristen des Tages auf einen Blick." },
  { icon: Users, title: "Benutzer & Rollen", text: "Inhaber, Disposition und Hof mit passenden Rechten. Jede Geldbewegung wird protokolliert." },
  { icon: Landmark, title: "Bußgelder & Behörden", text: "Anhörungsbögen der richtigen Vermietung und dem Fahrer zuordnen und fristgerecht beantworten." },
  { icon: KeyRound, title: "Kontaktlose Rückgabe", text: "Rückgabe außerhalb der Öffnungszeiten, etwa über eine Schlüsselbox, mit anschließender Prüfung durch das Team." },
  { icon: Wrench, title: "Wartung & HU", text: "Wartungspläne mit Fälligkeiten nach Datum und Kilometerstand, Werkstatttermine und Kosten je Fahrzeug." },
  { icon: Receipt, title: "Mahnwesen", text: "Überfällige Rechnungen im Blick, Zahlungserinnerung und Mahnstufen als PDF per E-Mail, Mahngebühr als eigene Rechnung." },
  { icon: Wallet, title: "Kaution", text: "Kaution erfassen, freigeben oder einbehalten und die Rückzahlung dokumentieren, getrennt von der Miete." },
];

export const HANDOVER_POINTS = ["Kilometerstand", "Tank- oder Ladestand", "Fahrzeugzustand und Zubehör", "Schäden auf der Fahrzeugskizze", "Fotos", "Unterschrift des Kunden", "Rückgabe mit Abgleich"];

/** Teile eines Mietvorgangs (Kernbotschaft). */
export const RECORD_PARTS = ["Kunde", "Fahrzeug", "Zeitraum", "Vertrag", "Übergabe", "Rückgabe", "Schäden", "Zahlungen", "Rechnung"] as const;

export const AUDIENCES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CarFront, title: "Autovermietung", text: "Vom Kleinwagen bis zur Premiumflotte." },
  { icon: Truck, title: "Transportervermietung", text: "Verfügbarkeiten und Vermietungen einfach organisieren." },
  { icon: UserRound, title: "Vermieter mit Team", text: "Disposition, Hof und Inhaber arbeiten im selben Vorgang, jeder mit passenden Rechten." },
  { icon: TrendingUp, title: "Wachsende Vermieter", text: "Strukturen schaffen, ohne die Software wechseln zu müssen." },
];

export const COMPARISON = {
  without: ["Excel-Listen für Buchungen", "Papierverträge", "Fotos auf Mitarbeiter-Handys", "Separate Rechnungssoftware", "Unübersichtliche Fahrzeugzustände"],
  with: ["Ein zentraler Mietvorgang", "Digitale Dokumentation", "Strukturierte Fahrzeughistorie", "Rechnungen direkt aus der Vermietung", "Gemeinsamer Zugriff für das Team"],
};

