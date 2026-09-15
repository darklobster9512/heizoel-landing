# Cookie-Hinweis (schlichtes Popup am unteren Seitenrand)

## Ziel
Ein dezentes Cookie-Einwilligungsbanner am unteren Bildschirmrand, passend zum bestehenden Enterprise-Look (weiße Fläche, feine Umrandung, dezenter Schatten, Akzentgrün nur auf dem Haupt-Button, Text auf grünem Button weiß).

## Umsetzung

**Neue Komponente:** `src/components/cookie-consent.tsx`

- Rendert erst nach Hydration; nur wenn noch keine Entscheidung im localStorage liegt (`heizoel-deutschland.cookie-consent.v1` mit `"all"` oder `"necessary"`).
- Position: `fixed` unten, mittig/max. Breite (~640 px) als schlichte Karte; mobil volle Breite mit kleinem Rand.
- Inhalt:
  - Kurzer Text (1–2 Sätze): Hinweis auf Cookies zur Sicherstellung des Betriebs sowie optionale Technologien, Link auf `/datenschutz` und `/cookie-einstellungen` („Mehr erfahren").
  - Zwei Buttons:
    - „Alle akzeptieren" (primär, grün, weißer Text) → speichert `"all"`.
    - „Nur notwendige" (sekundär, Outline-Stil) → speichert `"necessary"`.
- Ausblend-Animation: sanftes Ausblenden nach der Entscheidung.
- **Nicht anzeigen** auf `/bestellen` und `/bestaetigung` (Bestellstrecke ohne Kopf-/Fußzeile bleibt ungestört).

**Einbindung:** In `src/routes/__root.tsx` innerhalb von `RootComponent` neben `<Toaster />` mounten — damit erscheint es auf allen Seiten.

## Sonstiges
- Keine Cookie-Bibliothek, keine externen Dienste; reine Frontend-Lösung mit localStorage.
- Der Bestell-Entwurf (`heizoel-deutschland.order.v1`) und die Demo-Session bleiben unberührt.
- Verifizierung: Build-Check, danach Browser-Test (Banner erscheint, Entscheidung wird gespeichert, Banner bleibt nach Reload weg; auf /bestellen nicht sichtbar).
