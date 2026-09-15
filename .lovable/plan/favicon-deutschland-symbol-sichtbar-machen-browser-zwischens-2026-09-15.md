# Favicon: Deutschland-Symbol sichtbar machen (Browser-Zwischenspeicher umgehen)

## Ausgangslage

Das neue Deutschland-Symbol (Schwarz-Rot-Gold-Streifen) ist bereits korrekt auf dem Server
hinterlegt und verknüpft: `public/favicon.svg`, `public/favicon.png`, `public/apple-touch-icon.png`.
Das alte smava-Symbol existiert im Projekt nicht mehr — keine Datei, keine Verknüpfung.

Grund, warum du noch das alte Symbol siehst: Browser speichern Tab-Symbole sehr hartnäckig
im Zwischenspeicher. Solange die Adresse `/favicon.svg` gleich bleibt, lädt der Browser das
gespeicherte alte Symbol weiter — auch nach Aktualisierung der Seite.

## Änderung

1. **Versionsnummer an die Symbol-Adressen** in `src/routes/__root.tsx`:
   - `/favicon.svg?v=2`, `/favicon.png?v=2`, `/apple-touch-icon.png?v=2`
   - Für den Browser ist das eine neue Adresse → er lädt das neue Deutschland-Symbol sofort,
     ohne dass du den Zwischenspeicher leeren musst.

2. **Prüfung:** Browser-Test bestätigt, dass die Seite das Deutschland-Symbol ausliefert
   und kein altes Symbol mehr referenziert wird.

## Technische Details

- Betroffene Datei: nur `src/routes/__root.tsx` (drei Zeilen in `head().links`).
- Die Dateien in `public/` bleiben unverändert — sie sind bereits korrekt.
- Hinweis: In deinem eigenen Browser kann das alte Symbol trotzdem kurz sichtbar bleiben,
  bis der Tab einmal neu geladen wurde; neue Besucher sehen sofort das Deutschland-Symbol.
