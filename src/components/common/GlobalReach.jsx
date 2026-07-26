import { useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Reveal from "./Reveal";
import useCorridorMotion from "../../motion/useCorridorMotion";
import {
  displayNames,
  focusedCountryCount,
  highlightedCountries,
  regionalCorridors,
} from "../../data/reachData";

/**
 * Corridor geometry: one arc from India to each focused country.
 *
 * The endpoints are not chosen or invented - they are exactly the countries
 * already listed in `highlightedCountries`, and the coordinates come from the
 * same topojson the map itself draws, via the geoPath generator react-simple-maps
 * hands to its children. Nothing here asserts a route that the page does not
 * already state elsewhere.
 */
function buildCorridors(geographies, path) {
  const india = geographies.find((geo) => geo.properties.name === "India");
  if (!india || !path?.centroid) return { origin: null, corridors: [] };

  const [ox, oy] = path.centroid(india);
  if (!Number.isFinite(ox) || !Number.isFinite(oy)) return { origin: null, corridors: [] };

  const corridors = geographies
    .filter((geo) => highlightedCountries.has(geo.properties.name) && geo.properties.name !== "India")
    .map((geo) => {
      const [x, y] = path.centroid(geo);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

      const dx = x - ox;
      const dy = y - oy;
      const length = Math.hypot(dx, dy) || 1;
      // Bow each arc away from the straight chord, always toward the top of the
      // map, so the set reads as flight/shipping corridors rather than a
      // starburst of straight lines.
      const bend = Math.min(length * 0.22, 54);
      const cx = (ox + x) / 2 + (dy / length) * bend * Math.sign(dx || 1);
      const cy = (oy + y) / 2 - Math.abs((dx / length) * bend) - 6;

      return { name: geo.properties.name, d: `M${ox},${oy} Q${cx},${cy} ${x},${y}` };
    })
    .filter(Boolean);

  return { origin: [ox, oy], corridors };
}

const defaultHighlights = [
  { value: String(focusedCountryCount), label: "Focused countries" },
  { value: String(regionalCorridors), label: "Regional corridors" },
  { value: "India", label: "Based operation" },
];

export default function GlobalReach({
  variant = "standard",
  eyebrow = "Trade Network",
  title = "OUR GLOBAL REACH",
  text,
  highlights = [],
}) {
  const [tooltip, setTooltip] = useState(null);
  const [countryListOpen, setCountryListOpen] = useState(false);
  // Shared between the map and the country list, so pointing at either one
  // highlights the same country in the other.
  const [activeCountry, setActiveCountry] = useState(null);
  // The corridors are drawn from here rather than from the page-level scene
  // director, because they only exist once the topojson resolves.
  const mapWrapRef = useRef(null);
  useCorridorMotion(mapWrapRef);
  const geographyUrl = useMemo(() => `${import.meta.env.BASE_URL}geographies/countries-110m.json`, []);
  const sectionId = variant === "home" ? "home-global-reach-title" : "global-reach-title";
  const countryListId = `${sectionId}-countries`;
  const highlightItems = highlights.length ? highlights : defaultHighlights;
  const sortedCountryNames = useMemo(
    () => Array.from(highlightedCountries).sort((a, b) => a.localeCompare(b)),
    []
  );

  const showTooltip = (event, countryName) => {
    const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    setTooltip({
      name: displayNames[countryName] || countryName,
      x: bounds ? event.clientX - bounds.left : 0,
      y: bounds ? event.clientY - bounds.top : 0,
    });
  };

  const moveTooltip = (event) => {
    if (!tooltip) return;
    const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!bounds) return;

    setTooltip((current) => ({
      ...current,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }));
  };

  return (
    <section
      className={`global-reach-section global-reach-${variant}`.trim()}
      aria-labelledby={sectionId}
      data-continuum-phase={variant === "home" ? "global" : undefined}
    >
      <div className="global-reach-container" ref={mapWrapRef}>
        <Reveal className="global-reach-heading">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={sectionId}>{title}</h2>
          {text ? <p>{text}</p> : null}
        </Reveal>

        {/* Layer 3 of the component - operational statistics, deliberately
            outside the geography. They previously sat as a frosted panel over
            the North Atlantic, covering the map at the exact point the eye
            enters it. As a ruled strip beneath the map they stay legible, keep
            one baseline, and stack cleanly on a phone without shrinking the
            map to make room. */}
        <Reveal className="global-reach-map-wrap" delay={120} motionId="global-map">
          {/* geoEqualEarth at scale 155 in a 980x480 frame leaves a wide empty
              band above and below the landmass, which is what made the map
              look tiny once the frame narrowed on a phone. Cropping the frame
              to the inhabited latitudes and raising the scale fills it with
              geography instead of margin - the same countries, just not
              surrounded by 130px of nothing. */}
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 176, center: [12, 12] }}
            width={980}
            height={430}
            className="global-reach-map"
            role="img"
            aria-label="World map highlighting ORAC International trade reach - see the full country list below"
          >
            <Geographies geography={geographyUrl}>
              {({ geographies, path }) => {
                const { origin, corridors } = buildCorridors(geographies, path);

                return (
                  <>
                    {geographies.map((geo) => {
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
                            activeCountry === countryName ? "is-active" : "",
                            activeCountry && activeCountry !== countryName ? "is-dimmed" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{
                            default: {
                              // react-simple-maps writes fill inline, so the
                              // active/dimmed state has to be resolved here rather
                              // than in CSS, where a class could never win.
                              fill:
                                activeCountry === countryName
                                  ? isIndia
                                    ? "var(--map-india-hover)"
                                    : "var(--map-highlight-hover)"
                                  : isIndia
                                    ? "var(--map-india)"
                                    : isHighlighted
                                      ? "var(--map-highlight)"
                                      : "var(--map-country)",
                              opacity:
                                activeCountry && activeCountry !== countryName && isHighlighted ? 0.32 : 1,
                              stroke: "var(--map-stroke)",
                              strokeWidth: 0.55,
                              outline: "none",
                              transition: "fill 220ms var(--ease-smooth), opacity 220ms var(--ease-smooth)",
                            },
                            hover: {
                              fill: isIndia
                                ? "var(--map-india-hover)"
                                : isHighlighted
                                  ? "var(--map-highlight-hover)"
                                  : "var(--map-country)",
                              stroke: "var(--map-stroke)",
                              strokeWidth: 0.55,
                              outline: "none",
                            },
                            pressed: {
                              fill: isIndia
                                ? "var(--map-india-pressed)"
                                : isHighlighted
                                  ? "var(--map-highlight-pressed)"
                                  : "var(--map-country)",
                              stroke: "var(--map-stroke)",
                              strokeWidth: 0.55,
                              outline: "none",
                            },
                          }}
                          onMouseEnter={
                            isHighlighted
                              ? (event) => {
                                  showTooltip(event, countryName);
                                  setActiveCountry(countryName);
                                }
                              : undefined
                          }
                          onMouseMove={isHighlighted ? moveTooltip : undefined}
                          onMouseLeave={
                            isHighlighted
                              ? () => {
                                  setTooltip(null);
                                  setActiveCountry(null);
                                }
                              : undefined
                          }
                        />
                      );
                    })}

                    {/* Layer 2 - the corridors. Drawn after the geographies so
                        they sit over the landmasses, and marked aria-hidden
                        because the country list below is the accessible route
                        into the same information. */}
                    {corridors.length ? (
                      <g className="global-corridors" aria-hidden="true">
                        {corridors.map((corridor) => (
                          <path
                            key={corridor.name}
                            className="global-corridor"
                            data-corridor
                            d={corridor.d}
                            fill="none"
                          />
                        ))}
                        {origin ? (
                          <circle
                            className="global-corridor-origin"
                            data-corridor-origin
                            cx={origin[0]}
                            cy={origin[1]}
                            r="4.5"
                          />
                        ) : null}
                      </g>
                    ) : null}
                  </>
                );
              }}
            </Geographies>
          </ComposableMap>

          {tooltip ? (
            <div
              className="global-reach-tooltip"
              style={{ "--tooltip-x": `${tooltip.x}px`, "--tooltip-y": `${tooltip.y}px` }}
              role="tooltip"
            >
              {tooltip.name}
            </div>
          ) : null}
        </Reveal>

        <Reveal className="global-reach-stats" delay={220} aria-label="Global reach highlights">
          {highlightItems.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </Reveal>

        {/* The keyboard- and touch-accessible route into the same data the map
            shows. Focusing or pointing at a country name lights that country
            on the map, so the list is a real control rather than a fallback. */}
        <Reveal className="global-reach-country-disclosure" delay={260}>
          <button
            type="button"
            className="global-reach-country-toggle"
            aria-expanded={countryListOpen}
            aria-controls={countryListId}
            onClick={() => setCountryListOpen((value) => !value)}
          >
            {countryListOpen ? "Hide" : "Show"} the {focusedCountryCount} focused countries
          </button>
          {countryListOpen ? (
            <ul id={countryListId} className="global-reach-country-list">
              {sortedCountryNames.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    className={`global-reach-country-item ${activeCountry === name ? "is-active" : ""}`.trim()}
                    aria-pressed={activeCountry === name}
                    onMouseEnter={() => setActiveCountry(name)}
                    onMouseLeave={() => setActiveCountry(null)}
                    onFocus={() => setActiveCountry(name)}
                    onBlur={() => setActiveCountry(null)}
                    onClick={() => setActiveCountry((current) => (current === name ? null : name))}
                  >
                    {displayNames[name] || name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
