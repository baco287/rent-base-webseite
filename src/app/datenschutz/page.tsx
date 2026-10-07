import type { Metadata } from "next";
import { Address, LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/content/company";
import { SITE, WHATSAPP } from "@/content/site";

export const metadata: Metadata = { title: "Datenschutzerklärung", alternates: { canonical: "/datenschutz" } };

// Entwurf auf Basis der tatsächlichen technischen Umsetzung (geprüft 05.10.2026):
// keine Cookies, kein Tracking, keine eingebundenen Inhalte Dritter, Schriften lokal, kein Zugriffsprotokoll mit IP
// im Website-Container (nginx access_log off) und im Proxy (Traefik ohne accessLog). Vor Veröffentlichung rechtlich prüfen.

export default function DatenschutzPage() {
  const c = COMPANY;
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro={<>Diese Datenschutzerklärung gilt für die Website {SITE.url.replace("https://", "")}. Für die Nutzung der Anwendung RentBase ({SITE.appLoginUrl.replace("https://", "").replace("/login", "")}) durch unsere Kunden gelten die vertraglichen Regelungen, insbesondere die Vereinbarung zur Auftragsverarbeitung.</>}
    >
      <h2>1. Verantwortlicher</h2>
      <Address lines={[c.name, c.street, c.zipCity, c.country]} />
      <p>
        <span className="block">Vertreten durch den Geschäftsführer {c.managingDirector}</span>
        <span className="block">E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a></span>
        <span className="block">Telefon: {c.phone}</span>
      </p>

      <h2>2. Das Wichtigste in Kürze</h2>
      <ul>
        <li>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Trackingwerkzeuge.</li>
        <li>Es werden keine Inhalte von Drittanbietern geladen. Schriften, Bilder und Skripte liegen auf unserem eigenen Server.</li>
        <li>Die Website wird auf einem Server in Deutschland betrieben. Zugriffsprotokolle mit IP-Adressen werden nicht gespeichert.</li>
        <li>Personenbezogene Daten verarbeiten wir nur, wenn Sie uns kontaktieren, zum Beispiel über das Anfrageformular, per E-Mail oder WhatsApp.</li>
      </ul>

      <h2>3. Hosting und Bereitstellung der Website</h2>
      <p>
        Die Website wird bei der Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen, Deutschland, auf einem Server in Deutschland betrieben. Mit Hetzner besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
      </p>
      <p>
        Beim Aufruf der Website verarbeitet der Server technisch notwendig Ihre IP-Adresse, um die Seite an Ihr Gerät auszuliefern, sowie die vom Browser übermittelten Angaben (zum Beispiel aufgerufene Adresse, Browsertyp, Datum und Uhrzeit). Diese Angaben werden nur für die Dauer der Verbindung verarbeitet. Ein Zugriffsprotokoll mit IP-Adressen wird nicht angelegt. Technische Fehlermeldungen des Servers können einzelne Verbindungsdaten enthalten; sie werden durch eine automatische Größenbegrenzung laufend überschrieben.
      </p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren und fehlerfreien Bereitstellung der Website.</p>

      <h2>4. Verschlüsselung</h2>
      <p>Die Website wird ausschließlich verschlüsselt über HTTPS (TLS) ausgeliefert.</p>

      <h2>5. Cookies, Analyse und Tracking</h2>
      <p>Wir setzen keine Cookies, keine Webanalyse, keine Werbe- oder Social-Media-Dienste und keine Fingerprinting-Techniken ein. Deshalb gibt es auf dieser Website auch keinen Cookie-Hinweis.</p>

      <h2>6. Anfrageformular, Kontakt per E-Mail oder Telefon</h2>
      <p>
        Wenn Sie uns über das Anfrageformular („Kostenlos testen“), per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Angaben (zum Beispiel Name, Firma, E-Mail-Adresse, Telefonnummer und den Inhalt Ihrer Nachricht), um Ihre Anfrage zu bearbeiten.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertragsschluss gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Beantwortung Ihrer Anfrage. Wir löschen die Angaben, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten (zum Beispiel aus Handels- und Steuerrecht) entgegenstehen.
      </p>
      <p>
        Die Angaben aus dem Anfrageformular (Name, Firma, E-Mail-Adresse und, falls angegeben, Telefonnummer, Anzahl der Fahrzeuge und Nachricht) werden verschlüsselt an unseren Server übertragen und von dort als E-Mail an unser Postfach weitergeleitet. Auf dem Server selbst werden die Anfragen nicht gespeichert. Um massenhafte automatisierte Anfragen zu verhindern, hält der Server eine nicht umkehrbar verschlüsselte Kennung (Hashwert) Ihrer IP-Adresse höchstens eine Stunde im Arbeitsspeicher; sie wird nicht dauerhaft gespeichert. Rechtsgrundlage dafür ist Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse ist der Schutz vor Missbrauch des Formulars.
      </p>
      <p>
        Unsere E-Mail-Postfächer werden von der ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland, betrieben. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
      </p>

      <h2>7. Kontakt per WhatsApp</h2>
      <p>
        Sie können uns über den Messenger WhatsApp unter {WHATSAPP.display} erreichen. Die Website selbst bindet WhatsApp nicht ein und überträgt beim Aufruf keine Daten an WhatsApp. Erst wenn Sie auf einen WhatsApp-Link klicken, öffnet sich WhatsApp mit einer vorbereiteten Nachricht; gesendet wird sie erst, wenn Sie selbst auf „Senden“ tippen.
      </p>
      <p>
        Anbieter von WhatsApp ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, ein Unternehmen der Meta-Gruppe. Wenn Sie uns über WhatsApp schreiben, verarbeiten wir Ihre Telefonnummer, Ihren WhatsApp-Namen, Ihr Profilbild, sofern freigegeben, und den Inhalt Ihrer Nachrichten, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertragsschluss gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        Für die Nutzung von WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp. WhatsApp kann Daten, insbesondere Metadaten der Kommunikation, auch in Länder außerhalb der Europäischen Union übermitteln, etwa in die USA. Die Meta-Gruppe ist nach dem EU-US Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der Europäischen Kommission besteht. Die Inhalte der Nachrichten sind Ende-zu-Ende-verschlüsselt. Wenn Sie das nicht möchten, schreiben Sie uns bitte per E-Mail.
      </p>

      <h2>8. Links zur Anwendung</h2>
      <p>Die Links „Anmelden“ führen zur Anwendung RentBase unter {SITE.appLoginUrl.replace("https://", "").replace("/login", "")}. Dort gelten die Datenschutzhinweise und Vereinbarungen der Anwendung.</p>

      <h2>9. Empfänger und Übermittlung in Drittländer</h2>
      <p>Eine Weitergabe Ihrer Daten an Dritte erfolgt nur an die oben genannten Dienstleister oder wenn wir gesetzlich dazu verpflichtet sind. Beim Besuch der Website, bei Nutzung des Anfrageformulars und bei Kontakt per E-Mail findet keine Übermittlung in Länder außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums statt. Bei Kontakt per WhatsApp gelten die Hinweise in Abschnitt 7.</p>

      <h2>10. Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO insbesondere folgende Rechte:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>Wenden Sie sich dazu formlos an <a href={`mailto:${c.email}`}>{c.email}</a>.</p>

      <h2>11. Beschwerderecht bei einer Aufsichtsbehörde</h2>
      <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist:</p>
      <Address lines={["Berliner Beauftragte für Datenschutz und Informationsfreiheit", "Alt-Moabit 59–61", "10555 Berlin"]} />

      <h2>12. Keine automatisierte Entscheidungsfindung</h2>
      <p>Eine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 DSGVO findet nicht statt.</p>

      <h2>13. Änderungen</h2>
      <p>Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Anforderungen ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>
    </LegalPage>
  );
}
