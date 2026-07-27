import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { DESKTOP_QUERY, EASE, MOBILE_QUERY, STAGGER } from "./motionTokens";
import { hasSettled, markSettled, restoreDrawn } from "./settled";

/**
 * Draws the Global Reach corridors once they exist.
 *
 * This lives here, rather than in the page-level scene director, because of
 * when the corridors appear. `Geographies` fetches countries-110m.json at
 * runtime and only renders its children once that resolves, and it keeps that
 * state internally - so GlobalReach does not re-render when the map arrives.
 * A layout effect built at mount time would find nothing and silently animate
 * an empty set. A MutationObserver on the map container fires exactly when the
 * paths land, whatever the network did.
 *
 * `scrub` selects which of two independent, unrelated behaviours to build:
 *
 * - `scrub: false` (default) - OracInternational's standalone page. Exactly
 *   the original one-shot behaviour: draws once when the map is reached, then
 *   stays drawn. Untouched by the homepage rebuild.
 * - `scrub: true` - the homepage. The draw is tied directly to scroll
 *   position via ScrollTrigger's `scrub`, matching the rest of the homepage's
 *   section timelines: stop scrolling anywhere in range and the corridors sit
 *   at exactly that fraction drawn, in both directions.
 */
export default function useCorridorMotion(containerRef, { scrub = false } = {}) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    if (!scrub && !document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    let ctx;
    let disposed = false;

    const buildScrub = (corridors) => {
      const origin = container.querySelector("[data-corridor-origin]");
      const trigger = container.querySelector(".global-reach-map-wrap") || container;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        const setup = (isDesktop) => {
          corridors.forEach((path) => {
            const length = path.getTotalLength?.() || 0;
            if (length) gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });
          if (origin) gsap.set(origin, { scale: 0, opacity: 0, transformOrigin: "center" });

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "global-corridors",
              trigger,
              start: isDesktop ? "top 92%" : "top 94%",
              end: isDesktop ? "top 52%" : "top 60%",
              scrub: isDesktop ? 0.7 : 0.55,
              invalidateOnRefresh: true,
            },
          });
          tl.to(
            corridors,
            { strokeDashoffset: 0, ease: "none", duration: 1, stagger: STAGGER.corridor },
            0.3
          );
          if (origin) tl.to(origin, { scale: 1, opacity: 1, ease: "none", duration: 0.35 }, 0.35);
        };

        mm.add(DESKTOP_QUERY, () => setup(true));
        mm.add(MOBILE_QUERY, () => setup(false));

        return () => mm.revert();
      }, container);
    };

    const buildOnceShot = (corridors) => {
      // Unchanged from the original implementation - see git history for
      // useHomeMotion.js's prior "Scene 4" comment describing the same bug
      // this guards against: a ScrollTrigger.refresh() mid-scroll (from a
      // lazily loading image elsewhere on the page) can rebuild this
      // gsap.matchMedia context, which re-applies the "from" dash state to a
      // corridor that had already finished drawing and whose one-shot
      // trigger had already been killed - nothing left to play it again.
      if (corridors.some(hasSettled)) {
        restoreDrawn(corridors);
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "global-corridors",
            trigger: container.querySelector(".global-reach-map-wrap") || container,
            start: "top 68%",
            once: true,
          },
          onComplete: () => {
            corridors.forEach(markSettled);
            restoreDrawn(corridors);
          },
        });
        corridors.forEach((path) => {
          const length = path.getTotalLength?.() || 0;
          if (length) gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
        });
        tl.to(corridors, { strokeDashoffset: 0, duration: 1.35, ease: EASE.draw, stagger: STAGGER.corridor });
        const origin = container.querySelector("[data-corridor-origin]");
        if (origin) {
          tl.fromTo(
            origin,
            { scale: 0, opacity: 0, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0
          );
        }
      }, container);
    };

    const build = () => {
      const corridors = Array.from(container.querySelectorAll("[data-corridor]"));
      if (!corridors.length) return false;

      if (scrub) buildScrub(corridors);
      else buildOnceShot(corridors);

      ScrollTrigger.refresh();
      return true;
    };

    if (build()) return () => ctx?.revert();

    const observer = new MutationObserver(() => {
      if (!disposed && build()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      disposed = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, [containerRef, scrub]);
}
