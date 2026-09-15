# Logo in der Live-Bestellkarte auf /preisrechner vergrößern

## Aktuell
In `src/routes/preisrechner.index.tsx` rendert die `LiveOrders`-Komponente (Live-Bestellmeldung unterhalb der 3-Schritte-Liste) das Logo mit fester Breite `w-[60px]` — im Vergleich zu Header (134–152 px) und Footer deutlich zu klein.

## Änderung
- Breite des Logos in der Live-Bestellkarte von `w-[60px]` auf `w-[92px]` erhöhen (`h-auto`, `text-brand-logo` bleiben unverändert).
- Prüfen, dass das Logo auf schmalen Screens (mobile Karte) nicht die Textzeile „Bestellung aus …" verdrängt — Layout nutzt bereits Grid mit `minmax(0,1fr)`, sollte sauber umbrechen.

## Technische Details
- Eine Zeile, eine Datei: Zeile 195 in `src/routes/preisrechner.index.tsx`.
- Keine weiteren Seiten betroffen.

## Verifikation
- Playwright-Screenshot der Live-Bestellkarte auf /preisrechner (Desktop + mobile Breite), `bunx tsgo --noEmit`.
