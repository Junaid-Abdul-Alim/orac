import { useState } from "react";

export default function SafeImage({
  src,
  srcSet,
  sizes,
  alt = "",
  className = "",
  fallbackLabel = "Visual unavailable",
  loading = "lazy",
  priority = false,
  aspectRatio,
  mobileSrc,
}) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const fetchpriority = priority ? "high" : undefined;

  if (failed) {
    const fallback = (
      <div className={`safe-image-fallback ${className}`.trim()} role="img" aria-label={alt || fallbackLabel}>
        <span>{fallbackLabel}</span>
        <small>ORAC visual asset</small>
      </div>
    );

    return aspectRatio ? (
      <div className="safe-image-frame" style={{ aspectRatio }}>
        {fallback}
      </div>
    ) : (
      fallback
    );
  }

  const imgEl = (
    <img
      className={`safe-image ${loaded ? "is-loaded" : ""} ${aspectRatio ? "safe-image-fill" : ""} ${className}`.trim()}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding="async"
      fetchpriority={fetchpriority}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );

  /* Art-directed swap, not a resolution switch: `mobileSrc` is a distinct
     crop/composition (e.g. a portrait recomposition of a landscape photo),
     so it needs its own <source>, not a srcSet density hint. Matches the
     site's shared 820px breakpoint (11-responsive.css) so the swap lands on
     the same boundary every other mobile layout change already uses. */
  const img = mobileSrc ? (
    <picture>
      <source media="(max-width: 820px)" srcSet={mobileSrc} />
      {imgEl}
    </picture>
  ) : (
    imgEl
  );

  if (!aspectRatio) {
    return img;
  }

  return (
    <div className={`safe-image-frame ${loaded ? "is-loaded" : ""}`} style={{ aspectRatio }}>
      {img}
    </div>
  );
}
