import { Aperture, Clapperboard, Heart, Sparkles } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import { velorawedPillars, velorawedServices } from "../data/eventusData";
import velorawedLogo from "../assets/logos/velorawed-gold.svg";
import { pad2 } from "../utils/pad2";

const pillarIcon = (title = "") => {
  const key = title.toLowerCase();

  if (key.includes("emotion")) return Heart;
  if (key.includes("ritual")) return Aperture;
  if (key.includes("built")) return Clapperboard;

  return Sparkles;
};

export default function EventusVelorawedSection() {
  return (
    <section className="section velorawed-section eventus-velorawed-section">
      <div className="container velorawed-layout">
        <Reveal className="partner-title">
          <BrandLockup items={["ORAC Eventus", "VELORAWED"]} />
          <span className="eyebrow">The Storytelling Studio</span>
          <img
            className="velorawed-logo"
            src={velorawedLogo}
            alt="VELORAWED"
            loading="lazy"
            decoding="async"
          />
          <h2>VELORAWED</h2>
          <small className="partner-title-kicker">Photography &amp; cinematography, by ORAC Eventus</small>
        </Reveal>
        <Reveal className="partner-copy">
          <p>
            VELORAWED is the photography and cinematography studio of ORAC Eventus, created to preserve
            weddings and celebrations with emotion, elegance, and timeless visual craft. We capture not only
            how a celebration looks, but how it feels - through candid moments, traditional rituals, cinematic
            storytelling, and carefully preserved memories.
          </p>
          <p>
            From intimate family moments to grand wedding frames, VELORAWED approaches every celebration with
            sensitivity, artistic discipline, and a strong understanding of culture, atmosphere, and
            storytelling. Our work is designed to become a lasting record of the day - beautifully shot,
            thoughtfully edited, and preserved as heirlooms for years to come.
          </p>
        </Reveal>
      </div>

      <div className="container">
        <div className="velorawed-pillars" data-motion-grid>
          {velorawedPillars.map((pillar, index) => {
            const Icon = pillarIcon(pillar.title);
            return (
              <article className="velorawed-pillar" key={pillar.title}>
                <div className="velorawed-pillar-top">
                  <IconBadge icon={Icon} className="icon-badge-dark" size={18} />
                  <span className="velorawed-pillar-index">{pad2(index + 1)}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container velorawed-covers">
        <Reveal className="velorawed-covers-list">
          <span className="eyebrow">What Velorawed Covers</span>
          <ul>
            {velorawedServices.map((service) => (
              <li key={service}>
                <Sparkles size={13} strokeWidth={1.7} aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="velorawed-quote">
          <blockquote>
            A wedding lasts a day. The way it is remembered lasts a lifetime - that is the standard VELORAWED
            shoots for.
            <cite>Velorawed Studio</cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
