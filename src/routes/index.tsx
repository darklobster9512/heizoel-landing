import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { CustomerVoices } from "@/components/landing/customer-voices";
import {
  PriceSearchLoading,
  type PriceSearchValues,
} from "@/components/landing/price-search-loading";
import {
  ConditionsBox,
  HeizoelServiceIntro,
  HeizoelSorten,
  MatchingOffers,
  PersonalDataInfo,
  RegionalSeo,
  SiteFooter,
  Steps,
  ReferralBanner,
  TrustBar,
  TrustLinks,
} from "@/components/landing/sections";


const DESCRIPTION =
  "Heizölpreise aus über 300 Händlern vergleichen und Heizöl deutschlandweit günstig online bestellen. Tagesaktuelle Preise, sichere Lieferung, 4,9/5 Sterne.";

const TITLE = "Heizöl bestellen & Heizölpreise vergleichen | Heizöl DE";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Heizöl Deutschland",
          legalName: "Demovero GmbH",
          url: "/",
          logo: "/apple-touch-icon.png",
          image: "/apple-touch-icon.png",
          email: "info@heizoel-deutschland.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kurfürstendamm 97-98",
            postalCode: "10709",
            addressLocality: "Berlin",
            addressCountry: "DE",
          },
          areaServed: "DE",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            reviewCount: "25000",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [searchValues, setSearchValues] = useState<PriceSearchValues | null>(null);

  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      {searchValues ? (
        <PriceSearchLoading values={searchValues} />
      ) : (
        <>
          <main>
            <Hero onSearch={setSearchValues} />
            <ConditionsBox mobileOnly />
            <TrustBar />
            <ConditionsBox />
            <CustomerVoices />
            <Steps />
            <PersonalDataInfo />
            <MatchingOffers />
            <HeizoelSorten />
            <ReferralBanner />
            <HeizoelServiceIntro />
            <TrustLinks />
            <RegionalSeo />
          </main>
          <SiteFooter />
        </>
      )}
    </div>
  );
}
