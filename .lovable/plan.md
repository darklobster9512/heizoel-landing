# Alle Seiten außer der Landingpage mobil optimieren

## Ziel
Sämtliche vorhandenen Seiten außer `/` werden für kleine Smartphone-Breiten vollständig überarbeitet. Inhalte, Funktionen, Texte, Berechnungen und Desktop-Darstellung bleiben erhalten; angepasst werden ausschließlich Darstellung und Bedienbarkeit auf Mobilgeräten.

## 1. Gemeinsame mobile Grundlagen
- Wiederverwendete Kopfzeilen, Fußbereiche, Formularfelder, Auswahlkarten, Fortschrittsanzeigen, Dialoge und Seitenrahmen auf schmale Breiten abstimmen.
- Mehrteilige Kopfzeilen als stabile mobile Raster aufbauen, damit Logo, Titel, Hilfe und Aktionen weder kollidieren noch abgeschnitten werden.
- Feste Breiten und zu enge Mehrspaltenlayouts mobil auf einspaltige oder bewusst horizontal scrollbare Darstellungen umstellen.
- Lange Überschriften, Beträge, Ortsnamen, Hinweise und Buttons umbrechen oder kürzen, ohne Inhalte zu verstecken.
- Touch-Ziele ausreichend groß halten sowie sticky/fixierte Elemente so begrenzen, dass sie keinen Inhalt verdecken.
- Seitlichen Seitenüberlauf überall verhindern; notwendige Tabellen bekommen einen klar begrenzten eigenen Scrollbereich.

## 2. Heizöl-Preis- und Bestellstrecke
- `/preisrechner`: Formular, Live-Bestellmeldung, Vertrauenselemente, Inhaltsblöcke und Fußbereich für einspaltige Bedienung optimieren.
- `/preisrechner/ergebnis`: Lieferdaten-Zusammenfassung, Änderungsmodus, Auswahlfelder, Sorten-Tabs, Preise, Zahlungsarten, Vergleichstabelle und Bestellbutton auf schmalen Bildschirmen entzerren.
- `/bestellen`: obere Preiszusammenfassung, Vertrauenszeilen, Terminwahl, beide Formularschritte, Zahlungsmethoden, Bestellübersicht und untere Preisleiste überarbeiten; die untere Leiste darf keine Felder oder Aktionen verdecken.
- `/bestaetigung`: Bestelldaten, Status-/Vertrauensbereiche und nächste Schritte mobil gut lesbar stapeln.

## 3. Öffentliche Informations- und Serviceseiten
- `/lieferung-zahlung`, `/bewertungen`, `/faq`, `/kontakt` und `/heizoel-wissen`: Kartenraster, Kategorien, Akkordeons, Formulare, Bildbereiche und Handlungsbuttons mobil passend stapeln und ausrichten.
- `/heizoelpreise`: Einstiegsseite, Fakten und regionale Übersichten für kleine Geräte verdichten.
- Alle Bundeslandseiten unter `/heizoelpreise/bundesland/$state` und alle Stadtseiten unter `/heizoelpreise/$city` über ihre gemeinsamen Regionalbausteine optimieren: Preisbereiche, Fakten, Ortslisten, Infotexte, FAQ und Preisrechner-Aufrufe.

## 4. Antrag, Angebote und Kreditdetails
- Alle Schritte `/antrag/schritt-1` bis `/antrag/schritt-18` sowie `/antrag/fertig` über die gemeinsamen Formularbausteine und die wenigen seitenspezifischen Layouts optimieren.
- Zweispaltige Auswahlfelder bei langen Beschriftungen auf sehr schmalen Geräten sinnvoll stapeln; Eingaben, Zähler, Auswahlflächen, Hinweise, Fortschritt und Vor-/Zurück-Aktionen gut bedienbar halten.
- `/angebote`: Filter, Ergebnislisten, Ladeanzeige und Angebotsdetails mobil neu ordnen; die Desktop-Seitenleiste wird mobil zu einer vollständig bedienbaren Detailansicht ohne Überdeckung.
- `/kreditantrag/$applicationId`: Angebotsübersicht, Tabs, Detailzeilen, Dokument-/Aktionsbereiche und rechte Detailansicht für Vollbreite auf Mobilgeräten anpassen.

## 5. Anmeldung und interne Seiten
- `/auth`: Anmeldekarte, Felder, Hinweise und Aktionen auf kleine Bildschirmhöhen und -breiten abstimmen.
- `/dashboard` und `/admin`: gemeinsame App-Kopfzeile, Kennzahlen, Filter und Aktionen mobil neu anordnen.
- Breite Verwaltungslisten und Tabellen erhalten einen eigenen horizontalen Scrollbereich mit sichtbaren Kerninformationen; Detailansichten unter `/admin/antrag/$applicationId` werden einspaltig und ohne abgeschnittene Aktionen dargestellt.

## 6. Technische Umsetzung
- Vorhandene Designfarben, Abstände und Komponenten weiterverwenden; keine neue Stilrichtung und keine Änderungen an Geschäftslogik oder Daten.
- Mobile Regeln bevorzugt in den gemeinsam genutzten Komponenten umsetzen, damit alle Antragsschritte und Regionalvarianten konsistent profitieren.
- Seitenspezifische Anpassungen nur dort ergänzen, wo gemeinsame Regeln nicht ausreichen.
- Die Landingpage `/` und ihre bereits optimierte mobile Darstellung ausdrücklich nicht verändern.

## 7. Prüfung
- Jede statische Seite bei 393 × 852 px und 320 px Breite prüfen.
- Dynamische Seitengruppen mit repräsentativen Bundesland-/Stadtseiten sowie allen 18 Antragsschritten kontrollieren.
- Kaufablauf vollständig testen: Preisrechner → Ergebnis → Bestellung → Bestätigung.
- Angebots- und Kreditantragsansichten einschließlich Öffnen/Schließen der mobilen Detailansichten testen.
- Anmeldung, Dashboard, Adminlisten und Admin-Detailseite mobil prüfen, soweit der verfügbare Testzugang reicht.
- Auf jeder geprüften Seite kontrollieren: kein horizontaler Seitenüberlauf, keine Überlappungen, keine abgeschnittenen Texte/Buttons, keine verdeckten Formularfelder und weiterhin unveränderte Desktop-Darstellung.
- Abschließend Build- und Laufzeitfehler kontrollieren.
