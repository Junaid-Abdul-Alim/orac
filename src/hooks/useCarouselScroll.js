import { useCallback, useEffect, useRef, useState } from "react";

export default function useCarouselScroll({ itemSelector }) {
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const nextPrev = track.scrollLeft > 6;
    const nextNext = track.scrollLeft < maxScroll - 6;

    setCanScrollPrev((current) => (current === nextPrev ? current : nextPrev));
    setCanScrollNext((current) => (current === nextNext ? current : nextNext));
  }, []);

  const scheduleScrollStateUpdate = useCallback(() => {
    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateScrollState();
    });
  }, [updateScrollState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    updateScrollState();
    track.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      track.removeEventListener("scroll", scheduleScrollStateUpdate);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [scheduleScrollStateUpdate, updateScrollState]);

  const getScrollDistance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const card = track.querySelector(itemSelector);
    const gap = parseFloat(window.getComputedStyle(track).columnGap || "0");
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.82;
  }, [itemSelector]);

  const scrollByCard = useCallback(
    (direction) => {
      const track = trackRef.current;
      if (!track) return;

      track.scrollBy({
        left: direction * getScrollDistance(),
        behavior: "smooth",
      });
    },
    [getScrollDistance]
  );

  const onWheel = useCallback((event) => {
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
  }, []);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByCard(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByCard(1);
      }
    },
    [scrollByCard]
  );

  return {
    trackRef,
    canScrollPrev,
    canScrollNext,
    scrollByCard,
    onWheel,
    onKeyDown,
  };
}
