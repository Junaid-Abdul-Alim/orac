// Single place the /motion-lab prototype pulls GSAP from, so ScrollTrigger is
// registered exactly once. GSAP `^3.15.0` is already a project dependency
// (declared, previously unused) — importing it only from this dev-only,
// lazily-loaded prototype keeps it out of the production bundle entirely
// (see App.jsx: the MotionLab route is import.meta.env.DEV-gated + React.lazy).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dev-only diagnostic handles so the running prototype can be inspected from
// the browser console (e.g. `__labST.getAll()`). Never present in production
// (the whole module is dev-only + code-split).
if (import.meta.env.DEV && typeof window !== "undefined") {
  window.__labGsap = gsap;
  window.__labST = ScrollTrigger;
}

export { gsap, ScrollTrigger };

// Shared matchMedia queries. Reduced motion is handled by *absence*: every
// lab scene's base CSS renders its resolved end-state, so the reduced-motion
// user (who matches neither query below) simply keeps that static final frame
// with no ScrollTriggers created — the storyboard's non-negotiable fallback.
export const MM = {
  // Full scroll-linked motion.
  desktop: "(prefers-reduced-motion: no-preference) and (min-width: 821px)",
  // Simplified one-shot motion, shorter distances, no expensive blur.
  mobile: "(prefers-reduced-motion: no-preference) and (max-width: 820px)",
};
