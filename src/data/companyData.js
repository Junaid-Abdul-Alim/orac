import { eventusImages } from "./eventusImages";
import { internationalImages } from "./internationalImages";
import oracEventusLogo from "../assets/logos/orac-eventus.svg";
import oracInternationalLogo from "../assets/logos/orac-international.svg";
import oracLuxeLogo from "../assets/logos/orac-luxe.svg";
import luxeAtelier from "../assets/images/luxe/fashion-atelier.webp";

export const assetPaths = {
  holding: internationalImages.hero.src,
  international: internationalImages.hero.src,
  eventus: eventusImages.hero.src,
  luxuryExport: luxeAtelier,
};

export const companies = [
  {
    id: "international",
    name: "ORAC INTERNATIONAL",
    shortName: "International",
    label: "Global Trade",
    purpose: "Export and import trading across agri-commodities, industrial fibres, minerals, and automotive accessories.",
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
    label: "Event Planning",
    purpose: "Chennai-based full-service event management for weddings, celebrations, and visual storytelling through VELORAWED.",
    route: "/eventus",
    image: assetPaths.eventus,
    logo: oracEventusLogo,
    summary:
      "Chennai-based full-service event management for weddings, celebrations, and visual storytelling through VELORAWED.",
    cta: "Visit Eventus",
  },
  {
    id: "luxury-export",
    name: "ORAC LUXE",
    shortName: "Luxe",
    label: "Fashion & Textiles",
    purpose: "A fabric-forward fashion house for ready-to-wear, white-label textiles, in-house atelier work, and handmade craft.",
    route: "/luxury-export",
    image: assetPaths.luxuryExport,
    logo: oracLuxeLogo,
    summary:
      "A fabric-forward fashion house built around deliberate making, quality cloth, atelier work, and handmade craft.",
    cta: "Explore Luxe",
  },
];

export const leadership = [
  {
    name: "Ohm Pranav",
    role: "Founder & Chairman",
    focus: "ORAC Holding, ORAC International",
  },
  {
    name: "Rajkumar Janjinam",
    role: "Director",
    focus: "ORAC Holding, ORAC International",
  },
  {
    name: "Arjun Prabhakaran",
    role: "Managing Director",
    focus: "ORAC Eventus",
  },
  {
    name: "Athila Ashrin Rahmathullah",
    role: "Managing Director",
    focus: "ORAC Luxe, Fashion & Textiles",
  },
];
