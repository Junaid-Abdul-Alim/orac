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

export { gsap, ScrollTrigger };
