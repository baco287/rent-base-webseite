import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/content/company";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen", alternates: { canonical: "/agb" } };

// Entwurf, vor Veröffentlichung rechtlich prüfen. Geschäftliche Festlegungen (Laufzeit, Kündigungsfrist, Zahlungsziel,
// Preisanpassung, Datenrückgabe) sind übliche Werte und vom Betreiber zu bestätigen.

export default function AgbPage() {
  const c = COMPANY;
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" intro={<>für die Nutzung der Software RentBase der {c.name}, {c.street}, {c.zipCity} (nachfolgend „Anbieter“).</>}>
      <h2>§ 1 Geltungsbereich</h2>
      <ol>
        <li>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über die Nutzung der Software RentBase zwischen dem Anbieter und seinen Kunden.</li>
        <li>RentBase richtet sich ausschließlich an Unternehmer im Sinne von § 14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Verträge mit Verbrauchern werden nicht geschlossen.</li>
        <li>Abweichende oder ergänzende Geschäftsbedingungen des Kunden gelten nur, wenn der Anbieter ihnen ausdrücklich in Textform zustimmt.</li>
      </ol>

      <h2>§ 2 Leistungsgegenstand</h2>
      <ol>
        <li>Der Anbieter stellt dem Kunden die Software RentBase als webbasierte Anwendung über das Internet zur Nutzung bereit (Software as a Service). Eine Überlassung der Software zur Installation erfolgt nicht.</li>
        <li>RentBase unterstützt Fahrzeugvermieter bei der Organisation und Dokumentation ihrer Vermietungen, unter anderem bei Buchungen, Fahrzeug- und Kundenverwaltung, Mietverträgen, Übergaben und Rückgaben, Schäden, Rechnungen, Zahlungen und Kautionen. Der jeweilige Leistungsumfang ergibt sich aus dem gewählten Tarif und der Leistungsbeschreibung zum Zeitpunkt des Vertragsschlusses.</li>
        <li>RentBase dokumentiert Zahlungen, Kautionen und Auszahlungen. Der Anbieter führt keine Zahlungen aus, zieht keine Beträge ein und verwaltet keine Gelder des Kunden oder seiner Mietkunden.</li>
        <li>Der Anbieter darf die Software weiterentwickeln und Funktionen anpassen, sofern der vertraglich vereinbarte Kern der Leistung erhalten bleibt und die Änderung für den Kunden zumutbar ist.</li>
      </ol>

      <h2>§ 3 Vertragsschluss und Testphase</h2>
      <ol>
        <li>Die Darstellung der Tarife auf der Website ist kein bindendes Angebot. Der Vertrag kommt zustande, wenn der Anbieter die Bestellung des Kunden in Textform bestätigt oder den Zugang zur kostenpflichtigen Nutzung freischaltet.</li>
        <li>Der Anbieter kann eine kostenlose Testphase gewähren. Ihre Dauer wird bei der Einrichtung mitgeteilt. Die Testphase endet automatisch und geht nicht ohne ausdrückliche Bestellung des Kunden in einen kostenpflichtigen Vertrag über.</li>
      </ol>

      <h2>§ 4 Zugang und Pflichten des Kunden</h2>
      <ol>
        <li>Der Kunde hält Zugangsdaten geheim, schützt sie vor dem Zugriff Dritter und informiert den Anbieter unverzüglich, wenn er einen Missbrauch vermutet. Er ist für die Nutzung durch seine Mitarbeiter und die von ihm vergebenen Rollen und Rechte verantwortlich.</li>
        <li>Der Kunde ist für die Inhalte und Daten verantwortlich, die er in RentBase erfasst, insbesondere für deren Richtigkeit und für die Rechtmäßigkeit ihrer Verarbeitung.</li>
        <li>Mietbedingungen, Vertragstexte, Rechnungsangaben und steuerliche Einstellungen legt der Kunde selbst fest. RentBase ersetzt keine rechtliche oder steuerliche Beratung. Der Kunde prüft insbesondere selbst, ob seine Dokumente den für ihn geltenden Anforderungen entsprechen.</li>
        <li>Der Kunde nutzt RentBase nicht missbräuchlich, insbesondere nicht für rechtswidrige Inhalte, zur Störung des Betriebs oder zum Umgehen technischer Schutzmaßnahmen.</li>
      </ol>

      <h2>§ 5 Verfügbarkeit, Wartung und Support</h2>
      <ol>
        <li>Der Anbieter betreibt RentBase mit der gebotenen Sorgfalt und bemüht sich um eine möglichst unterbrechungsfreie Verfügbarkeit. Eine bestimmte Verfügbarkeit ist nur geschuldet, wenn sie ausdrücklich vereinbart wurde.</li>
        <li>Wartungsarbeiten führt der Anbieter nach Möglichkeit außerhalb üblicher Geschäftszeiten durch. Planbare längere Unterbrechungen kündigt er rechtzeitig an.</li>
        <li>Support erhält der Kunde per E-Mail an <a href={`mailto:${c.email}`}>{c.email}</a> oder per WhatsApp. Der Anbieter bearbeitet Anfragen an Werktagen in angemessener Zeit.</li>
      </ol>

      <h2>§ 6 Vergütung und Zahlung</h2>
      <ol>
        <li>Die Vergütung richtet sich nach dem vereinbarten Tarif. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.</li>
        <li>Die Vergütung wird monatlich im Voraus berechnet und ist innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug fällig.</li>
        <li>Überschreitet der Kunde die im Tarif enthaltene Anzahl an Fahrzeugen dauerhaft, kann der Anbieter ihm den passenden Tarif anbieten. Ein Wechsel erfolgt nur mit Zustimmung des Kunden; andernfalls kann der Anbieter die Erfassung weiterer Fahrzeuge begrenzen.</li>
        <li>Der Anbieter kann die Preise mit einer Ankündigungsfrist von sechs Wochen zum Beginn eines Abrechnungszeitraums anpassen. Der Kunde kann in diesem Fall zum Zeitpunkt des Inkrafttretens der Änderung kündigen. Hierauf weist der Anbieter in der Ankündigung hin.</li>
        <li>Gerät der Kunde mit der Zahlung mehr als 30 Tage in Verzug, kann der Anbieter den Zugang nach vorheriger Ankündigung vorübergehend sperren. Die Daten des Kunden bleiben dabei erhalten.</li>
      </ol>

      <h2>§ 7 Laufzeit und Kündigung</h2>
      <ol>
        <li>Der Vertrag läuft auf unbestimmte Zeit und kann von beiden Seiten mit einer Frist von einem Monat zum Ende eines Kalendermonats gekündigt werden.</li>
        <li>Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</li>
        <li>Kündigungen bedürfen der Textform, eine E-Mail genügt.</li>
      </ol>

      <h2>§ 8 Daten des Kunden und Datenschutz</h2>
      <ol>
        <li>Die vom Kunden erfassten Daten bleiben Daten des Kunden. Der Anbieter nutzt sie ausschließlich zur Erbringung der vertraglichen Leistungen.</li>
        <li>Soweit der Anbieter für den Kunden personenbezogene Daten verarbeitet, geschieht dies als Auftragsverarbeiter. Die Parteien schließen hierzu eine Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO, die Bestandteil dieses Vertrags ist.</li>
        <li>Die Daten werden auf Servern in Deutschland gespeichert und regelmäßig gesichert.</li>
        <li>Nach Vertragsende stellt der Anbieter dem Kunden auf Anfrage, die innerhalb von 30 Tagen nach Vertragsende zu stellen ist, die gespeicherten Daten in einem gängigen maschinenlesbaren Format bereit. Danach löscht der Anbieter die Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
      </ol>

      <h2>§ 9 Nutzungsrechte</h2>
      <p>Der Kunde erhält für die Vertragslaufzeit das nicht ausschließliche, nicht übertragbare Recht, RentBase im Rahmen des gewählten Tarifs für eigene geschäftliche Zwecke zu nutzen. Eine Weitergabe des Zugangs an Dritte außerhalb des eigenen Unternehmens ist nicht gestattet.</p>

      <h2>§ 10 Gewährleistung</h2>
      <ol>
        <li>Der Anbieter beseitigt Mängel der Software in angemessener Zeit, nachdem der Kunde sie nachvollziehbar gemeldet hat.</li>
        <li>Die verschuldensunabhängige Haftung für bereits bei Vertragsschluss vorhandene Mängel (§ 536a Abs. 1 Alt. 1 BGB) ist ausgeschlossen.</li>
      </ol>

      <h2>§ 11 Haftung</h2>
      <ol>
        <li>Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei der Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz.</li>
        <li>Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.</li>
        <li>Für den Verlust von Daten haftet der Anbieter nur in dem Umfang, der auch bei ordnungsgemäßer Datensicherung entstanden wäre.</li>
        <li>Im Übrigen ist die Haftung ausgeschlossen.</li>
      </ol>

      <h2>§ 12 Änderungen dieser Bedingungen</h2>
      <p>Der Anbieter kann diese Bedingungen mit Wirkung für die Zukunft ändern, soweit dies für den Kunden zumutbar ist. Er teilt Änderungen mindestens sechs Wochen vor ihrem Inkrafttreten in Textform mit. Widerspricht der Kunde nicht innerhalb dieser Frist, gelten die Änderungen als angenommen. Auf die Folgen eines unterlassenen Widerspruchs weist der Anbieter in der Mitteilung hin. Im Fall eines Widerspruchs kann jede Partei den Vertrag zum Zeitpunkt des Inkrafttretens der Änderung kündigen.</p>

      <h2>§ 13 Schlussbestimmungen</h2>
      <ol>
        <li>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</li>
        <li>Ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Berlin, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.</li>
        <li>Sollte eine Bestimmung dieser Bedingungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</li>
      </ol>

      <p className="mt-10 text-sm">Fragen zu diesen Bedingungen beantworten wir unter <a href={`mailto:${c.email}`}>{c.email}</a>. Weitere Informationen finden Sie auf <Link href="/">{SITE.url.replace("https://", "")}</Link>.</p>
    </LegalPage>
  );
}
