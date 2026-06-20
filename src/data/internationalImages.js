const imageSlot = (label = "Image to be added", alt = "Image to be added") => ({
  src: "",
  alt,
  label,
});

export const productImageSlot = (productName) =>
  imageSlot("Image to be added", `${productName} product image`);

export const internationalImages = {
  hero: {
    src: "",
    alt: "ORAC International global import and export trade movement",
    label: "Image to be added",
    title: "Source. Verify. Move with care.",
    description: "Add the primary ORAC International trade image here.",
  },
  banner: {
    src: "",
    alt: "Cargo shipping and global sourcing for ORAC International",
    label: "Image to be added",
    title: "Source. Verify. Move with care.",
    description: "Add a wide trade, sourcing, or shipment image here.",
  },
  exports: {
    "Pulses & Lentils": imageSlot("Image to be added", "Premium pulses and lentils for export"),
    "Spices & Aromatics": imageSlot("Image to be added", "Indian spices sourced for export"),
    "Fresh, Dry & Processed Agri": imageSlot("Image to be added", "Fresh, dry, and processed agricultural exports"),
    "Fibres, Coir & Industrial": imageSlot("Image to be added", "Fibres coir and industrial export materials"),
  },
  imports: {
    "Automotive Parts & Accessories": imageSlot("Image to be added", "Premium automotive accessories for import into India"),
    "Grill Lights": imageSlot("Image to be added", "Vehicle grill lights imported by ORAC International"),
    "Projector & LED Headlights": imageSlot("Image to be added", "Projector and LED headlights for automotive import"),
    "Damping Sheets": imageSlot("Image to be added", "Automotive damping sheets for ride refinement"),
    "4x4 Winches": imageSlot("Image to be added", "4x4 winches for off-road automotive import"),
    "On-Board Air Compressors": imageSlot("Image to be added", "On-board air compressors for off-road vehicles"),
    "Agri Imports - Africa & Asia": imageSlot("Image to be added", "Agricultural imports from Africa and Asia"),
    "Industrial & Scrap Imports": imageSlot("Image to be added", "Industrial and scrap imports"),
  },
};
