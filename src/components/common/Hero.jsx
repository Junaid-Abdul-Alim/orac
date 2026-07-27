import BrandLockup from "./BrandLockup";
import Button from "./Button";
import ImagePanel from "./ImagePanel";
import Reveal from "./Reveal";

export default function Hero({
  eyebrow,
  title,
  kicker,
  text,
  meta,
  cta,
  secondaryCta,
  dark = true,
  lockup,
  heroNote,
  image,
  brandLogo,
  showBrandPanel = true,
}) {
  return (
    <section className={`product-hero ${dark ? "product-hero-dark" : "product-hero-light"}`}>
      <div className="container product-hero-inner">
        <Reveal className="product-hero-copy">
          {brandLogo?.src ? (
            <img
              className={`hero-logo-mark ${brandLogo.className || ""}`.trim()}
              src={brandLogo.src}
              alt={brandLogo.alt || ""}
              loading={brandLogo.loading || "eager"}
              decoding="async"
            />
          ) : null}
          {/* A custom brand logo (Luxe's "House of Azrin" wordmark) already
              names the venture, so the plain-text lockup directly beneath it
              would just repeat the same name a second time before the H1
              repeats it again - skip it whenever a logo image is doing that
              job instead. */}
          {lockup && !brandLogo?.src ? <BrandLockup items={lockup} /> : null}
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {kicker ? <p className="hero-kicker">{kicker}</p> : null}
          {text ? <p className="hero-body">{text}</p> : null}
          {meta ? <p className="hero-meta">{meta}</p> : null}
          {cta || secondaryCta ? (
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
        {image?.src ? (
          <ImagePanel
            image={image}
            label={image.label || eyebrow}
            title={image.title}
            description={image.description}
            className="product-hero-image"
            priority
            dark={dark}
            delay={90}
          />
        ) : null}
        {showBrandPanel ? (
          <Reveal className="hero-brand-panel" delay={120}>
            <span className="hero-brand-rule" />
            <small>{heroNote || meta || lockup?.join(" / ")}</small>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
