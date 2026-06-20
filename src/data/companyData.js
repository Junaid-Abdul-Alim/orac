import { eventusImages } from "./eventusImages";
import { internationalImages } from "./internationalImages";
import oracEventusLogo from "../assets/logos/orac-eventus.svg";
import oracInternationalLogo from "../assets/logos/orac-international.svg";
import oracLuxeLogo from "../assets/logos/orac-luxe.svg";

export const assetPaths = {
  holding: "",
  international: internationalImages.hero.src,
  eventus: eventusImages.hero.src,
  luxuryExport: "",
  evolution: "",
};

export const companies = [
  {
    id: "international",
    name: "ORAC INTERNATIONAL",
    shortName: "International",
    label: "Export & Import",
    purpose: "Export and import trading across agri-commodities, industrial fibres, minerals, and automotive accessories.",
    status: "Active",
    route: "/international",
    image: assetPaths.international,
    logo: oracInternationalLogo,
    summary:
      "Export and import trading across agri-commodities, industrial fibres, minerals, and automotive accessories. Est. 22 April 2026.",
    cta: "Visit International",
  },
  {
    id: "eventus",
    name: "ORAC EVENTUS",
    shortName: "Eventus",
    label: "Weddings, Celebrations & Moments, Mastered",
    purpose: "Full-service event management and wedding photography, including the VELORAWED photography brand.",
    status: "Active",
    route: "/eventus",
    image: assetPaths.eventus,
    logo: oracEventusLogo,
    summary:
      "Full-service event management and wedding photography, including the VELORAWED photography brand. Based in Thanjavur.",
    cta: "Visit Eventus",
  },
  {
    id: "luxury-export",
    name: "ORAC LUXE",
    shortName: "Luxe",
    label: "Opening Soon",
    purpose: "Opening Soon.",
    status: "Opening Soon",
    route: "/luxury-export",
    image: assetPaths.luxuryExport,
    logo: oracLuxeLogo,
    summary: "Opening Soon.",
    cta: "Opening Soon",
  },
  {
    id: "evolution",
    name: "ORAC EVOLUTION",
    shortName: "Evolution",
    label: "Opening Soon",
    purpose: "Opening Soon.",
    status: "Opening Soon",
    route: "/evolution",
    image: assetPaths.evolution,
    summary: "Opening Soon.",
    cta: "Opening Soon",
  },
];

export const leadership = [
  {
    name: "Ohm Pranav P.R.",
    role: "Founder & Managing Director",
    focus: "ORAC Holdings & ORAC International",
    body:
      "Born in Rajapalayam, Ohm Pranav built his career on the ground across Africa, Southeast Asia, and the Middle East before founding his own group. ORAC Holdings is his vision, ORAC International is his daily craft.",
  },
  {
    name: "Rajkumar",
    role: "Director",
    focus: "Client relations & Singapore operations",
    body:
      "Rajkumar is the relationship anchor of the group. Operating from Singapore, he manages client partnerships, trade development, and business growth across Asia.",
  },
  {
    name: "Arjun Prabhakaran",
    role: "Managing Director",
    focus: "ORAC Eventus & VELORAWED",
    body:
      "Arjun grew up in Thanjavur, a city that lives and breathes celebration. He founded ORAC Eventus to offer event management that actually cares, and created VELORAWED as a wedding photography brand built on one conviction: photographs should feel as real as the day itself.",
  },
];
