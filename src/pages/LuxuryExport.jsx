import { Gem, Layers3, PenTool, Scissors } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import Button from "../components/common/Button";
import Hero from "../components/common/Hero";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import houseOfAzrinLogo from "../assets/logos/house-of-azrin.png";
import {
  azrinCollections,
  azrinFounder,
  azrinPillars,
  azrinValues,
  luxeImages,
  luxeOfferings,
  luxeStory,
} from "../data/luxeData";
import { pad2 } from "../utils/pad2";

const offeringIcons = [Gem, Layers3, Scissors, PenTool];

export default function LuxuryExport() {
  return (
    <div className="luxe-page">
      <Hero
        lockup={["ORAC Luxe", "The House of Azrin"]}
        eyebrow="A Part of ORAC Luxe"
        title="THE HOUSE OF AZRIN"
        kicker="Where craft meets intention."
        text="A fabric-forward fashion house rooted in deliberate making - from curated ready-to-wear and white-label textiles, to in-house tailored pieces, to handcrafted works built stitch by stitch."
        meta="Ready-to-wear / Fabric sourcing / White label / In-house atelier / Handmade crochet"
        heroNote="An ORAC Luxe Venture"
        image={luxeImages.hero}
        brandLogo={{ src: houseOfAzrinLogo, className: "azrin-hero-logo" }}
        showBrandPanel={false}
      />

      <section className="section luxe-partner-section">
        <div className="container luxe-partner-layout">
          <Reveal className="partner-title luxe-partner-title">
            <div className="azrin-logo-card" aria-hidden="true">
              <img src={houseOfAzrinLogo} alt="" loading="lazy" decoding="async" />
            </div>
            <BrandLockup items={["ORAC Luxe", "The House of Azrin"]} />
            <span className="eyebrow">Under ORAC Luxe</span>
            <h2>The House of Azrin</h2>
          </Reveal>

          <Reveal className="partner-copy luxe-partner-copy">
            {luxeStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="partner-services luxe-services">
              {azrinPillars.map((pillar) => (
                <span key={pillar.title}>{pillar.title}</span>
              ))}
            </div>
            <blockquote>{azrinFounder.quote}</blockquote>
            <div className="luxe-actions">
              <Button to="/contact">Enquire with Azrin</Button>
              <Button to="/contact" variant="secondary">
                Start a Custom Conversation
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="container luxe-studio-strip" aria-label="The House of Azrin studio structure">
          {azrinPillars.map((pillar, index) => (
            <Reveal as="article" className="luxe-studio-note" key={pillar.title} delay={index * 70}>
              <span>{pad2(index + 1)}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section luxe-founder-section">
        <div className="container split-layout">
          <SectionHeader eyebrow="Who We Are" title="About The House of Azrin" />
          <Reveal className="rich-copy luxe-founder-copy">
            <p className="luxe-founder-brand">{azrinFounder.brand}</p>
            <p>{azrinFounder.body}</p>
            <p>{azrinFounder.continuation}</p>
          </Reveal>
        </div>
      </section>

      <section className="section muted-section luxe-offerings-section">
        <div className="container">
          <SectionHeader
            eyebrow="What We Offer"
            title="Three ways to wear Azrin."
            text="Whether you are looking for a finished garment, a fabric to build with, or something made with two hands and time, there is a place for you here."
          />
          <div className="luxe-offering-grid">
            {luxeOfferings.map((offering, index) => {
              const OfferingIcon = offeringIcons[index] || Gem;

              return (
                <Reveal as="article" className="luxe-offering-card" key={offering.title} delay={index * 75}>
                  <IconBadge icon={OfferingIcon} className="icon-badge-soft" size={17} />
                  <div>
                    <h3>{offering.title}</h3>
                    <p>{offering.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container luxe-collections-section">
          <SectionHeader
            eyebrow="Our Offerings"
            title="The collections."
            text="Explore everything The House of Azrin makes - from ready-to-wear to raw fabric, from atelier pieces to handmade craft."
          />
          {azrinCollections.map((collection, collectionIndex) => (
            <Reveal className="azrin-collection-phase" key={collection.phase} delay={collectionIndex * 80}>
              <div className="azrin-phase-header">
                <span>{pad2(collectionIndex + 1)}</span>
                <div>
                  <small>{collection.phase}</small>
                  <h3>{collection.title}</h3>
                </div>
              </div>
              <div className="azrin-collection-grid">
                {collection.items.map((item) => (
                  <article className="azrin-collection-card" key={item.title}>
                    <div>
                      <span>{item.tag}</span>
                      <h4>{item.title}</h4>
                    </div>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <SectionHeader
            eyebrow="Values"
            title="Built with purpose."
            text="The House of Azrin is a venture under ORAC Luxe - a business house that builds ventures with intention."
          />
          <div className="reason-panel-list">
            {azrinValues.map((value, index) => (
              <Reveal as="article" key={value.title} delay={index * 70}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-cta luxe-cta">
        <div className="container contact-cta-inner">
          <Reveal>
            <span className="eyebrow">The House of Azrin</span>
            <h2>We would love to hear from you.</h2>
            <p>
              Whether you are interested in shopping, wholesale, a custom piece, or simply want to know more,
              write to us and we will respond personally.
            </p>
            <Button to="/contact" variant="secondary">
              Contact The House of Azrin
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
