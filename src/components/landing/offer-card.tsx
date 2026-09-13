import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = { from: number; to: number; step: number };

const STANDARD_STEPS: Step[] = [
  { from: 1000, to: 15000, step: 250 },
  { from: 15000, to: 120000, step: 1000 },
];

const IMMO_STEPS: Step[] = [
  { from: 300000, to: 400000, step: 10000 },
  { from: 400000, to: 500000, step: 20000 },
  { from: 500000, to: 600000, step: 50000 },
  { from: 600000, to: 1000000, step: 100000 },
  { from: 1000000, to: 5000000, step: 1000000 },
];

function buildAmounts(steps: Step[]) {
  const values: number[] = [];
  for (const s of steps) {
    for (let v = s.from; v <= s.to; v += s.step) values.push(v);
  }
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

const TERMS = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];

type Purpose = {
  value: string;
  label: string;
  amountLabel: string;
  amounts: number[];
  defaultAmount: number;
  showTerm: boolean;
  defaultTerm: number;
  freeAmountInput?: boolean;
  showDownPayment?: boolean;
};

const PURPOSES: Purpose[] = [
  {
    value: "frei",
    label: "Freie Verwendung",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(STANDARD_STEPS),
    defaultAmount: 30000,
    showTerm: true,
    defaultTerm: 84,
  },
  {
    value: "auto",
    label: "Auto / Motorrad",
    amountLabel: "Kaufpreis",
    amounts: [],
    defaultAmount: 30000,
    showTerm: true,
    defaultTerm: 84,
    freeAmountInput: true,
    showDownPayment: true,
  },
  {
    value: "wohnen",
    label: "Wohnen / Modernisierung",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(STANDARD_STEPS),
    defaultAmount: 30000,
    showTerm: true,
    defaultTerm: 84,
  },
  {
    value: "immobilie",
    label: "Bau-/ Immobilienfinanzierung",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(IMMO_STEPS),
    defaultAmount: 300000,
    showTerm: false,
    defaultTerm: 120,
  },
  {
    value: "umschuldung",
    label: "Umschuldung",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(STANDARD_STEPS),
    defaultAmount: 30000,
    showTerm: true,
    defaultTerm: 84,
  },
  {
    value: "gewerbe",
    label: "Gewerbe",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(STANDARD_STEPS),
    defaultAmount: 30000,
    showTerm: true,
    defaultTerm: 84,
  },
  {
    value: "kreditkarte",
    label: "Kreditkarte",
    amountLabel: "Nettokreditbetrag",
    amounts: buildAmounts(STANDARD_STEPS),
    defaultAmount: 5000,
    showTerm: false,
    defaultTerm: 84,
  },
];

const currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const fieldClass =
  "mt-1 w-full rounded-md border border-line bg-background px-3 py-3.5 text-[13px] text-hero-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:px-4 md:py-3 md:text-[15px]";

const selectTriggerClass =
  "mt-1 h-[43px] w-full rounded-none border border-line bg-background px-3 py-2.5 text-[13px] text-hero-text focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:h-9 md:px-4 md:py-3 md:text-[15px]";


const CTA_LABELS: Record<string, string> = {
  kreditkarte: "Kreditkarten vergleichen",
  auto: "Autokredit vergleichen",
  immobilie: "Baufinanzierung vergleichen",
};

const WIZARD_PURPOSES: Record<string, string> = {
  frei: "Freie Verwendung",
  auto: "Autokredit",
  wohnen: "Modernisierung",
  immobilie: "Modernisierung",
  umschuldung: "Umschuldung",
  gewerbe: "Freie Verwendung",
  kreditkarte: "Kreditkartenausgleich",
};

export function OfferCard({ mobileTrust }: { mobileTrust?: ReactNode }) {
  const [purposeValue, setPurposeValue] = useState(PURPOSES[0]!.value);
  const [amount, setAmount] = useState(PURPOSES[0]!.defaultAmount);
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(PURPOSES[0]!.defaultTerm);

  const purpose = useMemo(
    () => PURPOSES.find((p) => p.value === purposeValue)!,
    [purposeValue],
  );

  function selectPurpose(value: string) {
    const next = PURPOSES.find((p) => p.value === value)!;
    setPurposeValue(value);
    setAmount(next.defaultAmount);
    setTerm(next.defaultTerm);
    setDownPayment(0);
  }

  return (
    <div className="bg-transparent px-0 py-1 md:rounded-md md:border md:border-line md:bg-background md:p-9 md:shadow-card">
      <div className="space-y-3 md:space-y-5">
        <div>
          <label htmlFor="purpose" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Verwendung
          </label>

          <Select value={purposeValue} onValueChange={selectPurpose}>
            <SelectTrigger id="purpose" className={selectTriggerClass}>
              <SelectValue placeholder="Verwendung wählen" />
            </SelectTrigger>
            <SelectContent>
              {PURPOSES.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="amount" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            {purpose.amountLabel} €
          </label>

          {purpose.freeAmountInput ? (
            <input
              id="amount"
              type="number"
              inputMode="numeric"
              min={0}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`${fieldClass} tabular`}
            />
          ) : (
            <Select
              value={String(amount)}
              onValueChange={(value) => setAmount(Number(value))}
            >
              <SelectTrigger id="amount" className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {purpose.amounts.map((a) => (
                  <SelectItem key={a} value={String(a)}>
                    {currency.format(a)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {purpose.showDownPayment ? (
          <div>
          <label htmlFor="downpayment" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Anzahlung €
          </label>


            <input
              id="downpayment"
              type="number"
              inputMode="numeric"
              min={0}
              step={100}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className={`${fieldClass} tabular`}
            />
          </div>
        ) : null}

        {purpose.showTerm ? (
          <div>
          <label htmlFor="term" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Laufzeit
          </label>

            <Select
              value={String(term)}
              onValueChange={(value) => setTerm(Number(value))}
            >
              <SelectTrigger id="term" className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TERMS.map((t) => (
                  <SelectItem key={t} value={String(t)}>
                    {t} Monate
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
      </div>

      <Link
        to="/antrag/schritt-1"
        search={{
          zweck: WIZARD_PURPOSES[purpose.value] ?? "Freie Verwendung",
          betrag: amount,
          laufzeit: term,
          ...(purpose.showDownPayment && downPayment > 0 ? { anzahlung: downPayment } : {}),
        }}
        className="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-brand px-5 py-4 text-xs font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-7 md:shadow-none md:py-3.5 md:text-[15px]"
      >
        {CTA_LABELS[purpose.value] ?? "Jetzt Kreditvergleich starten"}
      </Link>
      {mobileTrust ? <div className="mt-4 md:hidden">{mobileTrust}</div> : null}
    </div>
  );
}
