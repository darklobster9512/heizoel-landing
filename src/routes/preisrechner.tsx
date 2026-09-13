import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { OfferCard } from "@/components/landing/offer-card";
import { Steps, SiteFooter } from "@/components/landing/sections";
import { BadgePercent, Handshake, Truck, Clock, ShieldCheck } from "lucide-react";

const DESCRIPTION =
  "Heizölpreis sofort berechnen mit Klaro: Aktuelle Preise ab 128,78 €/100L, kostenlose Lieferung und Festpreisgarantie. In 3 Schritten zum günstigen Heizöl.";

const TITLE = "Heizölpreis berechnen — Klaro";

export const Route = createFileRoute("/preisrechner")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/preisrechner" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/preisrechner" }],
  }),
  component: PreisrechnerPage,
});

const CHECKS = [
  { prefix: "Bis zu ", bold: "20% günstiger", suffix: " als der Marktdurchschnitt" },
  { prefix: "Über ", bold: "500 zertifizierte Händler", suffix: " deutschlandweit" },
  { prefix: "", bold: "Festpreis-Garantie", suffix: " — auch bei steigenden Ölpreisen" },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 size-4 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path d="M3 10.5l4.5 4.5L17 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ADVANTAGES = [
  {
    icon: BadgePercent,
    title: "Garantiert günstigste Preise",
    text: "Direkt vom Händler ohne Zwischenhändler-Aufschläge",
  },
  {
    icon: Handshake,
    title: "Direkt vom Händler",
    text: "Keine versteckten Kosten, keine Vermittlergebühren",
  },
  {
    icon: Truck,
    title: "Kostenlose Lieferung inklusive",
    text: "Alle Lieferkosten sind bereits im Preis enthalten",
  },
  {
    icon: Clock,
    title: "Lieferung in 7 Werktagen",
    text: "Deutschlandweit zum Wunschtermin",
  },
  {
    icon: ShieldCheck,
    title: "100% Käuferschutz",
    text: "Durch unsere Liefergarantie abgesichert",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-5 fill-[#f1a319]">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function PreisrechnerPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Hero / Rechner */}
        <section className="relative bg-surface">
          <div className="relative mx-auto grid max-w-6xl items-start gap-6 px-5 pb-12 pt-7 md:gap-10 md:py-12 lg:grid-cols-[1fr_510px] lg:py-14">
            <div>
              <div className="mb-3 md:mb-4">
                <span className="inline-flex items-center rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white md:text-sm">
                  Nr. 1 Heizöl-Preisvergleich in Deutschland
                </span>
              </div>

              <h1 className="font-hero text-[28px] font-medium leading-[1.3] tracking-normal text-hero-text md:max-w-[13ch] md:text-[52px] md:font-bold md:leading-[1.12] md:tracking-tight">
                Heizölpreis berechnen —{" "}
                <span>sofort & kostenlos</span>
              </h1>

              <p className="mt-5 max-w-[55ch] text-[15px] leading-snug text-hero-text md:mt-6 md:text-base">
                Heizölpreise heute ab{" "}
                <strong className="font-semibold text-ink">128,78 €/100L</strong> —{" "}
                <strong className="font-semibold text-ink">über 25.000 Kunden</strong>{" "}
                sparen{" "}
                <strong className="font-semibold text-ink">Ø €247 pro Bestellung</strong>
                , direkt vom Händler, deutschlandweit.
              </p>

              <ul className="mt-5 space-y-3 md:mt-6 md:space-y-4">
                {CHECKS.map((c) => (
                  <li key={c.bold} className="flex gap-2 text-[15px] leading-snug text-hero-text md:gap-3">
                    <CheckIcon />
                    <span>
                      {c.prefix}
                      <strong className="font-semibold text-ink">{c.bold}</strong>
                      {c.suffix}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative scroll-mt-24">
              <OfferCard />
            </div>
          </div>
        </section>

        {/* 3 Schritte */}
        <Steps />

        {/* Warum Klaro */}
        <section className="bg-surface" aria-labelledby="why-klaro-title">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2
              id="why-klaro-title"
              className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[30px]"
            >
              Warum bei Klaro bestellen?
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ADVANTAGES.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="rounded-xl border border-line bg-background p-6 transition-colors hover:border-brand"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-custom">{a.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bewertung */}
        <section className="bg-background" aria-labelledby="rating-title">
          <div className="mx-auto max-w-6xl px-5 py-14 text-center md:py-20">
            <h2 id="rating-title" className="sr-only">
              Kundenbewertung
            </h2>
            <div className="flex flex-col items-center gap-4">
              <Stars />
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-ink">4,99</span>
                <span className="text-lg text-muted-custom">/ 5 Sternen</span>
              </div>
              <p className="text-lg font-semibold text-conditions">Ausgezeichnet</p>
              <p className="max-w-md text-sm text-muted-custom">
                Basierend auf über 33.000 Kundenbewertungen
              </p>
            </div>
          </div>
        </section>

        {/* SEO-Texte */}
        <section className="bg-white" aria-labelledby="seo-title">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <h2
              id="seo-title"
              className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[30px]"
            >
              Heizölpreise heute & Heizöl online bestellen
            </h2>
            <div className="mx-auto mt-8 max-w-[920px] space-y-8 text-[16px] leading-[1.65] text-conditions">
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizölpreise heute — aktueller Tagespreis ab 128,78 €/100L
                </h3>
                <p className="mt-2">
                  Der Heizölpreis heute liegt bei Klaro ab{" "}
                  <strong>128,78 €/100L</strong> (Stand: 13.09.2026, 12:15 Uhr). Heizölpreise
                  werden in Deutschland traditionell pro 100 Liter angegeben — das ist die übliche
                  Bestellmenge und macht den Preisvergleich zwischen Anbietern transparent. Bei einer
                  Standard-Bestellung von 3.000 Litern entspricht das einem Gesamtpreis von ca.{" "}
                  <strong>3.863 €</strong> inklusive kostenloser Lieferung. Die Heizölpreise
                  aktualisieren wir mehrmals täglich auf Basis der Rotterdamer Spotpreise und des
                  aktuellen Dollar-Kurses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizöl kaufen — direkt vom Händler ab 128,78 €/100L
                </h3>
                <p className="mt-2">
                  Wer Heizöl kaufen möchte, profitiert bei Klaro von Direktpreisen ohne
                  Zwischenhändler-Aufschläge. Über <strong>500 zertifizierte Partnerhändler</strong>{" "}
                  liefern deutschlandweit zu garantierten Festpreisen. Im Vergleich zum
                  Marktdurchschnitt sparen Kunden beim Heizöl bestellen durchschnittlich{" "}
                  <strong>€247</strong> pro Bestellung — das entspricht bis zu{" "}
                  <strong>15% Ersparnis</strong> pro €/100L. Der gesamte Bestellprozess dauert weniger
                  als 2 Minuten: PLZ und Liefermenge eingeben, Standard- oder Premium-Heizöl wählen,
                  Zahlungsart bestimmen — fertig. Es gibt keine versteckten Kosten, alle Preise sind
                  Endpreise inkl. 19% MwSt. und kostenloser Lieferung in 7 Werktagen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizölpreis pro Liter — was kostet 1 Liter Heizöl?
                </h3>
                <p className="mt-2">
                  Der Heizölpreis pro Liter liegt heute bei ca. <strong>1,29 €/Liter</strong>{" "}
                  (entspricht 128,78 €/100L). In der Praxis wird Heizöl ausschließlich in Mengen ab
                  500 Litern verkauft — deshalb ist die Angabe €/100L der Standard im deutschen
                  Heizöl-Markt. Wer wissen möchte, wie der Heizölpreis pro Liter kalkuliert wird,
                  sollte folgende Komponenten berücksichtigen: Rohölpreis (ca. 50%), Mineralölsteuer
                  + CO₂-Abgabe + MwSt. (zusammen ~38%), Logistik & Lagerung (~7%), Händlermarge (~5%).
                  Bei steigenden Rohölpreisen oder fallenden Eurokursen verteuert sich der Heizölpreis
                  pro Liter entsprechend.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizöl bestellen — in 4 Schritten zum besten Preis
                </h3>
                <p className="mt-2">
                  Beim Heizöl online bestellen mit Klaro durchlaufen Sie 4 einfache Schritte: (1){" "}
                  <strong>PLZ und Liefermenge eingeben</strong> — sofort sehen Sie die Heizölpreise
                  für Ihre Region in €/100L. (2) <strong>Zwischen Heizöl Standard</strong> (DIN
                  51603-1, der günstigste Preis ab 128,78 €/100L) und{" "}
                  <strong>Heizöl Premium</strong> (mit Additiven für ca. 5% niedrigeren Verbrauch und
                  längere Lagerfähigkeit) wählen. (3) <strong>Zahlungsart bestimmen</strong> —
                  Vorkasse, Rechnung, EC-Karte oder Bar bei Lieferung, alle ohne Aufpreis. (4){" "}
                  <strong>Wunsch-Liefertermin</strong> in den nächsten 7 Werktagen festlegen. Die
                  Heizölpreis-Garantie bedeutet: Ihr Preis ist bindend ab Bestellabschluss — auch
                  wenn die Heizölpreise bis zur Lieferung steigen sollten, zahlen Sie nur den
                  fixierten Betrag.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
