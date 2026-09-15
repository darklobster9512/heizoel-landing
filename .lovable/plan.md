# Weiterleitung aller Preis-Schaltflächen auf /preisrechner

## Ergebnis der Prüfung

Alle Schaltflächen „Heizölpreis berechnen" / „Jetzt Heizölpreise vergleichen" / „Preis berechnen" führen bereits auf `/preisrechner` — das wurde beim Entfernen der Kreditvergleich-Reste bereits umgestellt. Einzeln geprüft:

| Schaltfläche | Ort | Ziel |
|---|---|---|
| „Jetzt Heizölpreise vergleichen" (Hero-Karte) | Startseite | bleibt unverändert (Loading-Screen → Ergebnis) |
| „Jetzt Heizölpreise vergleichen" | Startseite, Abschnitt | `/preisrechner` |
| „Preis berechnen" | Kopfzeile (mobil + Desktop) | `/preisrechner` |
| „Heizölpreis berechnen" | Fußzeile (2 Links) | `/preisrechner` |
| „Jetzt Preis berechnen" | Bundesland- und Städteseiten | `/preisrechner` |
| „Jetzt Heizölpreis berechnen" | Heizöl-Wissen | `/preisrechner` |
| „Heizölpreis berechnen" | Kontaktseite (Mini-Formular) | `/preisrechner` |
| „Heizölpreis berechnen" | Bestellbestätigung | `/preisrechner` |

Keine einzige Schaltfläche zeigt noch auf die gelöschte Antragsstrecke oder andere Ziele.

## Umsetzung

1. Keine Code-Änderungen nötig — alle Ziele stimmen bereits.
2. Kurzprüfung im Browser: Startseite, Preisrechner, eine Städteseite, Kontakt und Heizöl-Wissen aufrufen und die Schaltflächen anklicken, um das Ziel `/preisrechner` zu bestätigen.

## Technische Hinweise

- Die Hero-Karte (`src/components/landing/offer-card.tsx` mit `PriceSearchLoading`) bleibt wie gewünscht unverändert: sie validiert die Eingaben, zeigt den Ladebildschirm und landet auf `/preisrechner/ergebnis`.
