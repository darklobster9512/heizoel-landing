# Plan: Telefon-Card-Hintergrund grünlicher machen

## Ziel
Die Telefon-Option auf `/bestellen` soll einen deutlich stärker wahrnehmbaren grünlichen Hintergrund bekommen, damit sie als auswählbare Option klarer hervorsticht.

## Änderungen (nur `src/routes/bestellen.tsx`)

### 1. Hintergrundfarbe verstärken
- In der Telefon-Card (`<button>` um Zeile 784–815) wird der Hintergrund von `bg-brand/5` auf einen kräftigeren, aber weiterhin hellen Grünton angehoben.
- Vorschlag: `bg-[#f0fdf4]` (entspricht Tailwind `green-50`, deutlich grüner als `brand/5`) sowohl im nicht-ausgewählten als auch im ausgewählten Zustand.
- Beim ausgewählten Zustand bleiben `border-brand` und `ring-1 ring-brand` erhalten, damit die Aktivierung weiterhin klar erkennbar ist.

### 2. Hover-Verhalten
- Nicht ausgewählt: `hover:border-brand/60` beibehalten.
- Ausgewählt: keine zusätzliche Hover-Veränderung nötig.

## Prüfung
- Playwright-Screenshot der `/bestellen`-Seite: Telefon-Card zeigt einen deutlich grünlichen Hintergrund.
- Auswahl testen: ausgewählter Zustand behält den grünen Hintergrund bei.
- Build/Typecheck läuft sauber.
