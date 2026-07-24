import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import SafeImage from "../components/common/SafeImage";
import useOpeningSequence from "../hooks/useOpeningSequence";
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

// The homepage opening (Blueprint §1/§2 static composition + §3/§7 motion).
// The old "Origin" (wordmark alone) and "Expansion" (ventures appear after a
// scroll) stages are collapsed into one on-load composition: the ORAC identity
// and all three businesses are present and equally weighted in the same first
// viewport, with zero scroll on any breakpoint down to 360x640.
//
// Motion (Phase 6) is layered on top without altering that static layout. The
// base CSS renders the resolved end-state; `useOpeningSequence` adds the
// `.is-opening` class only for a first-in-session, motion-tolerant visit, and
// that class alone drives the whole CSS/SVG timeline (M1 convergence, M2
// separation). `playing` also gates the two purely-decorative motion layers
// (the convergence forces and the origin ring) into the DOM only while they
// are needed, and removes them the moment the sequence settles — so nothing
// animates past the final state, and returning/reduced-motion visitors never
// even create them. `compact` skips the three directional forces on mobile per
// the "recompose, don't shrink" mobile alternative (§3 mobile / M1 mobile).
export default function OriginSequence() {
  const { playing, compact } = useOpeningSequence();
  const showForces = playing && !compact;

  const rootClass = ["origin-sequence", playing ? "is-opening" : "", compact ? "is-compact" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {showForces && (
        <div className="origin-forces" aria-hidden="true">
          {/* Each fragment is a real crop of the SAME photograph its final
              aperture uses, so the convergence is visibly three ORAC
              businesses (not three abstract effects) and the handoff into the
              resting apertures is seamless. Decorative only (aria-hidden). */}

          {/* International: real coir-fibre trade product (coir-fiber.webp),
              with a drawn trade-route line over it as one designed element,
              entering from the left like movement between markets. */}
          <div className="origin-frag origin-frag-international">
            <div className="origin-frag-media">
              <img src={openingImages.international?.src} alt="" aria-hidden="true" decoding="async" />
              <svg className="origin-frag-route" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
                <path
                  d="M6 80 L32 54 L60 62 L94 24"
                  fill="none"
                  stroke="var(--accent-international-light)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                />
                <circle className="origin-frag-node" cx="6" cy="80" r="2.6" />
                <circle className="origin-frag-node" cx="94" cy="24" r="2.6" />
              </svg>
            </div>
          </div>

          {/* Eventus x VELORAWED: real wedding photograph (wedding-couple.webp)
              resolving into focus inside a cinematic frame (letterbox bars
              retract, blur clears), entering from above. */}
          <div className="origin-frag origin-frag-eventus">
            <div className="origin-frag-media">
              <img src={openingImages.eventus?.src} alt="" aria-hidden="true" decoding="async" />
            </div>
          </div>

          {/* Luxe x The House of Azrin: real atelier textile
              (fashion-atelier.webp) unfolding into place with a fold-like
              mask, entering from the right, material-led. */}
          <div className="origin-frag origin-frag-luxe">
            <div className="origin-frag-media">
              <img src={openingImages["luxury-export"]?.src} alt="" aria-hidden="true" decoding="async" />
            </div>
          </div>
        </div>
      )}

      <div className="origin-identity">
        {playing && <span className="origin-ring" aria-hidden="true" />}
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
          pathLength="100"
        />
        <defs>
          <linearGradient id="origin-fork-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="origin-ventures">
        {companies.map((company, index) => (
          <Frame
            key={company.id}
            variant="venture-compact"
            tone={ventureTones[company.id]}
            className="origin-venture"
            delay={index * 80}
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
