import { useRef } from "react";
import { Coffee, Gem, Gift, Heart, Music2, Palette, PartyPopper, Sun, UtensilsCrossed } from "lucide-react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import ServiceBlock from "../components/common/ServiceBlock";
import ProcessTimeline from "../components/common/ProcessTimeline";
import IconBadge from "../components/common/IconBadge";
import EventusVelorawedSection from "../sections/EventusVelorawedSection";
import Hero from "../components/common/Hero";
import {
  eventusCelebrations,
  eventusCorporate,
  eventusPillars,
  eventusProcess,
  eventusServices,
  eventusTouchPoints,
} from "../data/eventusData";
import { eventusImages } from "../data/eventusImages";
import usePageMotion from "../motion/usePageMotion";
import { pad2 } from "../utils/pad2";

const ritualIcon = (title = "") => {
  const key = title.toLowerCase();

  if (key.includes("wedding")) return Heart;
  if (key.includes("reception")) return PartyPopper;
  if (key.includes("engagement")) return Gem;
  if (key.includes("mehendi")) return Palette;
  if (key.includes("haldi")) return Sun;
  if (key.includes("sangeet")) return Music2;

  return Heart;
};

const touchIcon = (title = "") => {
  const key = title.toLowerCase();

  if (key.includes("gifting") || key.includes("arrival")) return Gift;
  if (key.includes("culinary")) return UtensilsCrossed;
  if (key.includes("comfort")) return Coffee;

  return Gift;
};

export default function OracEventus() {
  const scope = useRef(null);
  usePageMotion(scope, "eventus");

  return (
    <div className="venture-page venture-page-eventus" ref={scope} data-motion-identity="eventus">
      <Hero
        lockup={["ORAC", "Eventus"]}
        eyebrow="Event Management"
        title="ORAC EVENTUS"
        kicker="Weddings, Celebrations & Moments, Mastered"
        text="Building celebrations that are felt, not just seen."
        meta="Company Profile & Services Brochure 2026"
        heroNote="EST. INDIA"
        image={eventusImages.hero}
        variant="frame"
      />

      <section className="section">
        <div className="container split-layout">
          <SectionHeader eyebrow="The Event House" title="About ORAC Eventus" />
          <Reveal className="rich-copy">
            <p>
              ORAC Eventus is a premium event and celebration house based in Chennai, specialising in
              weddings, milestone celebrations, curated social occasions, and selected corporate events. We
              bring planning, decor, hospitality, guest experience, and execution under one accountable team -
              so every celebration feels seamless, refined, and deeply personal.
            </p>
            <p>
              Built on the belief that important occasions deserve more than vendor coordination, ORAC Eventus
              manages every detail with care - from the first planning discussion to the final guest farewell.
              Our work combines structure, creativity, cultural understanding, and on-ground precision to
              create celebrations that are both beautifully designed and effortlessly experienced.
            </p>
          </Reveal>
        </div>
        <div className="container">
          <div className="reason-panel-list" data-motion-grid>
            {eventusPillars.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section eventus-services-section">
        <div className="container">
          <SectionHeader
            eyebrow="What We Do"
            title="Everything your celebration needs."
            text="From the first decor sketch to the last guest leaving with a gift in hand, ORAC Eventus designs and manages every layer of your celebration. Choose a single service, or hand us the entire event - either way, you work with one team and one timeline."
          />
          <div className="service-grid" data-motion-grid>
            {eventusServices.map((service, index) => (
              <ServiceBlock
                key={service.title}
                title={service.title}
                points={service.points}
                image={eventusImages.services[service.title]}
                index={index}
                variant="frame"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeader
            eyebrow="How We Work"
            title="Our process"
            text="From the first conversation to the final keepsake - one accountable team, every step held with intention."
          />
          <ProcessTimeline steps={eventusProcess} className="process-four" />
        </div>
      </section>

      <section className="section eventus-celebrations-section">
        <div className="container">
          <SectionHeader
            eyebrow="The Celebrations We Craft"
            title="Every ritual, understood"
            text="From the first ceremony to the final blessing, we hold every tradition with reverence - so your family feels cared for at every moment."
          />
          <div className="ritual-grid" data-motion-grid>
            {eventusCelebrations.map((item, index) => {
              const Icon = ritualIcon(item.title);
              return (
                <article className="ritual-card" key={item.title}>
                  <div className="ritual-card-top">
                    <IconBadge icon={Icon} className="icon-badge-soft" size={17} />
                    <span className="ritual-card-index">{pad2(index + 1)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
          <div className="touch-row" data-motion-grid>
            {eventusTouchPoints.map((item) => {
              const Icon = touchIcon(item.title);
              return (
                <article className="touch-card" key={item.title}>
                  <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section muted-section eventus-signature-banner">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">The Weddings We Craft</span>
            <h2>Signature Weddings</h2>
            <p>Celebrations shaped with cultural depth, visual grace and contemporary elegance.</p>
          </Reveal>
        </div>
      </section>

      <section className="section eventus-corporate-section">
        <div className="container">
          <SectionHeader
            eyebrow="Beyond Weddings"
            title="Corporate & curated events"
            text="The same precision and design sensitivity - translated into business events, brand launches and cultural showcases."
          />
          <div className="service-grid" data-motion-grid>
            {eventusCorporate.map((card, index) => (
              <ServiceBlock
                key={card.title}
                title={card.title}
                tag={card.tag}
                points={card.points}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section eventus-handoff-section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">One House &middot; Two Crafts &middot; Held Together</span>
          </Reveal>
        </div>
      </section>

      <EventusVelorawedSection />
    </div>
  );
}
