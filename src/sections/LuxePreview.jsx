import Button from "../components/common/Button";
import ImagePanel from "../components/common/ImagePanel";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import { luxeImages } from "../data/luxeData";

export default function LuxePreview() {
  return (
    <section className="section editorial-section">
      <div className="container editorial-layout">
        <div>
          <SectionHeader
            eyebrow="ORAC Luxe"
            title="Fashion shaped around cloth, craft, and restraint."
            text="ORAC Luxe is the fashion and textile side of ORAC: ready-to-wear, white-label fabric foundations, atelier pieces, and handmade craft with a slower sense of making."
          />
          <Reveal className="editorial-list">
            <span>Ready-to-wear and fabric materials</span>
            <span>White-label and B2B foundations</span>
            <span>In-house atelier and handmade crochet</span>
          </Reveal>
          <Reveal>
            <Button to="/luxury-export">Visit ORAC Luxe</Button>
          </Reveal>
        </div>
        <Reveal>
          <ImagePanel image={luxeImages.hero} label="ORAC Luxe" className="preview-image-panel" />
        </Reveal>
      </div>
    </section>
  );
}
