import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronRight, Lock, Phone } from "lucide-react";

import { loadOrderDraft, saveOrderDraft, type OrderDraft } from "@/lib/order-draft";
import ekomi from "@/assets/ekomi.webp.asset.json";
import trustedShops from "@/assets/trusted-shops-icon.png.asset.json";
import googleIcon from "@/assets/google-icon.webp.asset.json";

const TITLE = "Bestellung — Wunschtermin wählen | Klaro";
const DESCRIPTION =
  "Wählen Sie Ihren Wunschtermin für die Heizöllieferung: Vormittag oder Nachmittag, ohne Anmeldung, Lieferkosten inklusive.";

export const Route = createFileRoute("/bestellen")({
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
    links: [{ rel: "canonical", href: "/bestellen" }],
  }),
  component: BestellenPage,
});

const fmtEuro = (v: number) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtLiters = (v: number) => v.toLocaleString("de-DE");

const CHECKS = [
  "Bestellung ohne Anmeldung",
  "Lieferkosten enthalten",
  "Tagespreis garantiert",
  "Ihre Daten sind sicher verschlüsselt",
];

const REVIEWS = [
  {
    name: "Michael R.",
    when: "vor 3 Tagen",
    text: "Schnelle Lieferung, fairer Preis. Bestellung war in 2 Minuten erledigt. Gerne wieder!",
  },
  {
    name: "Sabine K.",
    when: "vor 5 Tagen",
    text: "Super Service! Der Fahrer hat vorher angerufen und war pünktlich.",
  },
];

function Stars({ className = "size-3.5" }: { className?: string }) {
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

function nextWorkday(d: Date): Date {
  const next = new Date(d);
  do {
    next.setDate(next.getDate() + 1);
  } while (next.getDay() === 0 || next.getDay() === 6);
  return next;
}

function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function BestellenPage() {
  const [draft, setDraft] = useState<OrderDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [slot, setSlot] = useState<{ date: string; period: "vormittag" | "nachmittag" | "telefon" } | null>(
    null,
  );
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    setDraft(loadOrderDraft());
    setLoaded(true);
  }, []);

  const days = useMemo(() => {
    if (!draft) return [];
    const base = new Date(`${draft.earliestDate}T00:00:00`);
    let cur = Number.isNaN(base.getTime()) ? new Date() : base;
    while (cur.getDay() === 0 || cur.getDay() === 6) cur = nextWorkday(cur);
    const list = [cur];
    for (let i = 0; i < 2; i++) list.push(nextWorkday(list[list.length - 1]!));
    return list.map((d) => ({
      iso: toIso(d),
      weekday: d.toLocaleDateString("de-DE", { weekday: "long" }),
      date: d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }),
    }));
  }, [draft]);

  const select = (date: string, period: "vormittag" | "nachmittag" | "telefon") => {
    setSlot({ date, period });
    setNotice(false);
    if (draft) saveOrderDraft({ ...draft, slot: { date, period } });
  };

  const proceed = () => {
    if (!slot) return;
    setNotice(true);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-surface font-body text-ink">
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <main className="flex-1 px-4 py-14">
          <div className="mx-auto max-w-md rounded-xl border border-line bg-background px-6 py-8 text-center shadow-card">
            <h1 className="text-[20px] font-bold text-conditions">Keine Auswahl gefunden</h1>
            <p className="mt-2 text-[14px] text-muted-custom">
              Bitte berechnen Sie zuerst Ihren Heizölpreis, danach können Sie Ihren Wunschtermin
              wählen.
            </p>
            <Link
              to="/preisrechner"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Zum Preisrechner
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const sortLabel = draft.variant === "premium" ? "Heizöl Premium" : "Heizöl Standard";
  const slotCardClass = (active: boolean) =>
    `flex-1 rounded-lg border px-3 py-3 text-center transition-colors ${
      active
        ? "border-brand bg-brand/5 ring-1 ring-brand"
        : "border-line bg-background hover:border-brand/60"
    }`;

  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      <SiteHeader />

      {/* Sticky Zusammenfassung */}
      <div className="sticky top-[52px] z-30 border-b-2 border-b-brand bg-background md:top-16">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-conditions md:text-[15px]">
              {fmtLiters(draft.liters)} L {sortLabel}
            </p>
            <p className="truncate text-[12px] text-muted-custom">
              {draft.points} Lieferstelle{draft.points === 1 ? "" : "n"} · {draft.plz}
              {draft.city ? ` · ${draft.city}` : ""}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[16px] font-bold leading-tight text-conditions md:text-[18px]">
              {fmtEuro(draft.total)} €
            </p>
            <p className="text-[11px] uppercase tracking-wide text-muted-custom">
              {fmtEuro(draft.pricePer100)} €/100 L · inkl. MwSt.
            </p>
          </div>
        </div>
      </div>

      <main className="px-4 py-5">
        <div className="mx-auto max-w-3xl">
          {/* Vertrauenszeile */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-background px-4 py-3 shadow-card">
            <div className="flex items-center gap-3">
              <div>
                <Stars />
                <p className="text-[14px] font-bold text-conditions">4,9 / 5</p>
              </div>
              <span className="h-8 w-px bg-line" />
              <div>
                <p className="text-[14px] font-bold text-conditions">
                  Über 25.000 zufriedene Kunden
                </p>
                <p className="text-[12px] text-muted-custom">
                  Bestellung jederzeit kostenlos stornierbar
                </p>
              </div>
            </div>
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
              <Lock className="h-4 w-4" aria-hidden="true" />
              Sichere Bestellung
            </p>
          </div>

          {/* Siegel */}
          <div className="mt-3 flex items-center justify-center gap-4 rounded-xl border border-line bg-background px-4 py-3 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-custom">
              Geprüft &amp; sicher
            </p>
            <span className="h-6 w-px bg-line" />
            <img src={trustedShops.url} alt="Trusted Shops" className="h-7 w-auto object-contain" loading="lazy" />
            <img src={ekomi.url} alt="eKomi" className="h-7 w-auto object-contain" loading="lazy" />
            <img src={googleIcon.url} alt="Google Bewertungen" className="h-6 w-auto object-contain" loading="lazy" />
          </div>

          {/* Titel */}
          <h1 className="mt-6 text-[24px] font-bold leading-[1.25] text-conditions md:text-[28px]">
            Wann soll geliefert werden?
          </h1>
          <p className="mt-1.5 text-[14px] text-muted-custom">
            Wählen Sie Ihren Wunschtermin — <span className="font-semibold text-ink">keine Anmeldung nötig</span>.
          </p>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] text-hero-text">
                <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>

          {/* Schritte */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-background px-4 py-4 shadow-card">
            <div className="flex flex-col items-center gap-1">
              <span className="flex size-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
                1
              </span>
              <span className="text-[12px] font-bold text-conditions">Termin</span>
            </div>
            <span className="h-px flex-1 bg-line" />
            <div className="flex flex-col items-center gap-1">
              <span className="flex size-7 items-center justify-center rounded-full bg-surface text-[13px] font-bold text-muted-custom">
                2
              </span>
              <span className="text-[12px] text-muted-custom">Daten &amp; Zahlung</span>
            </div>
          </div>

          {/* Terminauswahl */}
          <section
            className="mt-4 overflow-hidden rounded-xl border border-line bg-background shadow-card"
            aria-labelledby="termin-title"
          >
            <div className="flex items-center gap-3 border-b border-line bg-brand/5 px-4 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-brand text-white">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 id="termin-title" className="text-[16px] font-bold text-conditions">
                Wann darf geliefert werden?
              </h2>
            </div>

            <div className="px-4 py-4">
              {days.map((d) => (
                <div key={d.iso} className="mb-3 overflow-hidden rounded-lg border border-line last:mb-0">
                  <div className="flex items-center justify-between gap-3 bg-surface px-3 py-2.5">
                    <p className="text-[14px] font-bold text-conditions">{d.weekday}</p>
                    <p className="text-[14px] font-bold text-conditions">{d.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-3 sm:flex-row">
                    {d.morningBooked ? (
                      <div className="relative flex-1 rounded-lg border border-line bg-surface px-3 py-3 text-center">
                        <p className="text-[14px] font-bold text-muted-custom line-through">Vormittag</p>
                        <p className="text-[12px] text-muted-custom line-through">8:00 - 12:00 Uhr</p>
                        <span className="absolute right-2 top-2 rounded border border-[#e4b4b4] px-1.5 py-0.5 text-[10px] font-medium text-[#c06767]">
                          soeben gebucht
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => select(d.iso, "vormittag")}
                        aria-pressed={slot?.date === d.iso && slot?.period === "vormittag"}
                        className={slotCardClass(slot?.date === d.iso && slot?.period === "vormittag")}
                      >
                        <p className="text-[14px] font-bold text-conditions">Vormittag</p>
                        <p className="text-[12px] text-muted-custom">8:00 - 12:00 Uhr</p>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => select(d.iso, "nachmittag")}
                      aria-pressed={slot?.date === d.iso && slot?.period === "nachmittag"}
                      className={slotCardClass(slot?.date === d.iso && slot?.period === "nachmittag")}
                    >
                      <p className="text-[14px] font-bold text-conditions">Nachmittag</p>
                      <p className="text-[12px] text-muted-custom">15:00 - 18:00 Uhr</p>
                    </button>
                  </div>
                </div>
              ))}

              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-custom">
                  oder
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <button
                type="button"
                onClick={() => select("telefon", "telefon")}
                aria-pressed={slot?.period === "telefon"}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                  slot?.period === "telefon"
                    ? "border-brand bg-brand/5 ring-1 ring-brand"
                    : "border-line bg-background hover:border-brand/60"
                }`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold text-conditions">
                    Termin telefonisch vereinbaren
                  </span>
                  <span className="block text-[12px] text-muted-custom">
                    Lieferfrist: 7 Werktage. Wir melden uns bei Ihnen.
                  </span>
                </span>
                {slot?.period === "telefon" ? (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                ) : null}
              </button>
            </div>
          </section>

          {/* Kundenstimmen */}
          <section
            className="mt-4 rounded-xl border border-line bg-background px-4 py-4 shadow-card"
            aria-labelledby="stimmen-title"
          >
            <p id="stimmen-title" className="flex items-center gap-2 text-[14px] font-bold text-conditions">
              <Stars />
              Das sagen unsere Kunden
            </p>
            <ul className="mt-3">
              {REVIEWS.map((r) => (
                <li key={r.name} className="border-t border-line py-3 last:pb-0">
                  <p className="flex items-center gap-2 text-[13px]">
                    <Stars className="size-3" />
                    <span className="font-bold text-conditions">{r.name}</span>
                    <span className="text-muted-custom">· {r.when}</span>
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.6] text-hero-text">{r.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            onClick={proceed}
            disabled={!slot}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-[16px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Weiter zu Ihren Daten
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {notice ? (
            <p className="mt-2 text-center text-[13px] text-muted-custom">
              Termin gespeichert. Schritt 2 „Daten &amp; Zahlung" folgt in Kürze.
            </p>
          ) : null}
          {!slot ? (
            <p className="mt-2 text-center text-[13px] text-muted-custom">
              Bitte wählen Sie einen Termin oder die telefonische Absprache.
            </p>
          ) : null}
        </div>
      </main>

      {/* Sticky Preisleiste */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-background shadow-header-strong">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-[17px] font-bold leading-tight text-conditions">
              {fmtEuro(draft.total)} €
            </p>
            <p className="text-[12px] text-muted-custom">inkl. MwSt. · kostenlose Lieferung</p>
          </div>
          <button
            type="button"
            onClick={proceed}
            disabled={!slot}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Weiter
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
