import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Star } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";

const TITLE = "Kundenbewertungen | Klaro";
const DESCRIPTION =
  "Über 33.000 zufriedene Kunden bewerten Klaro mit 4,9 von 5 Sternen. Lesen Sie echte Erfahrungen zu Preisen, Lieferung und Service beim Heizöl-Kauf.";

export const Route = createFileRoute("/bewertungen")({
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
    ],
  }),
  component: BewertungenPage,
});

const STATS = [
  { value: "33.000+", label: "Kunden" },
  { value: "4,9/5", label: "Bewertung" },
  { value: "98 %", label: "Weiterempfehlung" },
  { value: "500+", label: "Partnerhändler" },
];

const REVIEWS = [
  {
    name: "Sabine K.",
    text: "Bestelle inzwischen zum dritten Mal über Klaro. Der Preis war jedes Mal spürbar günstiger als bei meinem örtlichen Händler, und die Lieferung kam immer zum vereinbarten Termin.",
  },
  {
    name: "Thomas M.",
    text: "Preis eingegeben, Menge gewählt, fertig — die Bestellung war in wenigen Minuten erledigt. Der Fahrer war pünktlich und sehr freundlich. Klare Empfehlung.",
  },
  {
    name: "Julia F.",
    text: "Ich war anfangs skeptisch, Heizöl online zu bestellen. Aber alles hat reibungslos geklappt: von der Preisberechnung bis zur Lieferung. Beim nächsten Mal wieder.",
  },
  {
    name: "Michael W.",
    text: "Durch den Vergleich habe ich gegenüber meinem bisherigen Anbieter über 200 Euro gespart. Die Abwicklung war unkompliziert, die Rechnung kam litergenau.",
  },
  {
    name: "Petra S.",
    text: "Wir bestellen als Familie schon seit zwei Jahren hier. Immer faire Preise, immer zuverlässig. Die Sammelbestellung mit den Nachbarn hat zusätzlich gespart.",
  },
  {
    name: "Andreas B.",
    text: "Als Handwerker bin ich auf verlässliche Lieferungen angewiesen. Klaro hat bisher jeden Termin gehalten, und der Festpreis gibt mir Planungssicherheit.",
  },
  {
    name: "Monika L.",
    text: "Sehr übersichtliche Bestellstrecke, keine versteckten Kosten. Bezahlt habe ich bequem am Tankwagen mit EC-Karte. So einfach sollte Heizöl-Kauf immer sein.",
  },
  {
    name: "Ralf Z.",
    text: "Die Lieferung kam sogar einen Tag früher als angekündigt. Preis-Leistung top, Kommunikation vorbildlich. Ich werde definitiv wieder hier bestellen.",
  },
];

const TRUST_POINTS = [
  {
    title: "Über 10 Jahre Erfahrung",
    text: "Wir kennen den Heizölmarkt genau und wickeln jedes Jahr tausende Bestellungen zuverlässig ab.",
  },
  {
    title: "500+ geprüfte Partnerhändler",
    text: "Deutschlandweite Lieferung über sorgfältig ausgewählte und geprüfte Händler in Ihrer Region.",
  },
  {
    title: "Festpreisgarantie",
    text: "Der Preis des Bestelltages gilt — auch wenn die Marktpreise danach steigen. Schriftlich fixiert.",
  },
  {
    title: "Liefergarantie",
    text: "Kommt Ihre Lieferung zu spät, erhalten Sie 50 € Entschädigung. Zuverlässigkeit ist bei uns versprochen.",
  },
];

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className="flex items-center gap-0.5 text-brand" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} aria-hidden="true" />
      ))}
    </div>
  );
}

function BewertungenPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Seitenkopf */}
        <section className="border-b border-line bg-surface" aria-labelledby="bew-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h1
              id="bew-title"
              className="text-[28px] font-bold leading-tight text-conditions md:text-[36px]"
            >
              Kundenbewertungen
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted-custom md:text-[16px]">
              Über 33.000 zufriedene Kunden bewerten uns mit 4,9 von 5 Sternen
            </p>
          </div>
        </section>

        {/* Gesamtbewertung */}
        <section className="bg-background" aria-label="Gesamtbewertung">
          <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-12">
            <div className="rounded-xl border border-line border-t-4 border-t-brand bg-card p-6 text-center shadow-sm md:p-8">
              <div className="flex justify-center">
                <Stars className="h-6 w-6" />
              </div>
              <p className="mt-3 text-[32px] font-bold leading-none text-conditions md:text-[40px]">
                4,9 <span className="text-[20px] font-semibold text-muted-custom md:text-[24px]">/ 5</span>
              </p>
              <p className="mt-2 text-[13px] text-muted-custom md:text-[14px]">
                Basierend auf über 33.000 verifizierten Bewertungen
              </p>
            </div>
          </div>

          {/* Kennzahlen */}
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-10 md:grid-cols-4 md:gap-6 md:py-12">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-line bg-card p-5 text-center shadow-sm"
              >
                <p className="text-[24px] font-bold leading-tight text-brand md:text-[28px]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-custom md:text-[13px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bewertungen */}
        <section className="border-t border-line bg-surface" aria-labelledby="reviews-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h2
              id="reviews-title"
              className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
            >
              Das sagen unsere Kunden
            </h2>
            <p className="mt-2 text-[14px] text-muted-custom md:text-[15px]">
              Echte Erfahrungen von verifizierten Käufern
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
              {REVIEWS.map((review) => (
                <article
                  key={review.name}
                  className="rounded-xl border border-line bg-card p-5 shadow-sm md:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[15px] font-bold text-ink">{review.name}</h3>
                    <Stars />
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.7] text-muted-custom md:text-[14px]">
                    {review.text}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Verifizierter Kauf
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Vertrauen */}
        <section className="border-t border-line bg-background" aria-labelledby="trust-title">
          <div className="mx-auto max-w-6xl px-5 pt-12 pb-6 md:pt-16 md:pb-8">
            <h2
              id="trust-title"
              className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
            >
              Warum über 33.000 Kunden uns vertrauen
            </h2>
            <p className="mt-2 text-[14px] text-muted-custom md:text-[15px]">
              Qualität, Transparenz und faire Preise — bei jeder Bestellung
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-6">
              {TRUST_POINTS.map((point, index) => (
                <div
                  key={point.title}
                  className="flex gap-4 rounded-xl border border-line border-l-4 border-l-brand bg-card p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[15px] font-bold text-brand">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-ink md:text-[16px]">{point.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.7] text-muted-custom md:text-[14px]">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
