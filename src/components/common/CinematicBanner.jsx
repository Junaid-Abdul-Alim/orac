import React from "react";
import ImagePanel from "./ImagePanel";

export default function CinematicBanner({ image, title, description }) {
  return (
    <section className="cinematic-banner-section">
      <div className="container">
        <ImagePanel
          image={image}
          label={image?.label}
          title={title || image?.title}
          description={description || image?.description}
          dark
          className="cinematic-banner"
        />
      </div>
    </section>
  );
}
