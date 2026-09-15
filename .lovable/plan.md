# Logo-Anpassung: Schwarzer Text, größere Sterne und 4,9

## Ziel
Das SVG-Logo in `src/components/landing/logo.tsx` wird so angepasst, dass der Text immer schwarz ist, die Sterne und die Bewertung „4,9" deutlich größer wirken und ebenfalls schwarz sind. „DEUTSCHLAND" bleibt erhalten.

## Umsetzung

### 1. `src/components/landing/logo.tsx`
- Text-Farbe von `fill="currentColor"` auf `fill="#171717"` (schwarz) umstellen, sowohl für „HEIZÖL" als auch „DEUTSCHLAND".
- Sterne-Zeile (`★★★★★`) vergrößern:
  - `fontSize` von `14` auf `18` erhöhen.
  - `fill` von `#D9A414` auf `#171717` ändern.
  - `y`-Position leicht anpassen, damit die vergrößerte Zeile nicht abgeschnitten wird.
- Bewertung „4,9" vergrößern:
  - `fontSize` von `12` auf `16` erhöhen.
  - `fill` auf `#171717` setzen.
  - `x`-Position nach rechts rücken, damit sie nicht mit den breiter gewordenen Sternen kollidiert.
- `viewBox="0 0 240 82"` prüfen und bei Bedarf leicht erweitern, falls die größere untere Zeile aus dem sichtbaren Bereich ragt.
- `aria-label` bleibt unverändert: „Heizöl Deutschland, 4,9 von 5 Sternen".

### 2. Keine weiteren Änderungen
- Header, Footer, mobile Sidebar und alle anderen Einsatzorte des Logos bleiben unverändert; das Logo behält seine bestehenden Klassen und Größen.
- Keine Backend-, Routing- oder Textänderungen.

## Verifikation
- `tsgo --noEmit` und Build prüfen.
- Screenshots Desktop und Mobil (393 px / 320 px) vom Header und Footer prüfen: Logo vollständig sichtbar, Text schwarz, Sterne und „4,9" größer und schwarz, keine Überschneidungen oder Abschnitte.
