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
}) {
  const content = (
    <>
      <div className="image-panel-media">
        <SafeImage
          src={image?.src}
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

  return (
    <ImageReveal
      className={`image-panel ${dark ? "image-panel-dark" : ""} ${className}`.trim()}
      delay={delay}
    >
      {to ? (
        <Link to={to} aria-label={title || label}>
          {content}
        </Link>
      ) : (
        content
      )}
    </ImageReveal>
  );
}
