# Klarna-Wartepopup: Fullscreen-Overlay → normales Popup

## Ausgangslage
Auf `/bestellen` erscheint beim Klarna-Checkout das Dialog-Fenster „Zahlung wird in Klarna abgeschlossen …" als Fullscreen-Overlay (`fixed inset-0` mit abgedunkeltem Hintergrund über die gesamte Seite). Der Nutzer möchte stattdessen ein normales, kompaktes Popup.

## Änderung (nur `src/routes/bestellen.tsx`, Block ab Zeile 1189)

- Fullscreen-Overlay entfernen: kein `fixed inset-0` mit Seiten abdunkeln mehr.
- Stattdessen ein kleines, fixiertes Dialog-Popup mittig auf der Seite:
  - Kompakte Karte (ca. 300–320 px breit, `rounded-xl`, Schatten, dünner Rahmen — passend zum bisherigen Stil).
  - Dezenter, kaum sichtbarer Schimmer statt der dunklen Vollflächen-Abdunkelung (damit klar ist, dass die Seite gesperrt ist, ohne „full width"-Optik).
  - Inhalt bleibt gleich: Klarna-Logo, Titel, Hinweistext, Buttons „Klarna-Fenster erneut öffnen" (bzw. „Klarna öffnen" bei Popup-Blocker) und „Abbrechen".
- Buttons gestaucht (etwas kompaktere Abstände/Padding), damit alles in die kleinere Karte passt.
- `role="dialog"`, `aria-modal`, `aria-labelledby` bleiben erhalten; Logik (Popup-Blocker, cancelKlarna, Anzeige-Bedingung) unverändert.

## Verifikation
- `bunx tsgo --noEmit`
- Playwright: `/bestellen` aufrufen, Klarna-Zahlungsart wählen und Bestellung absenden lassen (Popup-Blocker-Umweg: Dialog erscheint auch ohne echten Klarna-Server über den Blocker-Pfad) — prüfen, dass das Popup klein und mittig erscheint und die Seite drumherum normal sichtbar bleibt. Screenshot-Kontrolle.
