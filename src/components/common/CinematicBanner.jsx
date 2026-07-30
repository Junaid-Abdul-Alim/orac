import ImagePanel from "./ImagePanel";

export default function CinematicBanner({ image, title, description, variant = "panel" }) {
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
          variant={variant}
        />
      </div>
    </section>
  );
}
