import LabOpening from "../motion-lab/scenes/LabOpening";
import LabHoldingIntro from "../motion-lab/scenes/LabHoldingIntro";
import LabInternational from "../motion-lab/scenes/LabInternational";
import LabGlobalReach from "../motion-lab/scenes/LabGlobalReach";
import LabEventus from "../motion-lab/scenes/LabEventus";
import LabLuxe from "../motion-lab/scenes/LabLuxe";
import LabWhyOrac from "../motion-lab/scenes/LabWhyOrac";
import LabLeadership from "../motion-lab/scenes/LabLeadership";
import LabContact from "../motion-lab/scenes/LabContact";
import "../motion-lab/motion-lab.css";

/**
 * /motion-lab — a DEVELOPMENT-ONLY cinematic prototype of the ORAC homepage
 * story (docs/ORAC-CINEMATIC-STORYBOARD.md). It reuses real ORAC content,
 * assets, design tokens, and existing Reveal components, and adds GSAP +
 * ScrollTrigger motion (a project dependency, previously unused). It does NOT
 * replace the production homepage: this page is registered only when
 * import.meta.env.DEV is true and is lazily code-split (see App.jsx), so it
 * never ships in a production build and is excluded from all normal
 * navigation. The production Home route (/) is untouched for comparison.
 *
 * Scene order mirrors the storyboard's approved narrative:
 *   1–2 Opening (converge → ORAC → three worlds reopen)
 *   3   HoldingIntro (spine)      4 International (route)   5 Global Reach (corridors)
 *   6   Eventus (focus-pull)      7 Luxe (seam)             8 Why ORAC (divider)
 *   9   Leadership (held rule)   10 Contact (guide)
 */
export default function MotionLab() {
  return (
    <div className="motion-lab">
      <p className="motion-lab-badge" role="note">
        <span aria-hidden="true">●</span> DEV · /motion-lab prototype — not the production homepage
      </p>
      <LabOpening />
      <LabHoldingIntro />
      <LabInternational />
      <LabGlobalReach />
      <LabEventus />
      <LabLuxe />
      <LabWhyOrac />
      <LabLeadership />
      <LabContact />
    </div>
  );
}
