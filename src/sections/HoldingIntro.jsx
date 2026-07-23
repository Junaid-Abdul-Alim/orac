import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";

// The institutional "About ORAC Holding" framing only - leadership was
// split out into Leadership.jsx and moved later in the homepage journey
// (see docs/ORAC-REDESIGN-SPEC.md §2 stage 6 / §12): leadership content
// belongs after value has been established, not immediately after the
// hero. This section keeps the #about anchor since it's the section that
// answers "what is ORAC Holding," which is reasonable early framing.
export default function HoldingIntro() {
  return (
    <section className="section holding-intro" id="about">
      <div className="container split-layout">
        <SectionHeader eyebrow="About ORAC Holding" title="We build institutions designed to endure." />
        <Reveal className="rich-copy">
          <p>
            ORAC Holding is the parent house for a focused group of ventures across trade, events, and
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
        </Reveal>
      </div>
    </section>
  );
}
