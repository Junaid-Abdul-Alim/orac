import React from "react";
import Button from "../components/common/Button";
import ImagePanel from "../components/common/ImagePanel";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import { internationalImages } from "../data/internationalImages";

export default function InternationalPreview() {
  return (
    <section className="section editorial-section">
      <div className="container editorial-layout">
        <div>
          <SectionHeader
            eyebrow="ORAC International"
            title="Export and import trading across chosen categories."
            text="ORAC International handles agri-commodities, natural fibres, industrial minerals, and automotive accessories with responsible sourcing and quality verification."
          />
          <Reveal className="editorial-list">
            <span>Agricultural commodities</span>
            <span>Natural fibres and industrial minerals</span>
            <span>Automotive accessories and import commodities</span>
          </Reveal>
          <Reveal>
            <Button to="/international">Visit International</Button>
          </Reveal>
        </div>
        <Reveal>
          <ImagePanel image={internationalImages.hero} label="Global Trade" className="preview-image-panel" />
        </Reveal>
      </div>
    </section>
  );
}
