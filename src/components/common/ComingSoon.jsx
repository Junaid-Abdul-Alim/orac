import React from "react";
import BrandLockup from "./BrandLockup";
import Button from "./Button";

export default function ComingSoon({ eyebrow, title, subtitle, tone = "luxury", lockup }) {
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
        </div>
      </div>
    </section>
  );
}
