import Reveal from "../../components/common/Reveal";
import { leadership } from "../../data/companyData";

/**
 * SCENE 9 — Leadership: Calm (storyboard §5, thread state 7 held). Leadership
 * appears late in the journey, per the confirmed decision. The gold Divider
 * from Why ORAC PERSISTS here as the same horizontal rule under the eyebrow —
 * the quietest boundary, signalling the story winding down. Real roles only
 * (Managing Director, Director) from companyData; no invented titles, no
 * leadership photography (none exists). Tiles reveal with an index stagger;
 * nothing scroll-linked.
 */
export default function LabLeadership() {
  return (
    <section className="lab-scene lab-leadership" aria-labelledby="lab-leadership-title">
      <div className="container lab-leadership-panel">
        <Reveal className="lab-leadership-intro">
          <span className="eyebrow">The People Behind ORAC</span>
          <svg
            className="lab-thread lab-divider lab-divider-held"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="0" y1="1" x2="100" y2="1" pathLength="100" />
          </svg>
          <h3 id="lab-leadership-title">Leadership across the ORAC group.</h3>
        </Reveal>

        <div className="lab-leadership-grid">
          {leadership.map((leader, index) => (
            <Reveal as="article" className="leader-tile" key={leader.name} delay={index * 90}>
              <span>{leader.role}</span>
              <h4>{leader.name}</h4>
              <p className="leader-focus">{leader.focus}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
