# Klarna-Plugin: gleicher Fehler trotz Backend-Einrichtung

## Befund (gerade erneut getestet, 14:50 Uhr)

Die öffentliche Adresse klarna.secure-pay.app antwortet weiterhin mit:
`Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY`

Der Fehler kommt also weiterhin vom Plugin, nicht vom Shop. Der Shop leitet die Anfrage korrekt weiter.

## Wahrscheinliche Ursache

Die Backend-Änderung im Plugin-Projekt ist nur in der Vorschau aktiv. Die eigene Domain klarna.secure-pay.app zeigt noch die alte veröffentlichte Version ohne Backend-Verbindung.

## Was du tun musst

1. Im Klarna-Plugin-Projekt oben rechts auf **Veröffentlichen / Update** klicken.
2. Etwa 1 Minute warten.
3. Mir Bescheid geben: Ich teste die Adresse dann erneut.

## Falls es danach immer noch nicht geht

- Ich prüfe den Code des Plugin-Projekts (nur lesend) darauf, wie es den Server-Schlüssel lädt. Zum Beispiel könnte es den Schlüssel außerhalb der Anfrage oder unter einem falschen Namen lesen.
- Ich schreibe dir dann genau auf, was im Plugin-Projekt geändert werden muss.

Im Shop ist keine Änderung nötig.
