import { Link } from "react-router-dom";
import { ArrowRight, Gem, PenTool, Sparkles } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import Button from "../components/common/Button";
import CinematicBanner from "../components/common/CinematicBanner";
import Hero from "../components/common/Hero";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";
import SectionHeader from "../components/common/SectionHeader";
import { pad2 } from "../utils/pad2";
import houseOfAzrinLogo from "../assets/logos/house-of-azrin.png";
import {
  azrinFounder,
  azrinValues,
  catalogue,
  houseEditions,
  luxeImages,
  luxeTagline,
  maisonBanner,
  maisonSeries,
  vaultXiii,
  whatIsAzrin,
} from "../data/luxeData";

const editionIcons = [Sparkles, Gem, PenTool];

export default function LuxuryExport() {
  return (
    <div className="luxe-page">
      <Hero
        lockup={["ORAC Luxe", "The House of Azrin"]}
        eyebrow="A Part of ORAC Luxe"
        title="THE HOUSE OF AZRIN"
        kicker={luxeTagline}
        text="A fabric-forward fashion house rooted in deliberate making - curated style, couture essentials, and bespoke artisan work, cut from a single considered palette."
        meta="Curated Style / Couture Essentials / The Bespoke Artisan"
        heroNote="An ORAC Luxe Venture"
        image={luxeImages.hero}
        brandLogo={{ src: houseOfAzrinLogo, className: "azrin-hero-logo" }}
        showBrandPanel={false}
      />

      {/* ii) Colour palette — Vault XIII */}
      <section className="section vault-section">
        <div className="container">
          <Reveal className="vault-layout">
            <div className="vault-copy">
              <span className="eyebrow">I · {vaultXiii.eyebrow}</span>
              <h2 className="vault-name">{vaultXiii.name}</h2>
              <p>{vaultXiii.tagline}</p>
              <div className="vault-swatches" aria-label={`${vaultXiii.name} colour palette`}>
                {vaultXiii.swatches.map((swatch) => (
                  <span key={swatch.name} className="vault-swatch">
                    <span
                      className="vault-swatch-chip"
                      style={{ background: swatch.value }}
                      aria-hidden="true"
                    />
                    <small>{swatch.name}</small>
                  </span>
                ))}
              </div>
            </div>
            <figure className="vault-figure">
              <SafeImage
                src={vaultXiii.image.src}
                alt={vaultXiii.image.alt}
                fallbackLabel={vaultXiii.image.label}
                className="vault-image"
              />
              <figcaption>{vaultXiii.name}</figcaption>
            </figure>
          </Reveal>
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
          <div className="editions-grid">
            {houseEditions.map((edition, index) => {
              const EditionIcon = editionIcons[index] || Gem;
              return (
                <Reveal as="article" className="edition-card" key={edition.id} delay={index * 80}>
                  <div className="edition-card-top">
                    <IconBadge icon={EditionIcon} className="icon-badge-soft" size={18} />
                    <span className="edition-number">{pad2(index + 1)}</span>
                  </div>
                  <h3>{edition.title}</h3>
                  <p>{edition.tagline}</p>
                </Reveal>
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

      {/* v) Maison Series — collage banner, then explore grid (each links to its own page) */}
      <CinematicBanner
        image={maisonBanner}
        title="The Maison Series"
        description="Dresses, Co-ords, Tunics, and Signature Bottoms — one considered palette, four families of garment."
      />
      <section className="section maison-section">
        <div className="container">
          <SectionHeader
            eyebrow="IV · The Maison Series"
            title="The Maison Series."
            text="Four families of garment, each with its own story. Explore a category to meet the looks."
          />
          <div className="maison-grid">
            {maisonSeries.map((category, index) => (
              <Reveal
                as={Link}
                to={`/luxury-export/${category.slug}`}
                className="maison-card"
                key={category.id}
                delay={index * 70}
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
              </Reveal>
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

      {/* Values — ORAC Holding style */}
      <section className="section why-section">
        <div className="container">
          <SectionHeader
            eyebrow="V · Values"
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
            <BrandLockup items={["ORAC Luxe", "The House of Azrin"]} />
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
