import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../motion/gsap";
import { CONTINUUM_PHASES, phaseIndex } from "../../motion/continuumPhases";

/**
 * The continuum rail: one fixed gold thread down the left edge of the
 * homepage, carrying a scroll-linked progress line and a node per section.
 *
 * It is rendered outside `.route-fade` in App.jsx on purpose. `.route-fade`
 * carries a transform, and a transformed ancestor becomes the containing block
 * for every `position: fixed` descendant - which would resolve this rail
 * against the whole 15,000px document instead of the viewport.
 *
 * Node positions are computed from each section's own scroll position rather
 * than spaced evenly, so when the progress head reaches a node, that really is
 * the section on screen.
 */
export default function Continuum() {
  const railRef = useRef(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    if (!document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    const ctx = gsap.context(() => {
      const progress = rail.querySelector("[data-continuum-progress]");
      const head = rail.querySelector("[data-continuum-head]");
      const sections = Array.from(document.querySelectorAll("[data-continuum-phase]"));
      if (!progress || !sections.length) return undefined;

      // The thread itself: scrubbed to page scroll, with a little lag so it
      // trails the scroll rather than snapping to it.
      gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });
      const railTrigger = ScrollTrigger.create({
        id: "continuum",
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.to(progress, { scaleY: self.progress, duration: 0.25, ease: "none", overwrite: true });
          if (head)
            gsap.to(head, { top: `${self.progress * 100}%`, duration: 0.25, ease: "none", overwrite: true });
        },
      });

      // Place a node at the scroll progress where each section centres itself,
      // so the node and the head line up at the moment the section is read.
      const placeNodes = () => {
        const maxScroll = ScrollTrigger.maxScroll(window) || 1;
        sections.forEach((section) => {
          const node = rail.querySelector(`[data-node="${section.dataset.continuumPhase}"]`);
          if (!node) return;
          const box = section.getBoundingClientRect();
          const docTop = box.top + window.scrollY;
          const centred = docTop + box.height / 2 - window.innerHeight / 2;
          const p = gsap.utils.clamp(0, 1, centred / maxScroll);
          node.style.top = `${p * 100}%`;
        });
      };

      placeNodes();
      ScrollTrigger.addEventListener("refresh", placeNodes);

      // Hand-off: each section takes the thread as it reaches the reading band
      // and gives it back on the way out, in both scroll directions.
      const phaseTriggers = sections.map((section) => {
        const phase = section.dataset.continuumPhase;
        const setPhase = () => {
          rail.dataset.phase = phase;
          rail.querySelectorAll("[data-node]").forEach((n) => {
            n.classList.toggle("is-current", n.dataset.node === phase);
            n.classList.toggle("is-passed", phaseIndex(n.dataset.node) < phaseIndex(phase));
          });
        };
        return ScrollTrigger.create({
          id: `continuum-${phase}`,
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: setPhase,
          onEnterBack: setPhase,
        });
      });

      return () => {
        ScrollTrigger.removeEventListener("refresh", placeNodes);
        railTrigger.kill();
        phaseTriggers.forEach((t) => t.kill());
      };
    }, railRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="orac-continuum" ref={railRef} data-phase="opening" aria-hidden="true">
      <span className="orac-continuum-track" />
      <span className="orac-continuum-progress" data-continuum-progress />
      <span className="orac-continuum-head" data-continuum-head />
      <ul className="orac-continuum-nodes">
        {CONTINUUM_PHASES.map((phase) => (
          <li key={phase.id} className="orac-continuum-node" data-node={phase.id}>
            <i />
            <span>{phase.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
