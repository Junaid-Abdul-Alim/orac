// Isolated GSAP entry point for /motion-lab-21st. Deliberately NOT shared with
// src/motion-lab/gsap.js — this prototype (built from 21st.dev component
// #11494, "Cinematic landing Hero") stays structurally independent from the
// earlier custom GSAP motion-lab per instruction: it must not be combined
// with it yet. No ScrollTrigger here: the reference component is a load-time
// hero, not a scroll-linked sequence, so this only needs core GSAP (already a
// project dependency).
import gsap from "gsap";

export { gsap };
