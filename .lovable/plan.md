# Seitentitel, Beschreibung, eigenes Favicon, Lovable-Reste entfernen

## 1. Seitentitel & Beschreibung (Startseite + Grundeinstellung)

Optimiert für die Suche nach Heizöl:

- Titel (58 Zeichen): `Heizöl bestellen – Heizölpreise vergleichen | Heizöl Deutschland`
  wird auf max. 60 Zeichen getrimmt: `Heizöl bestellen & Heizölpreise vergleichen | Heizöl DE`
- Beschreibung (ca. 155 Zeichen): `Heizölpreise aus über 300 Händlern vergleichen und Heizöl deutschlandweit günstig online bestellen. Tagesaktuelle Preise, sichere Lieferung, 4,9/5 Sterne.`
- Gleiche Texte auch für Social-Vorschau (Facebook/X) setzen.
- Zusätzlich eine Kurzfassung als Grundeinstellung für Seiten ohne eigene Angabe.
- Die bereits vorhandenen eigenen Titel der Unterseiten (Preisrechner, Bundesländer, Städte, Rechtstexte usw.) bleiben unverändert.

## 2. Favicon aus dem Deutschland-Zeichen des Logos

- Neues quadratisches Symbol: die drei Streifen Schwarz / Rot / Gold aus dem Logo, formatfüllend mit leicht abgerundeten Ecken.
- Dateien: `public/favicon.svg` (scharf in jeder Größe) und `public/favicon.png` (64x64, für Browser ohne SVG-Symbole) sowie `public/apple-touch-icon.png` (180x180 für iPhone-Startbildschirm).
- Im Seitenkopf verknüpft, damit Browser und Suchmaschinen das Symbol finden und in den Suchergebnissen anzeigen können.
- Das alte grüne Lovable-Symbol wird gelöscht.

## 3. Indexierbarkeit sicherstellen

- Eindeutige Adresse (Canonical) für die Startseite.
- `robots.txt`: Freigabe bleibt, Verweis auf die bestehende Sitemap ergänzen.
- Strukturierte Daten für die Organisation (Name, Logo, Symbol, Kontakt) auf der Startseite, damit Google Marke und Bild sicher zuordnet.

## 4. Lovable-Hinweise im Code

Entfernt werden:
- `README.md` – wird durch eine kurze Projektbeschreibung „Heizöl Deutschland" ersetzt.
- Das alte Lovable-Symbol in `public/`.
- Kommentar-Hinweise, die auf Lovable verweisen, sofern sie nichts steuern.

Bleiben müssen (sonst lässt sich die Seite nicht mehr bauen bzw. Fehler werden nicht mehr gemeldet):
- Das Build-Paket, mit dem die Seite überhaupt erzeugt wird.
- Die interne Fehlermeldung-Datei.
- `AGENTS.md` (Arbeitsanweisung, kein Teil der Website).

Diese Dateien sind für Besucher und Suchmaschinen unsichtbar.

## Technische Details

- `src/routes/__root.tsx`: Meta-Grundwerte, `link rel="icon"` (SVG + PNG), `apple-touch-icon`.
- `src/routes/index.tsx`: `TITLE`/`DESCRIPTION` anpassen, Canonical-Link, Organization-JSON-LD.
- `public/favicon.svg` neu schreiben; PNGs mit `magick` aus dem SVG erzeugen.
- `public/robots.txt`: `Sitemap:`-Zeile (relative/öffentliche URL erst wenn bekannt – die Sitemap-Route existiert unter `/sitemap.xml`).
- Prüfung: Typecheck, Build, Seitenkopf der Startseite kontrollieren.
