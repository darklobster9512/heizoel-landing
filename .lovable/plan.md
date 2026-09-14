# Mobile Header-Bewertungs-Carousel anpassen

## Ziel
Das mobile Header-Carousel in `src/components/landing/rating-badge.tsx` soll langsamer laufen und statt einem Fade-Übergang einen echten Wisch-Effekt von links nach rechts verwenden.

## Änderungen

### 1. Intervall verlängern
- Wechselintervall im `rotating`-Modus von 4 Sekunden auf **6 Sekunden** erhöhen.
- Fade-Transition entfernen.

### 2. Slide-Animation statt Fade
- Carousel-Container als `overflow-hidden` mit fester Höhe behalten.
- Slides werden als horizontale Reihe gerendert (`flex` oder absolute Positionierung).
- Beim Wechsel wird die sichtbare Slide-Gruppe per `transform: translateX(...)` nach links verschoben, sodass die nächste Slide von rechts hereingeschoben wird.
- Übergangsdauer auf ca. 400–500 ms setzen, damit der Wisch-Effekt spürbar, aber nicht zu verspielt wirkt.
- `motion-reduce:transition-none` beibehalten.

### 3. Struktur beibehalten
- Reihenfolge der Slides: eKomi → Google → Trusted Shops.
- Inhalt und Darstellung pro Slide (Sterne, Logos, Texte) bleiben unverändert.
- Desktop- und Expanded-Modus bleiben unverändert.

## Technische Details
- Datei: `src/components/landing/rating-badge.tsx`
- Keine neuen Abhängigkeiten.
- Animation rein per Tailwind-Utility-Klassen und React-State (`index`).

## Akzeptanzkriterien
- Mobile Header-Bewertung wechselt alle 6 Sekunden.
- Übergang ist ein horizontaler Slide (links → rechts), kein Fade.
- Kein visueller Sprung, Überlauf oder Layout-Shift im Header.
- Desktop-Header und Vollbild-Menü-Bewertungen bleiben wie bisher.
