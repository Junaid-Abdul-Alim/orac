import React from "react";
import BrandLockup from "./BrandLockup";
import Button from "./Button";
import Reveal from "./Reveal";

export default function Hero({ eyebrow, title, kicker, text, meta, cta, secondaryCta, dark = true, lockup, heroNote }) {
  return (
    <section className={`product-hero ${dark ? "product-hero-dark" : "product-hero-light"}`}>
      <div className="container product-hero-inner">
        <Reveal className="product-hero-copy">
          {lockup ? <BrandLockup items={lockup} /> : null}
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {kicker ? <p className="hero-kicker">{kicker}</p> : null}
          {text ? <p className="hero-body">{text}</p> : null}
          {meta ? <p className="hero-meta">{meta}</p> : null}
          {(cta || secondaryCta) ? (
            <div className="hero-actions">
              {cta ? <Button to={cta.to}>{cta.label}</Button> : null}
              {secondaryCta ? (
                <Button to={secondaryCta.to} variant="ghost">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </Reveal>
        <Reveal className="hero-brand-panel" delay={120}>
          <span className="hero-brand-rule" />
          <small>{heroNote || meta || lockup?.join(" / ")}</small>
        </Reveal>
      </div>
    </section>
  );
}
