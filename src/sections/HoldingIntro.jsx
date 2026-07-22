import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import { leadership } from "../data/companyData";

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

      <div className="container leadership-panel">
        <Reveal className="leadership-intro">
          <span className="eyebrow">The People Behind ORAC</span>
          <h3>Leadership across the ORAC group.</h3>
        </Reveal>
        <div className="leadership-grid">
          {leadership.map((leader, index) => (
            <Reveal as="article" className="leader-tile" key={leader.name} delay={index * 90}>
              <span>{leader.role}</span>
              <h4>{leader.name}</h4>
              <p className="leader-focus">{leader.focus}</p>
              {leader.body ? <p>{leader.body}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
