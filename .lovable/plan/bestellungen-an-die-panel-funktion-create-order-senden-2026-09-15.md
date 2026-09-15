# Bestellungen an die Panel-Funktion "create-order" senden

Beim Abschluss der Bestellung auf `/bestellen` wird die Bestellung direkt an die Bestellfunktion des Panel-Projekts geschickt. Sie landet dort in der Bestellübersicht und löst die Telegram-Benachrichtigung aus. Die Zuordnung läuft über die Branding-Kennung `6e0ae941-5466-4946-afaf-7d44edf6da04`.

Adresse der Funktion: `https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order` (geprüft: erreichbar, erlaubt Aufrufe von unserer Domain, keine Anmeldedaten nötig).

## Ablauf für den Kunden

1. Kunde füllt Schritt 2 aus und klickt auf "Jetzt kostenpflichtig bestellen".
2. Der Button zeigt kurz "Bestellung wird übermittelt ..." und ist gesperrt (kein Doppelklick).
3. Bei Erfolg: Weiterleitung auf `/bestaetigung` — dort steht die echte Bestellnummer aus dem Panel statt einer zufällig erzeugten.
4. Bei Problemen: freundlicher roter Hinweis über dem Button mit Bitte, es erneut zu versuchen, plus Telefonnummer als Alternative. Alle Eingaben bleiben erhalten.

Optisch ändert sich sonst nichts — Schritte, Preisleiste und Bestätigungsseite bleiben wie sie sind.

## Technische Umsetzung

- Neue Datei `src/lib/panel-orders.ts`:
  - `PANEL_ORDER_ENDPOINT = "https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order"`, `BRANDING_ID = "6e0ae941-5466-4946-afaf-7d44edf6da04"`.
  - `submitPanelOrder(payload)`: `POST` als JSON, erwartet `{ ok: true, orderNumber, orderId }`; bei `{ ok: false, error }` oder Netzwerkfehler wird eine anzeigbare Fehlermeldung geworfen.
  - Mapper von `OrderDraft` + Formularstand auf das Schema der Panel-Funktion: `brandingId`, `variant`, `liters`, `deliveryPoints` (aus `points`), `hose`, `truck`, `pricePer100`, `total`, `earliestDate`, `slotDate`, `slotPeriod` (`vormittag` | `nachmittag` | `telefon`), `email`, `phone`, `deliveryAddress` / `billingAddress` (salutation, company, firstName, lastName, street, streetNo, plz, city), `notes`, `paymentMethod`, `placedAt`.
- `src/routes/bestellen.tsx`:
  - `submit` wird `async`; neue States `submitting` und `submitError`.
  - Bestellnummer kommt aus der Antwort und wird als `orderNo` in `saveOrderConfirmation` gespeichert; die lokale Zufallsnummer entfällt.
  - Weiterleitung auf `/bestaetigung` erst nach erfolgreicher Antwort.
  - Button in Desktop-Karte und sticky Leiste: Ladezustand + `disabled` während der Übertragung.
- Der Aufruf erfolgt direkt aus dem Browser (die Funktion erlaubt CORS für alle Ursprünge); kein Schlüssel und keine Kopie der Panel-Logik in diesem Projekt.

## Prüfung

- Einmaliger Testaufruf mit unvollständigen Daten, um das erwartete Feldschema der Funktion gegen unsere Zuordnung zu bestätigen; danach eine echte Testbestellung per Browser bis `/bestaetigung`, inklusive Kontrolle der zurückgegebenen Bestellnummer.

## Hinweise

- Die Funktion prüft die Branding-Kennung selbst; ist sie dort unbekannt, erscheint die Meldung als Fehlerhinweis im Formular.
- Testbestellungen erscheinen echt in der Panel-Übersicht und lösen die Telegram-Nachricht aus.
