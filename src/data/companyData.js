import { eventusImages } from "./eventusImages";
import { internationalImages } from "./internationalImages";
import oracEventusLogo from "../assets/logos/orac-eventus.svg";
import oracInternationalLogo from "../assets/logos/orac-international.svg";
import oracLuxeLogo from "../assets/logos/orac-luxe.svg";
import luxeAtelier from "../assets/images/luxe/fashion-atelier.jpg";

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
    label: "Event Planning",
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
    label: "A Fashion House",
    purpose: "A fashion house from ORAC Holdings, currently being prepared with care.",
    status: "Opening Soon",
    route: "/luxury-export",
    image: assetPaths.luxuryExport,
    logo: oracLuxeLogo,
    summary: "A fashion house from ORAC Holdings, currently being prepared with care.",
    cta: "Opening Soon",
  },
];

export const leadership = [
  {
    name: "Ohm Pranav",
    role: "Founder & Chairman",
    focus: "ORAC Holdings, ORAC International",
  },
  {
    name: "Rajkumar Janjinam",
    role: "Director",
    focus: "ORAC Holdings, ORAC International",
  },
  {
    name: "Arjun Prabhakaran",
    role: "Managing Director",
    focus: "ORAC Eventus",
  },
  {
    name: "Athila Ashrin Rahmathullah",
    role: "Managing Director",
    focus: "ORAC Luxe, AZRIN",
  },
];
