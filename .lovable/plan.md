# Plan: Zahlungsart „Rechnung nach Lieferung" entfernen

## Was
Auf `/bestellen` wird die Zahlungsart **„Rechnung nach Lieferung"** (id `rechnung`, Hinweis „Nur für Bestandskunden") aus der Liste der Zahlungsmethoden entfernt. Die Klarna-Zahlarten (Sofortüberweisung, Kreditkarte, Rechnung – in 30 Tagen) bleiben unverändert.

## Umsetzung
- `src/routes/bestellen.tsx`: Den Eintrag mit `id: "rechnung"` aus dem Array `PAYMENT_OPTIONS` löschen (Zeilen 143–149).
- Die Id `rechnung` wird sonst nirgendwo im Projekt referenziert (geprüft) — keine weiteren Änderungen nötig. Falls eine gespeicherte Bestellauswahl (localStorage-Entwurf) versehentlich `rechnung` enthält, greift automatisch die erste Zahlungsmethode (Vorkasse).

## Prüfung
- Typecheck (`tsgo`) und Build.
- Playwright: `/bestellen` öffnen und prüfen, dass nur noch 6 Zahlungsmethoden ohne „Rechnung nach Lieferung" angezeigt werden.
