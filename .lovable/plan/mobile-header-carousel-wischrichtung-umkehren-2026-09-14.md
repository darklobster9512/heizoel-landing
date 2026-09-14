# Mobile Header-Carousel: Wischrichtung umkehren

## Ziel
Das mobile Bewertungs-Carousel im Header soll die Badges von **rechts nach links** hereinwischen (vorher war es links nach rechts).

## Änderung
- In `src/components/landing/rating-badge.tsx` die Slide-Animation/Transition für den mobilen Karussell-Modus anpassen.
- Neue Badge gleitet von rechts herein, aktuelle Badge gleitet nach links hinaus.
- Intervall bleibt bei 6 Sekunden.
- Keine Änderung am Desktop-Header oder der erweiterten mobilen Navigation.

## Dateien
- `src/components/landing/rating-badge.tsx`
- Ggf. `src/styles.css` für Keyframes/Utility-Klassen
