# Klarna-Zahlungsstart zuverlässig reparieren

## Bestätigter Befund

Der Shop sendet die Anfrage korrekt an:
`POST https://klarna.secure-pay.app/api/public/session-create`

Die aktuelle Live-Antwort des Plugins ist HTTP 500:
`Node.js detected but native WebSocket not found.`

Der zuvor fehlende Service-Key wird damit nicht mehr beanstandet. Der neue Fehler entsteht im Klarna-Plugin beim Aufbau des Datenbankzugriffs: Die dort eingesetzte Datenbank-Bibliothek versucht in der veröffentlichten Serverumgebung eine nicht verfügbare WebSocket-Verbindung zu initialisieren. Deshalb wird keine Zahlungssitzung erstellt und das leere Popup vom Shop wieder geschlossen.

## Umsetzung im Projekt „klarna-plugin“

1. **Datenbankzugriff Worker-kompatibel machen**
   - Den aktuellen Admin-Client in den öffentlichen Zahlungs-Endpunkten durch einen reinen HTTPS/REST-Zugriff ersetzen.
   - `SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY` weiterhin ausschließlich serverseitig auslesen.
   - Keine WebSocket-, Realtime- oder Node-spezifische Verbindung initialisieren.

2. **Alle betroffenen Zahlungs-Endpunkte gemeinsam korrigieren**
   - Sitzung anlegen: `/api/public/session-create`
   - Sitzung abfragen: `/api/public/session-get`
   - Zahlungsereignisse speichern und Status aktualisieren: `/api/public/session-event`
   - Einheitliche, aussagekräftige Fehlerantworten beibehalten, ohne Schlüssel oder Kundendaten offenzulegen.

3. **Vollständige Bestelldaten erhalten**
   - Betrag in Cent
   - Kunden-E-Mail
   - Shop-Domain `heizoel-deutschland.com`
   - Shop-Logo-URL
   - Sitzungs-ID und Zahlungsstatus

4. **Live-Ablauf prüfen**
   - Neue Sitzung direkt gegen `klarna.secure-pay.app` erzeugen und eine gültige `session_id` sowie `checkout_url` bestätigen.
   - Auf `/bestellen` Klarna auswählen und prüfen, dass das Popup geöffnet bleibt.
   - Erfolgreiche Zahlung simulieren/abschließen, den Status `paid` prüfen und erst danach die Heizölbestellung auslösen.
   - Fehler-, Abbruch- und Popup-blockiert-Fälle kontrollieren; dabei darf keine Bestellung vor erfolgreicher Zahlung entstehen.

## Zuständigkeit

Die Korrektur muss im Projekt **„klarna-plugin“** erfolgen und danach auf `klarna.secure-pay.app` veröffentlicht werden. Im Heizöl-Shop ist für diesen konkreten 500-Fehler keine Änderung erforderlich.