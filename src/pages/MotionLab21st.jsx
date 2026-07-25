import CinematicOpeningOrac from "../motion-lab-21st/CinematicOpeningOrac";

/**
 * /motion-lab-21st — a DEVELOPMENT-ONLY, ISOLATED prototype adapting 21st.dev
 * component #11494 ("Cinematic landing Hero") to real ORAC content. See
 * CinematicOpeningOrac.jsx for the full provenance note (what was actually
 * retrieved/inspected vs. adapted).
 *
 * Deliberately independent from /motion-lab (src/motion-lab/): separate
 * component tree, separate GSAP entry point, separate CSS file, no shared
 * imports. Registered only when import.meta.env.DEV is true and lazily
 * code-split (see App.jsx), so it never ships in a production build and adds
 * nothing to the bundle a real visitor downloads. Home.jsx and every
 * production section are untouched.
 */
export default function MotionLab21st() {
  return (
    <div className="motion-lab-21st-page">
      <p className="motion-lab-21st-badge" role="note">
        <span aria-hidden="true">●</span> 21st ORAC opening prototype
      </p>
      <CinematicOpeningOrac />
    </div>
  );
}
