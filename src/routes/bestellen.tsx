import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Lock,
  Mail,
  Phone,
  Truck,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadOrderDraft, saveOrderDraft, type OrderDraft } from "@/lib/order-draft";
import ekomi from "@/assets/ekomi.webp.asset.json";
import trustedShops from "@/assets/trusted-shops-icon.png.asset.json";
import googleIcon from "@/assets/google-icon.webp.asset.json";
import vorauskasse from "@/assets/vorauskasse.png.asset.json";
import barzahlung from "@/assets/barzahlung.png.asset.json";
import ecKarte from "@/assets/ec-karte.png.asset.json";

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
  daysAgo: number;
  text: string;
}

function formatDaysAgo(days: number) {
  return `vor ${days} Tag${days === 1 ? "" : "en"}`;
}

const CHECKS = [
  "Bestellung ohne Anmeldung",
  "Lieferkosten enthalten",
  "Tagespreis garantiert",
  "Ihre Daten sind sicher verschlüsselt",
];

const REVIEWS: Review[] = [
  { id: 1, name: "Michael R.", daysAgo: 2, text: "Schnelle Lieferung, fairer Preis. Bestellung war in 2 Minuten erledigt. Gerne wieder!" },
  { id: 2, name: "Sabine K.", daysAgo: 4, text: "Super Service! Der Fahrer hat vorher angerufen und war pünktlich." },
  { id: 3, name: "Thomas W.", daysAgo: 1, text: "Preis-Leistung stimmt. Übersichtliche Seite und unkomplizierte Abwicklung." },
  { id: 4, name: "Petra S.", daysAgo: 3, text: "Zum ersten Mal online bestellt — ging super einfach. Lieferung kam wie versprochen." },
  { id: 5, name: "Andreas B.", daysAgo: 5, text: "Guter Preis, freundlicher Fahrer. Werde auch nächstes Jahr wieder bestellen." },
  { id: 6, name: "Julia M.", daysAgo: 2, text: "Alles transparent, keine versteckten Kosten. Das gefällt mir sehr." },
  { id: 7, name: "Stefan H.", daysAgo: 6, text: "Heizöl kam einen Tag früher als angekündigt. Top organisiert!" },
  { id: 8, name: "Claudia F.", daysAgo: 4, text: "Klaro hat den besten Preis in meiner Region gehabt. Empfehlung!" },
  { id: 9, name: "Markus L.", daysAgo: 7, text: "Unkompliziert, schnell, zuverlässig. Genau so muss das sein." },
  { id: 10, name: "Nicole G.", daysAgo: 1, text: "Sehr gute Beratung am Telefon. Die Lieferung verlief reibungslos." },
  { id: 11, name: "Frank D.", daysAgo: 3, text: "Ich bin begeistert. Preis berechnet, bestellt, geliefert — ohne Stress." },
  { id: 12, name: "Ute P.", daysAgo: 5, text: "Der Tankwagen passte perfekt in unsere Einfahrt. Gerne wieder!" },
  { id: 13, name: "Klaus N.", daysAgo: 6, text: "Fairer Direktpreis, keine Überraschungen. Bestellung lief reibungslos." },
  { id: 14, name: "Sandra O.", daysAgo: 2, text: "Schnelle Reaktionszeit und pünktliche Lieferung. Absolut empfehlenswert." },
  { id: 15, name: "Jürgen T.", daysAgo: 4, text: "Meine zweite Bestellung bei Klaro. Beide Male alles bestens." },
  { id: 16, name: "Monika E.", daysAgo: 7, text: "Günstiger als beim lokalen Händler und trotzdem persönlicher Service." },
  { id: 17, name: "Robert Z.", daysAgo: 1, text: "Alles digital, alles klar. So soll Online-Bestellung heute funktionieren." },
  { id: 18, name: "Elke K.", daysAgo: 3, text: "Lieferung am gewünschten Tag, Fahrer sehr freundlich. Danke!" },
  { id: 19, name: "Wolfgang S.", daysAgo: 5, text: "Preisvergleich war einfach, Bestellung noch einfacher. Gerne wieder." },
  { id: 20, name: "Anna H.", daysAgo: 6, text: "Klaro ist mein neuer Standard für Heizöl. Schnell, günstig, zuverlässig." },
];

const SALUTATIONS = ["Herr", "Frau", "Firma"] as const;
type Salutation = (typeof SALUTATIONS)[number];

interface PaymentOption {
  id: string;
  label: string;
  desc: string;
  hint?: string;
  badge?: string;
  icon: { url: string };
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "vorkasse",
    label: "Vorkasse (SEPA)",
    desc: "Überweisung vor Lieferung.",
    badge: "Beliebt",
    icon: vorauskasse,
  },
  {
    id: "bar",
    label: "Barzahlung",
    desc: "Bar an den Fahrer bei Lieferung.",
    hint: "Neukunden: 50 % Anzahlung",
    icon: barzahlung,
  },
  {
    id: "ec",
    label: "EC-Karte",
    desc: "Kartenzahlung beim Fahrer.",
    hint: "Neukunden: 50 % Anzahlung",
    icon: ecKarte,
  },
  {
    id: "rechnung",
    label: "Rechnung",
    desc: "Zahlung nach Lieferung.",
    hint: "Neukunden: 50 % Anzahlung",
    icon: vorauskasse,
  },
];

interface AddressForm {
  salutation: Salutation;
  company?: string;
  firstName: string;
  lastName: string;
  street: string;
  streetNo: string;
  plz: string;
  city: string;
}

const emptyAddress = (plz = "", city = ""): AddressForm => ({
  salutation: "Herr",
  company: "",
  firstName: "",
  lastName: "",
  street: "",
  streetNo: "",
  plz,
  city,
});

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
  const [items, setItems] = useState<Review[]>([REVIEWS[0]!, REVIEWS[1]!]);
  const [nextIndex, setNextIndex] = useState(2);
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animating) return;
      setAnimating(true);
      const newItem = REVIEWS[nextIndex % REVIEWS.length]!;
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
              <span className="text-muted-custom">· {formatDaysAgo(r.daysAgo)}</span>
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

const fieldClass = (invalid?: boolean) =>
  `h-11 w-full rounded-md border bg-background px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-custom focus:border-brand focus:ring-2 focus:ring-brand/20 ${
    invalid ? "border-red-500" : "border-line"
  }`;

function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[13px] font-bold text-conditions">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-[12px] text-red-500">{error}</p> : null}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-background shadow-card">
      <div className="flex items-center gap-3 border-b border-line bg-brand/5 px-4 py-3.5">
        <span className="flex size-9 items-center justify-center rounded-md bg-brand text-white">
          {icon}
        </span>
        <h2 className="text-[16px] font-bold text-conditions">
          {title}
          {hint ? (
            <span className="ml-2 text-[13px] font-normal text-muted-custom">{hint}</span>
          ) : null}
        </h2>
      </div>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}

function AddressFields({
  value,
  onChange,
  errors,
  withSalutationButtons,
}: {
  value: AddressForm;
  onChange: (next: AddressForm) => void;
  errors: Record<string, string>;
  withSalutationButtons?: boolean;
}) {
  const set = (patch: Partial<AddressForm>) => onChange({ ...value, ...patch });
  return (
    <div className="grid gap-3">
      {withSalutationButtons ? (
        <div>
          <p className="mb-1 text-[13px] font-bold text-conditions">Anrede</p>
          <div className="grid grid-cols-3 gap-2">
            {SALUTATIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ salutation: s })}
                aria-pressed={value.salutation === s}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-md border text-[14px] font-semibold transition-colors ${
                  value.salutation === s
                    ? "border-brand bg-brand/5 text-conditions ring-1 ring-brand"
                    : "border-line bg-background text-ink hover:border-brand/60"
                }`}
              >
                {value.salutation === s ? (
                  <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                ) : null}
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Field label="Anrede">
          <select
            value={value.salutation}
            onChange={(e) => set({ salutation: e.target.value as Salutation })}
            className={fieldClass()}
          >
            {SALUTATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Vorname" required={withSalutationButtons} error={errors["firstName"]}>
          <input
            value={value.firstName}
            onChange={(e) => set({ firstName: e.target.value })}
            placeholder="Vorname"
            className={fieldClass(!!errors["firstName"])}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Nachname" required={withSalutationButtons} error={errors["lastName"]}>
          <input
            value={value.lastName}
            onChange={(e) => set({ lastName: e.target.value })}
            placeholder="Nachname"
            className={fieldClass(!!errors["lastName"])}
            autoComplete="family-name"
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <Field label="Straße" required={withSalutationButtons} error={errors["street"]}>
          <input
            value={value.street}
            onChange={(e) => set({ street: e.target.value })}
            placeholder="Straße"
            className={fieldClass(!!errors["street"])}
            autoComplete="street-address"
          />
        </Field>
        <Field label="Nr." required={withSalutationButtons} error={errors["streetNo"]}>
          <input
            value={value.streetNo}
            onChange={(e) => set({ streetNo: e.target.value })}
            placeholder="Nr."
            className={fieldClass(!!errors["streetNo"])}
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
        <Field label="PLZ" required={withSalutationButtons} error={errors["plz"]}>
          <input
            value={value.plz}
            onChange={(e) => set({ plz: e.target.value.replace(/\D/g, "").slice(0, 5) })}
            placeholder="PLZ"
            inputMode="numeric"
            className={fieldClass(!!errors["plz"])}
            autoComplete="postal-code"
          />
        </Field>
        <Field label="Ort" required={withSalutationButtons} error={errors["city"]}>
          <input
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
            placeholder="Ort"
            className={fieldClass(!!errors["city"])}
            autoComplete="address-level2"
          />
        </Field>
      </div>
    </div>
  );
}

function BestellenPage() {
  const [draft, setDraft] = useState<OrderDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [slot, setSlot] = useState<{ date: string; period: "vormittag" | "nachmittag" | "telefon" } | null>(
    null,
  );
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState<AddressForm>(emptyAddress());
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [billing, setBilling] = useState<AddressForm>(emptyAddress());
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("vorkasse");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const d = loadOrderDraft();
    setDraft(d);
    if (d) {
      setDelivery(emptyAddress(d.plz, d.city ?? ""));
      if (d.slot) setSlot(d.slot);
    }
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
    if (draft) saveOrderDraft({ ...draft, slot: { date, period } });
  };

  const proceed = () => {
    if (!slot) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const slotLabel = (() => {
    if (!slot) return "";
    if (slot.period === "telefon") return "Termin telefonisch vereinbaren";
    const day = days.find((d) => d.iso === slot.date);
    const period = slot.period === "vormittag" ? "Vormittag (8:00 - 12:00 Uhr)" : "Nachmittag (15:00 - 18:00 Uhr)";
    return day ? `${day.weekday}, ${day.date} · ${period}` : period;
  })();

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next["email"] = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (phone.trim().length < 5) next["phone"] = "Bitte geben Sie Ihre Telefonnummer ein.";
    if (!delivery.firstName.trim()) next["firstName"] = "Bitte ausfüllen.";
    if (!delivery.lastName.trim()) next["lastName"] = "Bitte ausfüllen.";
    if (!delivery.street.trim()) next["street"] = "Bitte ausfüllen.";
    if (!delivery.streetNo.trim()) next["streetNo"] = "Bitte ausfüllen.";
    if (!/^\d{5}$/.test(delivery.plz)) next["plz"] = "5-stellige PLZ eingeben.";
    if (!delivery.city.trim()) next["city"] = "Bitte ausfüllen.";
    if (billingDifferent) {
      if (!billing.firstName.trim()) next["b_firstName"] = "Bitte ausfüllen.";
      if (!billing.lastName.trim()) next["b_lastName"] = "Bitte ausfüllen.";
      if (!billing.street.trim()) next["b_street"] = "Bitte ausfüllen.";
      if (!billing.streetNo.trim()) next["b_streetNo"] = "Bitte ausfüllen.";
      if (!/^\d{5}$/.test(billing.plz)) next["b_plz"] = "5-stellige PLZ eingeben.";
      if (!billing.city.trim()) next["b_city"] = "Bitte ausfüllen.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validate()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!loaded) {
    return <div className="min-h-screen bg-surface font-body text-ink" />;
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

  const billingErrors: Record<string, string> = {};
  for (const [k, v] of Object.entries(errors)) {
    if (k.startsWith("b_")) billingErrors[k.slice(2)] = v;
  }

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
          {submitted ? (
            /* Bestätigung */
            <div className="rounded-xl border border-line bg-background px-6 py-10 text-center shadow-card">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <h1 className="mt-4 text-[24px] font-bold text-conditions md:text-[28px]">
                Vielen Dank für Ihre Bestellung!
              </h1>
              <p className="mt-2 text-[14px] text-muted-custom">
                Ihre Bestellnummer: <span className="font-bold text-conditions">KL-2026-48213</span>
              </p>
              <div className="mx-auto mt-5 max-w-md rounded-lg border border-line bg-surface px-4 py-4 text-left">
                <p className="text-[14px] font-bold text-conditions">
                  {fmtLiters(draft.liters)} L {sortLabel} — {fmtEuro(draft.total)} €
                </p>
                <p className="mt-1 text-[13px] text-muted-custom">{slotLabel}</p>
                <p className="mt-1 text-[13px] text-muted-custom">
                  {delivery.street} {delivery.streetNo}, {delivery.plz} {delivery.city}
                </p>
                <p className="mt-1 text-[13px] text-muted-custom">
                  Zahlungsart: {PAYMENT_OPTIONS.find((p) => p.id === payment)?.label}
                </p>
              </div>
              <p className="mt-4 text-[13px] text-muted-custom">
                Eine Bestätigung wurde an <span className="font-semibold text-ink">{email}</span>{" "}
                gesendet.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
              >
                Zur Startseite
              </Link>
            </div>
          ) : (
            <>
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
                {step === 1 ? "Wann soll geliefert werden?" : "Fast fertig — nur noch Ihre Daten"}
              </h1>
              <p className="mt-1.5 text-[14px] text-muted-custom">
                {step === 1 ? (
                  <>
                    Wählen Sie Ihren Wunschtermin —{" "}
                    <span className="font-semibold text-ink">keine Anmeldung nötig</span>.
                  </>
                ) : (
                  "Ihr Termin ist reserviert. Noch wenige Angaben und Ihre Bestellung ist abgeschlossen."
                )}
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
                  {step === 2 ? (
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
                      1
                    </span>
                  )}
                  <span className="text-[12px] font-bold text-conditions">Termin</span>
                </div>
                <span className={`h-px flex-1 ${step === 2 ? "bg-brand" : "bg-line"}`} />
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[13px] font-bold ${
                      step === 2 ? "bg-brand text-white" : "bg-surface text-muted-custom"
                    }`}
                  >
                    2
                  </span>
                  <span
                    className={`text-[12px] ${step === 2 ? "font-bold text-conditions" : "text-muted-custom"}`}
                  >
                    Daten &amp; Zahlung
                  </span>
                </div>
              </div>

              {step === 1 ? (
                <>
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
                            className="size-6 shrink-0 rounded-full border-2 border-line bg-background"
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
                  {!slot ? (
                    <p className="mt-2 text-center text-[13px] text-muted-custom">
                      Bitte wählen Sie einen Termin oder die telefonische Absprache.
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  {/* Zurück */}
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-line bg-background px-3 py-2 text-[13px] font-semibold text-conditions transition-colors hover:border-brand/60"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Zurück zum Termin
                  </button>

                  <div className="mt-4 grid gap-4">
                    {/* Kontakt */}
                    <SectionCard icon={<Mail className="h-5 w-5" aria-hidden="true" />} title="Kontakt">
                      <div className="grid gap-3">
                        <Field label="E-Mail-Adresse" required error={errors["email"]}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="z.B. max@mustermann.de"
                            className={fieldClass(!!errors["email"])}
                            autoComplete="email"
                          />
                        </Field>
                        <div className="rounded-lg border border-line bg-surface p-3">
                          <Field label="Telefonnummer" required error={errors["phone"]}>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="z.B. 0170 1234567"
                              className={fieldClass(!!errors["phone"])}
                              autoComplete="tel"
                            />
                          </Field>
                          <p className="mt-2 flex items-start gap-1.5 text-[12px] text-muted-custom">
                            <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                            <span>
                              <span className="font-bold text-conditions">Wichtig:</span> Der
                              Lieferfahrer ruft Sie 30 Min. vor Ankunft an.
                            </span>
                          </p>
                        </div>
                      </div>
                    </SectionCard>

                    {/* Lieferadresse */}
                    <SectionCard icon={<Truck className="h-5 w-5" aria-hidden="true" />} title="Lieferadresse">
                      <AddressFields
                        value={delivery}
                        onChange={setDelivery}
                        errors={errors}
                        withSalutationButtons
                      />
                    </SectionCard>

                    {/* Weitere Angaben */}
                    <SectionCard
                      icon={<FileText className="h-5 w-5" aria-hidden="true" />}
                      title="Weitere Angaben"
                      hint="(optional)"
                    >
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface px-3 py-3">
                        <input
                          type="checkbox"
                          checked={billingDifferent}
                          onChange={(e) => setBillingDifferent(e.target.checked)}
                          className="mt-0.5 size-4 accent-brand"
                        />
                        <span className="text-[13px]">
                          <span className="font-bold text-conditions">Andere Rechnungsadresse?</span>{" "}
                          <span className="text-muted-custom">
                            Nur ankreuzen, wenn die Rechnung nicht an die Lieferadresse gehen soll.
                          </span>
                        </span>
                      </label>

                      {billingDifferent ? (
                        <div className="mt-3 rounded-lg border border-line bg-surface p-3">
                          <AddressFields
                            value={billing}
                            onChange={setBilling}
                            errors={billingErrors}
                          />
                        </div>
                      ) : null}

                      <div className="mt-3">
                        <Field label="Hinweise zur Lieferung">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="z.B. Tank im Keller, Einfahrt rechts"
                            rows={3}
                            className="w-full rounded-md border border-line bg-background px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-custom focus:border-brand focus:ring-2 focus:ring-brand/20"
                          />
                        </Field>
                      </div>
                    </SectionCard>

                    {/* Zahlungsmethode */}
                    <SectionCard
                      icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
                      title="Zahlungsmethode"
                    >
                      <div className="grid gap-3" role="radiogroup" aria-label="Zahlungsmethode">
                        {PAYMENT_OPTIONS.map((p) => {
                          const active = payment === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => setPayment(p.id)}
                              className={`relative flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                                active
                                  ? "border-brand bg-brand/5 ring-1 ring-brand"
                                  : "border-line bg-background hover:border-brand/60"
                              }`}
                            >
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                  active ? "border-brand" : "border-line"
                                }`}
                                aria-hidden="true"
                              >
                                {active ? <span className="size-2.5 rounded-full bg-brand" /> : null}
                              </span>
                              <img
                                src={p.icon.url}
                                alt=""
                                className="h-9 w-auto shrink-0 object-contain"
                                loading="lazy"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block text-[14px] font-bold text-conditions">
                                  {p.label}
                                </span>
                                <span className="block text-[12px] text-muted-custom">{p.desc}</span>
                                {p.hint ? (
                                  <span className="mt-1 inline-block rounded bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-muted-custom">
                                    {p.hint}
                                  </span>
                                ) : null}
                              </span>
                              {p.badge ? (
                                <span className="absolute -top-2 right-3 rounded-sm bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                  {p.badge}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </SectionCard>
                  </div>

                  {Object.keys(errors).length > 0 ? (
                    <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] font-semibold text-red-600">
                      Bitte prüfen Sie die markierten Felder.
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={submit}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-[16px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
                  >
                    Jetzt verbindlich bestellen
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="mt-2 text-center text-[12px] text-muted-custom">
                    Mit Klick auf „Jetzt verbindlich bestellen" geben Sie eine verbindliche Bestellung
                    ab.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Sticky Preisleiste */}
      {!submitted ? (
        <div className="sticky bottom-0 z-30 border-t border-line bg-background shadow-header-strong">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="text-[17px] font-bold leading-tight text-conditions">
                {fmtEuro(draft.total)} €
              </p>
              <p className="text-[12px] text-muted-custom">inkl. MwSt. · kostenlose Lieferung</p>
            </div>
            {step === 1 ? (
              <button
                type="button"
                onClick={proceed}
                disabled={!slot}
                className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                Weiter
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
              >
                Bestellen
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
