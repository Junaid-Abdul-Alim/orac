import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Reveal from "./Reveal";

const highlightedCountries = new Set([
  "India",
  "China",
  "United Arab Emirates",
  "Turkey",
  "Sudan",
  "Somalia",
  "Mexico",
  "Malaysia",
  "Indonesia",
  "Vietnam",
  "Bangladesh",
  "Thailand",
  "Papua New Guinea",
]);

const displayNames = {
  "United Arab Emirates": "UAE",
};

export default function GlobalReach() {
  const [tooltip, setTooltip] = useState(null);
  const geographyUrl = useMemo(() => `${import.meta.env.BASE_URL}geographies/countries-110m.json`, []);

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
    <section className="global-reach-section" aria-labelledby="global-reach-title">
      <div className="global-reach-container">
        <Reveal className="global-reach-heading">
          <span className="eyebrow">Trade Network</span>
          <h2 id="global-reach-title">OUR GLOBAL REACH</h2>
        </Reveal>

        <Reveal className="global-reach-map-wrap" delay={120}>
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

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={isHighlighted ? 0 : -1}
                      aria-label={countryName}
                      className={isHighlighted ? "global-country is-highlighted" : "global-country"}
                      style={{
                        default: {
                          fill: isHighlighted ? "#151347" : "#E5E5E5",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        hover: {
                          fill: isHighlighted ? "#25217A" : "#E5E5E5",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        pressed: {
                          fill: isHighlighted ? "#1D1966" : "#E5E5E5",
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
                          ? () => setTooltip({ name: displayNames[countryName] || countryName, x: 490, y: 232 })
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
