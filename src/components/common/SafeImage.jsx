import React from "react";
import { useState } from "react";

export default function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackLabel = "Image to be added",
  loading = "lazy",
  priority = false,
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className={`safe-image-fallback ${className}`.trim()} role="img" aria-label={alt || fallbackLabel}>
        <span>{fallbackLabel}</span>
        <small>Add final image asset</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
