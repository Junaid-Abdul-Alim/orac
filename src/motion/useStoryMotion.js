import { useLayoutEffect } from "react";
import { gsap, refreshNow } from "./gsap";
import { DESKTOP_QUERY, MOBILE_QUERY } from "./motionTokens";

/**
 * The homepage's narrative layer - the parts that tell the visitor what they
 * are looking at, as distinct from the parts (useHomeMotion.js) that stage
 * each section's imagery.
 *
 * Four beats, each one timeline:
 *  1. Opening - once, on load. The headline rises out of a mask line by line,
 *     then the lede and the three one-line descriptions resolve. Not
 *     scroll-tied: the visitor should not have to scroll to learn what ORAC is.
 *  2. Chapter marks - the rule draws across and the chapter name settles as
 *     the section arrives.
 *  3. "Why it exists" lines - resolve just after their chapter's heading.
 *  4. Bridges - the connecting sentence lights word by word, scrubbed to
 *     scroll, while the letterbox rules close in. This is the only place the
 *     page slows the visitor down, and it does so by giving them something to
 *     read rather than by holding them in place (no pinning, no scroll hijack).
 *
 * Like useHomeMotion, everything is hidden only by a gsap.set() made inside
 * this effect before paint. If the effect never runs (no JS, or a reduced-
 * motion visitor - neither media query matches) the page simply shows every
 * line at rest. Uses `refreshNow()` exactly as it exists; see the regression
 * notes in CLAUDE.md before changing how it is called.
 */
export default function useStoryMotion(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const ctx = gsap.context((self) => {
      const all = (sel) => self.selector(sel);
      const mm = gsap.matchMedia();

      const build = (isDesktop) => {
        /* The opening (OriginSequence.jsx) keeps its original, pre-existing
           presentation and motion (Frame's own Reveal stagger) - reverted per
           request, see git history around 517f157. Everything below is
           unaffected: chapter marks, "why it exists" lines, and bridges. */

        /* 2. Chapter marks --------------------------------------------- */
        all("[data-chapter]").forEach((mark) => {
          const rule = mark.querySelector("[data-chapter-rule]");
          const text = mark.querySelectorAll(".chapter-mark-no, .chapter-mark-title, .chapter-mark-note");
          gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(text, { opacity: 0, x: isDesktop ? -18 : -10 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: mark,
                start: "top 92%",
                end: "top 66%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            })
            .to(rule, { scaleX: 1, ease: "none", duration: 1 }, 0)
            .to(text, { opacity: 1, x: 0, ease: "none", duration: 0.6, stagger: 0.18 }, 0.1);
        });

        /* 3. "Why it exists" ------------------------------------------- */
        all(".chapter-why").forEach((el) => {
          gsap.set(el, { opacity: 0, y: isDesktop ? 34 : 22 });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 62%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        });

        /* 4. Bridges --------------------------------------------------- */
        all("[data-story-bridge]").forEach((bridge) => {
          const words = bridge.querySelectorAll("[data-bridge-word]");
          const bars = bridge.querySelectorAll("[data-bridge-bar]");
          const meta = bridge.querySelectorAll(".story-bridge-cut, .story-bridge-kicker");
          gsap.set(words, { opacity: 0.12 });
          gsap.set(bars, { scaleX: 0, transformOrigin: "50% 50%" });
          gsap.set(meta, { opacity: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: bridge,
                start: isDesktop ? "top 78%" : "top 82%",
                end: isDesktop ? "center 48%" : "center 55%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .to(bars, { scaleX: 1, ease: "none", duration: 0.5 }, 0)
            .to(meta, { opacity: 1, ease: "none", duration: 0.3 }, 0.1)
            .to(words, { opacity: 1, ease: "none", duration: 0.35, stagger: 0.16 }, 0.15);
        });
      };

      mm.add(DESKTOP_QUERY, () => build(true));
      mm.add(MOBILE_QUERY, () => build(false));

      return () => mm.revert();
    }, scopeRef);

    refreshNow();

    return () => {
      ctx.revert();
    };
  }, [scopeRef]);
}
