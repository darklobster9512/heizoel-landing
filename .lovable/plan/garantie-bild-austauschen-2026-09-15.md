# Garantie-Bild austauschen

## Ziel
Das bestehende „Günstiger-geht-nicht-Garantie"-SVG wird durch das hochgeladene PNG ersetzt. Betroffen sind die Landingpage-Hero und der Preisrechner.

## Umsetzung

### 1. Neues Asset anlegen
- Das hochgeladene Bild `user-uploads://ggn.png` per `lovable-assets create` als CDN-Asset hochladen.
- Ausgabe in `src/assets/guarantee.png.asset.json` speichern.
- Altes, dann ungenutztes `src/assets/guarantee.svg.asset.json` mit `lovable-assets delete` entfernen.

### 2. `src/components/landing/hero.tsx`
- Import von `@/assets/guarantee.svg.asset.json` auf `@/assets/guarantee.png.asset.json` umstellen.
- Beide `<img>`-Nutzungen (mobil neben der Headline, desktop schwebend rechts über der OfferCard) behalten ihre aktuellen Größen und Klassen bei.
- `alt`-Text bleibt „Günstiger-geht-nicht-Garantie".

### 3. `src/routes/preisrechner.index.tsx`
- Import ebenfalls auf `@/assets/guarantee.png.asset.json` umstellen.
- Die `<img>`-Nutzung (desktop schwebend rechts über der OfferCard) behält Größe, Klassen und `alt`-Text bei.

### 4. Keine weiteren Änderungen
- Keine Layout-, Text- oder Funktionsänderungen.
- Keine Backend- oder Routing-Änderungen.

## Verifikation
- `tsgo --noEmit` und Build prüfen.
- Screenshots Desktop und Mobil (393 px / 320 px) von `/` und `/preisrechner` prüfen: neues Garantie-Bild wird an beiden Stellen korrekt angezeigt, keine abgeschnittenen Ränder, kein sichtbarer Qualitätsverlust.
