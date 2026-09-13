# Alle Seiten sauber für Suchmaschinen optimieren (Heizöl)

## Was aktuell bremst

- Die Grundeinstellung der Seite trägt noch fremde Texte („smava — Kreditvergleich") — Suchmaschinen sehen das als Standard für alles, was keinen eigenen Titel hat.
- Die Seitensprache ist auf Englisch gesetzt, obwohl alle Inhalte deutsch sind.
- Startseite hat keine eindeutige Seitenadresse (Canonical) hinterlegt; einige Unterseiten auch nicht.
- Es gibt keine strukturierten Daten (die Zusatzinfos, mit denen Google Sterne, Fragen & Firmendaten direkt in den Ergebnissen zeigt).
- Es gibt keine Sitemap (Inhaltsverzeichnis für Crawler).
- Titel und Beschreibungen sind teils nicht auf die wichtigsten Suchbegriffe („Heizölpreise", „Heizöl bestellen", Bundesländer/Städte) zugeschnitten.
- Einige Bilder haben keinen beschreibenden Alternativtext.

## Was ich mache

1. **Grundeinstellungen korrigieren**
   Sprache auf Deutsch, Standardtitel/-beschreibung auf Klaro/Heizöl umstellen, Seitenname für Social-Vorschauen setzen.

2. **Jede öffentliche Seite bekommt eigene, keyword-starke Angaben**
   Startseite, Preisrechner, FAQ, Bewertungen, Lieferung & Zahlung, Heizöl-Wissen, Kontakt: eigener Titel (unter 60 Zeichen), eigene Beschreibung (unter 160 Zeichen), Social-Vorschau-Texte und je eine eindeutige Seitenadresse.
   Beispiele: „Heizölpreise heute vergleichen & Heizöl bestellen | Klaro", „Heizöl FAQ – Antworten zu Preis, Lieferung & Zahlung".

3. **Bestell- und Kundenbereich bewusst ausschließen**
   Bestellstrecke, Angebotsseite, Bestätigung, Login und Antragsseiten bleiben aus dem Index (haben keinen Suchwert und würden Doppelinhalte erzeugen). Das ist bereits teils vorhanden und wird vervollständigt.

4. **Strukturierte Daten ergänzen**
   - Startseite: Unternehmen/Website + Angebot „Heizöl" mit Preisangabe und Liefergebiet Deutschland
   - FAQ-Seite: alle Fragen & Antworten maschinenlesbar
   - Bewertungen: Bewertungsdaten (4,9/5, 25.000+ Bewertungen)
   - Heizöl-Wissen: als Ratgeber-Artikel
   - Unterseiten: Brotkrumen-Navigation (zeigt Google die Seitenstruktur)

5. **Sichtbare Struktur schärfen**
   Genau eine Hauptüberschrift pro Seite (Startseite bekommt eine sichtbare H1 mit „Heizölpreise vergleichen & Heizöl günstig bestellen"), darunter saubere Zwischenüberschriften. Fehlende Alternativtexte bei Bildern nachtragen.

6. **Interne Verlinkung der SEO-Bereiche verbessern**
   Die Städte- und Bundesländer-Links im Fußbereich bekommen sprechende Titel-Attribute und bleiben durchgängig als echte Links (crawlbar) auf den Preisrechner verlinkt.

7. **Crawler-Dateien**
   robots.txt bleibt offen für alle, ergänzt um Ausschluss der Bestell-/Kundenseiten und um den Sitemap-Verweis. Die Sitemap (Inhaltsverzeichnis aller öffentlichen Seiten) lege ich an, sobald die endgültige Internetadresse feststeht — dafür brauche ich Deine Wunsch-Domain.

## Wichtig zu wissen

- Änderungen an Titeln und Vorschauen erscheinen an der öffentlichen Adresse erst nach dem nächsten Veröffentlichen.
- Städte-/Bundesländer-Links zeigen momentan alle auf den Preisrechner. Für echte Top-Rankings zu „Heizölpreise Berlin" & Co. bräuchte jede Stadt später eine eigene Unterseite mit eigenem Text — das wäre ein Folgeschritt, den ich gern separat plane.

## Technische Details

- `src/routes/__root.tsx`: `lang="de"`, Standard-Meta auf Klaro, `og:site_name`, `og:locale`, Organisation-/WebSite-JSON-LD (kein Canonical im Root).
- Pro Route `head()`: `title`, `description`, `og:title/description/type/url`, `twitter:card/title/description`, `links: [{ rel: "canonical", href: "/pfad" }]` (relative Pfade, bis die Domain feststeht).
- `noindex` für `/bestellen`, `/bestaetigung`, `/angebote`, `/auth`, `/antrag/*`, `/kreditantrag/*`, `/preisrechner/ergebnis` sowie `_authenticated/*`.
- JSON-LD via `scripts: [{ type: "application/ld+json", children: JSON.stringify(...) }]`: `Organization`, `WebSite`, `Product/Offer`, `FAQPage`, `AggregateRating`, `Article`, `BreadcrumbList`.
- `public/robots.txt`: Disallow-Regeln für die genannten Pfade; `Sitemap:`-Zeile erst mit finaler Domain.
- Keine Änderungen an Geschäftslogik, Bestellablauf oder Backend.
