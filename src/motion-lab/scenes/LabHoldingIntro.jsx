import Reveal from "../../components/common/Reveal";

/**
 * SCENE 3 — HoldingIntro: The House (storyboard §5, thread state 2 "Spine").
 *
 * A calm editorial beat between the opening and the three worlds. Two fixes
 * relative to the production section:
 *  1. The statement "We build institutions designed to endure." renders ONCE
 *     (production prints it twice — as the display heading and again as a
 *     <strong> below the body). Here it is the single <h2>.
 *  2. The gold thread rests here as the vertical "Spine" in the left gutter,
 *     drawn top→bottom on enter, then still.
 *
 * Per the storyboard's tech table this scene is deliberately "No GSAP": the
 * Spine draws with a CSS transition gated on the Reveal's `.is-visible` class,
 * so reduced motion collapses it to the instant final (drawn) state via the
 * global prefers-reduced-motion block.
 */
export default function LabHoldingIntro() {
  return (
    <section className="lab-scene lab-holding" id="lab-about" aria-labelledby="lab-holding-title">
      <div className="container lab-holding-inner">
        <Reveal className="lab-spine-col" aria-hidden="true">
          <svg
            className="lab-thread lab-spine"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            focusable="false"
          >
            <line x1="1" y1="0" x2="1" y2="100" pathLength="100" />
          </svg>
        </Reveal>

        <Reveal className="lab-holding-statement-wrap">
          <span className="eyebrow">About ORAC Holdings</span>
          <h2 id="lab-holding-title" className="lab-holding-statement">
            We build institutions designed to endure.
          </h2>
        </Reveal>

        <Reveal className="rich-copy lab-holding-copy" delay={90}>
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
        </Reveal>
      </div>
    </section>
  );
}
