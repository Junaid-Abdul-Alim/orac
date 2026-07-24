import eventusHero from "../assets/images/eventus/eventus-hero.webp";
import weddingCouple from "../assets/images/eventus/wedding-couple.webp";
import bridalEntry from "../assets/images/eventus/bridal-entry.webp";
import cateringTable from "../assets/images/eventus/catering-table.webp";
import eventTable from "../assets/images/eventus/event-table.webp";
import floralTable from "../assets/images/eventus/floral-table.webp";
import weddingFilmCamera from "../assets/images/velorawed/wedding-film-camera.webp";
import weddingVideographer from "../assets/images/velorawed/wedding-videographer.webp";
import weddingPhotographer from "../assets/images/velorawed/wedding-photographer.webp";
import cameraTripod from "../assets/images/velorawed/camera-tripod.webp";
import { imageSlot } from "./imageSlot";

export const eventusImages = {
  hero: {
    src: eventusHero,
    alt: "ORAC Eventus wedding celebration",
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
      "Mandap decor and wedding styling by ORAC Eventus",
      eventusHero
    ),
    "Venues & Logistics": imageSlot(
      "Eventus image",
      "Elegant wedding venue setup and logistics",
      floralTable
    ),
    "Catering Services": imageSlot("Eventus image", "Wedding catering and live counters", cateringTable),
    Entertainment: imageSlot("Eventus image", "Wedding entertainment and live sound", eventTable),
    "Gifting & Keepsakes": imageSlot(
      "Eventus image",
      "Wedding keepsakes and celebration details",
      bridalEntry
    ),
    "Memory Design": imageSlot(
      "Eventus image",
      "Wedding albums, films, and memory design by VELORAWED",
      weddingFilmCamera
    ),
    "Guest Experience": imageSlot(
      "Eventus image",
      "Guest experience and hospitality at a wedding",
      weddingCouple
    ),
    "Planning & Coordination": imageSlot(
      "Eventus image",
      "Wedding planning coordination and event team details",
      floralTable
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
