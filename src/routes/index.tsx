import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { CustomerVoices } from "@/components/landing/customer-voices";
import {
  ConditionsBox,
  Faq,
  FAQS,
  MatchingOffers,
  PersonalDataInfo,
  SiteFooter,
  Steps,
  ReferralBanner,
  TrustBar,
  TrustLinks,
} from "@/components/landing/sections";


const DESCRIPTION =
  "Klaro – Heizöl-Preisvergleich für Deutschland: Preise von über 300 Händlern aus Ihrer Region vergleichen und Heizöl günstig online bestellen. Kostenlos und unverbindlich.";

const TITLE = "Klaro — Heizöl-Preisvergleich für Deutschland";

export const Route = createFileRoute("/")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <ConditionsBox mobileOnly />
        <TrustBar />
        <ConditionsBox />
        <CustomerVoices />
        <Steps />
        <PersonalDataInfo />
        <MatchingOffers />
        <Faq />
        <TrustLinks />
        <ReferralBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
