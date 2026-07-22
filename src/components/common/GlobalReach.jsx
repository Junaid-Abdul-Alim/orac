import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Reveal from "./Reveal";

const highlightedCountries = new Set([
  "India",
  "China",
  "Vietnam",
  "Thailand",
  "Indonesia",
  "Israel",
  "United Arab Emirates",
  "Tanzania",
  "Ethiopia",
  "Madagascar",
  "Sudan",
  "Mozambique",
  "Malawi",
  "Cameroon",
  "Nigeria",
  "Niger",
  "Chad",
  "Senegal",
  "C\u00f4te d'Ivoire",
  "Benin",
  "Ghana",
  "Brazil",
  "United States of America",
  "Canada",
  "Australia",
  "South Korea",
  "Saudi Arabia",
  "Germany",
  "France",
  "Spain",
]);

const displayNames = {
  "United Arab Emirates": "UAE",
  "United States of America": "USA",
  "C\u00f4te d'Ivoire": "Cote d'Ivoire",
};

const defaultHighlights = [
  { value: String(highlightedCountries.size), label: "Focused countries" },
  { value: "5", label: "Regional corridors" },
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
  const geographyUrl = useMemo(() => `${import.meta.env.BASE_URL}geographies/countries-110m.json`, []);
  const sectionId = variant === "home" ? "home-global-reach-title" : "global-reach-title";
  const highlightItems = highlights.length ? highlights : defaultHighlights;

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
    <section className={`global-reach-section global-reach-${variant}`.trim()} aria-labelledby={sectionId}>
      <div className="global-reach-container">
        <Reveal className="global-reach-heading">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={sectionId}>{title}</h2>
          {text ? <p>{text}</p> : null}
        </Reveal>

        <Reveal className="global-reach-map-wrap" delay={120}>
          {variant === "home" ? (
            <div className="global-reach-stats" aria-label="Global reach highlights">
              {highlightItems.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          ) : null}

          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155 }}
            width={980}
            height={480}
            className="global-reach-map"
            role="img"
            aria-label="World map highlighting ORAC International trade reach"
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
                      tabIndex={isHighlighted ? 0 : -1}
                      aria-label={countryName}
                      className={[
                        "global-country",
                        isHighlighted ? "is-highlighted" : "",
                        isIndia ? "is-india" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        default: {
                          fill: isIndia ? "#B42318" : isHighlighted ? "#151347" : "#E5E5E5",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        hover: {
                          fill: isIndia ? "#D14336" : isHighlighted ? "#25217A" : "#E5E5E5",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        pressed: {
                          fill: isIndia ? "#8F1D14" : isHighlighted ? "#1D1966" : "#E5E5E5",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                      }}
                      onMouseEnter={isHighlighted ? (event) => showTooltip(event, countryName) : undefined}
                      onMouseMove={isHighlighted ? moveTooltip : undefined}
                      onMouseLeave={isHighlighted ? () => setTooltip(null) : undefined}
                      onFocus={
                        isHighlighted
                          ? () =>
                              setTooltip({ name: displayNames[countryName] || countryName, x: 490, y: 232 })
                          : undefined
                      }
                      onBlur={isHighlighted ? () => setTooltip(null) : undefined}
                    />
                  );
                })
              }
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
      </div>
    </section>
  );
}
