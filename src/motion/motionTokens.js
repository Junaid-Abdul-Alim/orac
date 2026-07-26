/**
 * The ORAC motion language, in one place.
 *
 * These numbers exist because the previous system was measured and found to be
 * technically running but perceptually invisible. At 1440x900, scrolling at a
 * normal trackpad pace, only 20 of 33 reveal elements were ever caught
 * mid-animation on screen, and the ones that were showed 84-334ms of visible
 * movement against a nominal 820ms duration.
 *
 * Two causes, both encoded away here:
 *
 * 1. The easing. cubic-bezier(0.16, 1, 0.3, 1) is an expo-out: it covers ~82%
 *    of its travel in the first quarter of the timeline, so a "820ms" reveal
 *    was really a ~200ms reveal followed by 600ms of sub-pixel drift. Every
 *    entry here uses a quadratic-out (`power1.out`), which reaches 44% at a
 *    quarter and 75% at the halfway point - the movement is spread across the
 *    duration the way the number implies.
 *
 * 2. The distance. 20px on the chapters, 12px in Why ORAC / Leadership, 6px at
 *    Contact, and 0px on all three major images. Below roughly 24px there is
 *    nothing for the eye to catch at scrolling speed.
 *
 * The third fix is structural rather than numeric: opacity finishes well
 * before the transform does (see FADE vs DUR below), so an element becomes
 * fully readable while it is still visibly travelling. That is what makes the
 * motion register as movement rather than as a fade.
 */

export const EASE = {
  // Entries. Decelerating, but with a real middle - see note 1 above.
  enter: "power1.out",
  // Media settling into its frame. Measured at power2.out (a cubic) the clip
  // and the scale were both 89% resolved 620ms into a 1.2s reveal, which reads
  // as a snap followed by drift. power1.out spends the duration it is given:
  // 44% at a quarter, 75% at the halfway point.
  media: "power1.out",
  // Line/route/seam drawing. Even pace reads as "being drawn" rather than
  // "snapping into place".
  draw: "power1.inOut",
  // Continuum scrub. Linear, because it is tied to scroll position, not time.
  scrub: "none",
};

// Durations. One tier for content, one for media, one for drawn lines - the
// duration ladder the references use, rather than a value invented per section.
export const DUR = {
  text: 0.95,
  media: 1.2,
  draw: 1.15,
  card: 0.9,
};

// Opacity ramps deliberately shorter than the matching transform, so the
// element is legible while it is still moving.
export const FADE = {
  text: 0.55,
  media: 0.7,
  card: 0.5,
};

// Travel distances, desktop.
export const DIST = {
  text: 38,
  card: 26,
  media: 34,
  // Editorial media settle. 1.07 sits inside the 1.06-1.09 band.
  mediaScale: 1.07,
};

// Mobile keeps the same vocabulary at a shorter reach and a shorter timeline -
// visible, but not so far that it fights a small viewport.
export const MOBILE = {
  text: 24,
  card: 18,
  media: 20,
  mediaScale: 1.05,
  durScale: 0.8,
};

export const STAGGER = {
  // 90-140ms for related text groups, 90-130ms for cards.
  text: 0.115,
  card: 0.105,
  // Corridors are many and thin, so they run tighter or the draw outlasts the
  // section.
  corridor: 0.035,
};

// Every scroll trigger starts once the element is comfortably approaching the
// fold rather than still below it. The old IntersectionObserver fired at a
// -12% root margin with a 0.06 threshold, which for tall elements resolved to
// "started and finished while off screen".
export const START = {
  text: "top 86%",
  media: "top 88%",
  section: "top 80%",
  line: "top 78%",
};

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const DESKTOP_QUERY = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_QUERY = "(max-width: 860px) and (prefers-reduced-motion: no-preference)";
