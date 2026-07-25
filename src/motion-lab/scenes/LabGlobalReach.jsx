import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";
import Reveal from "../../components/common/Reveal";
import useGsapScene from "../useGsapScene";
import { gsap, MM } from "../gsap";
import {
  displayNames,
  focusedCountryCount,
  highlightedCountries,
  regionalCorridors,
} from "../../data/reachData";

// One origin (India) → the five regional corridors named in the data. Every
// endpoint is a real highlighted country, and the arcs are drawn with the
// MAP'S OWN geoEqualEarth projection (react-simple-maps <Line>), so they are
// geographically true, not decorative curves.
const INDIA = [79, 22];
const CORRIDORS = [
  { to: [54, 24], label: "Middle East" }, // UAE
  { to: [8, 9], label: "Africa" }, // Nigeria
  { to: [10.4, 51], label: "Europe" }, // Germany
  { to: [-98, 39], label: "Americas" }, // USA
  { to: [106, 16], label: "Asia" }, // Vietnam
];

const stats = [
  { value: String(focusedCountryCount), label: "Focused countries" },
  { value: String(regionalCorridors), label: "Regional corridors" },
  { value: "India", label: "Based operation" },
];

/**
 * SCENE 5 — Global Reach: Corridors (storyboard §5, thread state 4 "Corridor").
 * Enhances the existing static highlighted-India map: the gold thread lifts off
 * the International route and becomes real India→destination corridor arcs that
 * draw outward on scroll, one after another, each destination node pulsing once
 * as its arc completes — then all motion stops (no looping, no auto-pan).
 *
 * The facts stay in the text stat tiles; the arcs are aria-hidden decoration
 * over the existing react-simple-maps SVG. Reduced motion → arcs drawn, no
 * scrub, no pulse (CSS resolved state; matchMedia creates no ScrollTriggers).
 */
export default function LabGlobalReach() {
  const [countryListOpen, setCountryListOpen] = useState(false);
  const geographyUrl = useMemo(() => `${import.meta.env.BASE_URL}geographies/countries-110m.json`, []);
  const sortedCountryNames = useMemo(
    () => Array.from(highlightedCountries).sort((a, b) => a.localeCompare(b)),
    []
  );

  const rootRef = useGsapScene((mm, root) => {
    const arcs = Array.from(root.querySelectorAll(".lab-corridor"));
    const nodes = root.querySelectorAll(".lab-corridor-node");
    const map = root.querySelector(".lab-global-map");
    if (!arcs.length) return;

    // Prime each arc's dash from its real geometric length (user units).
    arcs.forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    mm.add(MM.desktop, () => {
      // Band runs from the map entering to CENTRED, so the five corridors draw
      // one after another across roughly a viewport of scroll while the map is
      // in view — clearly perceptible, then rest (no looping).
      gsap.set(nodes, { scale: 0, transformOrigin: "center" });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: map, start: "top bottom", end: "center center", scrub: 1 },
      });
      arcs.forEach((path, i) => {
        tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, i * 0.85);
        tl.to(nodes[i], { scale: 1, duration: 0.35, ease: "back.out(2)" }, i * 0.85 + 0.9);
      });
    });

    mm.add(MM.mobile, () => {
      // Fewer, quicker draws; nodes appear without the springy pulse.
      gsap.set(nodes, { scale: 0, transformOrigin: "center" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } })
        .to(arcs, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut", stagger: 0.12 })
        .to(nodes, { scale: 1, duration: 0.3, stagger: 0.1 }, 0.3);
    });
  });

  return (
    <section
      ref={rootRef}
      className="lab-scene lab-global"
      aria-labelledby="lab-global-title"
    >
      <div className="lab-global-inner">
        <Reveal className="lab-global-heading">
          <span className="eyebrow">International Outlook</span>
          <h2 id="lab-global-title">OUR GLOBAL REACH</h2>
          <p>
            ORAC operates from India with {focusedCountryCount} focused countries and five regional corridors
            across Asia, Africa, the Middle East, Europe, North America, South America, and Australia.
          </p>
        </Reveal>

        <Reveal className="lab-global-map-wrap" delay={120}>
          <div className="lab-global-stats" aria-label="Global reach highlights">
            {stats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155 }}
            width={980}
            height={480}
            className="lab-global-map"
            role="img"
            aria-label="World map: India highlighted as origin with gold corridor arcs reaching ORAC International's focus regions"
          >
            <Geographies geography={geographyUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const isHighlighted = highlightedCountries.has(countryName);
                  const isIndia = countryName === "India";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={-1}
                      aria-hidden="true"
                      className={[
                        "global-country",
                        isHighlighted ? "is-highlighted" : "",
                        isIndia ? "is-india" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        default: {
                          fill: isIndia
                            ? "var(--map-india)"
                            : isHighlighted
                              ? "var(--map-highlight)"
                              : "var(--map-country)",
                          stroke: "var(--map-stroke)",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        hover: {
                          fill: isIndia
                            ? "var(--map-india)"
                            : isHighlighted
                              ? "var(--map-highlight)"
                              : "var(--map-country)",
                          stroke: "var(--map-stroke)",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            <g aria-hidden="true">
              {CORRIDORS.map((corridor) => (
                <Line
                  key={corridor.label}
                  className="lab-corridor"
                  from={INDIA}
                  to={corridor.to}
                  stroke="var(--gold)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {CORRIDORS.map((corridor) => (
                <Marker key={`${corridor.label}-node`} coordinates={corridor.to}>
                  <circle className="lab-corridor-node" r={3.4} />
                </Marker>
              ))}
              <Marker coordinates={INDIA}>
                <circle className="lab-corridor-origin" r={4.2} />
              </Marker>
            </g>
          </ComposableMap>

          <div className="lab-global-disclosure">
            <button
              type="button"
              className="global-reach-country-toggle"
              aria-expanded={countryListOpen}
              aria-controls="lab-global-country-list"
              onClick={() => setCountryListOpen((value) => !value)}
            >
              {countryListOpen ? "Hide" : "Show"} the {focusedCountryCount} focused countries
            </button>
            {countryListOpen ? (
              <ul id="lab-global-country-list" className="global-reach-country-list">
                {sortedCountryNames.map((name) => (
                  <li key={name}>{displayNames[name] || name}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
