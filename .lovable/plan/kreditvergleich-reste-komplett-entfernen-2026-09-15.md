# Kreditvergleich-Reste komplett entfernen

Alles, was noch vom früheren Kreditvergleich stammt, wird gelöscht. Zurück bleibt eine rein öffentliche Heizöl-Seite: Startseite, Preisrechner, Bestellung, Bestätigung, Informations- und Regionalseiten, Rechtstexte.

## Was gelöscht wird

Seiten:
- die komplette Antragsstrecke `/antrag` (18 Schritte + Abschlussseite)
- `/angebote` (Kreditangebote-Liste)
- `/kreditantrag/...` (Antragsdetail)
- Anmelden `/auth`, Kundenkonto `/dashboard`, interne Verwaltung `/admin` inkl. Antragsdetail und Bankpartner-Verwaltung

Bausteine und Daten dahinter:
- Antrags-Assistent (Schritt-Bausteine, Zwischenspeicher der Eingaben)
- Antrags-Felder, Antrags- und Bankpartner-Funktionen, Demo-Datenbestand, Demo-Anmeldung
- Rahmen der internen Verwaltung
- Bank-Logos und nicht mehr genutzte Bilder (Bank-Logos, SCHUFA-Siegel, altes Vergleichs-Hero, Kredit-Angebotsliste)

Kredit-Abschnitte in den Seiten-Bausteinen (aktuell ungenutzt, werden entfernt):
- Kreditarten, Zinsvergleich, Zinsübersicht-Tabelle, Kredit-Vorteile, Kredit-Stimmen

## Was angepasst wird

- Drei Schaltflächen („Jetzt Heizölpreise vergleichen", „Heizölpreis berechnen") zeigen heute noch auf die Antragsstrecke — sie führen künftig auf den Preisrechner `/preisrechner`.
- robots.txt: Sperreinträge für die gelöschten Bereiche entfallen; Bestellstrecke und Bestätigung bleiben gesperrt.
- Verbliebene Kredit-Wörter in Fließtexten prüfen und ersetzen; rein sachliche Erwähnungen zur Zahlung (Banküberweisung, Kartenlimit, „keine Kreditkartenzahlung") bleiben, weil sie zur Heizölbestellung gehören.
- Interner Farbname `smava-logo` wird in einen neutralen Namen umbenannt.

## Technische Hinweise

- Route-Dateien unter `src/routes/antrag/`, `src/routes/_authenticated/`, `angebote.tsx`, `auth.tsx`, `kreditantrag.$applicationId.tsx` werden gelöscht; `src/routeTree.gen.ts` erzeugt sich neu.
- Entfallende Module: `src/components/wizard/ui.tsx`, `src/lib/wizard-store.tsx`, `application-fields.ts`, `application.functions.ts`, `applications.functions.ts`, `banks.functions.ts`, `bank-logos.ts`, `mock-auth.ts`, `mock-data.ts`, `src/components/app/*`.
- `src/components/landing/sections.tsx`: Kredit-Exporte (`LoanTypes`, `RateComparison`, `RatesTable`, `Advantages`, `Testimonials`) samt Datenarrays und zugehörigen Asset-Importen entfernen; Startseiten-Abschnitte bleiben unverändert.
- Token `--smava-logo` / `--color-smava-logo` in `src/styles.css` umbenennen und die drei Nutzungen in `site-header.tsx` und `preisrechner.index.tsx` mitziehen.
- Abschluss: `tsgo --noEmit`, Build und Kurzprüfung von `/`, `/preisrechner`, `/bestellen` sowie 404 für die gelöschten Adressen.
