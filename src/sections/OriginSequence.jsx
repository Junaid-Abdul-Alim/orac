import { Component, lazy, Suspense, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Frame from "../components/common/Frame";
import ContinuumMark from "../components/motion/ContinuumMark";
import { companies } from "../data/companyData";
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

// Each aperture's own geometric signature (Blueprint's "one origin, multiple
// worlds" system), drawn with the existing ContinuumMark vocabulary rather
// than a fourth new device: a directional rule for International, the
// existing corner-bracket frame for Eventus, the existing seam for Luxe.
// Decorative only (ContinuumMark itself is aria-hidden) - this is how the
// three apertures read as distinct worlds without touching the venture
// wordmark images they sit beside.
const ventureMarks = {
  international: "route",
  eventus: "frame",
  luxe: "seam",
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
        {companies.map((company, index) => {
          const tone = ventureTones[company.id];
          const mark = ventureMarks[tone];
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
              {/* International's rule reads as the route arriving from the
                  fork above, so it sits at the top of the whole aperture;
                  Eventus's brackets and Luxe's seam are scoped to the media
                  zone only (below), so they frame the wordmark rather than
                  spanning into the label row underneath it. */}
              {mark === "route" ? <ContinuumMark kind={mark} className="origin-venture-mark" /> : null}
              <Link to={company.route} className="venture-compact-link" aria-label={`Explore ${company.name}`}>
                <div className="venture-compact-media">
                  {mark !== "route" ? <ContinuumMark kind={mark} className="origin-venture-mark" /> : null}
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
                </div>
              </Link>
            </Frame>
          );
        })}
      </div>
    </div>
  );
}
