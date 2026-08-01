import { Link } from "react-router-dom";
import ImageReveal from "./ImageReveal";
import SafeImage from "./SafeImage";

export default function ImagePanel({
  image,
  label,
  title,
  description,
  to,
  dark = false,
  priority = false,
  className = "",
  delay = 0,
  variant = "panel",
  motionId,
  bare = false,
}) {
  const content = (
    <>
      <div className="image-panel-media">
        <SafeImage
          src={image?.src}
          mobileSrc={image?.mobileSrc}
          alt={image?.alt || title || label || ""}
          priority={priority}
          fallbackLabel={image?.label || label || "ORAC visual"}
        />
        <div className="image-panel-overlay" />
      </div>
      <div className="image-panel-copy">
        {label ? <span>{label}</span> : null}
        {title ? <h3>{title}</h3> : null}
        {description ? <p>{description}</p> : null}
      </div>
    </>
  );

  const panelClassName = `image-panel ${dark ? "image-panel-dark" : ""} ${className}`.trim();
  const inner = to ? (
    <Link to={to} aria-label={title || label}>
      {content}
    </Link>
  ) : (
    content
  );

  // `bare` is for the homepage only: a section-level scrub timeline animates
  // this element's clip-path/scale directly (see useHomeMotion.js), so it must
  // not also carry ImageReveal's own initial state or trigger. Every existing
  // caller keeps the default and is unaffected.
  if (bare) {
    return (
      <div className={panelClassName} data-media-variant={variant}>
        {inner}
      </div>
    );
  }

  return (
    <ImageReveal className={panelClassName} delay={delay} variant={variant} motionId={motionId}>
      {inner}
    </ImageReveal>
  );
}
