import React from "react";
import useCarouselScroll from "../../hooks/useCarouselScroll";
import ProductPanel from "./ProductPanel";

function ProductCarouselControls({ canScrollPrev, canScrollNext, onPrev, onNext }) {
  return (
    <div className="product-carousel-controls">
      <button
        type="button"
        className="product-carousel-arrow"
        aria-label="Previous products"
        disabled={!canScrollPrev}
        onClick={onPrev}
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <button
        type="button"
        className="product-carousel-arrow"
        aria-label="Next products"
        disabled={!canScrollNext}
        onClick={onNext}
      >
        <span aria-hidden="true">&gt;</span>
      </button>
    </div>
  );
}

export default function ProductCarousel({ products, getImage, label }) {
  const { trackRef, canScrollPrev, canScrollNext, scrollByCard, onWheel, onKeyDown } = useCarouselScroll({
    itemSelector: ".product-carousel-item",
  });

  return (
    <div className="product-carousel" aria-label={label}>
      <ProductCarouselControls
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        onPrev={() => scrollByCard(-1)}
        onNext={() => scrollByCard(1)}
      />

      <div className="product-carousel-track" ref={trackRef} tabIndex={0} onWheel={onWheel} onKeyDown={onKeyDown}>
        {products.map((product, index) => (
          <ProductPanel
            key={product.name}
            product={product}
            image={getImage(product.name)}
            index={Math.min(index, 6)}
            className="product-carousel-item"
          />
        ))}
      </div>
    </div>
  );
}
