# Mobile Header-Carousel: Zwei-Wege-Slide-Animation

## Ziel
Beim Wechsel im mobilen Header-Bewertungs-Carousel soll das aktuelle Badge nach links hinauswischen, während das nächste Badge gleichzeitig von rechts hereinwischt.

## Änderung
- In `src/components/landing/rating-badge.tsx` den Karussell-Modus umbauen, sodass immer zwei Badges gerendert werden können: das aktuelle (exiting) und das nächste (entering).
- Beim Index-Wechsel bekommt das aktuelle Badge eine Exit-Animation nach links (`translateX(-100%)`) und das neue Badge eine Enter-Animation von rechts (`translateX(100%) → translateX(0)`).
- Intervall bleibt bei 6 Sekunden.
- Keine Änderung am Desktop-Header oder der erweiterten mobilen Navigation.

## Dateien
- `src/components/landing/rating-badge.tsx`
- Ggf. `src/styles.css` für Keyframes/Utility-Klassen
