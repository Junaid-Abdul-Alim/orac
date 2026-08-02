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
  variant = "panel",
  topAccessory,
}) {
  const logoMark = brandLogo?.src ? (
    <img
      className={`hero-logo-mark ${brandLogo.className || ""}`.trim()}
      src={brandLogo.src}
      alt={brandLogo.alt || ""}
      loading={brandLogo.loading || "eager"}
      decoding="async"
    />
  ) : null;

  /* With no text title supplied, the wordmark *is* the page heading, so it
     carries the H1 (its alt text becomes the accessible heading name) rather
     than leaving the route with no H1 at all. */
  const logoIsHeading = Boolean(logoMark) && !title;

  return (
    <section className={`product-hero ${dark ? "product-hero-dark" : "product-hero-light"}`}>
      <div className="container product-hero-inner">
        <Reveal className="product-hero-copy">
          {/* Opt-in, defaults to nothing: only a caller that explicitly
              passes it renders anything here, so every other Hero (Eventus,
              Luxe) is byte-for-byte unaffected. */}
          {topAccessory}
          {logoIsHeading ? <h1 className="hero-logo-heading">{logoMark}</h1> : logoMark}
          {/* A custom brand logo (Luxe's "House of Azrin" wordmark) already
              names the venture, so the plain-text lockup directly beneath it
              would just repeat the same name a second time before the H1
              repeats it again - skip it whenever a logo image is doing that
              job instead. */}
          {lockup && !brandLogo?.src ? <BrandLockup items={lockup} /> : null}
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? <h1>{title}</h1> : null}
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
            variant={variant}
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
