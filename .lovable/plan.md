# Logo-Korrektur (Header & Footer)

`src/components/landing/logo.tsx` wird angepasst — Header und Footer nutzen beide diese eine Komponente, beide bekommen die Änderung automatisch.

## Änderungen am SVG

1. **Deutschland-Zeichen volle Breite:** Die drei Streifen Schwarz/Rot/Gold werden horizontale Balken oben, die exakt so breit sind wie der Textblock inkl. Sterne und „4,9" (statt schmalem 9-px-Balken links).
2. **Schriftgewichte:** „HEIZÖL" bleibt fett (bold), „DEUTSCHLAND" wird dünn (light/thin, Fontgewicht 300).
3. **Sterne gold:** Die fünf Sterne werden wieder in Gold (`#F4C430`) gefärbt statt schwarz; „4,9" bleibt schwarz.
4. **Größere Skalierung:** Das gesamte SVG wird um ca. 15–20 % vergrößert (Standardbreite der Komponente von 139 px auf ca. 165 px; viewBox entsprechend angehoben), damit es in Header und Footer präsenter wirkt.

## Beispiel-Struktur

```text
 ████████████████████  (schwarz/rot/gold, volle Breite)
 HEIZÖL   (fett)
 Deutschland  (dünn)
 ★★★★★ (gold)  4,9 (schwarz)
```

## Prüfung

- `tsgo --noEmit`, Build-Log
- Playwright-Screenshots: Header Desktop + Footer Desktop, mobil 393 px (Header + geöffnete Sidebar), 320 px
