import tuev from "@/assets/tuev.svg.asset.json";
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
