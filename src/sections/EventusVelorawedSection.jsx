import BrandLockup from "../components/common/BrandLockup";
import EditorialGallery from "../components/common/EditorialGallery";
import ImagePanel from "../components/common/ImagePanel";
import Reveal from "../components/common/Reveal";
import { velorawedServices } from "../data/eventusData";
import { velorawedImages } from "../data/eventusImages";
import velorawedLogo from "../assets/logos/velorawed-gold.svg";

export default function EventusVelorawedSection() {
  return (
    <section className="section velorawed-section eventus-velorawed-section">
      <div className="container velorawed-layout">
        <Reveal className="partner-title">
          <BrandLockup items={["ORAC Eventus", "VELORAWED"]} />
          <span className="eyebrow">Our Visual Studio</span>
          <img
            className="velorawed-logo"
            src={velorawedLogo}
            alt="VELORAWED"
            loading="lazy"
            decoding="async"
          />
          <h2>VELORAWED</h2>
        </Reveal>
        <Reveal className="partner-copy">
          <p>
            VELORAWED is the photography and cinematography brand of ORAC Eventus, built to capture weddings
            and celebrations the way they feel, not just the way they look. Candid, traditional, and cinematic
            styles are delivered by a team that understands South Indian weddings inside out.
          </p>
          <div className="partner-services">
            {velorawedServices.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <blockquote>
            A wedding lasts a day. The way it is remembered lasts a lifetime - that is the standard VELORAWED
            shoots for.
          </blockquote>
        </Reveal>
      </div>
      <div className="container velorawed-visuals">
        <ImagePanel
          image={velorawedImages.hero}
          label="Film Frame"
          title="Cinematic wedding films"
          dark
          className="velorawed-film-frame"
        />
        <EditorialGallery images={velorawedImages.gallery} dark />
      </div>
    </section>
  );
}
