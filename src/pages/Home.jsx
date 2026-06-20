import React from "react";
import CompanyPortfolio from "../sections/CompanyPortfolio";
import ContactCTA from "../sections/ContactCTA";
import EventusPreview from "../sections/EventusPreview";
import HoldingIntro from "../sections/HoldingIntro";
import HomeHero from "../sections/HomeHero";
import InternationalPreview from "../sections/InternationalPreview";
import QuoteBlock from "../components/common/QuoteBlock";

export default function Home() {
  return (
    <>
      <HomeHero />
      <CompanyPortfolio />
      <HoldingIntro />
      <QuoteBlock
        quote="Don't give up on your dreams. Because when you have a dream worth chasing, nothing in this world has the power to stop you."
        caption="Ohm Pranav P.R., Founder & MD, ORAC Holdings"
      />
      <InternationalPreview />
      <EventusPreview />
      <ContactCTA />
    </>
  );
}
