# RentBase Website (rent-base.de)

Marketing-Website für RentBase. Getrennt von der Anwendung (app.rent-base.de): keine Datenbank, keine Server-Logik, alle Seiten statisch.

## Starten

```bash
npm install
npm run dev        # http://localhost:3400
npm run build      # Produktionsbuild
npm run start      # Produktionsbuild lokal auf http://localhost:3400
npm run lint
npm run typecheck
```

## Inhalte pflegen

| Was | Datei |
|---|---|
| Preise, Fahrzeuglimits, Tarif-Leistungen, Platzhalter-Hinweis | `src/content/pricing.ts` |
| Funktionen, Ablauf, Zielgruppen, Vergleich | `src/content/product.ts` |
| FAQ | `src/content/faq.ts` |
| Links (App-Login, Kontakt, „Kostenlos testen“), Navigation, Vertrauenszeile, SEO-Texte | `src/content/site.ts` |
| Farben, Schriften, Abstände (Designsystem) | `src/app/globals.css` (`@theme`) |

Tarif-Leistungen mit `status: "planned"` gibt es in RentBase noch nicht; sie werden nur angezeigt, wenn `SHOW_PLANNED_FEATURES` auf `true` steht.

## Produktdarstellungen

`src/components/mockups/` bildet echte RentBase-Ansichten (Tagesübersicht, Dispo-Kalender, Fahrzeugakte, Rechnung, Kundenakte, Übergabe-Assistent) mit Beispieldaten in HTML/CSS nach. Sie skalieren über Container-Einheiten und können später durch echte Screenshots ersetzt werden.

## Beispiel-Übergabeprotokoll

`public/beispiel/` enthält ein Übergabeprotokoll, das mit dem **echten, unveränderten PDF-Renderer der RentBase-App** (`Rent-Base/src/lib/pdf/handover-pdf.ts`) aus ausschließlich fiktiven Daten erzeugt wurde, dazu gerasterte Seiten (WebP) für die Website. Neu erzeugen (App-Ordner wird nur gelesen, keine Datenbank):

```bash
cd C:/Users/karak/Rent-Base
npx tsx ../Rent-Base-Website/scripts/beispielprotokoll.mts
cd ../Rent-Base-Website/public/beispiel
pdftoppm -r 200 -png -f 1 -l 2 uebergabeprotokoll-beispiel.pdf seite   # danach nach WebP umwandeln
```

## Logo

`public/brand/rentbase-logo.webp` ist das unveränderte Originallogo (PNG-Kopie pixelgleich für OpenGraph). Navigation und Footer zeigen per CSS einen Ausschnitt der Wortmarke (`src/components/ui/logo.tsx`). Das Original hat einen leicht grauen Verlaufshintergrund; für eine saubere Darstellung wird eine freigestellte Variante (SVG oder transparentes PNG) benötigt.
