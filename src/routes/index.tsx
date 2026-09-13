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
  "Kreditvergleich für Deutschland: 31 Bankpartner, effektiver Jahreszins ab 3,89 %, SCHUFA-neutral und kostenfrei. Konditionen in zwei Minuten prüfen.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "smava — Kreditvergleich ab 3,89 % eff. Jahreszins" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "smava — Kreditvergleich für Deutschland" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "smava — Kreditvergleich für Deutschland" },
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
