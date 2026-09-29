# 3 Klarna-Zahlungsarten auf /bestellen ausblenden (im Code behalten)

## Ziel
Die drei Klarna-Optionen (Sofortüberweisung, Kreditkarte, Rechnung in 30 Tagen) erscheinen nicht mehr in der Zahlungsmethoden-Auswahl. Der Code bleibt vollständig erhalten, sodass sie später durch eine einzige Änderung wieder eingeblendet werden können.

## Änderung (nur `src/routes/bestellen.tsx`)
- In der Zahlungsarten-Liste (Zeile 1055) statt `PAYMENT_OPTIONS.map(...)` die sichtbaren Einträge filtern: `PAYMENT_OPTIONS.filter(p => !isKlarna(p.id)).map(...)`.
- `PAYMENT_OPTIONS`, `KLARNA_LABELS` und `isKlarna` bleiben unverändert im Code — die gesamte Klarna-Logik (Popup, Sitzung, Warten auf „bezahlt", Übertragung ans Panel als `klarna` / `klarna-cc` / `klarna-rechnung`) bleibt funktionsfähig.
- Standardauswahl ist bereits „Vorkasse" — es gibt keinen Zustand, in dem eine ausgeblendete Klarna-Art versehentlich ausgewählt sein könnte.

## Prüfung
- Typecheck (tsgo) und Build fehlerfrei.
- Playwright: `/bestellen` Schritt 2 zeigt nur noch Vorkasse, Barzahlung, EC-Karte — keine Klarna-Karten, keine Konsolenfehler.

## Wieder einschalten
Später genügt es, den `.filter(p => !isKlarna(p.id))`-Aufruf zu entfernen — alle drei Zahlungsarten erscheinen dann wieder mit vollständigem Popup-Ablauf.
