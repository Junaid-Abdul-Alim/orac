import { useLayoutEffect } from "react";
import { gsap, refreshNow } from "./gsap";
import { DESKTOP_QUERY, MEDIA_SETTLE, MOBILE_QUERY, PARALLAX } from "./motionTokens";

/**
 * Homepage scene direction - scroll-scrubbed section timelines.
 *
 * The previous version built roughly 53 ScrollTriggers: one per revealed
 * child element (via the generic Reveal/ImageReveal system) plus a further
 * one-shot trigger per scene beat. Each fired once, at a fixed point, and
 * then stayed at its end state - which cannot be paused, reversed, or
 * inspected at an intermediate point by simply stopping the scroll, and a
 * user who scrolls quickly or returns to an already-visited section finds
 * everything pre-resolved. That was reported, correctly, as content that
 * "still appears completely static" even once the underlying plumbing (GSAP,
 * ScrollTrigger) was proven to be running.
 *
 * This version uses one `scrub`-tied timeline per major scene (nine total).
 * `scrub` ties the timeline's playhead directly to scroll position: stop scrolling
 * anywhere inside the trigger's start/end range and the scene sits at exactly
 * that fraction of its animation; scroll back up and it runs in reverse.
 * `ease: "none"` throughout, so the scrollbar - not a duration - controls
 * progress.
 *
 * Every element this drives is now plain markup with no CSS-driven hidden
 * state (see HoldingIntro / VentureChapter / WhyOrac / Leadership /
 * ContactCTA / GlobalReach's `bare` paths): the only thing that ever hides
 * them is the `gsap.set()` call directly below, executed synchronously in
 * this `useLayoutEffect` before paint. If this effect never runs at all - no
 * JavaScript, a broken GSAP, or `prefers-reduced-motion: reduce` (both
 * DESKTOP_QUERY and MOBILE_QUERY require `no-preference`, so a reduced-motion
 * visitor matches neither and this function never calls gsap.set on anything)
 * - the content is simply visible, because nothing ever hid it.
 */

// Arms an SVG path for stroke-draw and returns it, or null if it has no
// measurable length. `getTotalLength()` is in user units, so every path armed
// this way must be drawn without `vector-effect: non-scaling-stroke` (see the
// note in ContinuumMark.jsx).
function arm(path) {
  if (!path) return null;
  const length = path.getTotalLength?.() || 0;
  if (!length) return null;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
  return path;
}

/**
 * One scroll-scrubbed timeline, built from a flat list of steps. Each step
 * supplies its own `gsap.set()` initial state (applied immediately, before
 * paint) and the tween that resolves it; `at` positions it on the shared
 * timeline so a scene's internal pieces can stagger without each needing a
 * separate ScrollTrigger.
 */
function scene({ id, trigger, start, end, scrub, steps }) {
  if (!trigger) return null;

  const live = steps.filter((step) => step.el && (Array.isArray(step.el) ? step.el.length : true));
  if (!live.length) return null;

  live.forEach(({ el, from }) => {
    if (from) gsap.set(el, from);
  });

  const tl = gsap.timeline({
    scrollTrigger: { id, trigger, start, end, scrub, invalidateOnRefresh: true },
  });

  live.forEach(({ el, to, at = 0, duration = 1 }) => {
    if (to) tl.to(el, { ...to, ease: "none", duration }, at);
  });

  return tl;
}

/**
 * A continuous drift, independent of `scene()`'s entrance timeline above and
 * scoped to the whole time the trigger is anywhere on screen rather than just
 * its entrance window. Targets `yPercent` only, so it composes with a scene's
 * `scale`/`clipPath` tween on the same element instead of competing with it -
 * GSAP tracks each transform component separately and writes the combined
 * matrix itself.
 */
function parallax({ target, trigger, amount }) {
  if (!target || !trigger || !amount) return null;
  return gsap.fromTo(
    target,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
}

export default function useHomeMotion(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const ctx = gsap.context((self) => {
      const one = (sel) => self.selector(sel)[0];
      const all = (sel) => self.selector(sel);
      const mm = gsap.matchMedia();

      const build = (isDesktop) => {
        const START = isDesktop ? "top 92%" : "top 94%";
        const END = isDesktop ? "top 52%" : "top 60%";
        const SCRUB = isDesktop ? 0.7 : 0.55;

        /* -----------------------------------------------------------------
           Scene 1 - Opening. Not one of the nine scroll-scrubbed scenes: the
           composition is already resolved on load (see the original creative
           brief - "the opening must settle before normal scrolling begins"),
           so the fork draws once immediately rather than waiting on scroll.
           The three apertures separate by a hair as the visitor starts to
           leave the hero, which is the one part of "Opening" that is
           genuinely scroll-tied.
           ----------------------------------------------------------------- */
        const fork = one(".origin-fork path");
        if (fork && arm(fork)) {
          gsap.to(fork, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut", delay: 0.2 });
        }

        // Shifts the photographs, not the links: moving the whole link slid the
        // card's contents sideways inside its frame and exposed a strip of the
        // card background at one edge. Each photograph is overscanned (see
        // 03-hero.css / 16-story.css) so its own drift never shows an edge.
        const ventureLinks = all(".origin-venture .venture-compact-bg");
        if (ventureLinks.length === 3) {
          gsap.fromTo(
            ventureLinks,
            { x: (i) => (i - 1) * (isDesktop ? -14 : -8) },
            {
              x: (i) => (i - 1) * (isDesktop ? 16 : 9),
              ease: "none",
              scrollTrigger: {
                id: "opening-separate",
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        /* -----------------------------------------------------------------
           Scene 2 - Holding introduction. Spine draws, heading leads,
           supporting copy follows - two groups, not moving simultaneously.
           ----------------------------------------------------------------- */
        scene({
          id: "holding",
          trigger: one(".holding-intro"),
          start: START,
          end: END,
          scrub: SCRUB,
          steps: [
            {
              el: one(".holding-spine [data-draw]"),
              from: { scaleY: 0, transformOrigin: "top center" },
              to: { scaleY: 1 },
              at: 0,
              duration: 0.6,
            },
            {
              el: one(".holding-intro .section-header"),
              from: { opacity: 0, y: isDesktop ? 80 : 44 },
              to: { opacity: 1, y: 0 },
              at: 0.15,
              duration: 0.6,
            },
            {
              el: one(".holding-intro .rich-copy"),
              from: { opacity: 0, y: isDesktop ? 55 : 36 },
              to: { opacity: 1, y: 0 },
              at: 0.4,
              duration: 0.6,
            },
          ],
        });

        /* -----------------------------------------------------------------
           Scene 3 - International. Required order: image opens, heading
           enters, supporting information appears - all inside one timeline
           for the section.
           ----------------------------------------------------------------- */
        scene({
          id: "international",
          trigger: one(".venture-chapter-international"),
          start: START,
          end: isDesktop ? "top 30%" : "top 45%",
          scrub: SCRUB,
          steps: [
            {
              el: one(".venture-chapter-international .image-panel"),
              from: { clipPath: "inset(0% 50% 0% 50%)" },
              to: { clipPath: "inset(0% 0% 0% 0%)" },
              at: 0,
              duration: 1,
            },
            {
              el: one(".venture-chapter-international .image-panel-media"),
              from: { scale: isDesktop ? 1.1 : 1.06 },
              to: { scale: MEDIA_SETTLE },
              at: 0,
              duration: 1,
            },
            {
              el: one(".venture-chapter-international .section-header"),
              from: { opacity: 0, y: isDesktop ? 75 : 40 },
              to: { opacity: 1, y: 0 },
              at: 0.3,
              duration: 0.6,
            },
            {
              el: one(".venture-chapter-international .editorial-list"),
              from: { opacity: 0, y: isDesktop ? 50 : 30 },
              to: { opacity: 1, y: 0 },
              at: 0.78,
              duration: 0.5,
            },
            {
              el: one(".venture-chapter-international .venture-chapter-actions"),
              from: { opacity: 0, y: isDesktop ? 30 : 20 },
              to: { opacity: 1, y: 0 },
              at: 0.92,
              duration: 0.5,
            },
          ],
        });
        parallax({
          target: one(".venture-chapter-international .image-panel-media"),
          trigger: one(".venture-chapter-international"),
          amount: isDesktop ? PARALLAX.image : PARALLAX.imageMobile,
        });

        /* -----------------------------------------------------------------
           Scene 4 - Global Reach. Map settles first, statistics follow. The
           corridors are a second trigger (useCorridorMotion, called from
           GlobalReach) because they do not exist in the DOM until the
           topojson fetch resolves.
           ----------------------------------------------------------------- */
        scene({
          id: "global-reach",
          trigger: one(".global-reach-map-wrap"),
          start: START,
          end: END,
          scrub: SCRUB,
          steps: [
            {
              el: one(".global-reach-map-wrap"),
              from: { opacity: 0.2, scale: isDesktop ? 0.94 : 0.96, y: isDesktop ? 50 : 30 },
              to: { opacity: 1, scale: 1, y: 0 },
              at: 0,
              duration: 1,
            },
            {
              el: one(".global-reach-stats"),
              from: { opacity: 0, y: isDesktop ? 35 : 22 },
              to: { opacity: 1, y: 0 },
              at: 0.6,
              duration: 0.5,
            },
          ],
        });

        /* -----------------------------------------------------------------
           Scene 5 - Eventus. An obvious letterbox opening, not a fade: the
           frame is visibly cropped to a central band and expands outward
           while its corner brackets draw.
           ----------------------------------------------------------------- */
        const eveBrackets = all(".venture-chapter-eventus .continuum-frame-bracket");
        eveBrackets.forEach(arm);
        scene({
          id: "eventus",
          trigger: one(".venture-chapter-eventus"),
          start: START,
          end: isDesktop ? "top 35%" : "top 50%",
          scrub: SCRUB,
          steps: [
            {
              el: one(".venture-chapter-eventus .image-panel"),
              from: { clipPath: "inset(38% 0% 38% 0%)", y: isDesktop ? 40 : 26 },
              to: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
              at: 0,
              duration: 1,
            },
            {
              el: one(".venture-chapter-eventus .image-panel-media"),
              from: { scale: isDesktop ? 1.12 : 1.06 },
              to: { scale: MEDIA_SETTLE },
              at: 0,
              duration: 1,
            },
            {
              el: eveBrackets,
              to: { strokeDashoffset: 0 },
              at: 0.2,
              duration: 0.8,
            },
            {
              el: one(".venture-chapter-eventus .editorial-copy"),
              from: { opacity: 0, y: isDesktop ? 65 : 40 },
              to: { opacity: 1, y: 0 },
              at: 0.45,
              duration: 0.55,
            },
          ],
        });
        parallax({
          target: one(".venture-chapter-eventus .image-panel-media"),
          trigger: one(".venture-chapter-eventus"),
          amount: isDesktop ? PARALLAX.image : PARALLAX.imageMobile,
        });

        /* -----------------------------------------------------------------
           Scene 6 - Luxe. The seam and the image reveal advance together: the
           clip rectangle's height and the image's own wipe are the same
           motion, read as one construction line rather than two effects.
           ----------------------------------------------------------------- */
        const luxeClip = one(".venture-chapter-luxe [data-seam-clip]");
        const luxeStitch = one(".venture-chapter-luxe .continuum-seam-stitch");
        if (luxeStitch) gsap.set(luxeStitch, { strokeDasharray: "7 7" });
        if (luxeClip) gsap.set(luxeClip, { attr: { height: 0 } });
        scene({
          id: "luxe",
          trigger: one(".venture-chapter-luxe"),
          start: START,
          end: isDesktop ? "top 35%" : "top 50%",
          scrub: SCRUB,
          steps: [
            {
              el: one(".venture-chapter-luxe .image-panel"),
              from: { clipPath: "inset(0% 65% 0% 0%)" },
              to: { clipPath: "inset(0% 0% 0% 0%)" },
              at: 0,
              duration: 1,
            },
            {
              el: one(".venture-chapter-luxe .image-panel-media"),
              from: { scale: isDesktop ? 1.1 : 1.06 },
              to: { scale: MEDIA_SETTLE },
              at: 0,
              duration: 1,
            },
            {
              el: luxeClip,
              to: { attr: { height: 400 } },
              at: 0,
              duration: 1,
            },
            {
              el: one(".venture-chapter-luxe .section-header"),
              from: { opacity: 0, y: isDesktop ? 70 : 40 },
              to: { opacity: 1, y: 0 },
              at: 0.35,
              duration: 0.55,
            },
            {
              el: all(
                ".venture-chapter-luxe .editorial-list, .venture-chapter-luxe .venture-chapter-actions"
              ),
              from: { opacity: 0, y: isDesktop ? 30 : 20 },
              to: { opacity: 1, y: 0 },
              at: 0.65,
              duration: 0.5,
            },
          ],
        });
        parallax({
          target: one(".venture-chapter-luxe .image-panel-media"),
          trigger: one(".venture-chapter-luxe"),
          amount: isDesktop ? PARALLAX.image : PARALLAX.imageMobile,
        });

        /* -----------------------------------------------------------------
           Scene 7 - Why ORAC. Intensity drops: the divider straightens, the
           heading enters, and the five cards resolve as one staggered tween
           rather than five separate triggers.
           ----------------------------------------------------------------- */
        scene({
          id: "why-orac",
          trigger: one(".why-section"),
          start: START,
          end: END,
          scrub: SCRUB,
          steps: [
            {
              el: one(".why-divider [data-draw]"),
              from: { scaleX: 0, transformOrigin: "left center" },
              to: { scaleX: 1 },
              at: 0,
              duration: 0.6,
            },
            {
              el: one(".why-section .section-header"),
              from: { opacity: 0, y: isDesktop ? 55 : 36 },
              to: { opacity: 1, y: 0 },
              at: 0.15,
              duration: 0.5,
            },
            {
              el: all(".why-section .reason-panel-list > article"),
              from: { opacity: 0, y: isDesktop ? 35 : 22 },
              to: { opacity: 1, y: 0, stagger: 0.08 },
              at: 0.4,
              duration: 0.6,
            },
          ],
        });

        /* -----------------------------------------------------------------
           Scene 8 - Leadership. Calm and institutional: one line down the
           group, the intro, and the leader tiles as a single staggered tween.
           ----------------------------------------------------------------- */
        scene({
          id: "leadership",
          trigger: one(".leadership-section"),
          start: START,
          end: END,
          scrub: SCRUB,
          steps: [
            {
              el: one(".leadership-timeline [data-draw]"),
              from: { scaleY: 0, transformOrigin: "top center" },
              to: { scaleY: 1 },
              at: 0,
              duration: 0.6,
            },
            {
              el: one(".leadership-intro"),
              from: { opacity: 0, y: isDesktop ? 45 : 30 },
              to: { opacity: 1, y: 0 },
              at: 0.1,
              duration: 0.5,
            },
            {
              el: all(".leader-tile"),
              from: { opacity: 0, y: isDesktop ? 30 : 20 },
              to: { opacity: 1, y: 0, stagger: 0.08 },
              at: 0.35,
              duration: 0.6,
            },
          ],
        });
      };

      mm.add(DESKTOP_QUERY, () => build(true));
      mm.add(MOBILE_QUERY, () => build(false));

      return () => mm.revert();
    }, scopeRef);

    // Synchronous, same tick: see gsap.js's refreshNow() for why a trigger
    // must be safely measured before the browser can process another event,
    // not merely before the next animation frame. Later layout shifts (fonts
    // swapping in, lazy images resolving height) are handled site-wide by
    // runtime.js's own font/image listeners, not repeated here.
    refreshNow();

    return () => {
      ctx.revert();
    };
  }, [scopeRef]);
}
