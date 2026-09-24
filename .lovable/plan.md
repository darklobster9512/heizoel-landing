# Zwei weitere Klarna-Zahlungsarten auf /bestellen

## Was Sie sehen
In der Zahlungsarten-Auswahl erscheinen zwei neue Karten, jeweils mit dem rosa Klarna-Logo:
- **Kreditkarte** – Hinweis: „Sichere Zahlung per Kreditkarte über Klarna."
- **Rechnung – in 30 Tagen bezahlen** – Hinweis: „Bequem später zahlen, abgewickelt über Klarna."

Beide öffnen beim Klick auf „Bestellen" genau dasselbe Klarna-Popup wie die Sofortüberweisung (gleiche Daten: Betrag, E-Mail, Shop-Domain, Logo), dasselbe Warte-Fenster und erst nach erfolgreicher Zahlung wird die Bestellung abgeschickt.

## An das Panel übertragen
- Kreditkarte → Zahlungsart `klarna-cc`
- Rechnung 30 Tage → Zahlungsart `klarna-rechnung`
- Sofortüberweisung bleibt `klarna`
- Notiz enthält die passende Bezeichnung + Klarna-Sitzungsnummer.

Die Bestellbestätigung zeigt die jeweils gewählte Zahlungsart als Text.

## Technische Details
- `src/routes/bestellen.tsx`: zwei neue Einträge (`klarna-cc`, `klarna-rechnung`) mit `icon: { url: "/img/klarna.webp" }` in der Zahlungsarten-Liste; Helper `isKlarna(payment)` ersetzt alle `payment === "klarna"`-Prüfungen (Session-Start, Overlay, Abbruch-Fehler); Notiz-Text je nach Methode.
- Payload: `payment` wird unverändert (`klarna-cc` / `klarna-rechnung`) über `panel-orders.ts` als `paymentMethod` gesendet.
- `/bestaetigung`: Label-Mapping um die zwei Methoden ergänzen.
