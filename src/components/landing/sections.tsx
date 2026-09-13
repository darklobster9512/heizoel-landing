import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Info, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-deep">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-ink md:text-[38px]">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-custom">{intro}</p> : null}
    </div>
  );
}

import smavaHero from "@/assets/smava-hero.webp.asset.json";

const STATS = [
  { value: "25.429", label: "ZUFRIEDENE KUNDEN" },
  { value: "4.99/5", label: "KUNDENBEWERTUNG" },
  { value: "10+", label: "JAHRE ERFAHRUNG" },
  { value: "500+", label: "PARTNER-HÄNDLER" },
  { value: "€247", label: "Ø ERSPARNIS" },
];

export function TrustBar() {
  return (
    <section aria-label="Klaro in Zahlen" className="bg-background">
      <div className="h-[3px] w-full bg-brand" />
      <div className="mx-auto max-w-6xl px-5 py-6 md:py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-ink md:text-2xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-custom md:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONDITIONS_LEFT = [
  ["Literpreis:", "ca. 128,78 € bis 163,15 € je 100 Liter (Heizöl EL)"],
  ["Liefermenge:", "Min. 1500 bis Max. 32.000 Liter"],
];

const CONDITIONS_RIGHT = [
  ["Lieferzeit:", "ca. 4 bis 10 Werktage, Express möglich"],
  ["Zahlungsarten:", "Vorkasse, Bar, EC-Karte, Rechnung"],
];

function ConditionsList({ items }: { items: string[][] }) {
  return (
    <dl className="grid gap-y-2.5">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-x-3 gap-y-0.5 text-[13.5px] leading-snug sm:grid-cols-[150px_1fr]"
        >
          <dt className="font-bold text-conditions">{label}</dt>
          <dd className="tabular text-conditions">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ConditionsBox({ mobileOnly = false }: { mobileOnly?: boolean }) {
  return (
    <section
      aria-label="Preis Übersicht"
      className={mobileOnly ? "bg-surface md:hidden" : "hidden bg-background md:block"}
    >
      <div className={`mx-auto max-w-6xl px-5 ${mobileOnly ? "pb-5 pt-4" : "pb-12"}`}>
        <div className="rounded-md bg-line px-4 py-4 md:bg-surface md:px-6 md:py-5">
          <h2 className="text-[14px] font-bold text-conditions">
            Heizöl Preis-Übersicht
          </h2>
          <div className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-[1.25fr_1fr]">
            <ConditionsList items={CONDITIONS_LEFT} />
            <ConditionsList items={CONDITIONS_RIGHT} />
          </div>
        </div>
      </div>
    </section>
  );
}


const LOAN_TYPES = [
  { title: "Ratenkredit", rate: "ab 3,89 %", text: "Für alles, was gerade ansteht — frei verwendbar." },
  { title: "Autokredit", rate: "ab 3,89 %", text: "Barzahlerrabatt beim Händler sichern." },
  { title: "Umschuldung", rate: "ab 4,29 %", text: "Teure Altkredite und Dispo ablösen." },
  { title: "Modernisierung", rate: "ab 4,09 %", text: "Sanieren, renovieren, energetisch aufwerten." },
  { title: "Baufinanzierung", rate: "ab 3,15 %", text: "Kauf, Neubau oder Anschlussfinanzierung." },
  { title: "Gewerbekredit", rate: "ab 5,20 %", text: "Betriebsmittel und Investitionen für Selbstständige." },
];

export function LoanTypes() {
  return (
    <section id="kreditarten" className="border-y border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead eyebrow="Kreditarten" title="Für jeden Zweck der passende Kredit" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOAN_TYPES.map((l) => (
            <li
              key={l.title}
              className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-brand"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-ink">{l.title}</h3>
                <span className="tabular font-mono text-sm font-semibold text-brand-deep">
                  {l.rate}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-custom">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const COMPARE = [
  { label: "Bestes Angebot über smava", value: 3.89, width: "26%", highlight: true },
  { label: "Durchschnitt unserer Bankpartner", value: 6.4, width: "45%" },
  { label: "Typisches Filialbank-Angebot", value: 8.9, width: "62%" },
  { label: "Dispositionskredit", value: 12.5, width: "88%" },
];

export function RateComparison() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHead
          eyebrow="Zinsvergleich"
          title="Der Unterschied zur Hausbank ist selten klein"
          intro="Beispielwerte für 25.000 € über 60 Monate. Ihr Zinssatz hängt von Bonität und Laufzeit ab."
        />
        <ul className="space-y-5">
          {COMPARE.map((c) => (
            <li key={c.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-ink">{c.label}</span>
                <span className="tabular font-mono font-semibold text-ink">
                  {c.value.toLocaleString("de-DE", { minimumFractionDigits: 2 })} %
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${c.highlight ? "bg-brand" : "bg-muted-custom/35"}`}
                  style={{ width: c.width }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const RATES = [
  { type: "Ratenkredit", rate: "3,89 – 12,90 %", term: "12 – 120 Monate", amount: "1.000 – 100.000 €" },
  { type: "Autokredit", rate: "3,89 – 9,90 %", term: "12 – 96 Monate", amount: "2.500 – 80.000 €" },
  { type: "Umschuldung", rate: "4,29 – 11,50 %", term: "24 – 120 Monate", amount: "5.000 – 100.000 €" },
  { type: "Modernisierungskredit", rate: "4,09 – 10,40 %", term: "24 – 120 Monate", amount: "5.000 – 100.000 €" },
  { type: "Kredit für Selbstständige", rate: "5,20 – 14,90 %", term: "12 – 84 Monate", amount: "2.500 – 60.000 €" },
];

export function RatesTable() {
  return (
    <section id="konditionen" className="scroll-mt-20 border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Konditionen"
          title="Zinsübersicht nach Kreditart"
          intro="Beispielhafte Spannen unserer Bankpartner. Ihr persönlicher Zinssatz hängt von Bonität, Laufzeit und Verwendungszweck ab."
        />

        <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-background">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Zinsspannen, Laufzeiten und Betragsrahmen je Kreditart</caption>
            <thead>
              <tr className="border-b border-line bg-secondary/60">
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Kreditart</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">eff. Jahreszins</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Laufzeit</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Betragsrahmen</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((r) => (
                <tr key={r.type} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium text-ink">{r.type}</th>
                  <td className="tabular px-5 py-4 font-mono font-medium text-brand-deep">{r.rate}</td>
                  <td className="tabular px-5 py-4 text-muted-custom">{r.term}</td>
                  <td className="tabular px-5 py-4 text-muted-custom">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-custom">
          Stand der Beispielwerte: laufend aktualisiert. Angaben ohne Gewähr, kein Angebot im
          Rechtssinne.
        </p>
      </div>
    </section>
  );
}

const ADVANTAGES = [
  {
    title: "31 Bankpartner in einer Abfrage",
    text: "Eine Anfrage, ein Score, alle erreichbaren Angebote — statt fünf einzelner Anträge.",
  },
  {
    title: "SCHUFA-neutrale Konditionsanfrage",
    text: "Der Vergleich hinterlässt keine Spur in Ihrem SCHUFA-Score.",
  },
  {
    title: "Keine Gebühren, keine Provision von Ihnen",
    text: "Wir werden von den Banken vergütet. Für Sie ist der Vergleich kostenfrei.",
  },
  {
    title: "Vollständig digitaler Abschluss",
    text: "Identifikation per Video oder Bank-Login, Signatur online, Papier entfällt.",
  },
  {
    title: "Persönliche Beratung aus Deutschland",
    text: "Zertifizierte Kreditberater, erreichbar Mo–Fr von 8 bis 20 Uhr.",
  },
  {
    title: "Transparente Gesamtkosten",
    text: "Effektivzins, Restschuldversicherung und Gesamtbetrag immer vollständig ausgewiesen.",
  },
];

export function Advantages() {
  return (
    <section id="vorteile" className="scroll-mt-20 border-b border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Warum smava"
          title="Ein Vergleich, der auch der Prüfung standhält"
        />
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a) => (
            <li key={a.title} className="border-t border-line pt-5">
              <h3 className="text-base font-semibold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-custom">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import freeInquiry from "@/assets/free-inquiry.svg.asset.json";
import getOffers from "@/assets/get-offers.svg.asset.json";
import closeApplication from "@/assets/close-application.svg.asset.json";
import coupleOnCouch from "@/assets/couple-on-couch.webp.asset.json";
import offerList from "@/assets/heizoel-offer-list.png.asset.json";
import interestIcon from "@/assets/interest.svg.asset.json";
import neutralIcon from "@/assets/neutral.svg.asset.json";
import freeIcon from "@/assets/free.svg.asset.json";
import dataSafetyIcon from "@/assets/data-safety.svg.asset.json";

const STEPS = [
  {
    icon: freeInquiry.url,
    iconAlt: "Monitor-Symbol, Schritt 1",
    width: 128,
    height: 128,
    title: "Kostenlose\nPreisanfrage",
    text: "Geben Sie einfach Ihre Postleitzahl, die gewünschte Menge und Sorte ein – bequem von zu Hause aus.",
  },
  {
    icon: getOffers.url,
    iconAlt: "Listen-Symbol, Schritt 2",
    width: 67,
    height: 56,
    title: "Angebote vergleichen",
    text: "Sie erhalten aktuelle Heizölpreise von Händlern aus Ihrer Region und wählen das günstigste Angebot.",
  },
  {
    icon: closeApplication.url,
    iconAlt: "Hand mit Münzen, Schritt 3",
    width: 72,
    height: 72,
    title: "Heizöl bestellen",
    text: "Bestellen Sie direkt online beim Händler Ihrer Wahl – die Lieferung erfolgt zum Wunschtermin.",
  },
];

export function Steps() {
  return (
    <section id="ablauf" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
        <h2 className="text-[22px] font-bold tracking-tight text-conditions md:text-2xl">
          In 3 Schritten zum günstigen Heizöl
        </h2>
        <ol className="mt-9 grid gap-9 md:grid-cols-3 md:gap-x-12">
          {STEPS.map((s) => (
            <li key={s.title} className="flex items-start gap-5">
              <img
                src={s.icon}
                alt={s.iconAlt}
                width={s.width}
                height={s.height}
                className="h-[72px] w-[72px] shrink-0 object-contain"
              />
              <div className="max-w-[250px] pt-0.5">
                <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.18] text-conditions">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-conditions/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

  );
}

export function PersonalDataInfo() {
  return (
    <section className="bg-surface" aria-labelledby="personal-data-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pb-14 md:grid-cols-[1.45fr_1fr] md:gap-20 md:px-5 md:py-[106px]">
        <div className="order-2 max-w-[610px] px-5 text-conditions md:order-1 md:px-0">
          <h2
            id="personal-data-title"
            className="max-w-[560px] text-[25px] font-bold leading-[1.3] md:text-[28px]"
          >
            Heizöl günstig einkaufen
          </h2>

          <div className="mt-8 space-y-4 text-[16px] leading-[1.5]">
            <p>
              <strong>Heizöl</strong> ist neben Gas der wichtigste Energieträger – besonders in der
              kalten Jahreszeit spielen die <strong>Heizölpreise</strong> eine große Rolle.
            </p>
            <p>
              Die Preise für Heizöl schwanken stark. Sie hängen ab vom <strong>Dollarkurs</strong>,
              der weltweiten <strong>Ölnachfrage</strong> und der politischen Lage in den
              ölfördernden Ländern.
            </p>
            <p>
              Deshalb lohnt es sich, das ganze Jahr über die Marktentwicklung zu beobachten und bei{" "}
              <strong>günstigen Preisen</strong> zuzugreifen.
            </p>
            <p>
              Vor einer Bestellung sollten Verbraucher die Angebote mit einem{" "}
              <strong>Heizölrechner vergleichen</strong> – denn auch zwischen den Händlern gibt es
              deutliche Unterschiede.
            </p>
          </div>
        </div>

        <img
          src={coupleOnCouch.url}
          alt="Ein Paar betrachtet gemeinsam ein Smartphone"
          width={400}
          height={400}
          loading="lazy"
          className="order-1 aspect-square w-full object-cover md:order-2 md:max-w-[400px] md:justify-self-end"
        />
      </div>
    </section>
  );
}

const OFFER_ADVANTAGES = [
  {
    icon: interestIcon.url,
    iconAlt: "Lupe mit Preisdiagramm",
    title: "Günstige Preise",
    text: "Sparen Sie durch den direkten Preisvergleich von über 300 Heizölhändlern aus Ihrer Region.",
  },
  {
    icon: neutralIcon.url,
    iconAlt: "Regionale Händler",
    title: "Regionale Händler",
    text: "Wir vergleichen nur Händler, die auch tatsächlich in Ihre Region liefern.",
  },
  {
    icon: freeIcon.url,
    iconAlt: "Kostenlose Preisanfrage",
    title: "Kostenlos &\nunverbindlich",
    text: "Es warten keine versteckten Kosten auf Sie und Sie können die Anfrage jederzeit widerrufen.",
  },
  {
    icon: dataSafetyIcon.url,
    iconAlt: "Geschützte Datenübertragung",
    title: "Datensicherheit",
    text: "Für eine sichere Übermittlung Ihrer persönlichen Daten sorgen unsere strengen Datenschutzrichtlinien.",
  },
];

export function MatchingOffers() {
  return (
    <section className="overflow-hidden bg-background" aria-labelledby="matching-offers-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pt-0 md:h-[557px] md:grid-cols-[404px_1fr] md:gap-[74px] md:px-5 md:pt-8">
        <div className="order-1 h-[258px] w-full overflow-hidden md:contents">
          <img
            src={offerList.url}
            alt="Beispielhafte Heizöl-Angebote verschiedener Händler"
            width={404}
            height={575}
            loading="lazy"
            className="mx-auto w-full max-w-[404px] self-start md:order-1 md:-translate-x-[78px]"
          />
        </div>

        <div className="order-2 flex flex-col justify-center px-5 pt-0 md:h-[557px] md:px-0">
          <h2
            id="matching-offers-title"
            className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[28px]"
          >
            Mit Klaro zum günstigsten Heizölpreis
          </h2>

          <ul className="mt-8 grid gap-x-[72px] gap-y-8 sm:grid-cols-2 md:-ml-[94px] md:w-[calc(100%+94px)]">
            {OFFER_ADVANTAGES.map((advantage) => (
              <li key={advantage.title} className="flex items-start gap-3">
                <img
                  src={advantage.icon}
                  alt={advantage.iconAlt}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 object-contain"
                />
                <div className="max-w-[280px] text-conditions">
                  <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.2]">
                    {advantage.title}
                  </h3>
                  <p className="mt-1 text-[16px] leading-[1.5]">{advantage.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center md:mt-[66px]">
            <Button asChild className="h-12 w-full max-w-[298px] text-[13px] font-bold !text-white shadow-md">
              <Link to="/antrag/schritt-1" search={{}}>Jetzt Heizölpreise vergleichen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


const VOICES = [
  {
    quote:
      "Drei Angebote innerhalb einer Stunde, das beste lag 1,4 Prozentpunkte unter dem meiner Hausbank.",
    name: "Martin K.",
    role: "Umschuldung, 32.000 €",
  },
  {
    quote:
      "Klare Zahlen, keine Lockangebote. Der ausgewiesene Effektivzins war am Ende auch der im Vertrag.",
    name: "Sabine R.",
    role: "Autokredit, 18.500 €",
  },
  {
    quote:
      "Als Selbstständige war es sonst mühsam. Hier hatte ich in zwei Tagen eine Zusage.",
    name: "Elena T.",
    role: "Betriebsmittel, 45.000 €",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Kundenstimmen"
          title="4,8 von 5 Sternen aus 2.318 Bewertungen"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {VOICES.map((v) => (
            <li key={v.name} className="rounded-xl border border-line bg-background p-6">
              <p className="font-mono text-xs tracking-[0.2em] text-brand-deep" aria-label="5 von 5 Sternen">
                ★★★★★
              </p>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink">
                „{v.quote}“
              </blockquote>
              <footer className="mt-5 border-t border-line pt-4 text-xs text-muted-custom">
                <span className="font-medium text-ink">{v.name}</span> · {v.role}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const HEIZOEL_ROWS: { label: string; info: string; standard: boolean; premium: boolean }[] = [
  {
    label: "mit anderen Heizölsorten mischbar",
    info: "Mit anderen Ölsorten mischbar: Heizöl Standard und Premium lassen sich auch bei Restbeständen im Tank untereinander mischen. Mischbarkeit von Bioheizöl mit Heizöl Standard und Premium ist abhängig von Ihrer Heizanlage. Fragen Sie im Zweifelsfall den Hersteller Ihres Heizgerätes.",
    standard: true,
    premium: true,
  },
  {
    label: "für alle Ölheizungen geeignet",
    info: "Für alle Ölheizungen geeignet: Einsatz für alle Ölheizungen inkl. Brennwerttechnik.",
    standard: true,
    premium: true,
  },
  {
    label: "geringerer Verbrauch",
    info: "Reduzierter Verbrauch: Nahezu rückstandfreie Verbrennung führt zu höherer Effizienz und dadurch Reduzierung des Ölverbrauchs, verhindert Ablagerungen und sorgt so für eine bessere Wärme- bzw. Energieausbeute. Es bildet sich weniger Ruß und somit werden die Umwelt-Emissionen gesenkt.",
    standard: false,
    premium: true,
  },
  {
    label: "angenehmer Geruch",
    info: "Angenehmer Geruch: Geruchszusätze neutralisieren den typischen Ölgeruch und sorgen für angenehmen Duft, sowohl während der Betankung als auch im Regelbetrieb der Heizung.",
    standard: false,
    premium: true,
  },
  {
    label: "verbesserte Lagerfähigkeit",
    info: "Höhere Lagerstabilität des Heizöls: Stabilitätsverbesserer verhindern die Bildung von Sedimenten, Ablagerungen und Schlamm und verlangsamen somit die natürliche Alterung des Öls und machen es länger lagerfähig.",
    standard: false,
    premium: true,
  },
  {
    label: "höhere Betriebssicherheit & Lebenszeit der Heizungsanlage",
    info: "Höhere Betriebssicherheit & Lebenszeit der Heizung: Die Minimierung von Ablagerungen und Ruß reduziert nicht nur den Verbrauch, sondern schützt auch vor störungsbedingten Ausfällen. Spezielle Additive unterbinden beispielsweise die Rostbildung im Brennersystem. Eine erhöhte Schmierfähigkeit schützt die Förderpumpe. Insgesamt erhöht dies die Nutzungsdauer, schützt vor teuren Reparaturen und senkt den Wartungsaufwand.",
    standard: false,
    premium: true,
  },
  {
    label: "umweltschonende Biokomponenten",
    info: "Schwefelarmes Heizöl: Enthält Komponenten aus nachwachsenden Rohstoffen, meist durch Beimischung von Rapsöl oder anderen veresterten Pflanzenölen. Hierdurch wird eine Reduzierung der CO2-Emissionen erreicht.",
    standard: false,
    premium: false,
  },
];

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <Check className="h-5 w-5 text-brand" strokeWidth={3} aria-label="Ja" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground" strokeWidth={3} aria-label="Nein" />
  );
}

import dropGreen from "@/assets/drop-green.png.asset.json";
import dropBrown from "@/assets/drop-brown.png.asset.json";

function InfoCell({ info, label }: { info: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setPinned(false);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Info: ${label}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            if (!pinned) setOpen(false);
          }}
          onClick={(e) => {
            e.preventDefault();
            if (pinned) {
              setPinned(false);
              setOpen(false);
            } else {
              setPinned(true);
              setOpen(true);
            }
          }}
          className="mx-auto flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-conditions"
        >
          <Info className="h-[18px] w-[18px]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!pinned) setOpen(false);
        }}
        className="max-w-[320px] text-left text-[13px] leading-relaxed text-conditions"
      >
        <p className="mb-1.5 text-[14px] font-semibold text-ink">{label}</p>
        {info}
      </PopoverContent>
    </Popover>
  );
}

const GRID = "grid grid-cols-[1fr_40px_76px_76px] gap-2 md:grid-cols-[1fr_60px_220px_220px]";

export function HeizoelSorten() {
  return (
    <section id="heizoelsorten" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-[1283px] px-5 py-16 md:py-20">
        <p className="text-center text-[11px] font-light uppercase tracking-[0.2em] text-muted-custom">
          Welches Heizöl brauche ich?
        </p>
        <h2 className="mt-3 text-center text-[28px] font-bold leading-[1.2] text-conditions md:text-[34px]">
          Heizölsorten im Überblick
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          {/* Kopfzeile */}
          <div className={`${GRID} items-end border-b border-line bg-muted/40 px-5 py-4 md:px-8 md:py-5`}>
            <div />
            <div />
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Standard
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#7AB616" }}>
                <img src={dropGreen.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Günstige
              </p>
            </div>
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Premium
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#A0522D" }}>
                <img src={dropBrown.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Sparsame
              </p>
            </div>
          </div>

          {HEIZOEL_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`${GRID} items-center px-5 py-4 md:px-8 md:py-5 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <p className="text-[13px] font-semibold leading-snug text-conditions md:text-[15px]">
                {row.label}
              </p>
              <InfoCell info={row.info} label={row.label} />
              <div className="flex justify-center">
                <Mark yes={row.standard} />
              </div>
              <div className="flex justify-center">
                <Mark yes={row.premium} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild className="h-12 w-full max-w-[250px] text-[13px] font-bold !text-white shadow-md">
            <a href="#rechner">Jetzt Preis berechnen</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const TRUST_CARDS = [
  {
    title: "Heizöl günstig bestellen – so einfach geht's",
    links: [
      { label: "Heizöl Preisvergleich", href: "#rechner" },
      { label: "Aktuelle Heizölpreise", href: "#konditionen" },
      { label: "Heizöl EL Standard", href: "#rechner" },
      { label: "Premium-Heizöl", href: "#rechner" },
    ],
  },
  {
    title: "Der richtige Zeitpunkt für Ihre Bestellung",
    links: [
      { label: "Preisentwicklung", href: "#konditionen" },
      { label: "Heizöl im Sommer kaufen", href: "#faq" },
      { label: "Sammelbestellungen", href: "#faq" },
      { label: "Preisgarantie", href: "#faq" },
    ],
  },
  {
    title: "Lieferung und Zahlung im Überblick",
    links: [
      { label: "Lieferzeiten", href: "#faq" },
      { label: "Expresslieferung", href: "#faq" },
      { label: "Zahlungsarten", href: "#faq" },
      { label: "Mindestbestellmenge", href: "#faq" },
    ],
  },
  {
    title: "Heizöl-Wissen für Ihr Zuhause",
    links: [
      { label: "Sorten im Vergleich", href: "#konditionen" },
      { label: "Tank richtig pflegen", href: "#faq" },
      { label: "Verbrauch senken", href: "#faq" },
      { label: "Heizöl-Glossar", href: "#faq" },
    ],
  },
  {
    title: "Ihr Wegweiser zu Preisen, Händlern und Beratung",
    links: [
      { label: "Preisrechner", href: "#rechner" },
      { label: "Händler in Ihrer Region", href: "#rechner" },
      { label: "Beratung", href: "#faq" },
      { label: "Häufige Fragen", href: "#faq" },
    ],
  },
];

export function TrustLinks() {
  return (
    <section aria-label="Weitere Heizöl-Themen" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="pr-4">
            <h2 className="text-[26px] font-bold leading-[1.25] text-conditions">
              Vertrauen Sie auf Klaro – Ihr Heizöl-Preisvergleich
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6] text-conditions">
              Entdecken Sie jetzt weitere Themen und Vergleichsmöglichkeiten rund um
              Heizöl, Lieferung und den besten Preis für Ihre Region.
            </p>
          </div>

          {TRUST_CARDS.map((card) => (
            <div key={card.title} className="rounded-sm bg-background px-6 py-6">
              <p className="text-[15px] leading-[1.45] text-footer-text">{card.title}</p>
              <ul className="mt-5 space-y-3">
                {card.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 text-[15px] font-semibold text-brand-deep hover:underline"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mt-[3px] h-4 w-4 shrink-0 text-brand"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-5 text-[12px] leading-[1.6] text-muted-custom">
          <p>
            <strong className="font-bold">Preisbeispiel:</strong> Alle genannten Literpreise
            sind regionale Beispielwerte und werden laufend aktualisiert. Angaben ohne
            Gewähr, kein Angebot im Rechtssinne.{" "}
            <a href="#faq" className="text-brand-deep hover:underline">
              Mehr Infos
            </a>
            .
          </p>
          <div className="space-y-1.5">
            <p>
              <a href="#faq" className="text-brand-deep hover:underline">
                * Mehr Infos
              </a>
            </p>
            <p>
              <a href="#faq" className="text-brand-deep hover:underline">
                ** Mehr Infos
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type FooterCol = {
  title: string;
  titleHref: string;
  links: { label: string; href: string }[];
};

const FOOTER_COLS: FooterCol[] = [
  {
    title: "Unternehmen",
    titleHref: "#",
    links: [
      { label: "Karriere", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Hilfe", href: "#" },
      { label: "Unsere Partner", href: "#" },
      { label: "Kontakt", href: "#" },
    ],
  },
  {
    title: "Heizöl bestellen",
    titleHref: "#rechner",
    links: [
      { label: "Preisvergleich", href: "#rechner" },
      { label: "Heizöl EL Standard", href: "#rechner" },
      { label: "Schwefelarmes Heizöl", href: "#rechner" },
      { label: "Premium-Heizöl", href: "#rechner" },
      { label: "Sammelbestellung", href: "#faq" },
      { label: "Expresslieferung", href: "#faq" },
    ],
  },
  {
    title: "Service",
    titleHref: "#",
    links: [
      { label: "Preisrechner", href: "#rechner" },
      { label: "Glossar", href: "#" },
      { label: "Nachrichten", href: "#" },
      { label: "Partnerprogramm", href: "#" },
      { label: "Freunde werben Freunde", href: "#" },
    ],
  },
];

const FOOTER_LEGAL = [
  { label: "Datenschutz", href: "#" },
  { label: "AGB", href: "#" },
  { label: "Impressum", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Widerruf", href: "#" },
];

function ConsultingBlock() {
  return (
    <p className="text-[14px] leading-[1.45] text-footer-text">
      Wir beraten Sie gerne telefonisch unter:
      <br />
      <a href="tel:08000009800" className="text-footer-text hover:underline">
        0800 000 98 00
      </a>
      <br />
      <br />
      Montag - Freitag: 8:00 - 20:00 Uhr
      <br />
      Samstag: 10:00 - 15:00 Uhr
    </p>
  );
}

const SOCIALS: { label: string; href: string; path: React.ReactNode }[] = [
  {
    label: "Youtube",
    href: "#",
    path: (
      <path d="M26.8009 13.1728C26.8009 10.5487 24.6735 8.42126 22.0494 8.42126H9.8992C7.27511 8.42126 5.14771 10.5487 5.14771 13.1728V18.8269C5.14771 21.451 7.27511 23.5784 9.8992 23.5784H22.0494C24.6735 23.5784 26.8009 21.451 26.8009 18.8269V13.1728ZM19.6554 16.4235L14.2067 19.1191C13.9932 19.2346 13.2675 19.0801 13.2675 18.837V13.3041C13.2675 13.0579 13.9992 12.9038 14.2128 13.0253L19.4284 15.863C19.647 15.9876 19.8767 16.3039 19.6554 16.4238V16.4235Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    path: (
      <>
        <path d="M6.40747 11.9855H10.6129V25.4944H6.40747V11.9855ZM8.5107 5.27246C9.85566 5.27246 10.9451 6.36354 10.9451 7.70547C10.9451 9.0474 9.85532 10.1418 8.5107 10.1418C7.16609 10.1418 6.073 9.04907 6.073 7.70547C6.073 6.36186 7.16239 5.27246 8.5107 5.27246Z" />
        <path d="M13.2476 11.9848H17.2754V13.8325H17.3304C17.8919 12.7693 19.2617 11.6503 21.3065 11.6503C25.5577 11.6503 26.3418 14.4464 26.3418 18.0846V25.4938H22.1457V18.9262C22.1457 17.3582 22.1152 15.3437 19.9633 15.3437C17.8113 15.3437 17.4443 17.05 17.4443 18.8117V25.4938H13.2476V11.9848Z" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    path: (
      <>
        <path d="M21.9234 8.85455C21.2038 8.85455 20.6201 9.43821 20.6201 10.1579C20.6201 10.8775 21.2038 11.4612 21.9234 11.4612C22.6431 11.4612 23.2267 10.8775 23.2267 10.1579C23.2267 9.43821 22.6431 8.85455 21.9234 8.85455Z" />
        <path d="M16.1295 10.5257C13.1109 10.5257 10.655 12.9815 10.655 16.0002C10.655 19.0189 13.1109 21.4747 16.1295 21.4747C19.1482 21.4747 21.6041 19.0189 21.6041 16.0002C21.6041 12.9815 19.1482 10.5257 16.1295 10.5257ZM16.1295 19.5068C14.1959 19.5068 12.6226 17.9338 12.6226 16.0002C12.6226 14.0666 14.1956 12.4936 16.1295 12.4936C18.0635 12.4936 19.6362 14.0666 19.6362 16.0002C19.6362 17.9338 18.0632 19.5068 16.1295 19.5068Z" />
        <path d="M20.4754 27.1147H11.6004C7.91849 27.1147 4.92334 24.1195 4.92334 20.4376V11.5623C4.92334 7.88036 7.91849 4.88519 11.6004 4.88519H20.4754C24.1573 4.88519 27.1528 7.88036 27.1528 11.5623V20.4376C27.1528 24.1195 24.157 27.1147 20.4754 27.1147ZM11.6004 6.97667C9.07169 6.97667 7.01448 9.03356 7.01448 11.5623V20.4376C7.01448 22.9663 9.07135 25.0235 11.6004 25.0235H20.4754C23.0041 25.0235 25.0614 22.9667 25.0614 20.4376V11.5623C25.0614 9.03356 23.0041 6.97667 20.4754 6.97667H11.6004Z" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    path: (
      <path d="M18.135 27.3902V17.4238H21.4583L22.0906 13.301H18.135V10.6255C18.135 9.49749 18.6874 8.39802 20.4592 8.39802H22.2578V4.88804C22.2578 4.88804 20.6258 4.60931 19.0652 4.60931C15.8074 4.60931 13.678 6.58393 13.678 10.1584V13.3006H10.0569V17.4235H13.678V27.3899" />
    ),
  },
  {
    label: "X",
    href: "#",
    path: (
      <path d="M5.0259 5.60788L13.6 17.0717L4.97217 26.3924H6.91421L14.4681 18.2316L20.5713 26.3924H27.1795L18.1228 14.2837L26.1539 5.60754H24.2119L17.2554 13.1232L11.6345 5.60754H5.02624L5.0259 5.60788ZM7.8817 7.03813H10.9175L24.323 24.9624H21.2872L7.8817 7.03813Z" />
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-background text-ink">
      <div className="mx-auto max-w-[1283px]">
        {/* Desktop columns */}
        <div className="hidden min-h-[237px] grid-cols-[316px_264px_307px_1fr] px-[66px] pt-[21px] md:grid">
          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-[14px] font-bold leading-[20px]">
                <a
                  href={col.titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:underline"
                >
                  {col.title}
                </a>
              </h4>
              <ul className="mt-[7px] space-y-[3px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] leading-[20px] text-footer-text hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h4 className="text-[14px] font-bold leading-[20px]">
              <a
              href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline"
              >
                Kostenlose Beratung
              </a>
            </h4>
            <div className="mt-[2px]">
              <ConsultingBlock />
            </div>
          </div>
        </div>

        {/* Mobile accordions */}
        <div className="px-5 pt-4 md:hidden">
          <Accordion type="multiple" className="w-full">
            {FOOTER_COLS.map((col) => (
              <AccordionItem key={col.title} value={col.title} className="border-b border-border">
                <AccordionTrigger className="py-4 text-[15px] font-semibold text-ink hover:no-underline">
                  {col.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5 pb-2">
                    <li>
                      <a
                        href={col.titleHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-ink hover:underline"
                      >
                        {col.title}
                      </a>
                    </li>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-footer-text hover:underline"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="beratung" className="border-b border-border">
              <AccordionTrigger className="py-4 text-[15px] font-semibold text-ink hover:no-underline">
                Kostenlose Beratung
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-2">
                  <ConsultingBlock />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col items-start gap-5 border-t border-border px-5 py-6 md:grid md:h-[70px] md:grid-cols-[290px_1fr_390px] md:gap-x-[62px] md:px-[66px] md:py-0">
          <a
            href="#"
            className="text-smava-logo"
            aria-label="Klaro Startseite"
          >
            <Logo />
          </a>
          <div className="flex items-center gap-4 md:justify-start">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} icon`}
                className="grid size-8 place-items-center rounded-[4px] border border-smava-logo text-smava-logo transition-colors hover:bg-brand-soft"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
          <div className="flex w-full flex-col items-start gap-3 text-left md:items-end md:gap-2 md:text-right">
            <div className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-1 md:flex md:justify-end">
              {FOOTER_LEGAL.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] leading-5 text-footer-text hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="grid w-full max-w-[270px] grid-cols-2 gap-x-12 md:hidden">
              <div className="flex flex-col gap-2">
                {FOOTER_LEGAL.filter((link) => ["Datenschutz", "Impressum", "Widerruf"].includes(link.label)).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-5 text-footer-text hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {FOOTER_LEGAL.filter((link) => ["AGB", "Cookies"].includes(link.label)).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-5 text-footer-text hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-[13px] leading-5 text-footer-text">
              © 2026 Klaro GmbH | Musterstraße 1 | 10115 Berlin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


export function ReferralBanner() {
  return (
    <section aria-label="Freunde werben" className="relative bg-white">
      <div className="hidden md:block">
        <div className="h-[150px] bg-white" />
        <div className="relative bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 px-5">
            <div className="relative">
              <img
                src={smavaHero.url}
                alt="Klaro Beraterin mit Tablet"
                className="absolute bottom-0 left-[40px] h-[350px] w-auto object-contain object-bottom"
              />
            </div>
            <div className="-ml-32 flex min-h-[290px] flex-col justify-center py-10">
              <h2 className="text-[26px] font-bold leading-tight text-ink">
                Prämie für jede Bestellung: Freunde werben!
              </h2>
              <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-muted-custom">
                Empfehlen Sie Klaro Ihren Freunden. Als Dankeschön bekommen Sie nach jeder
                Bestellung eine Geldprämie – Dieses Angebot gilt nur für kurze Zeit!
              </p>
              <div className="mt-7">
                <Button asChild className="h-12 w-full max-w-[250px] text-[13px] font-bold !text-white shadow-md">
                  <Link to="/antrag/schritt-1" search={{}}>Jetzt Prämie sichern</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-center bg-white pt-6">
          <img
            src={smavaHero.url}
            alt="Klaro Beraterin mit Tablet"
            className="h-[240px] w-auto object-contain"
          />
        </div>
        <div className="-mt-[120px] bg-surface px-5 pb-10 pt-[132px] text-center">
          <h2 className="text-[22px] font-bold leading-tight text-ink">
            Prämie für jede Bestellung: Freunde werben!
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-muted-custom">
            Empfehlen Sie Klaro Ihren Freunden. Als Dankeschön bekommen Sie nach jeder Bestellung
            eine Geldprämie – Dieses Angebot gilt nur für kurze Zeit!
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="h-12 w-full max-w-[280px] text-[13px] font-bold !text-white shadow-md">
              <Link to="/antrag/schritt-1" search={{}}>Jetzt Prämie sichern</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
