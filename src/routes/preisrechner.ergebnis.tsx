import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BadgePercent,
  CalendarCheck,
  FileText,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ekomi from "@/assets/ekomi.webp.asset.json";
import vorauskasse from "@/assets/vorauskasse.png.asset.json";
import barzahlung from "@/assets/barzahlung.png.asset.json";
import ecKarte from "@/assets/ec-karte.png.asset.json";

const TITLE = "Ihr persönliches Heizölangebot | Klaro";
const DESCRIPTION =
  "Ihr persönliches Heizölangebot: Heizöl Standard ab 128,78 €/100L und Premium ab 133,16 €/100L — inkl. Lieferung und 19 % MwSt., Lieferung deutschlandweit.";

export const Route = createFileRoute("/preisrechner/ergebnis")({
  validateSearch: (search: Record<string, unknown>) => {
    const menge = Number(search['menge']);
    const abladestellen = Number(search['abladestellen']);
    return {
      plz: typeof search['plz'] === "string" ? search['plz'].replace(/\D/g, "").slice(0, 5) : "",
      menge: Number.isFinite(menge) && menge > 0 ? Math.min(32000, Math.max(1500, menge)) : 3000,
      abladestellen:
        Number.isFinite(abladestellen) && abladestellen > 0 ? Math.min(10, abladestellen) : 1,
    };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/preisrechner/ergebnis" }],
  }),
  component: ErgebnisPage,
});

const PRICE_STANDARD = 128.78;
const PRICE_PREMIUM = 133.16;

const HOSE_OPTIONS = ["bis 40 m", "bis 60 m", "bis 80 m"];
const TRUCK_OPTIONS = [
  "egal (auch mit Hänger)",
  "max. 26 t / 2,60 m breit",
  "max. 18 t / 2,55 m breit",
  "max. 10 t / 2,30 m breit",
];
const DELIVERY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PAYMENTS = [
  { label: "Vorkasse", img: vorauskasse.url },
  { label: "Bar", img: barzahlung.url },
  { label: "EC-Karte", img: ecKarte.url },
  { label: "Rechnung", img: null },
];

const ADVANTAGES = [
  {
    icon: BadgePercent,
    title: "Garantiert günstigste Preise",
    text: "Direkter Handel ohne Zwischenhändler-Aufschläge.",
  },
  {
    icon: Truck,
    title: "Deutschlandweite Lieferung inklusive",
    text: "Alle Lieferkosten sind bereits im Preis enthalten.",
  },
  {
    icon: ShieldCheck,
    title: "100 % Käuferschutz garantiert",
    text: "Ihre Bestellung ist durch unsere Liefergarantie abgesichert.",
  },
  {
    icon: Users,
    title: "Über 25.000 zufriedene Kunden",
    text: "Durchschnittsbewertung von 4,9/5 Sternen.",
  },
  {
    icon: Lock,
    title: "SSL-verschlüsselt & DSGVO-konform",
    text: "Keine Weitergabe Ihrer Daten an Dritte.",
  },
];

const fmtEuro = (v: number) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fieldClass =
  "mt-1.5 w-full rounded-md border border-line bg-background px-3 py-3 text-[14px] text-hero-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:px-4";

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 von 5 Sternen" role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${className} fill-[#f1a319]`} aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function OfferTile({
  variant,
  liters,
}: {
  variant: "standard" | "premium";
  liters: number;
}) {
  const isPremium = variant === "premium";
  const price = isPremium ? PRICE_PREMIUM : PRICE_STANDARD;
  const total = (liters / 100) * price;
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setDeliveryDate(d.toLocaleDateString("de-DE"));
  }, []);

  return (
    <article
      className={`flex flex-col rounded-xl border border-line bg-background shadow-card ${
        isPremium ? "border-t-4 border-t-brand" : "border-t-4 border-t-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
        <h2 className="text-[17px] font-bold leading-tight text-conditions md:text-[19px]">
          {isPremium ? "Premium – Das Sparsame" : "Standard – Das Günstige"}
        </h2>
        {isPremium ? (
          <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Empfohlen
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13px] leading-[1.7] text-muted-custom">
          {isPremium
            ? "Heizöl Premium mit Additiven — für ca. 5 % niedrigeren Verbrauch und längere Lagerfähigkeit."
            : "Heizöl Standard (DIN 51603-1) — geeignet für alle Ölheizungen."}
        </p>

        <div className="mt-5 rounded-lg bg-surface px-4 py-4">
          <p className="text-[12px] uppercase tracking-wide text-muted-custom">
            Preis pro 100 Liter
          </p>
          <p className="mt-1 text-[26px] font-bold leading-none text-conditions">
            {fmtEuro(price)} €
          </p>
          <p className="mt-4 text-[12px] uppercase tracking-wide text-muted-custom">
            Gesamtpreis inkl. Lieferung
          </p>
          <p className="mt-1 text-[30px] font-bold leading-none text-brand md:text-[34px]">
            {fmtEuro(total)} €
          </p>
          <p className="mt-1.5 text-[12px] text-muted-custom">inkl. 19 % MwSt.</p>
        </div>

        <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand">
          <BadgePercent className="h-4 w-4" aria-hidden="true" />
          Direktpreis ohne Zwischenhändler — inkl. Lieferung
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
          <div>
            <p className="text-[12px] uppercase tracking-wide text-muted-custom">Lieferung</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
              <CalendarCheck className="h-4 w-4 text-brand" aria-hidden="true" />
              ab {deliveryDate || "—"}
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-wide text-muted-custom">Liefergebiet</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
              Deutschlandweit
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[12px] uppercase tracking-wide text-muted-custom">Zahlungsarten</p>
          <ul className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PAYMENTS.map((p) => (
              <li
                key={p.label}
                className="flex flex-col items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-2.5"
              >
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.label}
                    className="h-6 w-auto object-contain"
                    loading="lazy"
                  />
                ) : (
                  <FileText className="h-6 w-6 text-brand" aria-hidden="true" />
                )}
                <span className="text-[11px] font-medium text-muted-custom">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6">
          <Link
            to="/antrag/schritt-1"
            search={{}}
            className="inline-flex w-full items-center justify-center rounded-[4px] bg-brand px-5 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Zur Bestellung
          </Link>
          <p className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 text-[12px] text-muted-custom">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            100 % sicher &amp; SSL-verschlüsselt
          </p>
        </div>
      </div>
    </article>
  );
}

function ErgebnisPage() {
  const search = Route.useSearch();
  const [plz, setPlz] = useState(search.plz);
  const [liters, setLiters] = useState(search.menge);
  const [points, setPoints] = useState(search.abladestellen);
  const [hose, setHose] = useState(HOSE_OPTIONS[0]!);
  const [truck, setTruck] = useState(TRUCK_OPTIONS[0]!);
  const [stand, setStand] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setStand(
      `${now.toLocaleDateString("de-DE")}, ${now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })} Uhr`,
    );
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setDeliveryDate(d.toLocaleDateString("de-DE"));
  }, []);

  const effectiveLiters = useMemo(() => (liters && liters >= 1500 ? liters : 1500), [liters]);

  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <section className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h1 className="text-[26px] font-bold leading-[1.25] text-conditions md:text-[36px]">
                Ihr persönliches Heizölangebot
              </h1>
              <p className="text-[13px] text-muted-custom">Stand: {stand || "—"}</p>
            </div>
          </div>
        </section>

        <section className="bg-background" aria-labelledby="lieferdaten-title">
          <div className="mx-auto max-w-6xl px-5 py-8 md:py-10">
            <div className="rounded-xl border border-line border-t-4 border-t-brand bg-background p-6 shadow-card md:p-8">
              <h2
                id="lieferdaten-title"
                className="text-[17px] font-bold text-conditions md:text-[19px]"
              >
                Ihre Lieferdaten
              </h2>
              <p className="mt-1 text-[13px] text-muted-custom">
                Sie können Ihre Angaben jederzeit anpassen — der Preis wird sofort neu berechnet.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="e-plz" className="text-[13px] font-medium text-hero-text">
                    Postleitzahl
                  </label>
                  <input
                    id="e-plz"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="z. B. 10115"
                    value={plz}
                    onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    className={`${fieldClass} tabular`}
                  />
                </div>

                <div>
                  <label htmlFor="e-menge" className="text-[13px] font-medium text-hero-text">
                    Liefermenge in Liter
                  </label>
                  <input
                    id="e-menge"
                    type="text"
                    inputMode="numeric"
                    placeholder="z. B. 3000"
                    value={liters || ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setLiters(digits ? Number(digits) : 0);
                    }}
                    onBlur={() => {
                      if (!liters || liters < 1500) setLiters(1500);
                      else if (liters > 32000) setLiters(32000);
                    }}
                    className={`${fieldClass} tabular`}
                  />
                </div>

                <div>
                  <label htmlFor="e-abladestellen" className="text-[13px] font-medium text-hero-text">
                    Abladestellen
                  </label>
                  <Select value={String(points)} onValueChange={(v) => setPoints(Number(v))}>
                    <SelectTrigger id="e-abladestellen" className={`${fieldClass} focus:ring-0`}>
                      <SelectValue placeholder="Abladestellen wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {DELIVERY_POINTS.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="e-schlauch" className="text-[13px] font-medium text-hero-text">
                    Schlauch
                  </label>
                  <Select value={hose} onValueChange={setHose}>
                    <SelectTrigger id="e-schlauch" className={`${fieldClass} focus:ring-0`}>
                      <SelectValue placeholder="Schlauchlänge wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOSE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="e-tankwagen" className="text-[13px] font-medium text-hero-text">
                    Tankwagen
                  </label>
                  <Select value={truck} onValueChange={setTruck}>
                    <SelectTrigger id="e-tankwagen" className={`${fieldClass} focus:ring-0`}>
                      <SelectValue placeholder="Tankwagen wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRUCK_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <span className="text-[13px] font-medium text-hero-text">Lieferdatum</span>
                  <p className="mt-1.5 flex w-full items-center gap-2 rounded-md border border-line bg-surface px-3 py-3 text-[14px] text-muted-custom md:px-4">
                    <CalendarCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    ab {deliveryDate || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background" aria-label="Heizölsorten">
          <div className="mx-auto max-w-6xl px-5 pb-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <OfferTile variant="standard" liters={effectiveLiters} />
              <OfferTile variant="premium" liters={effectiveLiters} />
            </div>

            <div className="mt-5 text-center">
              <Link
                to="/heizoel-wissen"
                hash="sorten"
                className="text-[13px] font-semibold text-brand underline-offset-4 hover:underline"
              >
                Sorten im Detail vergleichen
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-background" aria-label="Vertrauen">
          <div className="mx-auto max-w-6xl px-5 py-8">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface px-6 py-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex items-center gap-4">
                <img
                  src={ekomi.url}
                  alt="eKomi Gold Siegel"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
                <div>
                  <Stars />
                  <p className="mt-1 text-[13px] font-semibold text-ink">25.000+ Bewertungen</p>
                </div>
              </div>
              <div className="text-[12px] leading-[1.7] text-muted-custom">
                <p>Lieferung durch Klaro oder regionalen Partnerhändler</p>
                <p>Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="vorteile-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h2
              id="vorteile-title"
              className="text-center text-[22px] font-bold text-conditions md:text-[26px]"
            >
              Ihre Vorteile
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADVANTAGES.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="rounded-lg border border-line border-l-4 border-l-brand bg-surface px-5 py-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-[15px] font-semibold text-ink">{a.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.7] text-muted-custom">{a.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <ReferralBanner compact />
      <SiteFooter />
    </div>
  );
}
