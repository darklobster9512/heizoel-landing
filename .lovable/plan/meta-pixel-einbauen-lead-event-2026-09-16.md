# Meta Pixel einbauen + Lead-Event

## Ziel
1. Der Meta-Pixel (ID `1078017144584283`) lädt auf allen Seiten und meldet automatisch `PageView`.
2. Auf `/preisrechner/ergebnis` löst der Button „Zur Bestellung" das Event `fbq('track', 'Lead')` aus, bevor zur Bestellseite navigiert wird.

## Änderungen

### 1. Pixel sitewit — `src/routes/__root.tsx`
- Im `head()` des Root-Routings ein zusätzliches Script-Eintrag in `scripts` mit dem exakten Meta-Pixel-Code (Init `1078017144584283` + `PageView`).
- Den `<noscript>`-Fallback (1×1-Bild) im Body der Root-Shell ergänzen, damit auch ohne JavaScript eine Pixel-Anmeldung erfolgt.
- Typdeklaration `window.fbq` ergänzen (z. B. in `src/lib/meta-pixel.ts`), damit TypeScript den Aufruf kennt.

### 2. Lead-Event — `src/routes/preisrechner.ergebnis.tsx`
- In der bestehenden `goToOrder`-Funktion (Klick auf „Zur Bestellung") vor der Navigation:
  `window.fbq?.('track', 'Lead')` — optional mit `content_name: 'ZurBestellung'`.
- Der Rest der Funktion (Entwurf speichern, Navigation zu `/bestellen`) bleibt unverändert.

## Verifikation
- Typecheck und Build-Log prüfen.
- Playwright: Seite öffnen und prüfen, dass `fbevents.js` geladen wird und `fbq` existiert; Klick auf „Zur Bestellung" und Prüfen, dass `Lead` getrackt wurde ( Netzwerkanfrage an `facebook.com/tr` ).
- Hinweis: Der Pixel meldet erst live etwas, wenn die Seite veröffentlicht ist bzw. unter der finalen Domain läuft; in der lokalen Vorschau werden die Anfragen trotzdem gesendet.
