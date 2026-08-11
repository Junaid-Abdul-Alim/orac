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
 * The bug lives inside GSAP itself (confirmed by reading
 * gsap/src/ScrollTrigger.js, v3.15.0, which is also the latest published
 * release - there is no upstream fix to upgrade into). A single trigger's own
 * `refresh()` walks GSAP's shared `_triggers` array live, by index, with no
 * snapshot:
 *
 *   curTrigger = _triggers[i];                                    // live read
 *   curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);  // throws
 *
 * The precondition that reaches this - read directly from the ScrollTrigger
 * constructor - is not specific to route changes, and is not something an
 * app-level `requestAnimationFrame` defer can close, because GSAP schedules it
 * itself, independently of anything this app calls:
 *
 *   if (animation && animation.add && !change) {           // true for EVERY
 *     self.update = () => {                                // gsap.timeline({
 *       self.update = updateFunc;                           //   scrollTrigger
 *       start || end || self.refresh();                    // }) in this app
 *     };
 *     gsap.delayedCall(0.01, self.update);
 *     change = 0.01;
 *     start = end = 0;                                       // <- falsy `end`
 *   } else {
 *     self.refresh();
 *   }
 *
 * Every trigger this app creates goes through the `gsap.timeline({scrollTrigger})`
 * form, so every one of them is pushed into `_triggers` with `end` explicitly
 * set to `0` and self-measures later, on whichever comes first: a 10ms
 * `gsap.delayedCall`, or - the comment above `self.update` says this in GSAP's
 * own words - "some browsers may fire a scroll event BEFORE a tick elapses".
 * That `self.update`-driven path calls `self.refresh()` on that ONE trigger
 * directly, bypassing GSAP's own safe, snapshot-based `_refreshAll`
 * (`_triggers.slice(0).forEach(t => t.refresh())`) entirely. If a scroll event
 * lands while a route's ~20-30 freshly created triggers are mid-batch (some
 * already self-measured, some not), the one that fires can find an
 * as-yet-unmeasured EARLIER sibling in its own inner loop, force a nested
 * refresh on it, and - if the page is already scrolled far enough that the
 * sibling's `once: true` timeline is immediately satisfied - that nested
 * refresh completes and self-kills it, splicing `_triggers` out from under
 * the outer loop's index.
 *
 * A deferred, `requestAnimationFrame`-based refresh (the earlier version of
 * this function) cannot win that race: a scroll event during continuous
 * scrolling arrives well inside a single frame, and GSAP's own lazy path
 * doesn't wait for anything this app schedules. The only thing that reliably
 * wins is finishing every new trigger's *safe* measurement - via the
 * snapshot-based `ScrollTrigger.refresh()` - before the browser gets to
 * process another event at all: synchronously, in the same tick that created
 * them. `refreshNow()` is that call. Every hook that builds ScrollTrigger
 * timelines calls it once, synchronously, at the end of its own
 * `useLayoutEffect` - still before React yields control back to the browser -
 * so every trigger it just created is measured by GSAP's safe, ordered
 * `_refreshAll` path first, and there is nothing left for the lazy internal
 * path to race against.
 */
export function refreshNow() {
  if (ScrollTrigger.isRefreshing) return;
  ScrollTrigger.refresh();
}

/**
 * For re-measuring triggers that already exist and were already safely
 * initialized once - a font swap or a lazily loaded image changing a
 * section's height - rather than the "just created, not yet measured at all"
 * case `refreshNow()` exists for. Coalesces repeated callers into one pending
 * refresh and defers it two animation frames, which is enough for React to
 * have committed. It doesn't need `refreshNow()`'s same-tick guarantee,
 * because every trigger involved already has a real `end` value from its
 * first measurement; this is just keeping that value current.
 */
let pendingRefresh = false;

export function requestRefresh() {
  if (pendingRefresh) return;
  pendingRefresh = true;

  const run = () => {
    pendingRefresh = false;
    if (ScrollTrigger.isRefreshing) {
      requestRefresh();
      return;
    }
    ScrollTrigger.refresh();
  };

  requestAnimationFrame(() => requestAnimationFrame(run));
}

export { gsap, ScrollTrigger };
