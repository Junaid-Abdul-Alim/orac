import { Component, lazy, Suspense, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import SafeImage from "../components/common/SafeImage";
import { companies } from "../data/companyData";
import { internationalImages } from "../data/internationalImages";
import { eventusImages } from "../data/eventusImages";
import { luxeImages } from "../data/luxeData";
import { DESKTOP_QUERY } from "../motion/motionTokens";
import oracLogo from "../assets/logos/orac-orange.svg";

const OriginThread3D = lazy(() => import("../components/motion/OriginThread3D"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

// Desktop, motion-enabled, WebGL-capable only - reactive to DESKTOP_QUERY
// (the same query useHomeMotion.js gates its own scenes behind) so resizing
// across the breakpoint or toggling reduced-motion mid-session both retire
// the 3D thread back to the flat SVG fork immediately, not just on reload.
// WebGL support itself can't change at runtime, so that check runs once.
function useShow3D() {
  const [show3D, setShow3D] = useState(false);
  useLayoutEffect(() => {
    const webgl = supportsWebGL();
    const query = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setShow3D(webgl && query.matches);
    apply();
    query.addEventListener?.("change", apply);
    return () => query.removeEventListener?.("change", apply);
  }, []);
  return show3D;
}

// Last-resort safety net: three.js/WebGL failing on a specific device
// shouldn't take the homepage hero down with it.
class Origin3DBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error("[OriginThread3D] falling back to the 2D fork:", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

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

// The original flat connective geometry - kept exactly as it was, as the
// fallback for mobile, reduced-motion, and any visitor without WebGL. Also
// what useHomeMotion.js's Scene 1 draws in on load: its `one(".origin-fork
// path")` lookup simply finds nothing while OriginThread3D is mounted
// instead, which its existing `if (fork && ...)` guard already handles.
function OriginForkSVG() {
  return (
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
  );
}

// The static, resolved end-state of the homepage opening (Blueprint §1/§2).
// Collapses the old "Origin" (wordmark alone) and "Expansion" (ventures
// appear after a scroll) stages into one on-load composition: the ORAC
// identity and all three businesses are present and equally weighted in the
// same first viewport, with zero scroll required on any breakpoint down to
// 360x640. This phase builds the resolved static composition only - the
// convergence/separation motion described in Blueprint §3 is Phase 6's job,
// not this one.
export default function OriginSequence() {
  const show3D = useShow3D();

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

      {show3D ? (
        <div className="origin-fork-3d" aria-hidden="true">
          <Origin3DBoundary fallback={<OriginForkSVG />}>
            <Suspense fallback={null}>
              <OriginThread3D />
            </Suspense>
          </Origin3DBoundary>
        </div>
      ) : (
        <OriginForkSVG />
      )}

      <div className="origin-ventures">
        {companies.map((company, index) => (
          <Frame
            key={company.id}
            variant="venture-compact"
            tone={ventureTones[company.id]}
            className="origin-venture"
            /* The three worlds arrive one after another rather than as a
               block, which is what makes the opening read as a fork from one
               origin instead of a row of three cards. */
            delay={160 + index * 130}
          >
            <Link to={company.route} className="venture-compact-link" aria-label={`Explore ${company.name}`}>
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
