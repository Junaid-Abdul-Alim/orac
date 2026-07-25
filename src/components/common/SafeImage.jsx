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

  const img = (
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

  if (!aspectRatio) {
    return img;
  }

  return (
    <div className={`safe-image-frame ${loaded ? "is-loaded" : ""}`} style={{ aspectRatio }}>
      {img}
    </div>
  );
}
