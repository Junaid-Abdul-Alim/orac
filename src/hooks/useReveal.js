import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view, with a timeout fallback so
 * content still appears if IntersectionObserver never fires (or is missing).
 * Shared by the Reveal and ImageReveal components.
 */
export default function useReveal({ delay = 0, rootMargin = "0px 0px 16% 0px", threshold = 0.06 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const fallback = window.setTimeout(
      () => {
        setVisible(true);
      },
      Math.max(900, delay + 700)
    );

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
