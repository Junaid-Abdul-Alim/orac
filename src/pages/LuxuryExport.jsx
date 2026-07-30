import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gem, PenTool, Sparkles } from "lucide-react";
import Hero from "../components/common/Hero";
import IconBadge from "../components/common/IconBadge";
import LuxeContactCTA from "../sections/LuxeContactCTA";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";
import SectionHeader from "../components/common/SectionHeader";
import VaultPalette from "../sections/VaultPalette";
import { pad2 } from "../utils/pad2";
import houseOfAzrinLogo from "../assets/logos/house-of-azrin.png";
import usePageMotion from "../motion/usePageMotion";
import {
  azrinFounder,
  azrinValues,
  catalogue,
  houseEditions,
  luxeTagline,
  maisonBanner,
  maisonSeries,
  vaultXiii,
  whatIsAzrin,
} from "../data/luxeData";

const editionIcons = [Sparkles, Gem, PenTool];

export default function LuxuryExport() {
  const scope = useRef(null);
  usePageMotion(scope, "luxe");

  return (
    <div className="luxe-page venture-page venture-page-luxe" ref={scope} data-motion-identity="luxe">
      {/* No eyebrow and no text title: the enlarged wordmark carries the
          heading on its own (Hero promotes it to the H1), so the House is
          named once instead of three times in a row. */}
      <Hero
        lockup={["ORAC Luxe", "The House of Azrin"]}
        kicker={luxeTagline}
        text="A fabric-forward fashion house rooted in deliberate making - curated style, couture essentials, and bespoke artisan work, cut from a single considered palette."
        meta="Curated Style / Couture Essentials / The Bespoke Artisan"
        heroNote="An ORAC Luxe Venture"
        brandLogo={{
          src: houseOfAzrinLogo,
          alt: "The House of Azrin",
          className: "azrin-hero-logo",
        }}
        showBrandPanel={false}
      />

      {/* ii) Colour palette — Vault XIII */}
      <VaultPalette vault={vaultXiii} />

      {/* Collections — a titled band whose heading sits on the container
          grid while the collage below it stays full-bleed, no text overlay,
          sharp corners. Placed directly after Vault XIII. */}
      <section className="luxe-collections-section">
        <div className="container">
          <SectionHeader title="The Collections" />
        </div>
        <div className="luxe-collage-banner">
          <SafeImage
            src={maisonBanner.src}
            alt={maisonBanner.alt}
            fallbackLabel={maisonBanner.label}
            className="luxe-collage-image"
          />
        </div>
      </section>

      {/* iii) Brand categories — The House Editions */}
      <section className="section muted-section editions-section">
        <div className="container">
          <SectionHeader
            eyebrow="II · The House Editions"
            title="Three ways into the House."
            text="Every Azrin piece belongs to one of three editions - a way of choosing how considered you want the making to be."
          />
          <div className="editions-grid" data-motion-grid>
            {houseEditions.map((edition, index) => {
              const EditionIcon = editionIcons[index] || Gem;
              return (
                <article className="edition-card" key={edition.id}>
                  <div className="edition-card-top">
                    <IconBadge icon={EditionIcon} className="icon-badge-soft" size={24} />
                    <span className="edition-number">{pad2(index + 1)}</span>
                  </div>
                  <h3>{edition.title}</h3>
                  <p>{edition.tagline}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* iv) What is Azrin */}
      <section className="section luxe-founder-section">
        <div className="container split-layout">
          <SectionHeader eyebrow={`III · ${whatIsAzrin.eyebrow}`} title={whatIsAzrin.title} />
          <Reveal className="rich-copy luxe-founder-copy">
            {whatIsAzrin.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote>{azrinFounder.quote}</blockquote>
          </Reveal>
        </div>
      </section>

      {/* v) Maison Series — explore grid (each links to its own page). The
          collage banner now sits earlier, right after Vault XIII. */}
      <section className="section maison-section">
        <div className="container">
          <SectionHeader
            eyebrow="IV · The Maison Series"
            title="The Maison Series."
            text="Four families of garment, each with its own story. Explore a category to meet the looks."
          />
          <div className="maison-grid" data-motion-grid>
            {maisonSeries.map((category) => (
              <Link
                to={`/luxury-export/${category.slug}`}
                className={`maison-card maison-card-${category.slug}`}
                key={category.id}
                aria-label={`Explore ${category.name}`}
              >
                <div className="maison-card-media">
                  <SafeImage
                    src={category.landscape.src}
                    alt={category.landscape.alt}
                    fallbackLabel={category.landscape.label}
                    className="maison-card-photo"
                  />
                  <span className="maison-card-explore">Explore</span>
                </div>
                <div className="maison-card-body">
                  <div>
                    <h3>{category.name}</h3>
                    <small>{category.subtitle}</small>
                  </div>
                  <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable catalogue — below Maison Series */}
      <section className="section catalogue-section">
        <div className="container">
          <Reveal className="catalogue-panel">
            <div className="catalogue-copy">
              <span className="eyebrow">{catalogue.eyebrow}</span>
              <h2>{catalogue.title}</h2>
              <p>{catalogue.text}</p>
            </div>
            <a className="button catalogue-button" href={catalogue.href} download>
              {catalogue.fileLabel}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Values — ORAC Holdings style */}
      <section className="section why-section">
        <div className="container">
          <SectionHeader
            eyebrow="V · Values"
            title="Built with purpose."
            text="Four principles carry through every piece, from first cut to final stitch."
          />
          <div className="reason-panel-list" data-motion-grid>
            {azrinValues.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LuxeContactCTA />
    </div>
  );
}
