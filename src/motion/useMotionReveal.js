import { useLayoutEffect, useRef } from "react";
import { gsap, refreshNow } from "./gsap";
import { requestRefreshWhenQuiet } from "./runtime";
import { DESKTOP_QUERY, DIST, DUR, EASE, FADE, MOBILE, MOBILE_QUERY, START } from "./motionTokens";
import { hasSettled, markSettled, restoreSettled } from "./settled";

/**
 * Editorial media reveals, per venture. Each conceals a meaningful part of the
 * frame and opens it in a way that means something for that world, rather than
 * running the same wipe three times:
 *
 *  door   - International. Opens from the centre outward like a container
 *           door. Also the only variant that never crops the top or bottom of
 *           a product photograph while it runs.
 *  frame  - Eventus. Opens out of a letterboxed band, so the photograph
 *           arrives the way a cinema frame does.
 *  seam   - Luxe. Wipes across from the left edge, following the stitch line
 *           that draws down that side of the image.
 *  panel  - the shared default everywhere else.
 *
 * Insets are written without `round`: `.image-panel` already carries
 * `overflow: hidden` + `border-radius`, so the corners stay rounded on their
 * own and the animated value can stay a plain four-number string that GSAP
 * interpolates reliably in both engines.
 */
const MEDIA_VARIANTS = {
  panel: { from: "inset(0% 0% 46% 0%)", scale: 1.07, y: DIST.media },
  door: { from: "inset(0% 46% 0% 46%)", scale: 1.07, y: 0 },
  frame: { from: "inset(34% 0% 34% 0%)", scale: 1.08, y: 0 },
  seam: { from: "inset(0% 100% 0% 0%)", scale: 1.06, y: 0 },
};

const OPEN_CLIP = "inset(0% 0% 0% 0%)";

// Scaling the media box rather than the <img> keeps the reveal off the same
// property the hover state uses, so the two never overwrite each other.
function findMediaBox(element) {
  return element.querySelector(".image-panel-media") || element.querySelector("img, .safe-image-fallback");
}

/**
 * The single entry animation used by every Reveal / ImageReveal on the site.
 *
 * Replaces the previous IntersectionObserver + CSS-transition engine, which
 * was measured as running but not visible (see motionTokens.js for the
 * numbers). Beyond the tuning, three things changed structurally:
 *
 * 1. Stagger is a real stagger. The old system used CSS `transition-delay`,
 *    which does not delay the start of an animation so much as freeze the
 *    element at opacity 0 until the delay elapses. Measured at a normal scroll
 *    pace, every element carrying a delay - the chapter CTAs at 160ms, the map
 *    statistics at 220ms, the country disclosure at 260ms, and all of Why ORAC
 *    and Leadership - entered the viewport blank and was scrolled past before
 *    its delay ran out. Here the delay is a timeline position, and the tween
 *    still plays from its start whenever it is reached.
 *
 * 2. `once: true`, so nothing re-animates on the way back up and nothing can
 *    be left half-played by a reverse scroll.
 *
 * 3. `data-motion-state` is stamped as soon as a trigger exists, which is what
 *    the runtime safety sweep looks for.
 */
export default function useMotionReveal({ kind = "text", delay = 0, variant = "panel" } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    // The runtime only adds this class when GSAP is healthy and the visitor has
    // not asked for reduced motion. Without it the element is already in its
    // final composition and must be left exactly there.
    if (!document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      const build = (isDesktop) => {
        // A rebuild of this matchMedia context - which ScrollTrigger.refresh()
        // can cause at any moment - must never put an element that has already
        // played back behind its own start values. See settled.js.
        if (hasSettled(element)) {
          restoreSettled(element, findMediaBox(element));
          return;
        }

        const d = isDesktop ? DIST : MOBILE;
        const durScale = isDesktop ? 1 : MOBILE.durScale;
        const markDone = () => {
          markSettled(element);
          element.dataset.motionState = "done";
        };

        // Past the hasSettled() guard above, this branch always goes on to
        // build a timeline with a ScrollTrigger, so this is the one point at
        // which "armed" is truthful. See the note at the media.add() calls
        // below for why it is no longer stamped outside these branches.
        element.dataset.motionState = "armed";

        if (kind === "media") {
          const spec = MEDIA_VARIANTS[variant] || MEDIA_VARIANTS.panel;
          const box = findMediaBox(element);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: START.media,
              once: true,
              id: element.dataset.motionId || undefined,
            },
            delay: delay / 1000,
            onComplete: () => {
              // Leaving a clip-path behind is how masks get stuck; the element
              // ends with no clip at all rather than a full-bleed one.
              gsap.set(element, { clearProps: "clipPath" });
              markDone();
            },
          });

          tl.fromTo(
            element,
            { opacity: 0, clipPath: spec.from, y: isDesktop ? spec.y : Math.min(spec.y, MOBILE.media) },
            {
              opacity: 1,
              clipPath: OPEN_CLIP,
              y: 0,
              duration: DUR.media * durScale,
              ease: EASE.media,
            }
          );

          if (box) {
            tl.fromTo(
              box,
              { scale: isDesktop ? spec.scale : MOBILE.mediaScale },
              { scale: 1, duration: DUR.media * durScale, ease: EASE.media, clearProps: "scale" },
              0
            );
          }
          // Opacity finishes well before the clip does, so the image is
          // readable while it is still opening - the difference between "it
          // moved" and "it faded".
          tl.to(element, { opacity: 1, duration: FADE.media * durScale, ease: EASE.enter }, 0);
          return;
        }

        const distance = kind === "card" ? d.card : d.text;
        const duration = (kind === "card" ? DUR.card : DUR.text) * durScale;
        const fade = (kind === "card" ? FADE.card : FADE.text) * durScale;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: START.text,
            once: true,
            id: element.dataset.motionId || undefined,
          },
          delay: delay / 1000,
          onComplete: markDone,
        });

        tl.fromTo(
          element,
          { y: distance, opacity: 0 },
          { y: 0, opacity: 1, duration, ease: EASE.enter, clearProps: "transform" }
        ).to(element, { opacity: 1, duration: fade, ease: EASE.enter }, 0);
      };

      media.add(DESKTOP_QUERY, () => build(true));
      media.add(MOBILE_QUERY, () => build(false));

      // Deliberately NOT stamped here. `armed` used to be written
      // unconditionally at this point, outside both matchMedia branches - which
      // meant an element could carry it while no tween existed at all. Both
      // queries require `prefers-reduced-motion: no-preference`; an engine that
      // reports neither `reduce` nor `no-preference` matches neither query, so
      // `build()` never runs. The runtime had still added `orac-motion-ready`
      // (it only checks that `reduce` does not match), so 14-motion.css was
      // holding the element at opacity 0 with nothing left to release it - and
      // sweepUnarmedReveals(), which looks for reveals with NO state at all,
      // skipped it precisely because of that spurious `armed`. Stamping from
      // inside build() instead means "armed" now guarantees a real trigger
      // exists, and the stranded case falls through to the sweep as intended.
      // Synchronous, same tick: see gsap.js's refreshNow() for why a trigger
      // must be safely measured before the browser can process another event,
      // not merely before the next animation frame.
      refreshNow();
      return () => media.revert();
    }, element);

    return () => {
      ctx.revert();
      delete element.dataset.motionState;
    };
  }, [kind, delay, variant]);

  return ref;
}

/**
 * Belt and braces. If a reveal's effect never runs - a lazy chunk that fails,
 * an error boundary swallowing a subtree - the element would sit at the CSS
 * initial state under `.orac-motion-ready` with nothing to release it. A short
 * while after load, anything still unarmed is cleared back to visible.
 */
export function sweepUnarmedReveals() {
  const stranded = document.querySelectorAll("[data-motion]:not([data-motion-state])");
  if (!stranded.length) return 0;
  stranded.forEach((el) => {
    gsap.set(el, { clearProps: "all" });
    el.dataset.motionState = "recovered";
  });
  requestRefreshWhenQuiet();
  return stranded.length;
}
