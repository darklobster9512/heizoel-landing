# Ladebildschirm: Bewertungsanzeige wieder statisch

## Problem
Der Ladebildschirm („Besten Preis suchen…") nutzt `RatingBadge compact`. Seit der Mobile-Optimierung rotiert diese Variante automatisch alle 6 Sekunden durch eKomi → Google → Trusted Shops (Slide-Animation). Im Ladebildschirm soll die Bewertung wieder statisch sein wie vorher.

## Änderungen

### 1. `src/components/landing/rating-badge.tsx`
- Neuer optionaler Prop `cycle` (Standard: `true`).
- Die Rotation wird nur aktiviert, wenn `compact && !expanded && cycle` gilt.
- Für `compact` ohne Rotation: statische Darstellung der eKomi-Bewertung (Sterne, 4,9/5, „705 Bewertungen – Stand …") — so wie der Ladebildschirm vor der Mobile-Optimierung aussah.

### 2. `src/components/landing/price-search-loading.tsx`
- Übergibt `cycle={false}` an `RatingBadge` → die Bewertung steht still.

### 3. Nicht betroffen
- Die Kopfzeile auf Mobilgeräten behält das rotierende Karussell (dort wird `cycle` nicht gesetzt, Standard bleibt Rotation).

## Prüfung
- Ladebildschirm aufrufen: Bewertung erscheint einmal am Ende der Ladesequenz und bleibt statisch.
- Mobile Kopfzeile: Karussell rotiert weiterhin alle 6 Sekunden.
- `tsgo --noEmit` fehlerfrei.
