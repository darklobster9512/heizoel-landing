# SEO-Endausbau für die gesamte Seite

Aufbauend auf dem bestehenden Stand: Titel/Beschreibungen sind pro Seite gesetzt, Bestell- und Kontostrecken sind bereits von der Suche ausgeschlossen, Startseite und Regionalseiten haben strukturierte Daten, Sitemap und robots.txt existieren. Ergänzt wird jetzt das, was noch fehlt.

## 1. Eindeutige Adressen (Canonical) vervollständigen

Diese Seiten haben noch keine eindeutige Adresse hinterlegt:
`/bewertungen`, `/lieferung-zahlung`, `/angebote`, `/auth`, `/kreditantrag/...`.
Für die zwei öffentlichen Seiten wird sie ergänzt; bei den privaten Seiten bleibt der Suchausschluss und wird um „noindex, nofollow" geschärft.

Zusätzlich auf jeder öffentlichen Seite die Adresse auch als Social-Angabe (og:url), damit Vorschauen die richtige Seite zeigen.

## 2. Strukturierte Daten (das, was Google als Zusatzinfo anzeigt)

- `/faq` und die FAQ-Blöcke der Regionalseiten: Frage-Antwort-Auszeichnung (dort teils vorhanden, wird vervollständigt).
- `/bewertungen`: Bewertungs-Auszeichnung mit 4,9/5 und 25.000+ Bewertungen, verknüpft mit der Marke.
- `/kontakt` und Impressum: Auszeichnung des Unternehmens mit Adresse, E-Mail, Öffnungszeiten-Hinweis.
- `/lieferung-zahlung`, `/heizoel-wissen`, `/preisrechner`: passende Seiten-Auszeichnung (Service bzw. Ratgeber-Artikel) plus Brotkrümelpfad.
- Alle Unterseiten: Brotkrümelpfad (Startseite → Bereich → Seite), damit Google den Aufbau anzeigt.
- Startseite: zusätzlich Website-Auszeichnung mit interner Suche (Preisrechner) und Verweis auf die Marke.

## 3. Überschriften und Textstruktur

- Jede Seite genau eine Hauptüberschrift; auf `/bestellen` und `/bestaetigung` gibt es aktuell zwei — wird korrigiert (die zweite wird zur Unterüberschrift).
- Unterüberschriften durchgängig in korrekter Reihenfolge (H2 → H3), keine Sprünge.
- Regionalseiten: Hauptüberschrift enthält Ort/Bundesland plus „Heizölpreise" (bereits so, wird geprüft).

## 4. Bilder und Ladeverhalten

- Alle Bilder auf sprechende Bildbeschreibungen prüfen und fehlende ergänzen (u. a. Zahlungs- und Siegel-Bilder in Preisrechner, Lieferung & Zahlung, Bestellung).
- Breite/Höhe an allen Bildern, damit die Seite beim Laden nicht springt (Bewertungsfaktor).
- Bilder unterhalb des ersten Bildschirms laden verzögert, Bilder im ersten Bildschirm bevorzugt.

## 5. Sitemap und robots.txt

- Sitemap in mehrere Teildateien aufteilen (Hauptseiten, Bundesländer, Städte) mit übergeordnetem Verzeichnis — bei über 700 Städteseiten liest Google das deutlich zuverlässiger.
- Sinnvolle Änderungsangaben statt „täglich" für alle Seiten (Preisseiten täglich, Rechtstexte jährlich).
- Nur indexierbare Seiten in der Sitemap (Bestellstrecke, Login, Konto raus).
- robots.txt: Bestell-, Login- und Kontobereiche für Crawler sperren, Sitemap-Verweis behalten.

## 6. Interne Verlinkung (wichtigster Hebel bei vielen Seiten)

- Jede Städteseite verlinkt: Bundesland, 6–8 Nachbarstädte derselben Region, Ratgeber und Lieferung & Zahlung.
- Jede Bundeslandseite verlinkt: alle Städte des Landes, benachbarte Bundesländer, Übersicht.
- Ratgeber- und Serviceseiten verlinken untereinander und auf den Preisrechner.
- Footer bleibt wie er ist; die neuen Verlinkungen entstehen im Seiteninhalt (wirkt stärker).

## 7. Technische Feinarbeit

- Sprachangabe `hreflang`/`de-DE` im Seitenkopf.
- 404-Seite mit deutschem Text, Suchhinweis und Verlinkung statt englischem Platzhalter — aktuell steht dort „Page not found".
- Fehlende Beschreibungstexte pro Seite auf 140–160 Zeichen und je Seite unterschiedlich prüfen (Doppelungen zwischen Städteseiten mit Ortsnamen individualisieren).
- Titel aller Seiten auf max. 60 Zeichen prüfen (Städtetitel sind teils länger).

## Technische Details

- `head()` je Route: `links: [{ rel: "canonical" }]`, `og:url`, `hreflang`; JSON-LD über `head().scripts`.
- Gemeinsame Helfer: `src/lib/seo.ts` (Breadcrumb-, Organization-, WebSite-, FAQ-, Service-Builder) statt Wiederholung in jeder Route.
- Sitemap: `sitemap[.]xml.ts` wird Index; neue Routen `sitemap-seiten[.]xml.ts`, `sitemap-bundeslaender[.]xml.ts`, `sitemap-staedte[.]xml.ts`.
- `public/robots.txt`: `Disallow: /bestellen`, `/bestaetigung`, `/angebote`, `/auth`, `/kreditantrag`, `/antrag`, `/dashboard`, `/admin`.
- Interne Verlinkung: Nachbarstädte aus `src/data/cities.ts` je `stateSlug` ermitteln.
- Abschluss: Typecheck, Build, Kontrolle des Seitenkopfs von Start-, Stadt-, Bundesland- und Serviceseite.
