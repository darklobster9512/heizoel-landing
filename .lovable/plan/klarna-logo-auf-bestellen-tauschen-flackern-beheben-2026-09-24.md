# Klarna-Logo auf /bestellen tauschen + Flackern beheben

## Ziel
Das rosa Klarna-Schriftzug-Bild (Upload `klarnaa.webp`, 1920×808 px) ersetzt das bisherige selbstgebaute `klarna.svg` in der Zahlungsmethode „Klarna Sofortüberweisung". Das Bild liegt künftig im `public`-Ordner und ist beim Anzeigen der Seite bereits geladen, damit es nicht erst nachträglich einblendet (Flackern).

## Umsetzung

1. **Bild in den public-Ordner**
   - Upload auf eine sinnvolle Icon-Größe verkleinern (480 × 202 px, WebP, ~5–10 KB) und als `public/img/klarna.webp` speichern.
   - Alte Datei `public/img/klarna.svg` löschen.

2. **Referenz umstellen**
   - `src/routes/bestellen.tsx`: in der Zahlungsarten-Liste bei `id: "klarna"` die Icon-URL von `/img/klarna.svg` auf `/img/klarna.webp` ändern.
   - Prüfen, ob `klarna.svg` noch an anderen Stellen referenziert wird (aktuell nur diese eine Stelle).

3. **Flackern vermeiden — Logo vor Seitenanzeige laden**
   - Im `head()` der `/bestellen`-Route einen Preload-Hinweis ergänzen: `<link rel="preload" as="image" href="/img/klarna.webp" />` — der Browser lädt das Bild sofort mit dem HTML, bevor die Seite gerendert wird.
   - Am Icon-`<img>` feste Breite/Höhe setzen (passend zum bestehenden Layout der Zahlungs-Icons), damit es beim Laden keine Größenverschiebung gibt.

4. **Prüfung**
   - Typecheck (`tsgo`) und Build-Log kontrollieren.
   - Playwright-Kurztest auf `/bestellen`: Klarna-Karte zeigt neues Logo sofort ohne Nachladen (kein Flackern), Netzwerk zeigt das Bild früh im Ladevorgang; Sichtkontrolle Desktop + Mobil.
