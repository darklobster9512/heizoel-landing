# Footer um SEO-Linklisten für Städte und Bundesländer erweitern

## Ziel
Dem bestehenden `SiteFooter` eine neue Sektion hinzufügen, die Linklisten zu Heizölpreisen in deutschen Städten und Bundesländern enthält. Die Sektion soll dadurch auf der `/preisrechner`-Seite (und allen anderen Seiten, die den Footer verwenden) sichtbar sein.

## Änderungen

### 1. `src/components/landing/site-footer.tsx` — neue SEO-Sektion
- Oberhalb des Copyright-/Rechtstext-Bereichs wird eine neue Sektion eingefügt.
- Zwei Spalten:
  - **Linke Spalte:** „Heizöl & Heizölpreise in deutschen Städten" mit den Begriffen:
    Heizölpreise Berlin, Heizöl Hamburg kaufen, Heizölpreis München heute, Heizöl Köln bestellen, Heizölpreise Frankfurt, Heizöl Düsseldorf bestellen, Heizölpreis Dortmund heute, Heizöl Essen kaufen, Heizölpreise Leipzig, Heizöl Bremen bestellen, Heizölpreise Dresden, Heizöl Hannover kaufen, Heizölpreis Nürnberg heute, Heizöl Duisburg bestellen, Heizölpreise Bielefeld, Heizöl Bochum bestellen, Heizölpreise Bonn, Heizöl Münster kaufen, Heizölpreis Kiel heute, Heizölpreise Chemnitz.
  - **Rechte Spalte:** „Heizölpreise nach Bundesland" mit den Begriffen:
    Heizölpreise Baden-Württemberg, Heizöl Bayern kaufen, Heizölpreise Berlin, Heizöl Brandenburg bestellen, Heizölpreise Bremen, Heizöl Hamburg kaufen, Heizölpreise Hessen, Heizöl Meckl.-Vorpommern bestellen, Heizölpreise Niedersachsen, Heizöl NRW kaufen, Heizölpreise Rheinland-Pfalz, Heizöl Saarland bestellen, Heizölpreise Sachsen, Heizöl Sachsen-Anhalt kaufen, Heizölpreise Schleswig-Holstein, Heizöl Thüringen bestellen.
- Die Begriffe werden als dezente, inline dargestellte Elemente (z. B. kleine Tags oder verlinkte Texte) ausgegeben, optisch abgegrenzt durch Kommas oder Abstände.
- Da es für die einzelnen Städte-/Bundesland-Seiten noch keine Routen gibt, erhalten die Elemente zunächst kein `href` bzw. `href="#"` und werden als Platzhalter-Links markiert. Sie sind trotzdem für SEO und Übersicht sichtbar.
- Styling ruhig und dezent: kleine Schrift, neutrale Farbe, hover-Effekt optional; passt sich dem bestehenden Footer-Design an.

### 2. Keine weiteren Änderungen
- Keine Änderungen an `/preisrechner.tsx`, `/index.tsx`, `/antrag/*`, `/angebote`, `/dashboard` oder `/admin`.
- Keine neuen Routen oder Backend-Änderungen.
- Keine Änderungen am Inhalt der bestehenden Footer-Elemente (Adresse, Rechtstexte, etc.).

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite und ggf. der Startseite, um zu prüfen, dass die neue Footer-Sektion sichtbar ist.
