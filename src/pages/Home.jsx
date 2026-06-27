import React from "react";
import CompanyPortfolio from "../sections/CompanyPortfolio";
import ContactCTA from "../sections/ContactCTA";
import EventusPreview from "../sections/EventusPreview";
import HoldingIntro from "../sections/HoldingIntro";
import HomeHero from "../sections/HomeHero";
import InternationalPreview from "../sections/InternationalPreview";
import QuoteBlock from "../components/common/QuoteBlock";
import GlobalReach from "../components/common/GlobalReach";

export default function Home() {
  return (
    <>
      <HomeHero />
      <CompanyPortfolio />
      <HoldingIntro />
      <GlobalReach
        variant="home"
        eyebrow="International Outlook"
        title="OUR GLOBAL REACH"
        text="ORAC operates from India with 29 focused countries and five regional corridors across Asia, Africa, the Middle East, Europe, North America, South America, and Australia."
      />
      <QuoteBlock
        quote="Don't give up on your dreams. Because when you have a dream worth chasing, nothing in this world has the power to stop you."
        caption="Ohm Pranav, Founder & Chairman, ORAC Holdings"
      />
      <InternationalPreview />
      <EventusPreview />
      <ContactCTA />
    </>
  );
}
