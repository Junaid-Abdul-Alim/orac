import SectionHeader from "../components/common/SectionHeader";
import ContinuumMark from "../components/motion/ContinuumMark";
import ChapterMark from "../components/motion/ChapterMark";
import { chapters } from "../data/storyData";

// The institutional "About ORAC Holdings" framing only - leadership was
// split out into Leadership.jsx and moved later in the homepage journey
// (see docs/ORAC-REDESIGN-SPEC.md §2 stage 6 / §12): leadership content
// belongs after value has been established, not immediately after the
// hero. This section keeps the #about anchor since it's the section that
// answers "what is ORAC Holdings," which is reasonable early framing.
//
// Plain markup, no Reveal/ImageReveal: the homepage's own scroll-scrubbed
// timeline (useHomeMotion.js "holding" scene) animates `.section-header` and
// `.rich-copy` directly by selector, tied to scroll position rather than
// firing once. If that effect never runs, this content is simply visible -
// nothing here hides it.
export default function HoldingIntro() {
  return (
    <section className="section holding-intro" id="about" data-continuum-phase="holding">
      {/* The continuum's second state: the holding company's structural spine.
          It draws downward from the section's top edge, which is where the rail
          hands the thread over. */}
      <ContinuumMark kind="spine" className="holding-spine" />
      <div className="container story-chapter-head">
        <ChapterMark {...chapters.house} />
      </div>
      <div className="container split-layout">
        <SectionHeader bare eyebrow="About ORAC Holdings" title="We build institutions designed to endure." />
        <div className="rich-copy">
          <p>
            ORAC Holdings is the parent house for a focused group of ventures across trade, events, and
            fashion.
          </p>
          <p>
            Every ORAC company was born from hands-on expertise, not corporate theory. We are entrepreneurs,
            operators, and specialists who turned years of practical work into operating businesses. From
            connecting global markets through international trade to shaping celebrations and modern fashion,
            each venture has a clear role inside the group.
          </p>
          <p>
            At ORAC, growth is never measured by size alone. It is measured by trust earned, relationships
            built, and standards upheld. We believe reputations are built over decades, not quarters, and that
            discipline outlasts short-term attention.
          </p>
          <strong className="holding-statement">We build institutions designed to endure.</strong>
        </div>
      </div>
    </section>
  );
}
