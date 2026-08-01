import { useRef } from "react";
import { ClipboardCheck, FileCheck2, Handshake, SearchCheck, Ship, Truck } from "lucide-react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import IconBadge from "../components/common/IconBadge";
import ProductCategoryShowcase from "../components/common/ProductCategoryShowcase";
import ProcessTimeline from "../components/common/ProcessTimeline";
import CinematicBanner from "../components/common/CinematicBanner";
import GlobalReach from "../components/common/GlobalReach";
import Hero from "../components/common/Hero";
import NeumatrixSection from "../sections/NeumatrixSection";
import InternationalContactCTA from "../sections/InternationalContactCTA";
import {
  exportCategories,
  exportPortfolioTagline,
  importCategories,
  importPortfolioTagline,
  internationalServices,
  internationalStats,
  portfolioIntro,
  processClosing,
  processHeading,
  processNarrative,
  processOpeningLines,
  tradeProcess,
  whatWeDoClosing,
} from "../data/internationalData";
import { internationalImages, productImageSlot } from "../data/internationalImages";
import { pad2 } from "../utils/pad2";
import usePageMotion from "../motion/usePageMotion";

const serviceIcons = [Ship, Truck, SearchCheck, Handshake, ClipboardCheck, FileCheck2];

export default function OracInternational() {
  const scope = useRef(null);
  usePageMotion(scope, "international");

  return (
    <div className="venture-page venture-page-international" ref={scope} data-motion-identity="international">
      <Hero
        lockup={["ORAC", "International"]}
        eyebrow="GLOBAL IMPORT AND EXPORT NETWORK"
        title="ORAC INTERNATIONAL"
        kicker="Global Import & Export"
        text="Global Trade Excellence in Agriculture, Industrial Materials, Minerals & Automotive Accessories."
        meta="EST 2026 / CHENNAI - SINGAPORE ALIGNED"
        heroNote="EST 2026 / CHENNAI - SINGAPORE ALIGNED"
        image={{
          ...internationalImages.pageHero,
          title: "Delivering Value Across Every Border",
          description: "Built for international import and export",
        }}
        variant="door"
      />

      <section className="section founder-section">
        <div className="container split-layout">
          <SectionHeader eyebrow="I · Managing Director" title="Ohm Pranav Percholli Ramaraja" />
          <Reveal className="rich-copy">
            <p>
              Rajapalayam has long been recognized as a thriving centre of trade, built on a legacy of cotton,
              textiles, and entrepreneurship. Growing up in this business-driven environment, Ohm Pranav
              developed an early understanding of commerce and global markets.
            </p>
            <p>
              Founded on over six years of industry experience, ORAC International was established with a
              vision to connect trusted products with global opportunities. Today, the company serves clients
              across Africa, Southeast Asia, the Middle East, and other international markets, delivering
              excellence through quality sourcing, reliable partnerships, and seamless global trade.
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
                ORAC International is a global import and export trading company specializing in agricultural
                commodities, natural fibres, industrial minerals, and automotive accessories. With a
                commitment to quality, integrity, and reliability, we source from trusted partners, ensure
                rigorous quality standards, and deliver seamless trade solutions that create lasting value and
                long-term relationships across international markets.
              </p>
            </Reveal>
            <div className="stat-grid" data-motion-grid>
              {internationalStats.map((stat) => (
                <article className="stat-tile" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
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
              <SectionHeader
                eyebrow="II · What We Do"
                title="Beyond Transactions. Building Global Connections."
              />
              <Reveal className="trade-capability-statement" delay={internationalServices.length * 65}>
                <span>{whatWeDoClosing.title}</span>
                <p>{whatWeDoClosing.text}</p>
              </Reveal>
            </div>
            <div className="trade-capability-grid" aria-label="ORAC International capabilities" data-motion-grid>
              {internationalServices.map((service, index) => (
                <article className="trade-capability-card" key={service.title}>
                  <div className="trade-capability-top">
                    <IconBadge icon={serviceIcons[index]} className="icon-badge-soft" size={17} />
                    <span className="trade-capability-number">{pad2(index + 1)}</span>
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p className="trade-capability-tagline">{service.tagline}</p>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductCategoryShowcase
            eyebrow="III · Trade Catalogue"
            title="Export & Import Portfolio"
            text={portfolioIntro}
            collections={[
              {
                id: "exports",
                label: "Export Portfolio",
                short: "Export",
                description: exportPortfolioTagline,
                categories: exportCategories,
                catalogueHref: "/downloads/orac-international-export-portfolio-catalogue.pdf",
                catalogueLabel: "Click below to download the ORAC INTERNATIONAL Export Portfolio Catalogue",
              },
              {
                id: "imports",
                label: "Import Portfolio",
                short: "Import",
                description: importPortfolioTagline,
                categories: importCategories,
                catalogueHref: "/downloads/orac-international-import-portfolio-catalogue.pdf",
                catalogueLabel: "Click below to download the ORAC INTERNATIONAL Import Portfolio Catalogue",
              },
            ]}
            getImage={productImageSlot}
            label="ORAC International trade catalogue"
          />
        </div>
      </section>

      <NeumatrixSection getImage={productImageSlot} />

      {/* The banner graphic already carries "Your Vision. Our Commitment."
          and the full What We Do capability set baked into the image itself,
          so no title/description is passed here - overlaying the same copy
          a second time would duplicate what the photograph already says. */}
      <CinematicBanner image={internationalImages.banner} variant="door" />

      <section className="section process-section">
        <div className="container">
          <SectionHeader eyebrow="IV · Process" title={processHeading} />
          <Reveal className="rich-copy process-narrative">
            <p className="process-stanza">
              {processOpeningLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            {processNarrative.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="process-closing">{processClosing}</p>
          </Reveal>
          <ProcessTimeline steps={tradeProcess} />
        </div>
      </section>

      <InternationalContactCTA />
    </div>
  );
}
