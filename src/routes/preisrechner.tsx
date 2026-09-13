import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/landing/site-header";
import { OfferCard } from "@/components/landing/offer-card";
import { SiteFooter, STEPS } from "@/components/landing/sections";
import guarantee from "@/assets/guarantee.svg.asset.json";
import {
  BadgePercent,
  Handshake,
  Truck,
  Clock,
  ShieldCheck,
  Flame,
} from "lucide-react";

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

function Star({ fill, size }: { fill: number; size: string }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <svg viewBox="0 0 24 24" className={`${size} fill-[#f1a319]/30`}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
      </svg>
      <span
        className="absolute left-0 top-0 h-full overflow-hidden"
        style={{ width: `${Math.round(fill * 100)}%` }}
      >
        <svg viewBox="0 0 24 24" className={`${size} fill-[#f1a319]`}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      </span>
    </span>
  );
}

function Stars({ value, size = "size-5" }: { value?: number; size?: string }) {
  const rating = value ?? 5;
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return <Star key={i} fill={fill} size={size} />;
      })}
    </span>
  );
}

const CITIES: Array<{ city: string; plz: string }> = [
  { city: "Dresden", plz: "01067" },
  { city: "Leipzig", plz: "04109" },
  { city: "Erfurt", plz: "99084" },
  { city: "München", plz: "80331" },
  { city: "Nürnberg", plz: "90402" },
  { city: "Hannover", plz: "30159" },
  { city: "Kiel", plz: "24103" },
  { city: "Köln", plz: "50667" },
  { city: "Stuttgart", plz: "70173" },
  { city: "Rostock", plz: "18055" },
  { city: "Magdeburg", plz: "39104" },
  { city: "Potsdam", plz: "14467" },
  { city: "Karlsruhe", plz: "76133" },
  { city: "Bremen", plz: "28195" },
  { city: "Kassel", plz: "34117" },
  { city: "Augsburg", plz: "86150" },
];

const TIME_LABELS = [
  "vor 8 Sek.",
  "vor 23 Sek.",
  "vor 41 Sek.",
  "vor 52 Sek.",
  "vor 1 Min.",
  "vor 2 Min.",
  "vor 3 Min.",
];

interface LiveOrder {
  city: string;
  plz: string;
  liters: number;
  pricePer100L: number;
  timeLabel: string;
}

function randomOrder(): LiveOrder {
  const c = CITIES[Math.floor(Math.random() * CITIES.length)] ?? INITIAL_ORDER;
  const liters = 1500 + Math.floor(Math.random() * 36) * 100; // 1.500–5.000
  const pricePer100L = 126 + Math.random() * 7; // 126–133 €/100L
  const timeLabel =
    TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)] ?? "vor 1 Min.";
  return { city: c.city, plz: c.plz, liters, pricePer100L, timeLabel };
}

const INITIAL_ORDER: LiveOrder = {
  city: "Dresden",
  plz: "01067",
  liters: 1800,
  pricePer100L: 128.78,
  timeLabel: "vor 1 Min.",
};

const fmtPrice = (v: number) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function LiveOrders() {
  const [order, setOrder] = useState<LiveOrder>(INITIAL_ORDER);
  const [orderKey, setOrderKey] = useState(0);
  const [glowKey, setGlowKey] = useState(0);
  const isFirstOrder = useRef(true);

  useEffect(() => {
    let timeoutId: number;
    const scheduleNext = () => {
      const delay = 5000 + Math.floor(Math.random() * 5001); // 5–10 s
      timeoutId = window.setTimeout(() => {
        setOrder(randomOrder());
        setOrderKey((k) => k + 1);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isFirstOrder.current) {
      isFirstOrder.current = false;
      return;
    }
    setGlowKey((k) => k + 1);
  }, [order]);

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-line bg-background"
      aria-live="off"
    >
      <div
        key={glowKey}
        className={[
          "pointer-events-none absolute inset-0",
          glowKey > 0 && "animate-live-glow",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <div key={orderKey} className="animate-fade-in relative px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-conditions">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Bestellung aus <span className="font-bold text-ink">{order.city}</span>{" "}
              ({order.plz})
            </span>
          </p>
          <Flame className="size-4 shrink-0 text-brand" strokeWidth={2.2} />
        </div>
        <p className="mt-1 text-sm text-ink">
          {order.liters.toLocaleString("de-DE")} Liter —{" "}
          <span className="font-bold">
            {fmtPrice(order.pricePer100L)} €/100L
          </span>
        </p>
        <p className="mt-1 text-xs text-conditions/70">{order.timeLabel}</p>
      </div>
      <style>{`@keyframes live-glow { 0% { background-color: rgba(34,197,94,0.08); } 100% { background-color: transparent; } } .animate-live-glow { animation: live-glow 0.8s ease-out forwards; }`}</style>
    </div>
  );
}

function CompactSteps() {
  return (
    <div className="flex flex-col">
      <h2 className="text-[22px] font-bold tracking-tight text-conditions md:text-2xl">
        In 3 Schritten zum günstigen Heizöl
      </h2>
      <ol className="mt-5 space-y-4">
        {STEPS.map((s) => (
          <li key={s.title} className="flex items-start gap-4">
            <img
              src={s.icon}
              alt={s.iconAlt}
              width={s.width}
              height={s.height}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div>
              <h3 className="whitespace-pre-line text-base font-bold leading-[1.25] text-conditions">
                {s.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-conditions/85">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 border-t border-line pt-4">
        <LiveOrders />
      </div>
    </div>
  );
}

function PreisrechnerPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Hero / Rechner + Schritte */}
        <section className="relative bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-10 md:py-16">
            <div className="mb-8 text-center">
              <div className="mb-3 md:mb-4">
                <span className="inline-flex items-center rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white md:text-sm">
                  Nr. 1 Heizöl-Preisvergleich in Deutschland
                </span>
              </div>

              <h1 className="font-hero text-[28px] font-medium leading-[1.3] tracking-normal text-hero-text md:text-[52px] md:font-bold md:leading-[1.12] md:tracking-tight">
                Heizölpreis berechnen —{" "}
                <span>sofort & kostenlos</span>
              </h1>

              <p className="mx-auto mt-5 text-[15px] leading-snug text-hero-text md:mt-6 md:whitespace-nowrap md:text-base">
                Heizölpreise heute ab{" "}
                <strong className="font-semibold text-ink">128,78 €/100L</strong>{" "}
                —{" "}
                <strong className="font-semibold text-ink">über 25.000 Kunden</strong>{" "}
                sparen{" "}
                <strong className="font-semibold text-ink">Ø €247 pro Bestellung</strong>
                , direkt vom Händler, deutschlandweit.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-background shadow-card">
              <div className="grid lg:grid-cols-2">
                <div className="relative p-6 md:p-10">
                  <img
                    src={guarantee.url}
                    alt="Günstiger-geht-nicht-Garantie"
                    width={88}
                    height={88}
                    className="pointer-events-none absolute right-2 -top-8 z-10 hidden size-[86px] drop-shadow-sm md:block"
                  />
                  <OfferCard bordered={false} />
                </div>
                <div className="rounded-b-xl border-t border-line bg-surface/50 p-6 md:p-10 lg:rounded-bl-none lg:rounded-r-xl lg:border-t-0 lg:border-l">
                  <CompactSteps />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-custom">
                      {a.text}
                    </p>
                  </div>
                );
              })}

              {/* 6. Kachel: Bewertung */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-background p-6 text-center transition-colors hover:border-brand">
                <Stars size="size-6" />
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-ink">4,99</span>
                  <span className="text-base text-muted-custom">/ 5 Sternen</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-conditions">
                  Ausgezeichnet
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-custom">
                  Basierend auf über 33.000 Kundenbewertungen
                </p>
              </div>
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
                  <strong>128,78 €/100L</strong> (Stand: 13.09.2026, 12:15 Uhr).
                  Heizölpreise werden in Deutschland traditionell pro 100 Liter
                  angegeben — das ist die übliche Bestellmenge und macht den
                  Preisvergleich zwischen Anbietern transparent. Bei einer
                  Standard-Bestellung von 3.000 Litern entspricht das einem
                  Gesamtpreis von ca. <strong>3.863 €</strong> inklusive
                  kostenloser Lieferung. Die Heizölpreise aktualisieren wir
                  mehrmals täglich auf Basis der Rotterdamer Spotpreise und des
                  aktuellen Dollar-Kurses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizöl kaufen — direkt vom Händler ab 128,78 €/100L
                </h3>
                <p className="mt-2">
                  Wer Heizöl kaufen möchte, profitiert bei Klaro von Direktpreisen
                  ohne Zwischenhändler-Aufschläge. Über{" "}
                  <strong>500 zertifizierte Partnerhändler</strong> liefern
                  deutschlandweit zu garantierten Festpreisen. Im Vergleich zum
                  Marktdurchschnitt sparen Kunden beim Heizöl bestellen
                  durchschnittlich <strong>€247</strong> pro Bestellung — das
                  entspricht bis zu <strong>15% Ersparnis</strong> pro €/100L.
                  Der gesamte Bestellprozess dauert weniger als 2 Minuten: PLZ
                  und Liefermenge eingeben, Standard- oder Premium-Heizöl wählen,
                  Zahlungsart bestimmen — fertig. Es gibt keine versteckten
                  Kosten, alle Preise sind Endpreise inkl. 19% MwSt. und
                  kostenloser Lieferung in 7 Werktagen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizölpreis pro Liter — was kostet 1 Liter Heizöl?
                </h3>
                <p className="mt-2">
                  Der Heizölpreis pro Liter liegt heute bei ca.{" "}
                  <strong>1,29 €/Liter</strong> (entspricht 128,78 €/100L). In der
                  Praxis wird Heizöl ausschließlich in Mengen ab 500 Litern
                  verkauft — deshalb ist die Angabe €/100L der Standard im
                  deutschen Heizöl-Markt. Wer wissen möchte, wie der Heizölpreis
                  pro Liter kalkuliert wird, sollte folgende Komponenten
                  berücksichtigen: Rohölpreis (ca. 50%), Mineralölsteuer +
                  CO₂-Abgabe + MwSt. (zusammen ~38%), Logistik & Lagerung (~7%),
                  Händlermarge (~5%). Bei steigenden Rohölpreisen oder fallenden
                  Eurokursen verteuert sich der Heizölpreis pro Liter
                  entsprechend.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Heizöl bestellen — in 4 Schritten zum besten Preis
                </h3>
                <p className="mt-2">
                  Beim Heizöl online bestellen mit Klaro durchlaufen Sie 4 einfache
                  Schritte: (1){" "}
                  <strong>PLZ und Liefermenge eingeben</strong> — sofort sehen
                  Sie die Heizölpreise für Ihre Region in €/100L. (2){" "}
                  <strong>Zwischen Heizöl Standard</strong> (DIN 51603-1, der
                  günstigste Preis ab 128,78 €/100L) und{" "}
                  <strong>Heizöl Premium</strong> (mit Additiven für ca. 5%
                  niedrigeren Verbrauch und längere Lagerfähigkeit) wählen. (3){" "}
                  <strong>Zahlungsart bestimmen</strong> — Vorkasse, Rechnung,
                  EC-Karte oder Bar bei Lieferung, alle ohne Aufpreis. (4){" "}
                  <strong>Wunsch-Liefertermin</strong> in den nächsten 7 Werktagen
                  festlegen. Die Heizölpreis-Garantie bedeutet: Ihr Preis ist
                  bindend ab Bestellabschluss — auch wenn die Heizölpreise bis
                  zur Lieferung steigen sollten, zahlen Sie nur den fixierten
                  Betrag.
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
