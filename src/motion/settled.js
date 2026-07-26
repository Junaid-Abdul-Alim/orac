import { gsap } from "./gsap";

/**
 * A record of which elements have already played their entry animation, held
 * outside GSAP so nothing GSAP does can erase it.
 *
 * This exists because of a bug that left real content permanently invisible.
 *
 * Trigger positions have to be recalculated when lazily loaded imagery changes
 * the document height, so the runtime calls ScrollTrigger.refresh() as images
 * land. On a long page that happens repeatedly *while the visitor is
 * scrolling*, and each refresh re-evaluates every gsap.matchMedia() context -
 * reverting and rebuilding them. Rebuilding re-runs the fromTo, which
 * immediately re-applies its start values (opacity 0, the clip, the offset).
 * For a reveal that had already played, its ScrollTrigger was killed by
 * `once: true`, so there was nothing left to play it a second time: the
 * element stayed at opacity 0 for good.
 *
 * Measured on /luxury-export at 1440x900, scrolling to the bottom and back:
 * 20 of 25 revealed elements ended invisible. With this guard: 0.
 *
 * Marking completion here, and checking it before building anything, makes a
 * rebuild idempotent no matter what caused it.
 */
const settled = new WeakSet();

export function markSettled(element) {
  if (element) settled.add(element);
}

export function hasSettled(element) {
  return !!element && settled.has(element);
}

/**
 * Put an already-played element straight into its finished state.
 *
 * `clearProps` on its own is not enough: it strips the inline `opacity: 1` the
 * finished tween left behind, and the initial state in 14-motion.css would then
 * hide the element again. So the properties the animation owns are cleared and
 * opacity is re-asserted.
 */
export function restoreSettled(element, innerTargets) {
  if (!element) return;
  gsap.set(element, { clearProps: "transform,clipPath" });
  gsap.set(element, { opacity: 1 });
  if (innerTargets) gsap.set(innerTargets, { clearProps: "transform" });
  element.dataset.motionState = "done";
}

/** Same idea for a drawn line: finished means fully drawn, with no dash left. */
export function restoreDrawn(paths) {
  if (!paths || (paths.length === 0 && !paths.nodeType)) return;
  gsap.set(paths, { strokeDasharray: "none", strokeDashoffset: 0, opacity: 1 });
}
