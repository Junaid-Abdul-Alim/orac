import ImagePanel from "./ImagePanel";

export default function EditorialGallery({ images, dark = false }) {
  return (
    <div className="editorial-gallery">
      {images.map((image, index) => (
        <ImagePanel
          key={`${image.src}-${image.label}`}
          image={image}
          label={image.label}
          dark={dark}
          className={`gallery-item gallery-item-${index + 1}`}
          delay={index * 90}
        />
      ))}
    </div>
  );
}
