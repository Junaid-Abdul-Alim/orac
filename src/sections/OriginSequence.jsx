import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import SafeImage from "../components/common/SafeImage";
import { companies } from "../data/companyData";
import { internationalImages } from "../data/internationalImages";
import { eventusImages } from "../data/eventusImages";
import { luxeImages } from "../data/luxeData";
import oracLogo from "../assets/logos/orac-orange.svg";

const ventureTones = {
  international: "international",
  eventus: "eventus",
  "luxury-export": "luxe",
};

// Opening-specific crops, distinct from each venture's own hero/banner
// image elsewhere on the site (see data files' `opening` slots). Chosen so
// a portrait/band crop never cuts into the source photo's own packaging or
// caption text (see docs/ORAC-EXPERIENCE-BLUEPRINT.md Phase 4, Asset
// selection).
const openingImages = {
  international: internationalImages.opening,
  eventus: eventusImages.opening,
  "luxury-export": luxeImages.opening,
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
      <div className="origin-identity">
        <span className="eyebrow">ORAC Holdings</span>
        <h1 className="origin-logo-heading">
          <span className="sr-only">ORAC Holdings</span>
          <img src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
        </h1>
        <p className="origin-tagline">A House of Businesses. Built on Vision, Discipline, and Legacy.</p>
      </div>

      <svg
        className="origin-fork"
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M150 0 L150 28 M150 28 L20 60 M150 28 L150 60 M150 28 L280 60"
          fill="none"
          stroke="url(#origin-fork-gradient)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="origin-fork-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="origin-ventures">
        {companies.map((company) => (
          <Frame
            key={company.id}
            variant="venture-compact"
            tone={ventureTones[company.id]}
            className="origin-venture"
          >
            <Link
              to={company.route}
              className="venture-compact-link"
              aria-label={`Explore ${company.name}`}
            >
              <div className="venture-compact-media">
                <SafeImage
                  src={openingImages[company.id]?.src}
                  alt=""
                  fallbackLabel={company.name}
                  priority
                />
                <span className="venture-compact-scrim" />
              </div>
              <div className="venture-compact-label">
                <span className="eyebrow">{company.label}</span>
                <h2>{company.shortName}</h2>
              </div>
            </Link>
          </Frame>
        ))}
      </div>
    </div>
  );
}
