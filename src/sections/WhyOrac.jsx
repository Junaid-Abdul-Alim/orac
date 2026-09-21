import SectionHeader from "../components/common/SectionHeader";
import ContinuumMark from "../components/motion/ContinuumMark";
import ChapterMark from "../components/motion/ChapterMark";
import { chapters } from "../data/storyData";

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

// Plain markup: useHomeMotion.js's "why-orac" scene drives the divider, the
// heading and the five cards (as one staggered tween on `.reason-panel-list >
// article`) from a single scroll-scrubbed timeline, rather than five separate
// one-shot triggers.
export default function WhyOrac() {
  return (
    <section className="section why-section" data-continuum-phase="why">
      <div className="container">
        {/* The Luxe seam straightens here into a single architectural rule.
            Intensity drops for the rest of the page. */}
        <ContinuumMark kind="divider" className="why-divider" />
        <div className="story-chapter-head">
          <ChapterMark {...chapters.standard} />
        </div>
        <SectionHeader
          bare
          eyebrow="Why ORAC"
          title="A business house built with clarity and discipline."
          text="ORAC brings different ventures together without blurring their purpose: trade stays focused, events stay personal, and fashion stays craft-led."
        />
        <div className="reason-panel-list">
          {trustPoints.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
