# Schwarze Ränder an den Siegeln Bild und WELT entfernen

## Ursache (geprüft)

Die beiden bearbeiteten Siegel liegen jetzt ohne Transparenz vor (Modus `RGB` statt `RGBA`). Beim Speichern wurden die vorher durchsichtigen Bereiche außerhalb der abgerundeten Siegel-Ecken schwarz gefüllt — daher die schwarzen Ränder. Die anderen Siegel (ntv, DtGV) sind unverändert und korrekt.

## Umsetzung

1. Die unveränderten Ausgangsdateien aus der letzten Version vor der Textänderung wiederherstellen (sie liegen im Projektverlauf vor) — damit ist die Transparenz zurück.
2. Die Textänderung („heizoel24.de" → „heizoel-deutschland.com") erneut anwenden, diesmal mit erhaltener Transparenz: gleiche Position, Farbe und Größe wie zuletzt, gespeichert als transparentes PNG.
3. Beim Bild-Siegel wird nur der weiße Innenbereich überschrieben, beim WELT-Siegel nur der Goldstreifen — die Ecken bleiben unangetastet.
4. Kontrolle: Beide Bilder ansehen und prüfen, dass keine schwarzen Flächen mehr vorhanden sind (Transparenz-Check), zusätzlich Startseite und Fußzeile in der Vorschau ansehen.
