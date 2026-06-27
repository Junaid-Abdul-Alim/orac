import eventusHero from "../assets/images/eventus/eventus-hero.jpg";
import weddingCouple from "../assets/images/eventus/wedding-couple.jpg";
import bridalEntry from "../assets/images/eventus/bridal-entry.jpg";
import cateringTable from "../assets/images/eventus/catering-table.jpg";
import eventTable from "../assets/images/eventus/event-table.jpg";
import floralTable from "../assets/images/eventus/floral-table.jpg";
import weddingFilmCamera from "../assets/images/velorawed/wedding-film-camera.jpg";
import weddingVideographer from "../assets/images/velorawed/wedding-videographer.jpg";
import weddingPhotographer from "../assets/images/velorawed/wedding-photographer.jpg";
import cameraTripod from "../assets/images/velorawed/camera-tripod.jpg";

const imageSlot = (label = "Image", alt = "Image", src) => ({
  src,
  alt,
  label,
});

export const eventusImages = {
  hero: {
    src: eventusHero,
    alt: "ORAC Eventus wedding celebration",
    label: "Eventus image",
    title: "Weddings, Celebrations & Moments, Mastered",
    description: "Wedding celebration imagery for ORAC Eventus.",
  },
  services: {
    "Decor & Styling": imageSlot("Eventus image", "Mandap decor and wedding styling by ORAC Eventus", eventusHero),
    "Venues & Logistics": imageSlot("Eventus image", "Elegant wedding venue setup and logistics", floralTable),
    "Catering Services": imageSlot("Eventus image", "Wedding catering and live counters", cateringTable),
    Entertainment: imageSlot("Eventus image", "Wedding entertainment and live sound", eventTable),
    "Gifting & Keepsakes": imageSlot("Eventus image", "Wedding keepsakes and celebration details", bridalEntry),
    "Guest Experience": imageSlot("Eventus image", "Guest experience and hospitality at a wedding", weddingCouple),
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
