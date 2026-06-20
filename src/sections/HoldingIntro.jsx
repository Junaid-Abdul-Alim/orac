import React from "react";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import { leadership } from "../data/companyData";

export default function HoldingIntro() {
  return (
    <section className="section holding-intro" id="about">
      <div className="container split-layout">
        <SectionHeader eyebrow="Who We Are" title="A group of practitioners who turned experience into enterprises." />
        <Reveal className="rich-copy">
          <p>
            ORAC Holdings is the parent company of a growing group of independent ventures, each one built from the
            ground up by people who know their craft deeply.
          </p>
          <p>
            We are not a corporation that branched into business; we are a group of practitioners who turned their
            experience into enterprises. From moving commodities across continents to creating memories that last a
            lifetime, every ORAC company carries a shared ethic.
          </p>
          <p>
            Do the work properly, build trust slowly, and never let short-term thinking compromise long-term character.
          </p>
        </Reveal>
      </div>

      <div className="container leadership-panel">
        <Reveal className="leadership-intro">
          <span className="eyebrow">The People Behind ORAC</span>
          <h3>Built by people close to the craft.</h3>
        </Reveal>
        <div className="leadership-grid">
          {leadership.map((leader, index) => (
            <Reveal as="article" className="leader-tile" key={leader.name} delay={index * 90}>
              <span>{leader.role}</span>
              <h4>{leader.name}</h4>
              <p className="leader-focus">{leader.focus}</p>
              <p>{leader.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
