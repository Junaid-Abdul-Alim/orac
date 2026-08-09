// Single source of truth for ORAC International's trade-reach figures, shared by
// the GlobalReach map/stats and the home-page copy so the numbers can't drift.

export const highlightedCountries = new Set([
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
  "Côte d'Ivoire",
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

export const displayNames = {
  "United Arab Emirates": "UAE",
  "United States of America": "USA",
  "Côte d'Ivoire": "Cote d'Ivoire",
};

export const focusedCountryCount = highlightedCountries.size;
export const regionalCorridors = 5;

// Marker set for the decorative hero globe (components/ui/globe.jsx). Every
// entry is one of the exact same `highlightedCountries` above - nothing
// added, nothing invented - plotted at that country's real, public
// geographic centre (or capital, where a centre point would fall somewhere
// implausible, e.g. a small dense country). Chennai stands in for India
// specifically, since it's ORAC's actual stated base ("EST 2026 / CHENNAI -
// SINGAPORE ALIGNED" in the page hero), not a generic country centroid.
export const globeMarkers = [
  { location: [13.0827, 80.2707], size: 0.14 }, // India (Chennai - ORAC's base)
  { location: [35.8617, 104.1954], size: 0.07 }, // China
  { location: [14.0583, 108.2772], size: 0.06 }, // Vietnam
  { location: [15.87, 100.9925], size: 0.06 }, // Thailand
  { location: [-0.7893, 113.9213], size: 0.06 }, // Indonesia
  { location: [31.0461, 34.8516], size: 0.05 }, // Israel
  { location: [23.4241, 53.8478], size: 0.07 }, // United Arab Emirates
  { location: [-6.369, 34.8888], size: 0.06 }, // Tanzania
  { location: [9.145, 40.4897], size: 0.06 }, // Ethiopia
  { location: [-18.7669, 46.8691], size: 0.05 }, // Madagascar
  { location: [12.8628, 30.2176], size: 0.05 }, // Sudan
  { location: [-18.6657, 35.5296], size: 0.05 }, // Mozambique
  { location: [-13.2543, 34.3015], size: 0.05 }, // Malawi
  { location: [7.3697, 12.3547], size: 0.05 }, // Cameroon
  { location: [9.082, 8.6753], size: 0.07 }, // Nigeria
  { location: [17.6078, 8.0817], size: 0.05 }, // Niger
  { location: [15.4542, 18.7322], size: 0.05 }, // Chad
  { location: [14.4974, -14.4524], size: 0.05 }, // Senegal
  { location: [7.54, -5.5471], size: 0.05 }, // Cote d'Ivoire
  { location: [9.3077, 2.3158], size: 0.05 }, // Benin
  { location: [7.9465, -1.0232], size: 0.05 }, // Ghana
  { location: [-14.235, -51.9253], size: 0.07 }, // Brazil
  { location: [37.0902, -95.7129], size: 0.07 }, // United States of America
  { location: [56.1304, -106.3468], size: 0.05 }, // Canada
  { location: [-25.2744, 133.7751], size: 0.06 }, // Australia
  { location: [35.9078, 127.7669], size: 0.06 }, // South Korea
  { location: [23.8859, 45.0792], size: 0.06 }, // Saudi Arabia
  { location: [51.1657, 10.4515], size: 0.06 }, // Germany
  { location: [46.2276, 2.2137], size: 0.06 }, // France
  { location: [40.4637, -3.7492], size: 0.05 }, // Spain
];

// All 30 highlighted countries get a dot on the globe, but only one per
// region cluster gets a name tag - the full set, all labelled at once,
// reads as noise (West Africa alone is 7 countries a few degrees apart).
// One legible anchor per corridor cluster, gateway-style, says the same
// geographic story without thirty overlapping tags fighting for space.
const featuredGlobeLabels = new Set([
  "India", // hub
  "China", // East Asia
  "Indonesia", // Southeast Asia
  "United Arab Emirates", // Middle East
  "Nigeria", // West Africa
  "Tanzania", // East Africa
  "Germany", // Europe
  "United States of America", // North America
  "Brazil", // South America
  "Australia", // Oceania
]);

// Same points as `globeMarkers`, labelled - for the hero globe's marker
// props (id/label), which cobe's own marker shape doesn't carry. Zipped by
// position against `highlightedCountries` (a Set, so insertion order is
// preserved) since that's the order both arrays were written in above.
export const globeMarkerPoints = Array.from(highlightedCountries).map((country, index) => ({
  id: country.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  location: globeMarkers[index].location,
  label: featuredGlobeLabels.has(country) ? displayNames[country] || country : undefined,
}));

// Same dots, no name tags - for the smaller globes reused elsewhere on the
// page (founder section, about panel) where the hero's gateway labels would
// just be repeated clutter rather than useful context.
export const globeMarkerPointsUnlabeled = globeMarkerPoints.map(({ id, location }) => ({ id, location }));

// Same "one corridor from India to each focused country" geometry
// GlobalReach draws on the flat map (see buildCorridors in GlobalReach.jsx) -
// reused here rather than re-derived, so the globe and the map never
// disagree about which countries are connected to the Chennai hub.
export const globeArcs = globeMarkerPoints.slice(1).map((point) => ({
  id: `chennai-${point.id}`,
  from: globeMarkerPoints[0].location,
  to: point.location,
}));
