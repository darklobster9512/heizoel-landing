# Bewertungs-Anzeige im mobilen Header reparieren

## Was gerade schief läuft

Ich habe die mobile Ansicht nachgestellt: im Header liegen aktuell mehrere Bewertungen gleichzeitig übereinander (eKomi-Bild, „Trusted Shops Käuferschutz" und „4,9 / 5 · 25.000+ Bewertungen" gleichzeitig sichtbar, Texte überlappen sich). Der Wechsel-Effekt schiebt die nicht aktiven Bewertungen nicht sauber aus dem sichtbaren Bereich.

## Lösung

Den Wechsler neu und einfacher aufbauen, sodass Überlappung technisch unmöglich ist:

- Es wird immer nur **eine** Bewertung angezeigt, nicht drei gleichzeitig.
- Beim Wechsel (alle 6 Sekunden) läuft die neue Bewertung mit einer kurzen Bewegung von links nach rechts herein.
- Fester Platz im Header, damit beim Wechsel nichts springt und Logo sowie Menü-Symbol an ihrer Stelle bleiben.
- Reihenfolge bleibt: eKomi, Google, Trusted Shops.
- Bei reduzierter Bewegung (Systemeinstellung) wird ohne Animation gewechselt.
- Desktop-Header und das aufgeklappte Menü bleiben unverändert.

## Technische Details

- `src/components/landing/rating-badge.tsx`: im Modus `compact && !expanded` nur den aktiven Slide rendern, mit `key={index}` remounten, damit eine CSS-Keyframe-Animation (`slide-in-left`) bei jedem Wechsel neu startet. Grid-Overlay mit `translate-x` entfällt.
- `src/styles.css`: Keyframes für die Hereinbewegung ergänzen (Transform von `-100%` auf `0`), inkl. `prefers-reduced-motion`-Abschaltung.
- Prüfung per Playwright bei 393 px: Screenshot direkt nach Laden sowie nach 6 s und 12 s, dazu Kontrolle, dass kein horizontaler Überlauf entsteht.
