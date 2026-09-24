# Klarna-Popup schließt sich sofort – Fehlerbehebung

## Ursache (getestet gegen klarna.secure-pay.app)

Die Seite ist erreichbar, aber der Start der Zahlung scheitert aus zwei Gründen:

1. **Browser-Sperre (CORS):** Bevor der Browser die Zahlung anlegt, fragt er das Plugin, ob der Shop darf. Diese Antwort vom Plugin enthält keine Freigabe für fremde Domains (`access-control-allow-origin` fehlt). Der Browser bricht ab, und der Shop zeigt „Klarna ist gerade nicht erreichbar".
2. **Fehler im Plugin selbst:** Auch ohne Browser-Sperre antwortet das Plugin mit Fehler 500: `Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY`. Im Klarna-Plugin-Projekt ist also das Backend nicht richtig verbunden bzw. der Schlüssel fehlt. Das muss **im Plugin-Projekt** behoben werden, nicht im Shop.

## Änderungen im Shop

- Die Anfragen an Klarna (Sitzung anlegen, Status abfragen) laufen künftig über den Server des Shops statt direkt aus dem Browser. Damit greift die Browser-Sperre nicht mehr, egal wie das Plugin eingestellt ist.
- Echte Fehlermeldungen des Plugins werden in der Entwicklerkonsole protokolliert, damit Ursachen schneller erkennbar sind; der Kunde sieht weiterhin einen verständlichen Hinweis.
- Sonst ändert sich nichts: gleiche Daten (Betrag in Cent, E-Mail, Shop-Domain, Logo), gleiches Popup, Bestellung erst nach „bezahlt".

## Was du im Plugin-Projekt tun musst

- Im Klarna-Plugin-Projekt das Backend (Lovable Cloud) verbinden bzw. den fehlenden Server-Schlüssel hinterlegen. Ich kann das Plugin-Projekt von hier aus nicht ändern.
- Optional: im Plugin die Freigabe für fremde Domains auch bei der Vorab-Anfrage setzen (nicht mehr nötig nach der Änderung oben).

## Technische Details

- Neue Datei `src/lib/klarna-pay.functions.ts` mit `createServerFn`: `createKlarnaSessionFn` (POST) und `getKlarnaStatusFn` (GET), Eingaben per zod geprüft, rufen `https://klarna.secure-pay.app/api/public/session-create` bzw. `session-get` serverseitig auf und geben Status/Fehlertext zurück.
- `src/lib/klarna-pay.ts`: `createKlarnaSession` und `getKlarnaStatus` nutzen diese Server-Funktionen statt `fetch`; Validierung, Betrags-/E-Mail-Abgleich und `waitForKlarnaPayment` bleiben.
- Popup schließen bei Fehler bleibt; Fehlermeldung unterscheidet „nicht erreichbar" und „Plugin-Fehler".

## Prüfung

- Aufruf der Server-Funktion gegen das Plugin: solange der Plugin-Fehler 500 besteht, erscheint der Hinweis; nach Behebung im Plugin öffnet sich das Popup mit dem Klarna-Checkout.
