import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point for the whole site, so ScrollTrigger is registered
// exactly once no matter which module imports GSAP first. Registering twice is
// harmless but registering zero times silently disables every scroll trigger,
// which is the kind of failure that looks like "the animation just doesn't
// work" rather than an error.
gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger's own defaults are fine for a normal page; these two are not.
// `ignoreMobileResize` stops the iOS/Android URL bar collapsing (which changes
// innerHeight by ~60px) from firing a full refresh mid-scroll and snapping
// half-played timelines to their end state.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Every call site that measures layout after a route change, a font swap, or
 * a lazily-loaded image calls `ScrollTrigger.refresh()` independently (six
 * places across this codebase), with no coordination between them. GSAP's own
 * top-level refresh snapshots its trigger list before iterating it
 * (`_triggers.slice(0)`), but a single trigger's own `refresh()` walks that
 * same shared list live while reverting other pinned triggers ahead of it -
 * if a second, reentrant refresh mutates the list in that exact window, the
 * live loop's index can run past the list's new length and read `undefined`,
 * which is the root of the intermittent "Cannot read properties of undefined
 * (reading 'end')" GSAP crash caught in App.jsx's crash-recovery handler.
 *
 * `ScrollTrigger.isRefreshing` is GSAP's own public flag for "a refresh is
 * already in progress right now" - skipping our own call while one is
 * already running costs nothing (whichever refresh is already mid-flight
 * will apply the same up-to-date measurements), and it closes off the
 * specific overlap window that produces the crash above.
 */
export function safeRefresh() {
  if (ScrollTrigger.isRefreshing) return;
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
