import { useRef, useState } from "react";
import { ClipboardCheck, FileCheck2, Handshake, SearchCheck, Ship, Truck } from "lucide-react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import IconBadge from "../components/common/IconBadge";
import SafeImage from "../components/common/SafeImage";
import ProductCategoryShowcase from "../components/common/ProductCategoryShowcase";
import ProcessTimeline from "../components/common/ProcessTimeline";
import CinematicBanner from "../components/common/CinematicBanner";
import GlobalReach from "../components/common/GlobalReach";
import Hero from "../components/common/Hero";
import { Globe } from "../components/ui/globe";
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
import { globeArcs, globeMarkerPoints } from "../data/reachData";
import { pad2 } from "../utils/pad2";
import usePageMotion from "../motion/usePageMotion";

const serviceIcons = [Ship, Truck, SearchCheck, Handshake, ClipboardCheck, FileCheck2];

// The three ways into ORAC International's catalogue - visitors pick a path
// rather than scrolling past all of them stacked.
const tradePaths = [
  {
    id: "export",
    label: "Export Portfolio",
    images: [productImageSlot("Cardamom"), productImageSlot("Cotton Yarn")],
  },
  {
    id: "import",
    label: "Import Portfolio",
    images: [productImageSlot("Raw Cotton"), productImageSlot("Kidney Beans")],
  },
  {
    id: "neumatrix",
    label: "NEUMATRIX",
    images: [productImageSlot("Grill Lights"), productImageSlot("Projector & LED Headlights")],
  },
];

// ORAC's own palette for the hero globe, not the reference component's stock
// blue/white - a brand flourish should read as ours. Corridor arcs (Chennai
// to every highlighted country) mirror the ones GlobalReach draws on the
// flat map below, via the same reachData.js source.
const heroGlobeProps = {
  theta: 0.28,
  dark: 0,
  diffuse: 0.55,
  mapSamples: 16000,
  mapBrightness: 1.15,
  markerSize: 0.05,
  baseColor: [0.98, 0.97, 0.96], // --cream
  markerColor: [0.72, 0.59, 0.35], // --gold
  glowColor: [0.83, 0.69, 0.47], // --gold-light
  arcColor: [0.72, 0.59, 0.35], // --gold
};

export default function OracInternational() {
  const scope = useRef(null);
  const [activePath, setActivePath] = useState(null);
  usePageMotion(scope, "international");

  return (
    <div className="venture-page venture-page-international" ref={scope} data-motion-identity="international">
      <Hero
        eyebrow="GLOBAL IMPORT AND EXPORT NETWORK"
        title="ORAC INTERNATIONAL"
        text="Global Trade Excellence in Agriculture, Industrial Materials, Minerals & Automotive Accessories."
        meta="EST 2026 / CHENNAI - SINGAPORE ALIGNED"
        heroNote="EST 2026 / CHENNAI - SINGAPORE ALIGNED"
        image={{
          ...internationalImages.pageHero,
          title: "Delivering Value Across Every Border",
          description: "Built for international import and export",
        }}
        variant="door"
        topAccessory={
          <div className="international-hero-globe" aria-hidden="true">
            <Globe markers={globeMarkerPoints} arcs={globeArcs} {...heroGlobeProps} />
          </div>
        }
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
            <ol className="trade-flow-route" aria-label="ORAC International capabilities" data-motion-grid>
              {internationalServices.map((service, index) => (
                <li className="trade-flow-step" key={service.title}>
                  <div className="trade-flow-step-head">
                    <span className="trade-flow-index">{pad2(index + 1)}</span>
                    <IconBadge icon={serviceIcons[index]} className="icon-badge-soft" size={16} />
                    <h3>{service.title}</h3>
                  </div>
                  <div className="trade-flow-step-body">
                    <div>
                      <p className="trade-flow-tagline">{service.tagline}</p>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="product-showcase-head">
            <div>
              <span className="eyebrow">III · Trade Catalogue</span>
              <h2>Choose Your Path</h2>
            </div>
            <div className="product-showcase-context">
              <p>{portfolioIntro}</p>
            </div>
          </Reveal>

          <div className="product-collection-switch trade-path-switch" data-motion-grid role="group" aria-label="Trade catalogue paths">
            {tradePaths.map((path) => (
              <button
                type="button"
                key={path.id}
                className={activePath === path.id ? "is-active" : ""}
                aria-pressed={activePath === path.id}
                onClick={() => setActivePath(path.id)}
              >
                <div className="trade-path-collage" aria-hidden="true">
                  <SafeImage
                    src={path.images[0].src}
                    alt=""
                    className="trade-path-collage-photo trade-path-collage-photo-back"
                    fallbackLabel={path.images[0].label}
                  />
                  <SafeImage
                    src={path.images[1].src}
                    alt=""
                    className="trade-path-collage-photo trade-path-collage-photo-front"
                    fallbackLabel={path.images[1].label}
                  />
                </div>
                <span className="trade-path-title">{path.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <>
        {activePath === "export" || activePath === "import" ? (
          <section className="section">
            <div className="container">
              <ProductCategoryShowcase
                eyebrow={activePath === "export" ? "Export Portfolio" : "Import Portfolio"}
                title={activePath === "export" ? "Export Portfolio" : "Import Portfolio"}
                text={activePath === "export" ? exportPortfolioTagline : importPortfolioTagline}
                collections={[
                  activePath === "export"
                    ? {
                        id: "exports",
                        label: "Export Portfolio",
                        short: "Export",
                        description: exportPortfolioTagline,
                        categories: exportCategories,
                      }
                    : {
                        id: "imports",
                        label: "Import Portfolio",
                        short: "Import",
                        description: importPortfolioTagline,
                        categories: importCategories,
                      },
                ]}
                getImage={productImageSlot}
                label={`ORAC International ${activePath} catalogue`}
              />
            </div>
          </section>
        ) : null}

        {activePath === "neumatrix" ? <NeumatrixSection getImage={productImageSlot} /> : null}
      </>

      {/* The banner graphic already carries "Your Vision. Our Commitment."
          and the full What We Do capability set baked into the image itself,
          so no title/description is passed here - overlaying the same copy
          a second time would duplicate what the photograph already says. */}
      <CinematicBanner image={internationalImages.banner} variant="door" />

      <section className="section process-section">
        <div className="container process-layout">
          <div className="process-layout-copy">
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
          </div>
          <div className="process-layout-route">
            <span className="process-route-label">The Route</span>
            <ProcessTimeline steps={tradeProcess} className="process-timeline-route" />
          </div>
        </div>
      </section>

      <InternationalContactCTA />
    </div>
  );
}
