import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Home,
  LogIn,
  Minus,
  TrendingUp,
  Plus,
  Save,
  ThumbsUp,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { COUNTRY_SEPARATOR } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWizard } from "@/lib/wizard-store";
import { Logo } from "@/components/landing/logo";

import tuev from "@/assets/tuev.svg.asset.json";
import ekomi from "@/assets/ekomi.webp.asset.json";
import garantie from "@/assets/garantie.svg.asset.json";

/* ------------------------------------------------------------------ */
/* Fortschrittsbalken                                                  */
/* ------------------------------------------------------------------ */
export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  return (
    <div>
      <div className="h-[6px] w-full bg-[#c9e8ce]">
        <div
          className="h-full bg-brand transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-[13px] text-[#5b5b5b]">{label ?? `${percent} % geschafft`}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* „Warum benötigen wir diese Information?“                            */
/* ------------------------------------------------------------------ */
export function WhyInfo({ text }: { text?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[15px] font-semibold text-brand">
          Warum benötigen wir diese Information?
        </span>
        <ChevronDown
          className={cn("size-5 text-brand transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <p className="mt-3 text-[14px] leading-[1.6] text-[#5b5b5b]">
          {text ??
            "Banken benötigen diese Angaben, um Ihre Bonität einzuschätzen und Ihnen passgenaue Angebote zu berechnen. Ihre Daten werden selbstverständlich verschlüsselt übertragen und nicht an Dritte weitergegeben."}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Auswahl-Kacheln (Ja/Nein, Personen, Anrede …)                       */
/* ------------------------------------------------------------------ */
export function ChoiceTiles<T extends string | number | boolean>({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: T; label: string }[];
  value: T | undefined;
  onChange: (value: T) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={cn("mt-1 grid gap-2.5", columns === 2 ? "grid-cols-1 min-[360px]:grid-cols-2" : "grid-cols-1")}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={cn(
              "flex min-h-[50px] min-w-0 items-center gap-3 border px-4 py-2 text-left text-[15px] transition-colors",
              selected
                ? "border-brand bg-[#eff8f1] text-[#323232]"
                : "border-[#c9c9c9] bg-white text-[#323232] hover:bg-[#f7f7f7]",
            )}
          >
            <span
              className={cn(
                "grid size-[18px] shrink-0 place-items-center rounded-full border-2",
                selected ? "border-brand" : "border-[#c9c9c9]",
              )}
            >
              {selected ? <span className="size-2 rounded-full bg-brand" /> : null}
            </span>
            <span className="min-w-0 break-words">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Zähler (Plus/Minus)                                                 */
/* ------------------------------------------------------------------ */
export function CounterField({
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="mt-1 flex items-center gap-3">
      <button
        type="button"
        aria-label="Weniger"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "grid size-11 place-items-center border transition-colors",
          value <= min
            ? "border-[#dcdcdc] bg-[#f0f0f0] text-[#5b5b5b] disabled:opacity-50"
            : "border-brand bg-brand text-white hover:bg-brand-hover",
        )}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-5 text-center text-[16px] font-medium text-[#323232] tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Mehr"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "grid size-11 place-items-center text-white transition-colors",
          value >= max ? "bg-[#dcdcdc]" : "bg-brand hover:bg-brand-hover",
        )}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Text- und Geld-Felder                                               */
/* ------------------------------------------------------------------ */
const inputClass =
  "h-[46px] w-full border border-[#c9c9c9] bg-white px-3.5 text-[15px] text-[#323232] placeholder:text-[#9a9a9a] focus:border-brand focus:outline-none";

export function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  hint,
  suffix,
  focusHint,
  focusHintPosition = "above",
  persistentFocusHint,
  persistentHintIcon = "user",
  maxLength,
  inputMode,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  suffix?: string;
  focusHint?: string;
  focusHintPosition?: "above" | "below";
  persistentFocusHint?: string;
  persistentHintIcon?: "user" | "briefcase" | "thumbsup" | "money" | "trend" | "home" | "login";
  maxLength?: number;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  const [focused, setFocused] = useState(false);
  const [showPersistentHint, setShowPersistentHint] = useState(false);
  return (
    <div>
      {label ? (
        <label htmlFor={id} className="text-[14px] text-[#323232]">
          {label}
        </label>
      ) : null}
      <div className={cn("relative", label && "mt-1.5")}>
        {focusHint && focusHintPosition === "above" ? (
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              focused ? "mb-1.5 max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="text-[12.5px] leading-[1.5] text-[#5b5b5b]">{focusHint}</p>
          </div>
        ) : null}
        <input
          id={id}
          type={type}
          inputMode={inputMode ?? (type === "number" ? "numeric" : undefined)}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setFocused(true);
            if (persistentFocusHint) setShowPersistentHint(true);
          }}
          onBlur={() => setFocused(false)}
          className={cn(inputClass, suffix && "pr-[86px]")}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[14px] text-[#5b5b5b]">
            {suffix}
          </span>
        ) : null}
        {focusHint && focusHintPosition === "below" ? (
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              focused ? "mt-1.5 max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="text-[12.5px] leading-[1.5] text-[#5b5b5b]">{focusHint}</p>
          </div>
        ) : null}
      </div>
      {hint ? <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#5b5b5b]">{hint}</p> : null}
      {persistentFocusHint && showPersistentHint ? (
        <NoteBox variant="green" icon={persistentHintIcon} compact>
          <span className="font-semibold">{label}:</span> {persistentFocusHint}
        </NoteBox>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Auswahlliste im smava-Stil                                          */
/* ------------------------------------------------------------------ */
export function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Bitte wählen",
}: {
  id: string;
  label: string;
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] text-[#323232]">
        {label}
      </label>
      <div className="mt-1.5">
        <Select value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger
            id={id}
            className="h-[46px] w-full rounded-none border-[#c9c9c9] bg-white px-3.5 text-[15px] text-[#323232] focus:border-brand focus:ring-0 focus-visible:outline-none data-[placeholder]:text-[#9a9a9a] [&>svg]:size-5 [&>svg]:text-[#5b5b5b]"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) =>
              o === COUNTRY_SEPARATOR ? (
                <div key="sep" className="my-1 border-t border-[#e0e0e0]" aria-hidden />
              ) : (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leichtgewichtige Länder-Auswahl (rendert Liste erst beim Öffnen)    */
/* ------------------------------------------------------------------ */
export function CountrySelectField({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Bitte wählen",
}: {
  id: string;
  label: string;
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) selectedRef.current?.scrollIntoView({ block: "nearest" });
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="text-[14px] text-[#323232]">
        {label}
      </label>
      <div className="mt-1.5">
        <button
          id={id}
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "group flex h-[46px] w-full items-center justify-between border border-[#c9c9c9] bg-white px-3.5 text-left text-[15px] focus:border-brand focus:outline-none",
            value ? "text-[#323232]" : "text-[#9a9a9a]",
          )}
        >
          <span className="line-clamp-1">{value || placeholder}</span>
          <span className="inline-flex items-center justify-center transition-transform group-aria-expanded:rotate-180">
            <ChevronDown className="size-5 text-[#5b5b5b]" />
          </span>
        </button>
        {open ? (
          <div className="absolute inset-x-0 z-50 mt-1 max-h-[320px] overflow-y-auto border border-[#c9c9c9] bg-white shadow-md">
            {options.map((o) =>
              o === COUNTRY_SEPARATOR ? (
                <div key="sep" className="my-1 border-t border-[#e0e0e0]" aria-hidden />
              ) : (
                <button
                  key={o}
                  ref={o === value ? selectedRef : undefined}
                  type="button"
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-3 py-2.5 text-left text-sm text-[#323232] transition-colors hover:bg-[#f3f4f6]",
                    o === value && "bg-[#eff8f1]",
                  )}
                >
                  {o}
                </button>
              ),
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox-Zeile                                                      */
/* ------------------------------------------------------------------ */
export function CheckboxRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-[18px] shrink-0 place-items-center border border-[#c9c9c9] bg-white peer-checked:border-brand peer-checked:bg-brand"
      >
        {checked ? <Check className="size-3.5 text-white" strokeWidth={3} /> : null}
      </span>
      <span className="text-[13.5px] leading-[1.55] text-[#323232]">{children}</span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Hinweis-Kästen (grün mit Zitatstrich / blau)                        */
/* ------------------------------------------------------------------ */
export function NoteBox({
  variant = "green",
  icon,
  compact = false,
  children,
}: {
  variant?: "green" | "blue";
  icon?: "user" | "briefcase" | "thumbsup" | "money" | "trend" | "home" | "login";
  compact?: boolean;
  children: ReactNode;
}) {
  const Icon = icon === "briefcase" ? Briefcase : icon === "thumbsup" ? ThumbsUp : User;
  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-3 p-3.5 leading-[1.5]",
        compact ? "text-[12.5px]" : "text-[13.5px]",
        variant === "green"
          ? "border-l-[5px] border-brand bg-white text-[#323232] shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
          : "border border-[#9db8d9] bg-[#eef4fb] text-[#323232]",
      )}
    >
      {variant === "green" ? (
        icon === "user" ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mt-0.5 size-6 shrink-0 fill-brand"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M12 13c-4.97 0-8 2.69-8 6v1h16v-1c0-3.31-3.03-6-8-6z" />
          </svg>
        ) : icon === "money" ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mt-0.5 size-6 shrink-0 fill-brand"
          >
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 13H4V7h16v10z" />
            <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            <path d="M7 12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm10 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
          </svg>
        ) : icon === "trend" ? (
          <TrendingUp className="mt-0.5 size-5 shrink-0 text-brand" />
        ) : icon === "home" ? (
          <Home className="mt-0.5 size-5 shrink-0 text-brand" />
        ) : icon === "login" ? (
          <LogIn className="mt-0.5 size-5 shrink-0 text-brand" />
        ) : (
          <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
        )
      ) : (
        <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 fill-[#2f6fbf]">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM13 17h-2v-6h2v6z" />
        </svg>
      )}
      <p>{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigations-Buttons                                                 */
/* ------------------------------------------------------------------ */
export function NavButtons({
  backTo,
  nextTo,
  nextLabel = "Weiter",
  withSave = false,
  onNext,
  backDisabled = false,
  disabled = false,
}: {
  backTo?: string;
  nextTo?: string;
  nextLabel?: string;
  withSave?: boolean;
  onNext?: () => boolean | void;
  backDisabled?: boolean;
  disabled?: boolean;
}) {
  const navigate = useNavigate();
  const { data } = useWizard();

  function goNext() {
    if (disabled) return;
    if (onNext && onNext() === false) return;
    if (nextTo) void navigate({ to: nextTo, search: {} }).catch((e) => console.error("nav", e));
  }
  function goBack() {
    if (disabled || backDisabled) return;
    if (backTo) void navigate({ to: backTo, search: {} }).catch((e) => console.error("nav", e));
  }
  function save() {
    if (disabled) return;
    try {
      window.sessionStorage.setItem("smava-wizard", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  if (withSave) {
    return (
      <div className="mt-8 space-y-2.5">
        <div className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-[minmax(0,170px)_minmax(0,1fr)]">
          <button
            type="button"
            onClick={save}
            disabled={disabled}
            className="flex h-[46px] items-center justify-center gap-2 border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" /> Speichern
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={disabled}
            className="flex h-[46px] items-center justify-center gap-2 bg-brand text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {nextLabel} <ArrowRight className="size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={goBack}
          disabled={disabled || backDisabled}
          className="flex h-[46px] w-full items-center justify-center gap-2 border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1] disabled:opacity-50"
        >
          <ArrowLeft className="size-4" /> Zurück
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-[minmax(0,170px)_minmax(0,1fr)]">
      <button
        type="button"
        onClick={goBack}
        disabled={disabled || backDisabled}
        className="flex h-[46px] items-center justify-center gap-2 border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft className="size-4" /> Zurück
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={disabled}
        className="flex h-[46px] items-center justify-center gap-2 bg-brand text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel} <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertrauensblock                                                     */
/* ------------------------------------------------------------------ */
export function TrustBlock() {
  return (
    <div className="mt-8 bg-[#f4f5f6] px-4 py-7 text-center sm:px-6 sm:py-8">
      <p className="text-[17px] font-bold text-[#323232]">TÜV geprüft + SCHUFA-neutral</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <img src={tuev.url} alt="TÜV Saarland – geprüfter Datenschutz" className="h-[52px] w-auto" />
        <img src={garantie.url} alt="Günstiger geht nicht Garantie" className="h-[56px] w-auto" />
        <div>
          <img src={ekomi.url} alt="eKomi Siegel" className="h-[56px] w-auto" />
          <p className="mt-1 text-[13px] text-[#5b5b5b]">4.9 / 5</p>
          <p className="text-[13px] tracking-[2px] text-[#f5a623]" aria-hidden="true">
            ★★★★★
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Schlanker Wizard-Footer                                             */
/* ------------------------------------------------------------------ */
const LEGAL = [
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Cookies", href: "/cookie-einstellungen" },
  { label: "Widerruf", href: "/widerruf" },
];

export function WizardFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <Link to="/" aria-label="Heizöl Deutschland Startseite" className="text-ink">
          <Logo />
        </Link>
        <div className="flex flex-col items-start gap-2 text-left md:items-end md:text-right">
          <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
            {LEGAL.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="text-[13px] leading-5 text-footer-text hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-[13px] leading-5 text-footer-text">
            © 2026 Demovero GmbH | Kurfürstendamm 97–98 | 10709 Berlin
          </p>
        </div>
      </div>
    </footer>
  );
}
