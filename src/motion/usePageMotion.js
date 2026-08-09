import { useLayoutEffect } from "react";
import { gsap, safeRefresh } from "./gsap";
import { DESKTOP_QUERY, DIST, DUR, EASE, MOBILE, MOBILE_QUERY, STAGGER, START } from "./motionTokens";

/**
 * Route motion identities. Each venture page keeps the shared ORAC vocabulary -
 * same easing family, same trigger positions, same one-shot behaviour - and
 * differs only in reach and tempo, the way the three worlds differ in tone
 * rather than in kind.
 *
 *  international - precise and operational. Shortest travel, quickest settle.
 *  eventus       - photographic. Longer settle, a touch more travel.
 *  luxe          - material. Slowest of the three, most stillness after.
 */
const IDENTITIES = {
  international: { dur: 0.9, reach: 0.85, stagger: 0.09 },
  eventus: { dur: 1.12, reach: 1, stagger: 0.12 },
  luxe: { dur: 1.25, reach: 0.95, stagger: 0.14 },
  default: { dur: 1, reach: 1, stagger: STAGGER.card },
};

/**
 * Applies a venture page's motion identity.
 *
 * Deliberately narrower than useHomeMotion: the brief is that a business page
 * belongs to the same system without restaging the homepage continuum, so this
 * adds grid staggering and the identity's tempo, and nothing structural.
 */
export default function usePageMotion(scopeRef, identity = "default") {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;
    if (!document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    const spec = IDENTITIES[identity] || IDENTITIES.default;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const mm = gsap.matchMedia();

      const build = (isDesktop) => {
        const reach = (isDesktop ? DIST.card : MOBILE.card) * spec.reach;
        const duration = DUR.card * spec.dur * (isDesktop ? 1 : MOBILE.durScale);

        // Grids whose items are not individually revealed: stagger the children
        // directly so a row of six arrives as six, not as one block.
        q("[data-motion-grid]").forEach((grid, gridIndex) => {
          const items = Array.from(grid.children);
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: reach, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration,
              ease: EASE.enter,
              stagger: spec.stagger,
              clearProps: "transform",
              scrollTrigger: {
                id: `${identity}-grid-${gridIndex + 1}`,
                trigger: grid,
                start: START.text,
                once: true,
              },
            }
          );
        });
      };

      mm.add(DESKTOP_QUERY, () => build(true));
      mm.add(MOBILE_QUERY, () => build(false));

      return () => mm.revert();
    }, scopeRef);

    const refresh = window.setTimeout(() => safeRefresh(), 120);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [scopeRef, identity]);
}
