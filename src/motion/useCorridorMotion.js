import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { EASE, STAGGER } from "./motionTokens";
import { hasSettled, markSettled, restoreDrawn } from "./settled";

/**
 * Draws the Global Reach corridors once they exist.
 *
 * This lives here, rather than in useHomeMotion with the rest of the scene
 * direction, because of when the corridors appear. `Geographies` fetches
 * countries-110m.json at runtime and only renders its children once that
 * resolves, and it keeps that state internally - so GlobalReach does not
 * re-render when the map arrives. A page-level layout effect therefore runs
 * long before a single `[data-corridor]` path is in the DOM, finds nothing,
 * and silently animates an empty set: the corridors were rendered fully drawn
 * from the first frame, with no draw at all.
 *
 * A MutationObserver on the map container is the honest fix - it fires exactly
 * when the paths land, whatever the network did.
 */
export default function useCorridorMotion(containerRef) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    if (!document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    let ctx;

    const build = () => {
      const corridors = Array.from(container.querySelectorAll("[data-corridor]"));
      if (!corridors.length) return false;

      // Already drawn once: restore and stop, so a ScrollTrigger.refresh()
      // that rebuilds this context cannot wind the network back to invisible.
      if (corridors.some(hasSettled)) {
        restoreDrawn(corridors);
        return true;
      }

      ctx = gsap.context(() => {
        corridors.forEach((path) => {
          const length = path.getTotalLength?.() || 0;
          if (length) gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        const origin = container.querySelector("[data-corridor-origin]");

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "global-corridors",
            // The map itself, not the whole section - the heading above it is
            // tall enough that triggering on the section would start the draw
            // while the geography was still below the fold.
            trigger: container.querySelector(".global-reach-map-wrap") || container,
            start: "top 72%",
            once: true,
          },
          // Stop depending on the measurement once drawn, so a later resize
          // cannot leave a stale dash pattern clipping the ends.
          onComplete: () => {
            corridors.forEach(markSettled);
            restoreDrawn(corridors);
          },
        });

        tl.to(corridors, {
          strokeDashoffset: 0,
          duration: 1.35,
          ease: EASE.draw,
          stagger: STAGGER.corridor,
        });

        if (origin) {
          tl.fromTo(
            origin,
            { scale: 0, opacity: 0, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0
          );
        }
      }, container);

      // The map only reached its final height when the geography rendered.
      ScrollTrigger.refresh();
      return true;
    };

    if (build()) return () => ctx?.revert();

    const observer = new MutationObserver(() => {
      if (build()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, [containerRef]);
}
