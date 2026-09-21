import ContinuumMark from "../components/motion/ContinuumMark";
import ChapterMark from "../components/motion/ChapterMark";
import { chapters } from "../data/storyData";
import { leadership } from "../data/companyData";

// Stage 6 of the homepage journey ("Leadership" - see
// docs/ORAC-REDESIGN-SPEC.md §2). Split out of HoldingIntro and moved here,
// after credibility (WhyOrac) rather than immediately after the hero, per
// the confirmed decision that leadership content belongs later in the
// journey. Same real leadership data, same leader-tile presentation -
// only the position changed.
//
// Plain markup: useHomeMotion.js's "leadership" scene drives the intro
// heading and the leader tiles (one staggered tween on `.leader-tile`) from a
// single scroll-scrubbed timeline, per the requirement not to give each card
// its own ScrollTrigger.
export default function Leadership() {
  return (
    <section className="section leadership-section" data-continuum-phase="leadership">
      <div className="container story-chapter-head">
        <ChapterMark {...chapters.people} />
      </div>
      <div className="container leadership-panel">
        {/* Calm and institutional: the thread becomes a plain guide with one
            node per leader, and stops moving. */}
        <ContinuumMark kind="timeline" className="leadership-timeline" nodes={leadership.length} />
        <div className="leadership-intro">
          <span className="eyebrow">The People Behind ORAC</span>
          <h2>Leadership across the ORAC group.</h2>
        </div>
        <div className="leadership-grid">
          {leadership.map((leader) => (
            <article className="leader-tile" key={leader.name}>
              <span>{leader.role}</span>
              <h4>{leader.name}</h4>
              {leader.focus ? <p className="leader-focus">{leader.focus}</p> : null}
              {leader.body ? <p>{leader.body}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
