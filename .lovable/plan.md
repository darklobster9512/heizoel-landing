# Klaro vollständig entfernen

## Umsetzung
- Die verbliebenen technischen Speicherkennungen in Bestellung und Demo-Anmeldung von `klaro` auf eine neutrale Heizöl-Deutschland-Kennung umstellen.
- Ereignisname, Leser und Schreiber der Demo-Anmeldung gemeinsam ändern, damit Anmeldung und Abmeldung weiterhin funktionieren.
- Bestellentwurf und Bestellbestätigung auf die neuen Kennungen umstellen.
- Keine Altkennung zur Migration behalten, damit im gesamten Projekt wirklich kein `klaro`-Snippet mehr existiert. Bereits lokal gespeicherte Entwürfe und Demo-Sitzungen werden dadurch einmalig verworfen.

## Prüfung
- Projektweit, einschließlich Groß-/Kleinschreibung, nach `klaro` suchen; Ergebnis muss leer sein.
- Bestellung, Bestätigung sowie Demo-Anmeldung kurz im Browser prüfen.
- Typprüfung und aktuellen Vorschau-Fehlerstatus kontrollieren.

## Technische Details
- Betroffen sind ausschließlich die verbliebenen Browser-Speicher- und Ereigniskennungen; sichtbare Marke und Metatexte sind bereits auf Heizöl Deutschland umgestellt.
