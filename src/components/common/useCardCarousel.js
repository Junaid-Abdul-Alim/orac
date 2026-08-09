import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared scroll-snap carousel state for a horizontal product track -
 * previously duplicated identically between ProductCategoryShowcase and
 * NeumatrixSection. `cardSelector` finds one card inside the track to measure
 * its width for a per-click scroll distance; falls back to 82% of the
 * track's own width if none is found yet.
 */
export default function useCardCarousel({ cardSelector = ".product-showcase-card", dependency } = {}) {
  const scrollerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    setCanScrollPrev(element.scrollLeft > 8);
    setCanScrollNext(maxScroll > 8 && element.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, dependency]);

  const scrollByCard = (direction) => {
    const element = scrollerRef.current;
    if (!element) return;

    const card = element.querySelector(cardSelector);
    const cardWidth = card?.getBoundingClientRect().width || element.clientWidth * 0.82;
    element.scrollBy({
      left: direction * (cardWidth + 18),
      behavior: "smooth",
    });
  };

  return { scrollerRef, canScrollPrev, canScrollNext, updateScrollState, scrollByCard };
}
