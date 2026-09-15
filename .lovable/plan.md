# Preisrechner schneller nutzbar machen

Ziel: Die Felder Postleitzahl, Menge und Abladestellen sind sofort beim Erscheinen der Seite bedienbar — auf der Startseite und auf /preisrechner.

## Warum es heute hängt

Das Auswahlfeld "Abladestellen" ist ein JavaScript-Bauteil. Es funktioniert erst, wenn der komplette Seiten-Code im Browser geladen und aktiviert ist. Bis dahin sieht man das Feld, kann es aber nicht öffnen. Gleichzeitig lädt die Seite sehr viele schwere Bilder und externe Schriftarten, die dem Seiten-Code die Leitung wegnehmen — auf einer langsamen Verbindung dauert das entsprechend lange.

## Was geändert wird

1. **Abladestellen sofort bedienbar**
   Das Auswahlfeld wird auf ein natives Auswahlfeld des Browsers umgestellt (gleiche Optik, gleiche Werte 1–10). Es funktioniert schon vor dem Aktivieren des Seiten-Codes.

2. **Bilder deutlich leichter machen**
   Die großen Bilder werden verkleinert und in ein modernes Format umgewandelt — vor allem die Angebotsliste (aktuell 0,8 MB), das Personenbild und die Auszeichnungs-Siegel. Erwartung: 80–90 % weniger Datenmenge, sichtbar gleiche Qualität.
   Alle Bilder unterhalb des ersten Bildschirms laden erst beim Scrollen; nur das Garantie-Siegel im oberen Bereich lädt sofort.

3. **Schriftarten entschlacken**
   Statt zweier externer Schrift-Anfragen nur noch eine; die Emoji-Schrift wird entfernt, falls sie nicht sichtbar gebraucht wird. Die Schrift blockiert die Anzeige nicht mehr.

4. **Seiten-Code aufteilen**
   Der lange untere Seitenbereich (Abschnitte, Bewertungen, Regionen, Fußzeile) wird nachgeladen, statt gemeinsam mit dem Preisrechner in einem großen Paket. Damit ist der obere Bereich früher aktiv.

## Technische Details

- `src/components/landing/offer-card.tsx`: Radix `Select` → natives `<select>` mit identischen Styles (`selectTriggerClass`), behält `value`/`onValueChange`-Logik als `onChange`. Entfernt die Radix-Select-Abhängigkeit aus dem kritischen Pfad von Startseite und `/preisrechner`.
- Bild-Optimierung per `sharp`/`ffmpeg`-Konvertierung in `public/img`: WebP-Varianten mit sinnvollen Zielbreiten (Angebotsliste max. 1200 px, Siegel max. 340 px), Referenzen in `hero.tsx`, `sections.tsx`, `preisrechner.index.tsx` anpassen. `loading="lazy"` + `decoding="async"` für alles unterhalb des Folds, `fetchpriority="high"` nur für das Hero-Siegel via `head().links` Preload.
- `src/routes/__root.tsx`: Google-Fonts-Links zu einer Anfrage zusammenlegen, `Noto Color Emoji` streichen (bzw. nur laden, wo tatsächlich Emojis gerendert werden).
- `src/routes/index.tsx`: untere Sektionen (`Steps`, `MatchingOffers`, `HeizoelSorten`, `HeizoelServiceIntro`, `TrustLinks`, `RegionalSeo`, `SiteFooter`) über `React.lazy` + `Suspense`-Fallback nachladen, SSR-Inhalt bleibt für SEO erhalten (Sichtbarkeit im HTML prüfen; falls SEO-Inhalt dadurch fehlt, bleibt die Sektion serverseitig gerendert und nur der interaktive Teil wird aufgeteilt).
- Danach Kontrolle: Produktionsbuild, Bundle-Größen der Startseite und `/preisrechner` vergleichen, per Playwright prüfen, dass das Abladestellen-Feld ohne aktives JavaScript auswählbar ist.

## SEO

Keine Änderung an Texten, Titeln, Beschreibungen, JSON-LD, Sitemaps oder Links. Nachladen betrifft nur die Auslieferung, der Inhalt bleibt im HTML.
