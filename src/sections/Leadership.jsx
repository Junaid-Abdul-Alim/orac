import Reveal from "../components/common/Reveal";
import ContinuumMark from "../components/motion/ContinuumMark";
import { leadership } from "../data/companyData";

// Stage 6 of the homepage journey ("Leadership" - see
// docs/ORAC-REDESIGN-SPEC.md §2). Split out of HoldingIntro and moved here,
// after credibility (WhyOrac) rather than immediately after the hero, per
// the confirmed decision that leadership content belongs later in the
// journey. Same real leadership data, same leader-tile presentation -
// only the position changed.
export default function Leadership() {
  return (
    <section className="section leadership-section" data-continuum-phase="leadership">
      <div className="container leadership-panel">
        {/* Calm and institutional: the thread becomes a plain guide with one
            node per leader, and stops moving. */}
        <ContinuumMark kind="timeline" className="leadership-timeline" nodes={leadership.length} />
        <Reveal className="leadership-intro">
          <span className="eyebrow">The People Behind ORAC</span>
          <h3>Leadership across the ORAC group.</h3>
        </Reveal>
        <div className="leadership-grid">
          {leadership.map((leader, index) => (
            <Reveal as="article" className="leader-tile" key={leader.name} kind="card" delay={index * 110}>
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
