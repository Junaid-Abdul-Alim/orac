const imageSlot = (label = "Image to be added", alt = "Image to be added") => ({
  src: "",
  alt,
  label,
});

export const eventusImages = {
  hero: {
    src: "",
    alt: "ORAC Eventus premium wedding celebration",
    label: "Image to be added",
    title: "Weddings, Celebrations & Moments, Mastered",
    description: "Add the primary ORAC Eventus celebration image here.",
  },
  services: {
    "Decor & Styling": imageSlot("Image to be added", "Mandap decor and wedding styling by ORAC Eventus"),
    "Venues & Logistics": imageSlot("Image to be added", "Premium wedding venue setup and logistics"),
    "Catering Services": imageSlot("Image to be added", "Wedding catering and live counters"),
    Entertainment: imageSlot("Image to be added", "Wedding entertainment and live sound"),
    "Gifting & Keepsakes": imageSlot("Image to be added", "Wedding gifting and keepsakes"),
    "Guest Experience": imageSlot("Image to be added", "Guest experience and hospitality at a wedding"),
  },
  gallery: [
    imageSlot("Image to be added", "Mandap decor for a premium wedding"),
    imageSlot("Image to be added", "Floral stage setup for a wedding celebration"),
    imageSlot("Image to be added", "Wedding venue setup with premium styling"),
    imageSlot("Image to be added", "Catering and live counters for wedding guests"),
    imageSlot("Image to be added", "Entertainment setup for a celebration"),
    imageSlot("Image to be added", "Guest experience details for a premium event"),
  ],
};

export const velorawedImages = {
  hero: {
    src: "",
    alt: "VELORAWED cinematic wedding film frame",
    label: "Image to be added",
  },
  gallery: [
    imageSlot("Image to be added", "VELORAWED candid wedding photography"),
    imageSlot("Image to be added", "VELORAWED aerial drone wedding coverage"),
    imageSlot("Image to be added", "VELORAWED pre-wedding shoot"),
    imageSlot("Image to be added", "VELORAWED family portrait photography"),
    imageSlot("Image to be added", "VELORAWED premium wedding album design"),
  ],
};
