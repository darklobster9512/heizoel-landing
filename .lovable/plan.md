# Klarna-Popup startet nicht – Ursache und nächste Schritte

## Ursache (gerade live getestet)
- Anfrage „Zahlung starten" an klarna.secure-pay.app: **Fehler 522** („Server antwortet nicht" – die Domain erreicht den Plugin-Server nicht).
- Startseite des Plugins: **Fehler 403** (Zugriff verweigert).
- Der Shop schickt die Anfrage korrekt; der Fehler liegt an der Domain bzw. dem Plugin-Server, nicht am Shop.

## Was du tun musst (im Plugin-Projekt / bei der Domain)
1. Im Klarna-Plugin-Projekt prüfen, ob es veröffentlicht ist und die eigene Domain klarna.secure-pay.app dort als „aktiv/verbunden" angezeigt wird.
2. DNS-Einträge der Domain prüfen (wie in den Domain-Einstellungen des Plugins angegeben); falls ein Proxy (z. B. Cloudflare) davor sitzt, dort auf „nur DNS" stellen.
3. Danach Bescheid geben – ich teste erneut.

## Optional im Shop
- Wenn du mir die direkte Plugin-Adresse (…lovable.app) nennst, stelle ich den Shop darauf um, bis die Domain wieder läuft. Technisch: nur `BASE` in `src/lib/klarna-pay.functions.ts` ändern.
