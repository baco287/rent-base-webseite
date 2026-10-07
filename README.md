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

- `public/brand/rentbase-logo.png`: freigestelltes Originallogo (transparent, 1774 × 887), unverändert.
- `public/brand/rentbase-wordmark.webp`: verkleinerter Ausschnitt der Wortmarke für Navigation und Footer (`src/components/ui/logo.tsx`).
- `public/brand/rentbase-og.png`: Vorschaubild für geteilte Links (1200 × 630), Originallogo mittig auf Weiß.

## Auslieferung und Anfrageformular

Der Container (siehe `Dockerfile`) baut den statischen Export und liefert ihn mit `server/server.mjs` aus, einem kleinen
Node-Server ohne Zugriffsprotokoll. Er nimmt außerdem das Formular „Kostenlos testen“ unter `POST /api/anfrage` an und
schickt die Anfrage als E-Mail an `info@rent-base.de` (Antwort-an = Absender). Anfragen werden auf dem Server nicht gespeichert.

Umgebungsvariablen in Coolify:

| Variable    | Bedeutung                                              |
|-------------|--------------------------------------------------------|
| `SMTP_HOST` | Mailserver des Postfachs (ALL-INKL), z. B. `w0…kasserver.com` |
| `SMTP_PORT` | `465` (Standard, SSL) oder `587`                         |
| `SMTP_USER` | Postfach, über das versendet wird                       |
| `SMTP_PASS` | Passwort dieses Postfachs                               |
| `MAIL_TO`   | Empfänger, Standard `info@rent-base.de`                 |

Ohne `SMTP_HOST` zeigt das Formular E-Mail und WhatsApp als Ausweg. Lokal testen ohne Versand:

```bash
npm run build
cd server && npm install && cd ..
SITE_ROOT=out PORT=3401 SMTP_HOST=test node server/server.mjs
```
