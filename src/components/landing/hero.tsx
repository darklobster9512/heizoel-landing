import tuev from "@/assets/tuev.svg.asset.json";
import ekomi from "@/assets/ekomi.webp.asset.json";
import guarantee from "@/assets/guarantee.svg.asset.json";
import { OfferCard } from "./offer-card";

const CHECKS = [
  "Aktuelle Angebote von über 300 Heizölhändlern",
  "Kostenlos und 100 % unverbindlich",
  "Täglich aktuelle Preise aus Ihrer Region**",
];

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 size-4 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M3 10.5l4.5 4.5L17 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-[#f1a319]">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  const trustBadges = (
    <div className="flex items-center justify-center gap-2.5 md:justify-start md:gap-5">
      <img
        src={tuev.url}
        alt="TÜV Saarland — Geprüfter Datenschutz"
        width={113}
        height={60}
        className="h-[53px] w-auto rounded-sm md:h-[58px]"
      />
      <img
        src={ekomi.url}
        alt="eKomi Kundenauszeichnung Gold"
        width={52}
        height={52}
        className="size-[52px] md:size-[52px]"
      />
      <div className="min-w-0">
        <p className="flex flex-nowrap items-center gap-1.5 md:flex-wrap md:gap-2">
          <Stars className="gap-0" />
          <span className="tabular whitespace-nowrap text-xs font-semibold text-hero-text md:text-sm">4.9/5</span>
        </p>
        <p className="mt-0.5 max-w-[150px] text-[8px] leading-[1.2] text-hero-text md:mt-1 md:max-w-[190px] md:text-[11px]">
          aus 705 Bewertungen der letzten 12 Monate – Stand 8.9.2026
        </p>

      </div>
    </div>
  );

  return (
    <section id="top" className="relative bg-surface">
      <div className="relative mx-auto grid max-w-6xl items-start gap-6 px-5 pb-[53px] pt-[29px] md:gap-10 md:py-12 lg:grid-cols-[1fr_510px] lg:py-14">
        <div>
          <div className="grid grid-cols-[minmax(0,7fr)_minmax(68px,3fr)] items-center gap-3 md:block">
            <h1 className="min-w-0 max-w-[14ch] font-hero text-[28px] font-medium leading-[1.3] tracking-normal text-hero-text md:max-w-[13ch] md:text-[52px] md:font-bold md:leading-[1.12] md:tracking-tight">
              Günstiges Heizöl - garantiert!
            </h1>

            <img
              src={guarantee.url}
              alt="Günstiger-geht-nicht-Garantie"
              width={88}
              height={88}
              className="mx-auto size-[82px] object-contain md:hidden"
            />
          </div>

          <ul className="mt-[53px] space-y-3 md:mt-8 md:space-y-4">
            {CHECKS.map((c) => (
              <li key={c} className="flex gap-2 text-[15px] leading-snug text-hero-text md:gap-3 md:text-[15px]">
                <Check />
                <span>{c}</span>
              </li>
            ))}
          </ul>


          <div className="mt-10 hidden md:block">{trustBadges}</div>
        </div>

        <div id="rechner" className="relative scroll-mt-24">
          <img
            src={guarantee.url}
            alt="Günstiger-geht-nicht-Garantie"
            width={88}
            height={88}
            className="pointer-events-none absolute -right-2 -top-8 z-10 hidden size-[86px] drop-shadow-sm md:block"
          />
          <OfferCard mobileTrust={trustBadges} />
        </div>
      </div>
    </section>
  );
}
