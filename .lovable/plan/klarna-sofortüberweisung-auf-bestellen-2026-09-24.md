# Klarna Sofortüberweisung auf /bestellen

## Ablauf für den Kunden

1. In Schritt 2 gibt es bei den Zahlungsmethoden eine fünfte Option **„Klarna Sofortüberweisung"** (Klarna-Logo, Text „Sofort per Online-Banking bezahlen – sicher über Klarna.").
2. Kunde füllt alles aus, wählt Klarna und klickt auf „Jetzt kostenpflichtig bestellen".
3. Nach der normalen Formularprüfung öffnet sich ein **Popup-Fenster** mit dem Klarna-Plugin (klarna.secure-pay.app). Dort sind Betrag und E-Mail bereits hinterlegt.
4. Auf der Bestellseite erscheint solange eine Überlagerung „Zahlung wird in Klarna abgeschlossen …" mit Button „Klarna-Fenster erneut öffnen" und „Abbrechen".
5. Sobald das Plugin meldet, dass die Zahlung erfolgreich war, schließt sich das Popup, die Bestellung wird ans Panel gesendet (wie bisher) und der Kunde landet auf `/bestaetigung`.
6. Schließt der Kunde das Popup ohne zu zahlen oder bricht ab: Hinweis „Zahlung wurde nicht abgeschlossen", alle Eingaben bleiben erhalten, keine Bestellung wird angelegt.
7. Wird das Popup vom Browser blockiert: Hinweis mit Button „Klarna öffnen", der es per Klick erneut startet.

Andere Zahlungsarten funktionieren unverändert.

## Wie das Plugin angesprochen wird (aus dem Referenzprojekt)

Das Plugin bietet drei öffentliche Schnittstellen:
- `POST https://klarna.secure-pay.app/api/public/session-create` – legt eine Zahlungssitzung an mit `amount_cents`, `customer_email`, `shop_domain`, `shop_logo_url`, optional `return_url`/`webhook_url`. Antwort: `session_id` und `checkout_url`.
- `GET …/api/public/session-get?id=…` – liefert u. a. `status` (`pending` → `paid`, sobald der Kunde im Plugin abschließt).
- Webhook an `webhook_url` bei Erfolg (nutzen wir nicht, da dieses Projekt kein eigenes Backend hat).

Das Plugin sendet keine Nachricht zurück an das öffnende Fenster; die „Response" ist der Status `paid` der Sitzung. Deshalb fragt die Bestellseite den Status regelmäßig ab.

## Technische Umsetzung

- Shop-Logo: das bereits exportierte transparente Logo (Deutschland-Streifen, HEIZÖL DEUTSCHLAND, Sterne, 4,9) wird als `public/img/heizoel-deutschland-logo.png` abgelegt und ist damit öffentlich unter `https://heizoel-deutschland.com/img/heizoel-deutschland-logo.png` erreichbar.
- Neue Datei `src/lib/klarna-pay.ts`:
  - `KLARNA_BASE = "https://klarna.secure-pay.app"`, `SHOP_DOMAIN = "heizoel-deutschland.com"`, `SHOP_LOGO_URL = "https://heizoel-deutschland.com/img/heizoel-deutschland-logo.png"`.
  - `createKlarnaSession({ totalEuro, email })` sendet exakt diese Daten (JSON, `content-type: application/json`):

```text
amount_cents   = Math.round(Gesamtpreis in Euro * 100)   ganze Zahl > 0, z. B. 3863,40 € -> 386340
customer_email = die in Schritt 2 oben eingegebene E-Mail (getrimmt, kleingeschrieben)
shop_domain    = "heizoel-deutschland.com"
shop_logo_url  = "https://heizoel-deutschland.com/img/heizoel-deutschland-logo.png"
```

  - Gesamtpreis kommt aus der gespeicherten Bestellauswahl (derselbe Betrag wie in Preisleiste und Bestellübersicht), damit Klarna und Panel immer denselben Betrag erhalten.
  - Vor dem Absenden wird geprüft: Betrag gültig und > 0, E-Mail gültig. Bei Fehlantwort des Plugins (z. B. 400/500) erscheint ein verständlicher Hinweis, das Popup wird geschlossen, keine Bestellung wird angelegt.
  - Antwort `session_id` und `checkout_url` werden geprüft; fehlt eines, gilt es als Fehler.
  - `getKlarnaStatus(id)` → GET session-get, gibt `status` zurück (zusätzlich wird geprüft, dass `amount_cents` und `customer_email` der Antwort mit den gesendeten Werten übereinstimmen).
  - `waitForKlarnaPayment(id, popup, signal)` → prüft alle 2 Sek. den Status; löst bei `paid` auf, bricht ab bei Abbruch, geschlossenem Popup (mit kurzer Nachfrist und letzter Statusprüfung) oder nach 20 Min.
- `src/routes/bestellen.tsx`:
  - Neuer Eintrag `klarna` in der Zahlungsarten-Liste (Logo als `public/img/klarna.svg`, schlicht gehalten, passend zu den anderen Zeilen).
  - In `submit`: bei `payment === "klarna"` zuerst leeres Popup synchron beim Klick öffnen (`window.open("", "klarna", "width=600,height=860")`, verhindert Popup-Blocker), dann Sitzung erstellen und Popup auf `checkout_url` setzen, anschließend `waitForKlarnaPayment`.
  - Erst nach `paid`: Popup schließen, `submitPanelOrder` wie bisher aufrufen (Zahlungsart `klarna`, Klarna-Sitzungsnummer in den Hinweisen/Payload mitgeben), Bestätigung speichern, Weiterleitung auf `/bestaetigung`.
  - Neue Zustände für die Warte-Überlagerung, Abbruch und Popup-blockiert-Hinweis.
- `/bestaetigung`: Zahlungsart zeigt „Klarna Sofortüberweisung – bezahlt".
- Keine Schlüssel nötig; das Plugin erlaubt Aufrufe von allen Domains.

## Prüfung

- Testaufruf von session-create/session-get gegen klarna.secure-pay.app, um Antwortformat zu bestätigen.
- Playwright: Klarna wählen, bestellen → Popup öffnet sich mit Plugin; Popup schließen → Hinweis, keine Bestellung; Erfolgsfall durch Durchlaufen des Plugins bis `paid` → Bestellung im Panel und `/bestaetigung`.

## Hinweise

- Der Zahlungsstatus kommt nur aus dem Browser; wer technisch versiert ist, könnte ihn theoretisch umgehen. Für eine serverseitige Absicherung müsste das Panel den Klarna-Status selbst prüfen – optional als späterer Schritt.
- Testbestellungen landen echt im Panel und lösen Telegram aus.
