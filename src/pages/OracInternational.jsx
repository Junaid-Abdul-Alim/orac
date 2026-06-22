import React from "react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import ServiceCard from "../components/common/ServiceCard";
import ProductPanel from "../components/common/ProductPanel";
import ProcessTimeline from "../components/common/ProcessTimeline";
import CinematicBanner from "../components/common/CinematicBanner";
import GlobalReach from "../components/common/GlobalReach";
import ContactCTA from "../sections/ContactCTA";
import Hero from "../components/common/Hero";
import { exportCategories, importCategories, internationalServices, internationalStats, tradeProcess } from "../data/internationalData";
import { internationalImages, productImageSlot } from "../data/internationalImages";

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
              Founder & Managing Director. Rajapalayam, Tamil Nadu. Chennai-based and Singapore-connected.
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
          <SectionHeader eyebrow="What We Do" title="Trade work with the details kept visible." />
          <div className="service-grid service-grid-compact">
            {internationalServices.map((service, index) => (
              <ServiceCard key={service} title={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Products / Categories"
            title="Selected categories, presented for business conversations."
            text="Every export product is sourced from India's growing regions with traceability, quality checks, and the character of the land it comes from."
          />
          <div className="product-category-stack">
            {exportCategories.map((category) => (
              <section className="product-category" key={category.title}>
                <Reveal className="product-category-head">
                  <span className="eyebrow">Export Portfolio</span>
                  <h3>{category.title}</h3>
                  <p>{category.intro}</p>
                </Reveal>
                <div className="product-grid">
                  {category.products.map((product, index) => (
                    <ProductPanel
                      key={product.name}
                      product={product}
                      image={productImageSlot(product.name)}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <CinematicBanner image={internationalImages.banner} />

      <section className="section import-section">
        <div className="container">
          <SectionHeader
            eyebrow="Import Portfolio"
            title="Bringing the World's Best to India."
            text="ORAC International sources automotive accessories, agricultural commodities, and industrial scrap for India's processing, aftermarket, manufacturing, and recycling sectors."
          />
          <div className="product-category-stack">
            {importCategories.map((category) => (
              <section className="product-category" key={category.title}>
                <Reveal className="product-category-head">
                  <h3>{category.title}</h3>
                  <p>{category.intro}</p>
                </Reveal>
                <div className="product-grid">
                  {category.products.map((product, index) => (
                    <ProductPanel
                      key={product.name}
                      product={product}
                      image={productImageSlot(product.name)}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

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
