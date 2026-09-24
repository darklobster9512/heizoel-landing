# Klarna-Popup: normales Popup-Fenster statt großes Fenster

## Ausgangslage
Auf `/bestellen` öffnet der Klarna-Checkout ein Browser-Fenster (`window.open`) mit 600 × 860 px. Auf dem Bildschirm des Nutzers erscheint dieses Fenster riesig/fast full width — es soll stattdessen „ganz normal wie ein Popup" aussehen. Die Abdunkelung der Seite (Warte-Dialog „Zahlung wird in Klarna abgeschlossen …") bleibt unverändert bestehen.

## Änderungen (nur `src/routes/bestellen.tsx`)

- Zwei Stellen mit `window.open(url, "klarna", "width=600,height=860")` (Zeile 569 `openKlarnaPopup` und Zeile 1206 „Klarna-Fenster erneut öffnen") auf eine kompakte Popup-Größe umstellen:
  - ca. 480 × 680 px, per Screen-Koordinaten (`left`/`top`) mittig auf dem Bildschirm positioniert.
  - Kleiner gemeinsamer Helper (z. B. `openKlarnaWindow(url)`), damit beide Stellen identisch öffnen — auch wenn der Screen kleiner als das Popup ist, greift die Browser-Standardgröße.
- Der Warte-Dialog (dunkler Fullscreen-Hintergrund + Karte max-w-sm) bleibt wie er ist — Abdunkelung ist gewünscht.

## Verifikation
- `bunx tsgo --noEmit`
- Playwright auf `/bestellen`: Klarna-Zahlungsart wählen, absenden → Popup öffnet sich kompakt und mittig, Warte-Dialog mit Abdunkelung erscheint weiterhin; Screenshot-Kontrolle.
