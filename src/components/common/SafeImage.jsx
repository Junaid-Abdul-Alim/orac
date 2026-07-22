import { useState } from "react";

export default function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackLabel = "Visual unavailable",
  loading = "lazy",
  priority = false,
}) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const fetchpriority = priority ? "high" : undefined;

  if (failed) {
    return (
      <div className={`safe-image-fallback ${className}`.trim()} role="img" aria-label={alt || fallbackLabel}>
        <span>{fallbackLabel}</span>
        <small>ORAC visual asset</small>
      </div>
    );
  }

  return (
    <img
      className={`safe-image ${loaded ? "is-loaded" : ""} ${className}`.trim()}
      src={src}
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding="async"
      fetchpriority={fetchpriority}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
