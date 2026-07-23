import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import SafeImage from "../components/common/SafeImage";
import SectionHeader from "../components/common/SectionHeader";
import { pad2 } from "../utils/pad2";
import { companies } from "../data/companyData";

const ventureTones = {
  international: "international",
  eventus: "eventus",
  "luxury-export": "luxe",
};

// Stage 2 of the homepage journey ("Expansion" - see
// docs/ORAC-REDESIGN-SPEC.md §2). The single identity frame from the hero
// separates into three - one per venture - each holding a still image and
// a name, nothing more. This is the brief's "one form separating into
// paths" mechanism, expressed with the same Frame device introduced in
// stage 1 rather than a fourth, unrelated component.
export default function CompanyPortfolio() {
  return (
    <section className="section portfolio-section" id="companies">
      <div className="container">
        <SectionHeader
          eyebrow="Our Companies"
          title="One origin. Three worlds."
          text="ORAC International, ORAC Eventus, and ORAC Luxe - three active ventures shaped around trade, celebrations, and fashion."
        />
        <div className="venture-frame-grid">
          {companies.map((company, index) => (
            <Frame
              key={company.id}
              variant="venture"
              tone={ventureTones[company.id]}
              delay={index * 90}
              className="venture-frame"
            >
              <Link to={company.route} className="venture-frame-link" aria-label={`Explore ${company.name}`}>
                <div className="venture-frame-media">
                  <SafeImage src={company.image} alt="" fallbackLabel={company.name} />
                  <span className="venture-frame-scrim" />
                  <span className="venture-frame-number">{pad2(index + 1)}</span>
                </div>
                <div className="venture-frame-label">
                  <span className="eyebrow">{company.label}</span>
                  <h3>{company.shortName}</h3>
                </div>
              </Link>
            </Frame>
          ))}
        </div>
      </div>
    </section>
  );
}
