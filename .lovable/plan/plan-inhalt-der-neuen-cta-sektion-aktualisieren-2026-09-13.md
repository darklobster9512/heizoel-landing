# Plan: Inhalt der neuen CTA-Sektion aktualisieren

## Ziel
Die Sektion an der Stelle der ehemaligen grünen CTA (aktuell `ReferralBanner` unter „Heizölsorten im Überblick“) erhält den CTA-Inhalt der vorherigen grünen Vollbreit-Karte, jedoch ohne grünen Hintergrund und ohne das Berater-Bild.

## Änderungen

### 1. `src/components/landing/sections.tsx` — `ReferralBanner` umbauen
- Titel auf `Jetzt Heizöl günstiger bestellen!` setzen.
- Untertitel auf `Schließen Sie sich 25.000+ zufriedenen Kunden an und sparen Sie durchschnittlich €247` setzen.
- Das Berater-Bild (`smavaHero`) entfernen, da der Inhalt jetzt eine reine Text-CTA ist.
- Layout auf zentrierte, kompakte CTA umstellen:
  - Desktop: zentrierter Text-Block, keine zwei Spalten.
  - Mobile: zentrierter Text-Block ohne Bild.
- Button-Text auf `Heizölpreis berechnen` ändern und auf `#rechner` verlinken.
- Vertrauenszeile hinzufügen: `Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise` mit Check-Icons, wie in der alten CTA.
- Hintergrund beibehalten (`bg-surface` / `bg-white`), kein grüner Vollbreit-Hintergrund.

### 2. `src/routes/index.tsx`
- Keine Änderung nötig; `ReferralBanner` bleibt an seiner Position zwischen `HeizoelSorten` und `TrustLinks`.

### 3. Verifikation
- Build laufen lassen.
- Screenshot Desktop & Mobile prüfen: Unter „Heizölsorten im Überblick“ erscheint die neue CTA mit dem aktualisierten Text, dem Button und der Vertrauenszeile.
