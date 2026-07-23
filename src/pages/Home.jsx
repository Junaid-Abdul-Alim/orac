import CompanyPortfolio from "../sections/CompanyPortfolio";
import ContactCTA from "../sections/ContactCTA";
import HoldingIntro from "../sections/HoldingIntro";
import HomeHero from "../sections/HomeHero";
import GlobalReach from "../components/common/GlobalReach";
import VentureChapter from "../sections/VentureChapter";
import WhyOrac from "../sections/WhyOrac";
import { internationalImages } from "../data/internationalImages";
import { eventusImages } from "../data/eventusImages";
import { luxeImages } from "../data/luxeData";
import { focusedCountryCount } from "../data/reachData";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HoldingIntro />
      <CompanyPortfolio />
      <VentureChapter
        tone="international"
        eyebrow="ORAC International"
        title="Export and import trading across chosen categories."
        text="ORAC International handles agri-commodities, natural fibres, industrial minerals, and automotive accessories with responsible sourcing and quality verification."
        points={[
          "Agricultural commodities",
          "Natural fibres and industrial minerals",
          "Automotive accessories and import commodities",
        ]}
        cta={{ to: "/international", label: "Visit International" }}
        image={internationalImages.hero}
        imageLabel="Global Trade"
      />
      <GlobalReach
        variant="home"
        eyebrow="International Outlook"
        title="OUR GLOBAL REACH"
        text={`ORAC operates from India with ${focusedCountryCount} focused countries and five regional corridors across Asia, Africa, the Middle East, Europe, North America, South America, and Australia.`}
      />
      <VentureChapter
        tone="eventus"
        reverse
        eyebrow="ORAC Eventus"
        title="Building celebrations that are felt, not just seen."
        text="ORAC Eventus is a Chennai-based full-service event management company built around one belief: the family should feel supported from the first call to the final frame."
        points={[
          "Planning, decor and execution",
          "Photography and cinematography through VELORAWED",
          "Clear timelines, clear pricing and one accountable team",
        ]}
        cta={{ to: "/eventus", label: "Visit Eventus" }}
        image={eventusImages.hero}
        imageLabel="Wedding Experience"
      />
      <VentureChapter
        tone="luxe"
        eyebrow="ORAC Luxe"
        title="Fashion shaped around cloth, craft, and restraint."
        text="ORAC Luxe is the fashion and textile side of ORAC: ready-to-wear, white-label fabric foundations, atelier pieces, and handmade craft with a slower sense of making."
        points={[
          "Ready-to-wear and fabric materials",
          "White-label and B2B foundations",
          "In-house atelier and handmade crochet",
        ]}
        cta={{ to: "/luxury-export", label: "Visit ORAC Luxe" }}
        image={luxeImages.hero}
        imageLabel="ORAC Luxe"
      />
      <WhyOrac />
      <ContactCTA
        title="Explore the right ORAC venture or start a conversation."
        text="Choose a business, send an enquiry, or work with ORAC on the next serious opportunity."
      />
    </>
  );
}
