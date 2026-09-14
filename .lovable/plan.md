# Zusätzliche Vertrauens-Badges im Header

## Ziel
Vor dem bestehenden eKomi-Abzeichen erscheinen zwei weitere kompakte Vertrauensblöcke: Trusted Shops und Google.

## Umsetzung
- Die vorhandene `RatingBadge`-Komponente zu einer gemeinsamen, horizontalen Vertrauensanzeige erweitern.
- Reihenfolge im Header:
  1. Trusted-Shops-Logo mit „Trusted Shops Käuferschutz“
  2. Google-Logo mit „4,9 / 5“ und „25.000+ Bewertungen“
  3. bestehendes eKomi-Abzeichen mit Sternen, Bewertung und Stand-Datum
- Die bereits in der Bewertungssektion verwendeten Trusted-Shops- und Google-Bilddateien wiederverwenden.
- Dezente Trennlinien und kompakte Abstände nutzen, damit die Anzeige zur bestehenden weißen Header-Leiste passt.
- Auf Mobilgeräten Inhalte und Logos platzsparend darstellen, ohne den Header zu überladen oder Text abzuschneiden.
- Navigation, Bewertungssektion und übrige Seiteninhalte unverändert lassen.

## Prüfung
- Header auf Desktop und Mobil visuell prüfen.
- Sicherstellen, dass alle drei Vertrauensblöcke vor der Navigation sauber ausgerichtet sind und der Build fehlerfrei bleibt.
