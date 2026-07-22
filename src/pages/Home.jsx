import CompanyPortfolio from "../sections/CompanyPortfolio";
import ContactCTA from "../sections/ContactCTA";
import EventusPreview from "../sections/EventusPreview";
import HoldingIntro from "../sections/HoldingIntro";
import HomeHero from "../sections/HomeHero";
import InternationalPreview from "../sections/InternationalPreview";
import GlobalReach from "../components/common/GlobalReach";
import LuxePreview from "../sections/LuxePreview";
import WhyOrac from "../sections/WhyOrac";
import { focusedCountryCount } from "../data/reachData";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HoldingIntro />
      <CompanyPortfolio />
      <InternationalPreview />
      <GlobalReach
        variant="home"
        eyebrow="International Outlook"
        title="OUR GLOBAL REACH"
        text={`ORAC operates from India with ${focusedCountryCount} focused countries and five regional corridors across Asia, Africa, the Middle East, Europe, North America, South America, and Australia.`}
      />
      <EventusPreview />
      <LuxePreview />
      <WhyOrac />
      <ContactCTA
        title="Explore the right ORAC venture or start a conversation."
        text="Choose a business, send an enquiry, or work with ORAC on the next serious opportunity."
      />
    </>
  );
}
