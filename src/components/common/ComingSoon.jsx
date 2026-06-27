import React from "react";
import BrandLockup from "./BrandLockup";
import Button from "./Button";
import ImagePanel from "./ImagePanel";

export default function ComingSoon({ eyebrow, title, subtitle, tone = "luxury", lockup, image }) {
  return (
    <section className={`coming-soon coming-soon-${tone}`}>
      <div className="container">
        <div className="coming-soon-inner">
          {lockup ? <BrandLockup items={lockup} /> : null}
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="coming-status">Opening Soon</p>
          <div className="gold-line" />
          <p>{subtitle}</p>
          <div className="hero-brand-panel coming-brand-panel" aria-hidden="true">
            <span className="hero-brand-rule" />
            <small>{lockup?.join(" / ")}</small>
          </div>
          <Button to="/contact" variant="secondary">
            Notify / Enquire
          </Button>
          {image ? (
            <ImagePanel
              image={image}
              label={title}
              title="Opening soon"
              className="coming-soon-image"
              dark
              delay={120}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
