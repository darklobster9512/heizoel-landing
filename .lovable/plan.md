# Alle Bilder in den public-Ordner verlegen

Alle Bilder der Seite liegen derzeit im externen Bild-Speicher (CDN) bzw. im Quellordner. Sie sollen künftig direkt aus dem Ordner `public` der Seite kommen.

## Umsetzung

1. Neuen Ordner `public/img/` anlegen.
2. Alle 37 aktuell hinterlegten Bilder (Logos der Händler, Auszeichnungen/Siegel, Zahlungs-Icons, Tropfen-Icons, Bewertungs-Logos, Hero-Bild, Garantie-Bild, Icons wie SSL/TÜV/Avatar usw.) aus dem CDN herunterladen und unter ihrem Dateinamen in `public/img/` speichern.
3. Das bereits im Projekt liegende Bild `hero-person.jpg` ebenfalls nach `public/img/` verschieben.
4. In allen betroffenen Seiten und Bausteinen die Bildverweise umstellen: statt Import der CDN-Verweisdatei wird direkt der Pfad `/img/dateiname.ext` verwendet.
   Betroffen: Startseite-Hero, Abschnitte der Startseite, Kundenstimmen, Bewertungs-Abzeichen, Preisrechner (Start + Ergebnis), Lieferung & Zahlung, Bestellen, Bestätigung.
5. Die Verweisdateien (`*.asset.json`) im Quellordner entfernen, da sie nicht mehr genutzt werden.
6. Ungenutzte Bilder werden dabei nicht mitgeschleppt: Bilder ohne Verwendung im Code lade ich nicht herunter und liste sie in der Abschlussmeldung auf.

## Technische Details

- Download über die CDN-URLs aus den `.asset.json`-Zeigern nach `public/img/`.
- Referenzen: `import x from "@/assets/foo.png.asset.json"` + `x.url` wird zu String-Literal `"/img/foo.png"`.
- Dateinamen mit CDN-Suffixen (z. B. `bild-empfehlung-2026-df63265-330.png`) werden auf saubere Namen normalisiert (`bild-empfehlung-2026.png`).
- Die Bilder im CDN werden nicht gelöscht, damit frühere Veröffentlichungen und Vorschauen weiter funktionieren.
- Abschluss: Typprüfung, Build-Log prüfen und Kurzkontrolle der Seiten in der Vorschau (Desktop + Mobil), dass alle Bilder laden.

## Hinweis

Bilder aus `public` werden unverändert ausgeliefert (keine automatische Optimierung/Komprimierung durch den Build). Bei großen Dateien kann die Seite dadurch etwas langsamer laden.
