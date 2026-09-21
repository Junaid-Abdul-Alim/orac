// The homepage's narrative layer: what ORAC is, what each venture does in one
// line, why it exists, and the connective sentences between chapters.
//
// Every line here is drawn from claims the site already makes elsewhere
// (companyData.js, Home.jsx, HoldingIntro.jsx, WhyOrac.jsx). Nothing here adds
// a number, client, date, award, or capability - if a line needs to change,
// change it against the confirmed copy, not against a wish for a better sound.

export const heroStory = {
  eyebrow: "ORAC Holdings",
  headline: ["Three businesses.", "One house."],
  lede: "ORAC Holdings is the parent house for ventures across trade, events, and fashion. Each was built on hands-on expertise, and each has a clear role inside the group.",
};

// One plain-language line per venture, shown under its card in the opening so
// a visitor learns what each one does without opening anything.
export const ventureLines = {
  international: { no: "01", line: "Goods that cross borders." },
  eventus: { no: "02", line: "Moments worth keeping." },
  "luxury-export": { no: "03", line: "Cloth made with restraint." },
};

// Chapter markers. Numbering follows the homepage's existing section order.
export const chapters = {
  house: { no: "01", title: "The House", note: "Who ORAC is" },
  international: { no: "02", title: "Trade", note: "Global trade" },
  eventus: { no: "03", title: "Celebration", note: "Event planning" },
  luxe: { no: "04", title: "Craft", note: "Fashion & textiles" },
  standard: { no: "05", title: "The Standard", note: "Why ORAC" },
  people: { no: "06", title: "The People", note: "Leadership" },
};

// "Why it exists" - one sentence per venture, the reason behind the work.
export const ventureWhy = {
  international: "Trade works when sourcing is responsible and quality is verified.",
  eventus: "A family should feel supported from the first call to the final frame.",
  luxe: "Fashion is better made slowly: cloth first, then craft, held back by restraint.",
};

// Title cards that carry the visitor from one world into the next.
export const bridges = [
  {
    id: "trade-to-celebration",
    kicker: "Trade to celebration",
    line: "Goods that travel. Moments that stay.",
  },
  {
    id: "celebration-to-craft",
    kicker: "Celebration to craft",
    line: "Moments that stay. Cloth that lasts.",
  },
  {
    id: "craft-to-standard",
    kicker: "Three worlds, one standard",
    line: "Different work. The same discipline.",
  },
];
