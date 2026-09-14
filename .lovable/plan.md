# Bewertungs-Karussell im mobilen Header

## Ziel
Auf Mobilgeräten zeigt die Kopfzeile jeweils nur ein Vertrauens-Abzeichen — vollständig mit Logo und Text wie in der Desktop-Ansicht — und wechselt automatisch alle paar Sekunden zum nächsten.

## Umsetzung
- Die drei Vertrauensblöcke (Trusted Shops, Google, eKomi) werden in der Bewertungsanzeige als einzelne, wiederverwendbare Blöcke getrennt.
- Neuer mobiler Modus: es ist immer genau ein Block sichtbar, mit Logo und Text (Sterne, „4,9/5", Bewertungsanzahl bzw. „Trusted Shops Käuferschutz").
- Automatischer Wechsel alle 4 Sekunden in der Reihenfolge eKomi → Google → Trusted Shops, danach von vorne; sanftes Ein-/Ausblenden, kein Springen des Layouts.
- Feste Höhe und begrenzte Breite, damit die Kopfzeile beim Wechsel nicht wackelt und der Text nicht abgeschnitten wird; bei sehr schmalen Geräten wird der Text kompakt gehalten.
- Bei aktivierter Einstellung „Bewegung reduzieren" entfällt die Überblendung; der Wechsel erfolgt ohne Animation.
- Für Screenreader wird nur ein Block angekündigt, ohne störende Live-Meldungen bei jedem Wechsel.
- Desktop-Kopfzeile und das Vollbildmenü (dort alle drei Blöcke untereinander) bleiben unverändert.

## Technische Details
- Änderungen nur in `src/components/landing/rating-badge.tsx`; `site-header.tsx` nutzt weiterhin `compact` für Mobil, `expanded` im Menü.
- Umsetzung mit `useEffect` + `setInterval` (4000 ms), Index-State, CSS-Transition für die Deckkraft; Aufräumen des Intervalls beim Unmount.
- Kein Backend, keine neuen Abhängigkeiten.

## Prüfung
- Mobile Ansicht (393 px): Wechsel der drei Abzeichen, kein horizontaler Überlauf, Text lesbar.
- Desktop unverändert, Build fehlerfrei.
