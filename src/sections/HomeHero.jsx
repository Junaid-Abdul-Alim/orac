import React from "react";
import BusinessDock from "../components/common/BusinessDock";
import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import oracLogo from "../assets/logos/orac-orange.svg";

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="container home-hero-inner">
        <Reveal className="home-hero-copy">
          <span className="eyebrow">ORAC Ecosystem</span>
          <h1 className="home-hero-logo-heading">
            <img src={oracLogo} alt="ORAC" />
          </h1>
          <p className="hero-line">Trade. Events. Photography.</p>
          <p className="hero-subtext">
            A house of ventures built on vision, discipline, and the conviction that great things are always worth the
            time they take.
          </p>
          <BusinessDock className="hero-business-dock" />
          <div className="hero-actions">
            <Button to="/#companies">Explore Businesses</Button>
            <Button to="/contact" variant="ghost">
              Start a Conversation
            </Button>
          </div>
        </Reveal>
        <Reveal className="hero-brand-panel home-brand-panel" delay={120}>
          <span className="hero-brand-rule" />
          <small>Chennai / Singapore / Africa</small>
        </Reveal>
      </div>
    </section>
  );
}
