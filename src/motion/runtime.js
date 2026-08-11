import { gsap, ScrollTrigger, requestRefresh } from "./gsap";
import { REDUCED_MOTION_QUERY } from "./motionTokens";

export const MOTION_READY_CLASS = "orac-motion-ready";

/**
 * Progressive enhancement gate.
 *
 * Nothing on the site is hidden by CSS on its own. Every initial hidden or
 * translated state in 14-motion.css is nested under `html.orac-motion-ready`,
 * and this function is the only thing that adds that class. So:
 *
 * - No JavaScript at all       -> the class is never added -> everything renders
 *                                 in its final composition.
 * - GSAP fails to load or throws -> we return false before adding the class ->
 *                                 same fully visible result.
 * - prefers-reduced-motion       -> the class is never added, so a reduced-motion
 *                                 visitor is never given a hidden initial state
 *                                 to recover from.
 *
 * It runs from main.jsx at module scope, which is before React's first paint,
 * so there is no flash of visible-then-hidden content.
 */
export function initMotionRuntime() {
  if (typeof document === "undefined" || typeof window === "undefined") return false;

  try {
    // Prove the library is actually usable rather than merely imported.
    if (!gsap || typeof gsap.set !== "function" || typeof gsap.matchMedia !== "function") return false;
    if (!ScrollTrigger || typeof ScrollTrigger.create !== "function") return false;

    // ScrollTrigger markers have to be switched on before a single trigger is
    // built - `defaults()` applies to triggers created after it, and every
    // trigger on the page is created by a layout effect that runs long before
    // the debug panel mounts. `import.meta.env.DEV` is statically false in a
    // production build, so Rollup removes this block entirely.
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get("motionDebug") === "1") {
      ScrollTrigger.defaults({
        markers: { startColor: "#b8975a", endColor: "#2c4a63", fontSize: "10px", indent: 8 },
      });
    }

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const root = document.documentElement;

    const apply = () => {
      root.classList.toggle(MOTION_READY_CLASS, !reduced.matches);
      // Anything already part-way through a timeline has to be released, not
      // left at whatever opacity it happened to be on when the setting flipped.
      if (reduced.matches) {
        gsap.set("[data-motion]", { clearProps: "all" });
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
      requestRefresh();
    };

    apply();
    reduced.addEventListener?.("change", apply);

    watchLayoutSettle();
    return !reduced.matches;
  } catch {
    // Any failure at all leaves the class off, which leaves the site visible.
    return false;
  }
}

// Crucially, a refresh should never land while the visitor is scrolling.
// ScrollTrigger.refresh() re-evaluates every gsap.matchMedia() context, and
// rebuilding a context re-applies its fromTo start values. On a long page with
// lazily loaded imagery that used to happen every ~180ms throughout a scroll,
// which put already-revealed elements back to opacity 0 with their one-shot
// triggers already spent - 20 of 25 revealed elements on /luxury-export ended
// up permanently invisible. Waiting for a quiet moment costs nothing: layout
// only matters again once the visitor stops to read.
let pendingQuietRefresh = 0;
let lastScroll = 0;
const QUIET_MS = 300;

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      lastScroll = performance.now();
    },
    { passive: true }
  );
}

/**
 * Shared by every call site that wants a refresh once the page stops moving,
 * not the instant it's asked for - the runtime's own font/image settle below,
 * and (via requestRefreshWhenQuiet's export) the reveal sweep and the corridor
 * draw, which used to call requestRefresh() directly and bypass this
 * discipline entirely.
 */
export function requestRefreshWhenQuiet() {
  window.clearTimeout(pendingQuietRefresh);
  pendingQuietRefresh = window.setTimeout(() => {
    if (performance.now() - lastScroll < QUIET_MS) {
      requestRefreshWhenQuiet();
      return;
    }
    requestRefresh();
  }, QUIET_MS);
}

/**
 * Trigger positions are measured against the document as it stands when a
 * trigger is created. Two things move the document afterwards and would
 * otherwise leave every start/end position stale by hundreds of pixels:
 * webfonts swapping in (Cormorant Garamond and Jost are both remote), and
 * lazily loaded imagery resolving its intrinsic height.
 */
function watchLayoutSettle() {
  if (document.fonts?.ready) {
    document.fonts.ready.then(requestRefresh).catch(() => {});
  }

  window.addEventListener("load", requestRefresh, { once: true });

  // Images inside a reveal change the height of the thing being revealed, so
  // positions have to be re-measured as each one lands.
  document.addEventListener(
    "load",
    (event) => {
      if (event.target instanceof HTMLImageElement) requestRefreshWhenQuiet();
    },
    true
  );
}
