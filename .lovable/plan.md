# Bestellungen an das Heizöl-Panel übergeben

Beim Abschluss der Bestellung auf `/bestellen` wird die Bestellung künftig direkt an das Panel-Projekt "heizöl-panel" gemeldet und landet dort in der Bestellübersicht (inkl. Telegram-Benachrichtigung, die das Panel selbst auslöst). Die Zuordnung erfolgt über die Branding-Kennung `6e0ae941-5466-4946-afaf-7d44edf6da04`.

## Ablauf für den Kunden

1. Kunde füllt Schritt 2 aus und klickt auf "Jetzt kostenpflichtig bestellen".
2. Der Button zeigt kurz "Bestellung wird übermittelt ..." und ist währenddessen gesperrt (kein Doppelklick möglich).
3. Bei Erfolg: Weiterleitung auf `/bestaetigung` — dort wird die echte Bestellnummer aus dem Panel angezeigt, nicht mehr eine zufällig erzeugte.
4. Bei Problemen (Panel nicht erreichbar, Netzwerkfehler): freundlicher Hinweis oberhalb des Buttons mit der Bitte, es erneut zu versuchen, plus Telefonnummer als Alternative. Die eingegebenen Daten bleiben erhalten.

Es ändert sich optisch nichts weiter — Layout, Schritte, Preisleiste und Bestätigungsseite bleiben wie sie sind.

## Technische Umsetzung

- Neue Datei `src/lib/panel-orders.ts`:
  - Konstanten `PANEL_ORDERS_URL` (`https://project--485f594a-9180-4077-adda-eb24ffaadc89.lovable.app/api/public/orders`) und `BRANDING_ID = "6e0ae941-5466-4946-afaf-7d44edf6da04"`.
  - `submitPanelOrder(payload)`: `POST` als JSON, Antwort `{ ok, orderNumber, orderId }` bzw. `{ ok: false, error }`; wirft bei Fehler eine Fehlermeldung, die die UI anzeigen kann.
  - Mapper von `OrderDraft` + Formularstand auf das erwartete Schema des Panel-Endpunkts: `brandingId`, `variant`, `liters`, `deliveryPoints` (aus `points`), `hose`, `truck`, `pricePer100`, `total`, `earliestDate`, `slotDate`, `slotPeriod` (`vormittag` | `nachmittag` | `telefon`), `email`, `phone`, `deliveryAddress` / `billingAddress` (salutation, company, firstName, lastName, street, streetNo, plz, city), `notes`, `paymentMethod`, `placedAt`.
- `src/routes/bestellen.tsx`:
  - `submit` wird `async`; neue States `submitting` und `submitError`.
  - Bestellnummer kommt aus der Antwort (`orderNumber`) und wird in `saveOrderConfirmation` als `orderNo` gespeichert; die lokale Zufalls-Nummer entfällt.
  - Weiterleitung auf `/bestaetigung` erst nach erfolgreicher Antwort.
  - Button (Desktop-Card und sticky Leiste) zeigt Ladezustand, `disabled` während der Übertragung; Fehlermeldung als dezenter roter Hinweis.
- Der Endpunkt liegt unter `/api/public/*` des Panels und erlaubt CORS für alle Ursprünge — es sind keine Schlüssel oder Anmeldedaten in diesem Projekt nötig.

## Hinweise

- Der Panel-Endpunkt prüft die Branding-Kennung serverseitig; falls die Kennung dort nicht existiert, kommt "Unbekannte Branding-ID" zurück und wird als Fehlermeldung angezeigt.
- Läuft die Übertragung, aber das Panel ist noch nicht veröffentlicht, kann die Adresse in `src/lib/panel-orders.ts` an einer Stelle auf die Vorschau-Adresse umgestellt werden.
