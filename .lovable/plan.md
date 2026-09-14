# Mobiles Header-Carousel: Ein-/Aus-Slide-Animation

## Ziel
Das mobile Header-Bewertungs-Carousel (eKomi → Google → Trusted Shops) bekommt einen zweiphasigen Wisch-Ablauf pro Badge — rein und raus über dieselbe (rechte) Seite:

1. Badge gleitet **von rechts herein** in seine Position.
2. Badge bleibt ca. 6 Sekunden sichtbar stehen.
3. Badge gleitet **wieder nach rechts hinaus** aus dem sichtbaren Bereich.
4. Direkt danach erscheint das nächste Badge von rechts — Ablauf wiederholt sich endlos.

## Umsetzung

### `src/styles.css`
- Die bestehende `badge-slide-in`-Keyframe durch eine kombinierte Keyframe ersetzen, z. B. `badge-slide-cycle`, die in einer einzigen Animation beide Phasen abdeckt:
  - 0 %: `translateX(100%)`, opacity 0 (rechts außerhalb)
  - ca. 8 %: `translateX(0)`, opacity 1 (eingeflogen, steht)
  - ca. 92 %: `translateX(0)`, opacity 1 (steht weiter)
  - 100 %: `translateX(100%)`, opacity 0 (wieder nach rechts hinaus)
- Die Animationsdauer entspricht exakt dem Wechsel-Intervall von 6 s (`animation: badge-slide-cycle 6s ease-in-out both`), sodass Aus- und Einblenden nahtlos ineinandergreifen.
- `prefers-reduced-motion`: Animation deaktiviert, einfacher Wechsel.

### `src/components/landing/rating-badge.tsx`
- Rotating-Block bleibt strukturell wie aktuell (nur aktiver Slide mit `key={index}` gerendert), aber die Klasse `badge-slide-in` wird durch die neue `badge-slide-cycle`-Klasse ersetzt.
- Das 6-Sekunden-Intervall bleibt unverändert.
- Reihenfolge eKomi → Google → Trusted Shops bleibt.

## Nicht geändert
- Desktop-Header und aufgeklapptes Menü.
- Header-Layout, Positionen von Logo und Menü-Symbol.

## Verifikation
- Playwright bei 393 px: zu mehreren Zeitpunkten (0 s, 3 s, 6 s, 12 s) prüfen, dass genau ein Badge sichtbar ist, keine Überlappung, kein horizontaler Überlauf (scrollWidth = 393).
- Build-Log prüfen.
