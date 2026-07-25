import { useLayoutEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * Scopes one scene's GSAP work to its section root.
 *
 * - `gsap.context(fn, root)` scopes every selector/tween/ScrollTrigger created
 *   inside `build` to `root` and reverts them all on unmount (no leaked
 *   ScrollTriggers between the lab route and the rest of the app).
 * - `gsap.matchMedia()` is passed straight through so each scene declares its
 *   own desktop / mobile branches (see MM in ./gsap). The reduced-motion user
 *   matches neither branch, so nothing runs and the CSS resolved end-state
 *   stands — this is the reduced-motion fallback, by construction.
 *
 * Runs in useLayoutEffect so any `gsap.set(...)` that hides pre-motion state
 * is committed before the browser paints (no flash of the resolved frame
 * before it animates in).
 *
 * `build(mm, root)` must be a stable closure (scenes define it inline with no
 * external deps); this hook intentionally runs it once on mount.
 */
export default function useGsapScene(build) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      build(mm, root);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rootRef;
}
