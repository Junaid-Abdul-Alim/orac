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
