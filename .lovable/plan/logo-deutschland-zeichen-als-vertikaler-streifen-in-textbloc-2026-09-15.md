# Logo: Deutschland-Zeichen als vertikaler Streifen in Textblock-Höhe

## Ziel
Das Deutschland-Zeichen im Logo ist aktuell ein horizontaler Dreifach-Balken über dem Text. Gewünscht: ein vertikaler Streifen links vom Text, dessen Höhe exakt dem gesamten Textblock entspricht (von Oberkante „HEIZÖL" bis Unterkante der Sterne/„4,9"-Zeile).

## Änderungen (nur `src/components/landing/logo.tsx`)

1. **Deutschland-Zeichen:** Drei vertikale Balken (Schwarz, Rot, Gold) links am Logo, gestapelt übereinander, Gesamthöhe = Höhe des Textblocks inkl. Sterne-Zeile. Breite ca. 10–12 px, leicht abgerundete Ecken.
2. **Textblock:** „HEIZÖL" (bold, schwarz), „DEUTSCHLAND" (thin, schwarz), Sterne (gold) + „4,9" (schwarz) bleiben wie aktuell — nur nach rechts verschoben, damit sie neben dem Streifen beginnen (konsistenter linker Einzug).
3. **viewBox:** Gesamtbreite/-höhe entsprechend anpassen, damit nichts abgeschnitten wird; Seitenverhältnis bleibt, Header-/Footer-Größen (w-[170px], mobil 104 px) bleiben unverändert.
4. **Keine weiteren Änderungen:** Farben, Schriftgewichte, Größen in Header/Footer und anderen Seiten bleiben unberührt.

## Prüfung
- Typecheck + Build
- Playwright-Screenshots: Header und Footer auf Desktop und Mobil (393 px / 320 px) — Streifen sichtbar, volle Texthöhe, nichts abgeschnitten.
