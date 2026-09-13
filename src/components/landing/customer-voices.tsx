import { useRef, useState } from "react";
import eKomiLogo from "@/assets/ekomi.webp.asset.json";
import avatarAsset from "@/assets/avatar.svg.asset.json";

type Voice = {
  text: string;
  author: string;
};

const VOICES: Voice[] = [
  {
    text: "Super einfache Preisanfrage und die günstigsten Angebote aus meiner Region. Bestellung war in wenigen Minuten erledigt.",
    author: "Gisela S., 58",
  },
  {
    text: "Ich habe über 200 € gegenüber dem letzten Jahr gespart. Der Vergleich lohnt sich wirklich, danke!",
    author: "Sabrina G., 36",
  },
  {
    text: "Unkompliziert und transparent. Die Lieferung kam sogar zwei Tage früher als angegeben.",
    author: "Mario T., 44",
  },
  {
    text: "Sehr übersichtliche Angebote. Ich konnte Preise, Lieferzeit und Zahlungsart direkt vergleichen.",
    author: "Jessica M., 31",
  },
  {
    text: "Alles online erledigt, ohne Telefonate. Beim nächsten Tanken bestelle ich wieder über Klaro.",
    author: "Renate H., 66",
  },
  {
    text: "Guter Preis, schnelle Lieferung, freundlicher Fahrer. Besser geht es nicht.",
    author: "Tobias W., 41",
  },
  {
    text: "Endlich muss ich nicht mehr fünf Händler einzeln anrufen. Ein Vergleich, ein Klick, fertig.",
    author: "Monika L., 61",
  },
  {
    text: "Schnelle Antwort auf meine Frage zur Lieferung. Sehr kundenfreundlicher Service.",
    author: "Heike R., 47",
  },
  {
    text: "Klare Empfehlung für alle, die Heizöl günstig und stressfrei bestellen wollen.",
    author: "Claudia V., 45",
  },
];

const RATINGS = [
  { label: "eKomi", sub: null as string | null, value: 4.6, count: "18.400", isEkomi: true },
  { label: "Trustpilot", sub: null, value: 4.5, count: "2.140", isEkomi: false },
  { label: "Google", sub: null, value: 4.5, count: "860", isEkomi: false },
  { label: null as string | null, sub: "Kundenbewertung", value: 4.6, count: null as string | null, isEkomi: false },
];

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`size-4 shrink-0 ${i <= Math.round(rating) ? "fill-[#F5A623]" : "fill-line"}`}
        >
          <path d="M12 2.5l2.95 6.26 6.87.72-5.12 4.63 1.43 6.76L12 17.42l-6.13 3.45 1.43-6.76-5.12-4.63 6.87-.72L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <figure className="rounded-[4px] border border-line bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <span className="flex items-center gap-2">
        <Stars rating={5} />
        <span className="text-[13px] font-semibold text-muted-custom">5/5</span>
      </span>
      <blockquote className="mt-4 min-h-[110px] text-[15px] leading-[1.6] text-conditions">
        „{voice.text}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <img
          src={avatarAsset.url}
          alt=""
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full"
          loading="lazy"
        />
        <span className="text-[14px] font-semibold text-ink">{voice.author}</span>
      </figcaption>
    </figure>
  );
}

const PAGES: Voice[][] = [VOICES.slice(0, 3), VOICES.slice(3, 6), VOICES.slice(6, 9)];

export function CustomerVoices() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const goToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * page, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const page = Math.round(track.scrollLeft / track.clientWidth);
    if (page !== activePage) setActivePage(page);
  };

  return (
    <section aria-label="Kundenbewertungen" className="overflow-hidden bg-background pb-16 pt-2">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-[1.3] text-conditions md:text-[32px]">
            Über 25.000 zufriedene Kunden
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-[15px] text-conditions">
            <Stars rating={5} />
            <span>
              <strong className="font-bold">4,9</strong>/5 von <strong className="font-bold">21.400</strong>{" "}
              Bewertungen
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PAGES.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full shrink-0 snap-start grid-cols-1 gap-5 px-0.5 md:grid-cols-3"
            >
              {page.map((voice) => (
                <VoiceCard key={voice.author} voice={voice} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Bewertungsseiten">
          {PAGES.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              role="tab"
              aria-selected={activePage === pageIndex}
              aria-label={`Bewertungen Seite ${pageIndex + 1}`}
              onClick={() => goToPage(pageIndex)}
              className={`size-2.5 rounded-full transition-colors ${
                activePage === pageIndex ? "bg-brand" : "bg-line hover:bg-muted-custom"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-y-8 px-5 md:grid-cols-4">
        {RATINGS.map((r) => (
          <div key={r.label ?? "kunden"} className="flex flex-col items-center gap-1 text-center">
            <span className="flex items-center gap-2 text-[15px] font-bold text-ink">
              {r.isEkomi ? (
                <img src={eKomiLogo.url} alt="eKomi" width={62} height={18} className="h-[18px] w-auto" loading="lazy" />
              ) : (
                <span>
                  {r.label}
                  {r.sub ? <span className="block text-[12px] font-medium text-muted-custom">{r.sub}</span> : null}
                </span>
              )}
            </span>
            <Stars rating={r.value} />
            <span className="text-[13px] text-muted-custom">
              {r.value.toLocaleString("de-DE")}/5
              {r.count ? ` von ${r.count} Bewertungen` : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
