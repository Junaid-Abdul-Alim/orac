import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import { companies } from "../data/companyData";
import { internationalImages } from "../data/internationalImages";
import { eventusImages } from "../data/eventusImages";
import { luxeImages } from "../data/luxeData";
import { heroStory, ventureLines } from "../data/storyData";

const ventureTones = {
  international: "international",
  eventus: "eventus",
  "luxury-export": "luxe",
};

// The same photograph each venture's own homepage chapter uses further down
// the page (Home.jsx), reused here as the aperture's background rather than
// a fourth, unrelated image - so a visitor recognises International/Eventus/
// Luxe the second time they see it, not just the first.
const ventureBackgrounds = {
  international: internationalImages.hero,
  eventus: eventusImages.homeHero,
  luxe: luxeImages.hero,
};

// The static, resolved end-state of the homepage opening (Blueprint §1/§2).
// Collapses the old "Origin" (wordmark alone) and "Expansion" (ventures
// appear after a scroll) stages into one on-load composition: the ORAC
// identity and all three businesses are present and equally weighted in the
// same first viewport, with zero scroll required on any breakpoint down to
// 360x640. This phase builds the resolved static composition only - the
// convergence/separation motion described in Blueprint §3 is Phase 6's job,
// not this one.
export default function OriginSequence() {
  return (
    <div className="origin-sequence">
      {/* The opening states, in plain words, what ORAC is before the three
          worlds appear beneath it. This is the page's one visible H1; the
          "ORAC Holdings" the sr-only H1 used to carry is kept for assistive
          tech inside it. Each headline line sits in a mask (overflow: hidden)
          so it can rise into place (useStoryMotion.js). */}
      <div className="origin-statement">
        <span className="eyebrow origin-eyebrow">{heroStory.eyebrow}</span>
        <h1 className="origin-headline">
          <span className="sr-only">ORAC Holdings: </span>
          {heroStory.headline.map((line) => (
            <span className="origin-line" key={line}>
              <span className="origin-line-inner">{line}</span>
            </span>
          ))}
        </h1>
        <p className="origin-lede">{heroStory.lede}</p>
      </div>

      <div className="origin-ventures">
        {companies.map((company, index) => {
          const tone = ventureTones[company.id];
          const background = ventureBackgrounds[tone];
          return (
            <Frame
              key={company.id}
              variant="venture-compact"
              tone={tone}
              className="origin-venture"
              /* The three worlds arrive one after another rather than as a
                 block, which is what makes the opening read as a fork from
                 one origin instead of a row of three cards. */
              delay={160 + index * 130}
            >
              <Link
                to={company.route}
                className="venture-compact-link"
                aria-label={`Explore ${company.name}`}
              >
                <div className="venture-compact-media">
                  <img
                    className="venture-compact-bg"
                    src={background.src}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />
                  <img
                    className="venture-compact-logo"
                    src={company.logo}
                    alt={`${company.name} logo`}
                    decoding="async"
                  />
                </div>
                <div className="venture-compact-label">
                  <h2 className="sr-only">{company.shortName}</h2>
                  <span className="eyebrow">{company.label}</span>
                  <span className="venture-compact-story">
                    <span className="venture-compact-no" aria-hidden="true">
                      {ventureLines[company.id].no}
                    </span>
                    {ventureLines[company.id].line}
                  </span>
                </div>
              </Link>
            </Frame>
          );
        })}
      </div>

      <p className="origin-tagline">A House of Businesses. Built on Vision, Discipline, and Legacy.</p>
    </div>
  );
}
