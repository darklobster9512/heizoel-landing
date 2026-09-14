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

export function RatingBadge({ compact = false }: { compact?: boolean }) {
  const [date, setDate] = useState("Stand 8.9.2026");

  useEffect(() => {
    setDate(`Stand ${formatToday()}`);
  }, []);

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-4"}`}>
      <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
        <img
          src={trustedShopsIcon.url}
          alt="Trusted Shops"
          width={compact ? 24 : 34}
          height={compact ? 24 : 34}
          className={compact ? "size-6 object-contain" : "size-[34px] object-contain"}
        />
        <p className="hidden whitespace-nowrap text-[11px] font-semibold leading-tight text-hero-text xl:block">
          Trusted Shops
          <br />
          Käuferschutz
        </p>
      </div>

      <span className="h-7 w-px bg-line" aria-hidden="true" />

      <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
        <img
          src={googleIcon.url}
          alt="Google"
          width={compact ? 22 : 30}
          height={compact ? 22 : 30}
          className={compact ? "size-[22px] object-contain" : "size-[30px] object-contain"}
        />
        <div className={compact ? "hidden" : "leading-tight"}>
          <p className="whitespace-nowrap text-xs font-semibold text-hero-text">4,9 / 5</p>
          <p className="whitespace-nowrap text-[10px] text-muted-custom">25.000+ Bewertungen</p>
        </div>
      </div>

      <span className="h-7 w-px bg-line" aria-hidden="true" />

      <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
        <img
          src={ekomi.url}
          alt="eKomi Kundenauszeichnung Gold"
          width={compact ? 24 : 36}
          height={compact ? 24 : 36}
          className={compact ? "size-6 object-contain" : "size-9 object-contain"}
        />
        <div className={compact ? "hidden" : "hidden xl:block"}>
          <p className="flex items-center gap-1">
            <Stars size="size-4" className="gap-0" />
            <span className="tabular whitespace-nowrap text-sm font-semibold text-hero-text">
              4,9/5
            </span>
          </p>
          <p className="max-w-[190px] text-[11px] text-hero-text">
            aus 705 Bewertungen der letzten 12 Monate – {date}
          </p>
        </div>
      </div>
    </div>
  );
}
