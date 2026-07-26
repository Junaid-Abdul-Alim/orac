import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into a comfortable viewing position.
 *
 * The margin is deliberately *negative* at the bottom. It used to be
 * "0px 0px 16% 0px", which grows the root box downward - so an element began
 * (and, at 820ms, finished) animating while it was still 16% of a viewport
 * below the fold. Measured at a normal scrolling pace, not one reveal on the
 * homepage was ever caught mid-animation on screen: the motion was running,
 * just never where anyone could see it. A negative bottom margin moves the
 * trigger line up into the viewport, so the element is already visible when
 * it starts to move.
 *
 * The timeout is a safety net for the case where IntersectionObserver never
 * fires at all. It was 900ms, short enough to pre-empt scrolling and reveal
 * the whole page invisibly; it is now long enough that only a genuinely stuck
 * observer reaches it.
 */
export default function useReveal({ delay = 0, rootMargin = "0px 0px -12% 0px", threshold = 0.06 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const fallback = window.setTimeout(() => {
      setVisible(true);
    }, 6000);

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      window.clearTimeout(fallback);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          window.clearTimeout(fallback);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay, rootMargin, threshold]);

  return { ref, visible };
}
