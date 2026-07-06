import React from "react";
import Button from "../components/common/Button";
import ImagePanel from "../components/common/ImagePanel";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import { eventusImages } from "../data/eventusImages";

export default function EventusPreview() {
  return (
    <section className="section eventus-preview">
      <div className="container editorial-layout reverse">
        <Reveal>
          <ImagePanel image={eventusImages.hero} label="Wedding Experience" className="preview-image-panel" />
        </Reveal>
        <div>
          <SectionHeader
            eyebrow="ORAC Eventus"
            title="Building celebrations that are felt, not just seen."
            text="ORAC Eventus is a Chennai-based full-service event management company built around one belief: the family should feel supported from the first call to the final frame."
          />
          <Reveal className="editorial-list">
            <span>Planning, decor and execution</span>
            <span>Photography and cinematography through VELORAWED</span>
            <span>Clear timelines, clear pricing and one accountable team</span>
          </Reveal>
          <Reveal>
            <Button to="/eventus">Visit Eventus</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
