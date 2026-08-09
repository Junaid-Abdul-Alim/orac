import { ArrowLeft, ArrowRight } from "lucide-react";

/** The prev/next arrow pair shared by every product carousel track. */
export default function CarouselControls({ label, canScrollPrev, canScrollNext, onPrev, onNext }) {
  return (
    <div className="product-carousel-controls" aria-label={`${label} carousel controls`}>
      <button
        type="button"
        aria-label={`Previous ${label} products`}
        disabled={!canScrollPrev}
        onClick={onPrev}
      >
        <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <button type="button" aria-label={`Next ${label} products`} disabled={!canScrollNext} onClick={onNext}>
        <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
