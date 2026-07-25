import Reveal from "../../components/common/Reveal";

const trustPoints = [
  {
    title: "Clear structure",
    text: "Each ORAC venture has its own role, audience, and operating focus under one parent house.",
  },
  {
    title: "Professional execution",
    text: "The group is built around hands-on work, accountable coordination, and careful delivery.",
  },
  {
    title: "Quality discipline",
    text: "From trade products to events and fashion, ORAC keeps standards visible in the details.",
  },
  {
    title: "Long-term intent",
    text: "Ventures are shaped to grow with patience, reputation, and relationships.",
  },
  {
    title: "Partner-led growth",
    text: "ORAC grows through focused ventures and collaborators, with each relationship kept clear to the customer.",
  },
];

/**
 * SCENE 8 — Why ORAC: Credibility Settles (storyboard §5, thread state 7
 * "Divider"). After the three worlds the page settles into trust and motion
 * VISIBLY CALMS. The single gold element is one horizontal Divider between the
 * statement and the reason grid; it draws once L→R on enter (CSS, gated on the
 * Reveal's is-visible class — no GSAP, no scrub here by design), then rests.
 */
export default function LabWhyOrac() {
  return (
    <section className="lab-scene lab-why" aria-labelledby="lab-why-title">
      <div className="container">
        <Reveal className="lab-why-head section-header section-header-center">
          <span className="eyebrow">Why ORAC</span>
          <h2 id="lab-why-title">A business house built with clarity and discipline.</h2>
          <p>
            ORAC brings different ventures together without blurring their purpose: trade stays focused, events
            stay personal, and fashion stays craft-led.
          </p>
        </Reveal>

        <Reveal className="lab-divider-wrap" aria-hidden="true">
          <svg
            className="lab-thread lab-divider"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            focusable="false"
          >
            <line x1="0" y1="1" x2="100" y2="1" pathLength="100" />
          </svg>
        </Reveal>

        <div className="reason-panel-list">
          {trustPoints.map((point, index) => (
            <Reveal as="article" key={point.title} delay={index * 80}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
