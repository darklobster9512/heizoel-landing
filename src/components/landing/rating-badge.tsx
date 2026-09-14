import ekomi from "@/assets/ekomi.webp.asset.json";
import googleIcon from "@/assets/google-icon.webp.asset.json";
import trustedShopsIcon from "@/assets/trusted-shops-icon.png.asset.json";
import { useEffect, useState } from "react";

function Stars({ className = "", size = "size-4" }: { className?: string; size?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${size} fill-[#f1a319]`}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function formatToday() {
  const d = new Date();
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function TrustedShopsBlock({ showText, compact }: { showText: boolean; compact: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <img
        src={trustedShopsIcon.url}
        alt="Trusted Shops"
        width={compact ? 26 : 34}
        height={compact ? 26 : 34}
        className={compact ? "size-[26px] shrink-0 object-contain" : "size-[34px] object-contain"}
      />
      <p
        className={`${showText ? "block" : "hidden xl:block"} whitespace-nowrap text-[11px] font-semibold leading-tight text-hero-text`}
      >
        Trusted Shops
        <br />
        Käuferschutz
      </p>
    </div>
  );
}

function GoogleBlock({ showText, compact }: { showText: boolean; compact: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <img
        src={googleIcon.url}
        alt="Google"
        width={compact ? 24 : 30}
        height={compact ? 24 : 30}
        className={compact ? "size-6 shrink-0 object-contain" : "size-[30px] object-contain"}
      />
      <div className={showText ? "leading-tight" : "hidden"}>
        <p className="whitespace-nowrap text-xs font-semibold text-hero-text">4,9 / 5</p>
        <p className="whitespace-nowrap text-[10px] text-muted-custom">25.000+ Bewertungen</p>
      </div>
    </div>
  );
}

function EkomiBlock({
  showText,
  compact,
  date,
  oneLine = false,
}: {
  showText: boolean;
  compact: boolean;
  date: string;
  oneLine?: boolean;
}) {
  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <img
        src={ekomi.url}
        alt="eKomi Kundenauszeichnung Gold"
        width={compact ? 26 : 36}
        height={compact ? 26 : 36}
        className={compact ? "size-[26px] shrink-0 object-contain" : "size-9 object-contain"}
      />
      <div className={showText ? "block" : "hidden xl:block"}>
        <p className="flex items-center gap-1">
          <Stars size="size-3.5" className="gap-0" />
          <span className="tabular whitespace-nowrap text-xs font-semibold text-hero-text">
            4,9/5
          </span>
        </p>
        <p
          className={`text-[10px] leading-tight text-hero-text ${oneLine ? "whitespace-nowrap" : "max-w-[190px] text-[11px]"}`}
        >
          {oneLine ? `705 Bewertungen – ${date}` : `aus 705 Bewertungen der letzten 12 Monate – ${date}`}
        </p>
      </div>
    </div>
  );
}

export function RatingBadge({
  compact = false,
  expanded = false,
}: {
  compact?: boolean;
  expanded?: boolean;
}) {
  const [date, setDate] = useState("Stand 8.9.2026");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDate(`Stand ${formatToday()}`);
  }, []);

  const rotating = compact && !expanded;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % 3);
    }, 6000);
    return () => window.clearInterval(id);
  }, [rotating]);

  const slideClass = (i: number) => {
    if (i === index) return "translate-x-0";
    if (i === (index - 1 + 3) % 3) return "translate-x-full";
    return "-translate-x-full";
  };

  if (rotating) {
    const slides = [
      <EkomiBlock key="ekomi" showText compact date={date} oneLine />,
      <GoogleBlock key="google" showText compact />,
      <TrustedShopsBlock key="ts" showText compact />,
    ];

    return (
      <div className="relative h-9 w-full min-w-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className={`absolute inset-y-0 left-0 right-0 flex items-center justify-end transition-transform duration-500 ease-out motion-reduce:transition-none ${slideClass(i)}`}
          >
            {slide}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={expanded ? "grid gap-3" : "flex items-center gap-4"}>
      <TrustedShopsBlock showText={expanded} compact={false} />
      <span className={expanded ? "hidden" : "h-7 w-px bg-line"} aria-hidden="true" />
      <GoogleBlock showText compact={false} />
      <span className={expanded ? "hidden" : "h-7 w-px bg-line"} aria-hidden="true" />
      <EkomiBlock showText={expanded} compact={false} date={date} />
    </div>
  );
}
