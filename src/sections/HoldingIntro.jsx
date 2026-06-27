import React from "react";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import { leadership } from "../data/companyData";

export default function HoldingIntro() {
  return (
    <section className="section holding-intro" id="about">
      <div className="container split-layout">
        <SectionHeader eyebrow="About ORAC Holdings" title="We build institutions designed to endure." />
        <Reveal className="rich-copy">
          <p>
            ORAC Holdings is the foundation of a growing portfolio of ventures, united by a single philosophy: build
            with purpose, lead with integrity, and create lasting value.
          </p>
          <p>
            Every ORAC company was born from hands-on expertise, not corporate theory. We are entrepreneurs, operators,
            and specialists who transformed years of experience into enduring enterprises. From connecting global
            markets through international trade to curating extraordinary celebrations and shaping modern fashion, each
            venture reflects an uncompromising commitment to excellence.
          </p>
          <p>
            At ORAC, growth is never measured by size alone. It is measured by trust earned, relationships built, and
            standards upheld. We believe that reputations are built over decades, not quarters; that discipline outlasts
            trends; and that true success belongs to those who never compromise character for short-term gain.
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
