import eventusHero from "../assets/images/eventus/eventus-hero.webp";
import eventusCover from "../assets/images/eventus/eventus-cover.webp";
import eventusHomeFlatlay from "../assets/images/eventus/eventus-home-flatlay.webp";
import weddingCouple from "../assets/images/eventus/wedding-couple.webp";
import bridalEntry from "../assets/images/eventus/bridal-entry.webp";
import cateringTable from "../assets/images/eventus/catering-table.webp";
import eventTable from "../assets/images/eventus/event-table.webp";
import floralTable from "../assets/images/eventus/floral-table.webp";
import decorStyling from "../assets/images/eventus/decor-styling.webp";
import venuesLogistics from "../assets/images/eventus/venues-logistics.webp";
import cateringServices from "../assets/images/eventus/catering-services.webp";
import entertainment from "../assets/images/eventus/entertainment.webp";
import giftingKeepsakes from "../assets/images/eventus/gifting-keepsakes.webp";
import memoryDesign from "../assets/images/eventus/memory-design.webp";
import guestExperience from "../assets/images/eventus/guest-experience.webp";
import planningCoordination from "../assets/images/eventus/planning-coordination.webp";
import weddingFilmCamera from "../assets/images/velorawed/wedding-film-camera.webp";
import weddingVideographer from "../assets/images/velorawed/wedding-videographer.webp";
import weddingPhotographer from "../assets/images/velorawed/wedding-photographer.webp";
import cameraTripod from "../assets/images/velorawed/camera-tripod.webp";
import { imageSlot } from "./imageSlot";

export const eventusImages = {
  hero: {
    src: eventusCover,
    alt: "An aerial view of a wedding ceremony mandap and seated guests on a lawn at sunset, by ORAC Eventus",
    label: "Eventus image",
    title: "Weddings, Celebrations & Moments, Mastered",
    description: "Wedding celebration imagery for ORAC Eventus.",
  },
  // Home.jsx's venture chapter only - distinct from `hero` above, which the
  // /eventus page itself also uses. Keeping this separate means the
  // homepage flatlay never leaks onto the venture page's own hero.
  homeHero: {
    src: eventusHomeFlatlay,
    alt: "Our Wedding & Event Planner book by ORAC Eventus / VELORAWED, styled with florals, bridal shoes, jewellery, and a wax-sealed invitation",
    label: "Eventus image",
    title: "Weddings, Celebrations & Moments, Mastered",
    description: "Wedding celebration imagery for ORAC Eventus.",
  },
  opening: {
    src: weddingCouple,
    alt: "A wedding couple celebrating at an ORAC Eventus wedding",
    label: "Eventus image",
  },
  services: {
    "Decor & Styling": imageSlot(
      "Eventus image",
      "A draped and floral-crowned mandap entrance styled by ORAC Eventus",
      decorStyling
    ),
    "Venues & Logistics": imageSlot(
      "Eventus image",
      "An aerial view of a themed wedding venue layout with dining and lounge zones",
      venuesLogistics
    ),
    "Catering Services": imageSlot(
      "Eventus image",
      "Chefs plating traditional dishes at a wedding buffet counter",
      cateringServices
    ),
    Entertainment: imageSlot(
      "Eventus image",
      "A giant Jenga lawn game set up for wedding guest entertainment",
      entertainment
    ),
    "Gifting & Keepsakes": imageSlot(
      "Eventus image",
      "Rows of curated wedding return-gift baskets tied with ribbon",
      giftingKeepsakes
    ),
    "Memory Design": imageSlot(
      "Eventus image",
      "A couple browsing a printed wedding photo album by VELORAWED",
      memoryDesign
    ),
    "Guest Experience": imageSlot(
      "Eventus image",
      "A coconut water cart set up for guest refreshment at a wedding",
      guestExperience
    ),
    "Planning & Coordination": imageSlot(
      "Eventus image",
      "Wedding planning details laid out, from stationery to bridal accessories",
      planningCoordination
    ),
  },
  gallery: [
    imageSlot("Eventus image", "Mandap decor for a wedding", eventusHero),
    imageSlot("Eventus image", "Wedding couple at a celebration", weddingCouple),
    imageSlot("Eventus image", "Bride entering a wedding celebration", bridalEntry),
    imageSlot("Eventus image", "Catering and live counters for wedding guests", cateringTable),
    imageSlot("Eventus image", "Elegant event table setting", eventTable),
    imageSlot("Eventus image", "Floral table setting for a celebration", floralTable),
  ],
};

export const velorawedImages = {
  hero: {
    src: weddingFilmCamera,
    alt: "VELORAWED cinematic wedding film frame",
    label: "VELORAWED image",
  },
  gallery: [
    imageSlot("VELORAWED image", "VELORAWED candid wedding photography", weddingPhotographer),
    imageSlot("VELORAWED image", "VELORAWED wedding cinematography camera", weddingFilmCamera),
    imageSlot("VELORAWED image", "VELORAWED wedding videographer", weddingVideographer),
    imageSlot("VELORAWED image", "VELORAWED camera setup for wedding films", cameraTripod),
    imageSlot("VELORAWED image", "VELORAWED celebration photography", bridalEntry),
  ],
};
