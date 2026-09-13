import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Shield } from "lucide-react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QUANTITIES: number[] = [];
for (let v = 500; v <= 5000; v += 250) QUANTITIES.push(v);
for (let v = 6000; v <= 10000; v += 1000) QUANTITIES.push(v);

const GRADES = [
  { value: "standard", label: "Heizöl EL Standard" },
  { value: "schwefelarm", label: "Heizöl EL schwefelarm" },
  { value: "premium", label: "Premium-Heizöl" },
];

const liters = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

const fieldClass =
  "mt-1 w-full rounded-md border border-line bg-background px-3 py-3.5 text-[13px] text-hero-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:px-4 md:py-3 md:text-[15px]";

const selectTriggerClass =
  "mt-1 h-[43px] w-full rounded-none border border-line bg-background px-3 py-2.5 text-[13px] text-hero-text focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:h-9 md:px-4 md:py-3 md:text-[15px]";

export function OfferCard({ mobileTrust }: { mobileTrust?: ReactNode }) {
  const [plz, setPlz] = useState("");
  const [quantity, setQuantity] = useState(3000);
  const [grade, setGrade] = useState(GRADES[0]!.value);

  return (
    <div className="bg-transparent px-0 py-1 md:rounded-md md:border md:border-line md:bg-background md:p-9 md:shadow-card">
      <div className="space-y-3 md:space-y-5">
        <div>
          <label htmlFor="plz" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Postleitzahl
          </label>

          <input
            id="plz"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="z. B. 10115"
            value={plz}
            onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className={`${fieldClass} tabular`}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Menge in Litern
          </label>

          <Select
            value={String(quantity)}
            onValueChange={(value) => setQuantity(Number(value))}
          >
            <SelectTrigger id="quantity" className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUANTITIES.map((q) => (
                <SelectItem key={q} value={String(q)}>
                  {liters.format(q)} Liter
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="grade" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Sorte
          </label>

          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger id="grade" className={selectTriggerClass}>
              <SelectValue placeholder="Sorte wählen" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Link
        to="/antrag/schritt-1"
        search={{
          plz,
          menge: quantity,
          sorte: GRADES.find((g) => g.value === grade)!.label,
        }}
        className="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-brand px-5 py-4 text-xs font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-7 md:shadow-none md:py-3.5 md:text-[15px]"
      >
        Jetzt Heizölpreise vergleichen
      </Link>

      <div className="mt-3 flex flex-nowrap items-center justify-center gap-2 text-[11px] text-muted md:mt-4 md:text-xs">
        <span className="inline-flex items-center gap-1">
          <Shield className="size-3.5 shrink-0" />
          100% sicher & kostenlos
        </span>
        <span className="text-muted/60" aria-hidden="true">•</span>
        <span className="inline-flex items-center gap-1">
          <Check className="size-3.5 shrink-0" />
          Keine versteckten Kosten
        </span>
      </div>

      {mobileTrust ? <div className="mt-4 md:hidden">{mobileTrust}</div> : null}
    </div>
  );
}
