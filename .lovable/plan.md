# Klarna Kreditkarte & Rechnung: gleiches Popup wie Sofortüberweisung

## Ursache (geprüft)
In `src/routes/bestellen.tsx` (Funktion `submit`) wird das Klarna-Popup nur bei `payment === "klarna"` geöffnet. `klarna-cc` und `klarna-rechnung` überspringen diesen Block und senden die Bestellung sofort ans Panel. Gleiches gilt für das Warte-Popup und das Schließen bei Fehlern.

## Änderung
Alle Stellen auf den vorhandenen Helper `isKlarna(payment)` umstellen, damit alle drei Klarna-Arten 1:1 dieselbe Logik haben:
- Zeile 591: `if (isKlarna(payment))` – Popup öffnen, Sitzung erstellen, auf „bezahlt“ warten, erst dann Bestellung senden.
- Zeile 611: Notiz nutzt `KLARNA_LABELS[payment]` statt fest „Klarna Sofortüberweisung“ (z. B. „Klarna Kreditkarte bezahlt (Sitzung …)“).
- Zeile 638: Popup bei Fehler für alle Klarna-Arten schließen.
- Zeile 1189: Warte-Popup für alle Klarna-Arten anzeigen.

Ans Panel geht weiterhin `klarna`, `klarna-cc` bzw. `klarna-rechnung`.

## Prüfung
Typecheck und Build; Browser-Test ohne echte Bestellung: Auswahl Kreditkarte/Rechnung öffnet das Klarna-Popup statt direkt abzuschicken.
