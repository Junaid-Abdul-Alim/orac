import React from "react";
import { ClipboardCheck, FileCheck2, Handshake, SearchCheck, Ship, Truck } from "lucide-react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import IconBadge from "../components/common/IconBadge";
import ProductCategoryShowcase from "../components/common/ProductCategoryShowcase";
import ProcessTimeline from "../components/common/ProcessTimeline";
import CinematicBanner from "../components/common/CinematicBanner";
import GlobalReach from "../components/common/GlobalReach";
import ContactCTA from "../sections/ContactCTA";
import Hero from "../components/common/Hero";
import { exportCategories, importCategories, internationalServices, internationalStats, tradeProcess } from "../data/internationalData";
import { internationalImages, productImageSlot } from "../data/internationalImages";

const serviceDescriptions = [
  "Outbound trade movement for selected Indian categories.",
  "Inbound channels for selected industrial and market needs.",
  "Supplier discovery, category fit, and origin conversations.",
  "Commercial coordination from enquiry to movement.",
  "Producer, vendor, and supplier follow-through.",
  "Quality checks, document readiness, and shipment support.",
];

const serviceIcons = [Ship, Truck, SearchCheck, Handshake, ClipboardCheck, FileCheck2];

export default function OracInternational() {
  return (
    <>
      <Hero
        lockup={["ORAC", "International"]}
        eyebrow="Global Import & Export"
        title="ORAC INTERNATIONAL"
        kicker="Global Import & Export"
        text="Export and import trading across agri-commodities, industrial fibres, minerals, and automotive accessories."
        meta="Export & Import / Est. 22 April 2026 / Chennai, India / Singapore-Aligned"
        heroNote="Export & Import / Est. 22 April 2026 / Chennai, India / Singapore-Aligned"
        image={internationalImages.hero}
      />

      <section className="section founder-section">
        <div className="container split-layout">
          <SectionHeader eyebrow="Founder" title="Ohm Pranav Percholli Ramaraja" />
          <Reveal className="rich-copy">
            <p>
              Founder & Chairman. Rajapalayam, Tamil Nadu. Chennai-based and Singapore-connected.
            </p>
            <p>
              Rajapalayam is a town with trade in its bones: cotton, textiles, commerce. Ohm Pranav grew up watching
              the rhythms of business long before he entered them. ORAC International is the result of six years of
              doing the work, earning the knowledge, and refusing to stop. What started as an idea is now a trading
              house with reach into Africa, Southeast Asia, and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section about-trade-section">
        <div className="container">
          <div className="editorial-panel about-trade-panel">
            <Reveal>
              <span className="eyebrow">About ORAC International</span>
              <p>
                ORAC International is an export and import trading business focused on agricultural commodities,
                natural fibres, industrial minerals, and automotive accessories. Products are sourced responsibly,
                verified for quality, and moved with attention that keeps buyers coming back.
              </p>
            </Reveal>
            <div className="stat-grid">
              {internationalStats.map((stat, index) => (
                <Reveal as="article" className="stat-tile" key={stat.label} delay={index * 70}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalReach />

      <section className="section muted-section">
        <div className="container">
          <div className="trade-capability-showcase">
            <div className="trade-capability-copy">
              <SectionHeader eyebrow="What We Do" title="Trade work with the details kept visible." />
              <Reveal className="trade-capability-statement">
                <span>From source to shipment</span>
                <p>
                  ORAC International keeps the essential work close: finding the right supply,
                  coordinating the right people, and keeping every trade conversation clear.
                </p>
              </Reveal>
            </div>
            <div className="trade-capability-grid" aria-label="ORAC International capabilities">
              {internationalServices.map((service, index) => (
                <Reveal as="article" className="trade-capability-card" key={service} delay={index * 65}>
                  <div className="trade-capability-top">
                    <IconBadge icon={serviceIcons[index]} className="icon-badge-soft" size={17} />
                    <span className="trade-capability-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3>{service}</h3>
                    <p>{serviceDescriptions[index]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductCategoryShowcase
            eyebrow="Trade Catalogue"
            title="Export & Import Catalogue"
            text="A focused view of ORAC International's export products and selected import channels for agricultural, automotive, and industrial trade."
            collections={[
              {
                id: "exports",
                label: "Export Collection",
                short: "Export",
                description:
                  "Products sourced from India's growing and manufacturing regions, prepared for international trade enquiries.",
                categories: exportCategories,
              },
              {
                id: "imports",
                label: "Import Collection",
                short: "Import",
                description:
                  "Selected products sourced through international channels for India's aftermarket, processing, and industrial sectors.",
                categories: importCategories,
              },
            ]}
            getImage={productImageSlot}
            label="ORAC International trade catalogue"
          />
        </div>
      </section>

      <CinematicBanner image={internationalImages.banner} />

      <section className="section process-section">
        <div className="container">
          <SectionHeader eyebrow="Process" title="A clear route from source to support." />
          <ProcessTimeline steps={tradeProcess} />
        </div>
      </section>

      <ContactCTA title="Trade enquiries and partner conversations begin here." />
    </>
  );
}
