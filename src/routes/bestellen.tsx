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

interface Review {
  id: number;
  name: string;
  when: string;
  text: string;
}

const CHECKS = [
  "Bestellung ohne Anmeldung",
  "Lieferkosten enthalten",
  "Tagespreis garantiert",
  "Ihre Daten sind sicher verschlüsselt",
];

const REVIEWS: Review[] = [
  { id: 1, name: "Michael R.", when: "vor 3 Tagen", text: "Schnelle Lieferung, fairer Preis. Bestellung war in 2 Minuten erledigt. Gerne wieder!" },
  { id: 2, name: "Sabine K.", when: "vor 5 Tagen", text: "Super Service! Der Fahrer hat vorher angerufen und war pünktlich." },
  { id: 3, name: "Thomas W.", when: "vor 1 Woche", text: "Preis-Leistung stimmt. Übersichtliche Seite und unkomplizierte Abwicklung." },
  { id: 4, name: "Petra S.", when: "vor 1 Woche", text: "Zum ersten Mal online bestellt — ging super einfach. Lieferung kam wie versprochen." },
  { id: 5, name: "Andreas B.", when: "vor 2 Wochen", text: "Guter Preis, freundlicher Fahrer. Werde auch nächstes Jahr wieder bestellen." },
  { id: 6, name: "Julia M.", when: "vor 2 Wochen", text: "Alles transparent, keine versteckten Kosten. Das gefällt mir sehr." },
  { id: 7, name: "Stefan H.", when: "vor 3 Wochen", text: "Heizöl kam einen Tag früher als angekündigt. Top organisiert!" },
  { id: 8, name: "Claudia F.", when: "vor 3 Wochen", text: "Klaro hat den besten Preis in meiner Region gehabt. Empfehlung!" },
  { id: 9, name: "Markus L.", when: "vor 4 Wochen", text: "Unkompliziert, schnell, zuverlässig. Genau so muss das sein." },
  { id: 10, name: "Nicole G.", when: "vor 4 Wochen", text: "Sehr gute Beratung am Telefon. Die Lieferung verlief reibungslos." },
  { id: 11, name: "Frank D.", when: "vor 5 Wochen", text: "Ich bin begeistert. Preis berechnet, bestellt, geliefert — ohne Stress." },
  { id: 12, name: "Ute P.", when: "vor 5 Wochen", text: "Der Tankwagen passte perfekt in unsere Einfahrt. Gerne wieder!" },
  { id: 13, name: "Klaus N.", when: "vor 6 Wochen", text: "Fairer Direktpreis, keine Überraschungen. Bestellung lief reibungslos." },
  { id: 14, name: "Sandra O.", when: "vor 6 Wochen", text: "Schnelle Reaktionszeit und pünktliche Lieferung. Absolut empfehlenswert." },
  { id: 15, name: "Jürgen T.", when: "vor 7 Wochen", text: "Meine zweite Bestellung bei Klaro. Beide Male alles bestens." },
  { id: 16, name: "Monika E.", when: "vor 7 Wochen", text: "Günstiger als beim lokalen Händler und trotzdem persönlicher Service." },
  { id: 17, name: "Robert Z.", when: "vor 8 Wochen", text: "Alles digital, alles klar. So soll Online-Bestellung heute funktionieren." },
  { id: 18, name: "Elke K.", when: "vor 8 Wochen", text: "Lieferung am gewünschten Tag, Fahrer sehr freundlich. Danke!" },
  { id: 19, name: "Wolfgang S.", when: "vor 9 Wochen", text: "Preisvergleich war einfach, Bestellung noch einfacher. Gerne wieder." },
  { id: 20, name: "Anna H.", when: "vor 9 Wochen", text: "Klaro ist mein neuer Standard für Heizöl. Schnell, günstig, zuverlässig." },
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

const ITEM_HEIGHT = 72;

function ReviewCarousel() {
  const [items, setItems] = useState<Review[]>([REVIEWS[0], REVIEWS[1]]);
  const [nextIndex, setNextIndex] = useState(2);
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animating) return;
      setAnimating(true);
      const newItem = REVIEWS[nextIndex % REVIEWS.length];
      setNextIndex((i) => i + 1);
      setItems((prev) => [newItem, ...prev]);
      setTransitionEnabled(false);
      setOffset(-ITEM_HEIGHT);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setOffset(0);
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [animating, nextIndex]);

  const handleTransitionEnd = () => {
    setItems((prev) => prev.slice(0, 2));
    setAnimating(false);
  };

  return (
    <div className="mt-3 overflow-hidden" style={{ height: ITEM_HEIGHT * 2 }}>
      <div
        className={`flex flex-col ease-in-out ${transitionEnabled ? "transition-transform duration-500" : ""}`}
        style={{ transform: `translateY(${offset}px)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {items.map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className="flex shrink-0 flex-col justify-center border-t border-line px-0 py-2 first:border-t-0"
            style={{ height: ITEM_HEIGHT }}
          >
            <p className="flex items-center gap-2 text-[13px]">
              <Stars className="size-3" />
              <span className="font-bold text-conditions">{r.name}</span>
              <span className="text-muted-custom">· {r.when}</span>
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-[1.6] text-hero-text">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
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
      {/* Sticky Zusammenfassung */}
      <div className="sticky top-0 z-30 border-b-2 border-b-brand bg-background">
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
                    <button
                      type="button"
                      onClick={() => select(d.iso, "vormittag")}
                      aria-pressed={slot?.date === d.iso && slot?.period === "vormittag"}
                      className={slotCardClass(slot?.date === d.iso && slot?.period === "vormittag")}
                    >
                      <p className="text-[14px] font-bold text-conditions">Vormittag</p>
                      <p className="text-[12px] text-muted-custom">8:00 - 12:00 Uhr</p>
                    </button>
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
                className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors ${
                  slot?.period === "telefon"
                    ? "border-brand bg-brand/5 ring-1 ring-brand"
                    : "border-line bg-background hover:border-brand/60"
                }`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-bold text-conditions md:text-[17px]">
                    Termin telefonisch vereinbaren
                  </span>
                  <span className="block text-[14px] text-muted-custom">
                    Lieferfrist: 7 Werktage. Wir melden uns bei Ihnen.
                  </span>
                </span>
                {slot?.period === "telefon" ? (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                ) : (
                  <span
                    className="size-6 shrink-0 rounded-full border-2 border-brand bg-background"
                    aria-hidden="true"
                  />
                )}
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
            <ReviewCarousel />
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
    </div>
  );
}
