import { useRef } from "react";
import HoldingIntro from "../sections/HoldingIntro";
import HomeHero from "../sections/HomeHero";
import GlobalReach from "../components/common/GlobalReach";
import Leadership from "../sections/Leadership";
import VentureChapter from "../sections/VentureChapter";
import WhyOrac from "../sections/WhyOrac";
import StoryBridge from "../sections/StoryBridge";
import useHomeMotion from "../motion/useHomeMotion";
import useStoryMotion from "../motion/useStoryMotion";
import { bridges } from "../data/storyData";
import { internationalImages } from "../data/internationalImages";
import { eventusImages } from "../data/eventusImages";
import { luxeImages } from "../data/luxeData";
import { focusedCountryCount } from "../data/reachData";

export default function Home() {
  // `display: contents` (see 14-motion.css), so this adds a query scope for the
  // continuum's timelines without adding a box to the layout.
  const scope = useRef(null);
  useHomeMotion(scope);
  useStoryMotion(scope);
  const bridge = (i) => <StoryBridge {...bridges[i]} index={i} total={bridges.length} />;

  return (
    <div className="home-motion-scope" ref={scope}>
      <HomeHero />
      <HoldingIntro />
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
        meta="Chennai — Singapore aligned"
        cta={{ to: "/international", label: "Visit International" }}
        image={internationalImages.hero}
      />
      <GlobalReach
        variant="home"
        eyebrow="International Outlook"
        title="OUR GLOBAL REACH"
        text={`ORAC operates from India with ${focusedCountryCount} focused countries and five regional corridors across Asia, Africa, the Middle East, Europe, North America, South America, and Australia.`}
      />
      {bridge(0)}
      <VentureChapter
        tone="eventus"
        reverse
        eyebrow="ORAC Eventus"
        title="Building celebrations that are felt, not just seen."
        text="ORAC Eventus is an India-based full-service event management company built around one belief: the family should feel supported from the first call to the final frame."
        points={[
          "Planning, decor and execution",
          "Photography and cinematography through VELORAWED",
          "Clear timelines, clear pricing and one accountable team",
        ]}
        meta="Est. India"
        cta={{ to: "/eventus", label: "Visit Eventus" }}
        image={eventusImages.homeHero}
        imageLabel="Wedding Experience"
      />
      {bridge(1)}
      <VentureChapter
        tone="luxe"
        eyebrow="ORAC Luxe"
        title="Fashion shaped around cloth, craft, and restraint."
        text="ORAC Luxe is the fashion and textile side of ORAC: ready-to-wear, white-label fabric foundations, atelier pieces, and handmade craft with a slower sense of making."
        points={[
          "Ready-to-wear and fabric materials",
          "B2B foundations",
          "In-house atelier and handmade crochet",
        ]}
        meta="EST INDIA"
        cta={{ to: "/luxury-export", label: "Visit ORAC Luxe" }}
        image={luxeImages.hero}
        imageLabel="ORAC Luxe"
      />
      {bridge(2)}
      <WhyOrac />
      <Leadership />
    </div>
  );
}
