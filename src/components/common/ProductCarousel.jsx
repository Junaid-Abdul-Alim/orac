import React, { useEffect, useRef, useState } from "react";
import ProductPanel from "./ProductPanel";

export default function ProductCarousel({ products, getImage, label }) {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 6);
    setCanScrollNext(track.scrollLeft < maxScroll - 6);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products.length]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".product-carousel-item");
    const gap = parseFloat(window.getComputedStyle(track).columnGap || "0");
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.82;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  const onWheel = (event) => {
    const track = trackRef.current;
    if (!track || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 6;
    const atEnd = track.scrollLeft >= maxScroll - 6;
    const wantsPrev = event.deltaY < 0;
    const wantsNext = event.deltaY > 0;

    if ((wantsPrev && atStart) || (wantsNext && atEnd)) return;

    event.preventDefault();
    track.scrollLeft += event.deltaY;
  };

  return (
    <div className="product-carousel" aria-label={label}>
      <div className="product-carousel-controls" aria-hidden="false">
        <button
          type="button"
          className="product-carousel-arrow"
          aria-label="Previous products"
          disabled={!canScrollPrev}
          onClick={() => scrollByCard(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="product-carousel-arrow"
          aria-label="Next products"
          disabled={!canScrollNext}
          onClick={() => scrollByCard(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="product-carousel-track" ref={trackRef} tabIndex={0} onWheel={onWheel}>
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
