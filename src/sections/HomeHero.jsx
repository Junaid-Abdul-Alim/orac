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
          <p className="hero-line">Trade &bull; Events &bull; Couture</p>
          <p className="hero-subtext">
            A House of Ventures. Built on Vision. Forged by Discipline. Defined by Legacy.
          </p>
          <p className="hero-luxe-line">LUXE - A Fashion House</p>
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
          <small>India / Singapore / Africa</small>
        </Reveal>
      </div>
    </section>
  );
}
