# Garantie-Bild: gleiche Position, gleiche Größe, nicht abgeschnitten

Ziel: Es wird ausschließlich das Bild getauscht. Position, optische Größe und Sichtbarkeit sollen exakt wie vorher sein.

## Was schiefgelaufen ist

Das neue Bild ist nicht quadratisch (1031 x 1058) und hat innen einen anderen Rand als die alte Grafik. Weil die Platzierung eine feste quadratische Fläche vorgibt, wirkt es leicht verzerrt, optisch kleiner und sitzt minimal anders. Auf der Preisrechner-Seite schneidet der Kasten alles ab, was über seinen Rand hinausragt — das Siegel ragt oben rechts heraus und wird deshalb beschnitten.

## Anpassungen

1. Hero-Bereich der Startseite (Desktop und Mobil):
   - Bild seitenverhältnis-treu einpassen, damit es nicht gestreckt wird.
   - Optische Größe und Abstand oben/rechts so nachjustieren, dass das Siegel wieder genauso groß und an derselben Stelle sitzt wie mit der alten Grafik.
2. Preisrechner-Seite:
   - Das Siegel wird künftig außerhalb des beschneidenden Kastens platziert (eine Ebene höher, weiterhin oben rechts an derselben Stelle), sodass es vollständig sichtbar über die Kartenkante hinausragt.
   - Der Kasten selbst behält seine abgerundeten Ecken und sein Aussehen.
3. Sonst keine Änderungen: keine Text-, Layout-, Abstands- oder Farbanpassungen an Hero, Karte oder Seite.

## Prüfung

Vergleich der Darstellung bei 1548 px, 393 px und 320 px auf Startseite und Preisrechner: Siegel vollständig sichtbar, unverzerrt, gleiche Größe und Position wie vor dem Bildtausch.

## Technische Notizen

- `src/components/landing/hero.tsx`: `object-contain` für beide `<img>`-Instanzen, `size-[86px]`/`size-[82px]` und `-right-2 -top-8` feinjustiert.
- `src/routes/preisrechner.index.tsx`: `<img>` aus dem `overflow-hidden`-Wrapper (Zeile ~273) in einen neuen `relative`-Container darüber verschieben; `overflow-hidden` des Kartenwrappers bleibt erhalten.
