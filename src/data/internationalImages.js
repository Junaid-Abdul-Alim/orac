const catalogAssets = import.meta.glob("../assets/images/international/catalog/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const catalogImage = (fileName) =>
  catalogAssets[`../assets/images/international/catalog/${fileName}`] || "";

const imageSlot = (label = "ORAC visual", alt = "ORAC visual", src = "", options = {}) => ({
  src,
  alt,
  label,
  ...options,
});

const localImage = (fileName, alt, options) =>
  imageSlot("Product image", alt, catalogImage(fileName), options);

const productImages = {
  "Urad Dal": localImage("urad-dal.jpg", "Urad dal export product visual"),
  "Toor Dal": localImage("toor-dal.jpg", "Toor dal export product visual"),
  "Masoor Dal": localImage("masoor-dal.jpg", "Masoor dal export product visual"),
  "Cashew Nuts": localImage("cashew-nuts.jpg", "Cashew nuts export product visual"),
  Cardamom: localImage("cardamom.jpg", "Cardamom export product visual"),
  "Red Chilli & Powder": localImage("red-chilli-powder.jpg", "Red chilli and powder export product visual"),
  "Cumin Seeds & Powder": localImage("cumin-seeds-powder.jpg", "Cumin seeds and powder export product visual"),
  "Turmeric & Powder": localImage("turmeric-powder.jpg", "Turmeric and powder export product visual"),
  "Coriander Seeds & Powder": localImage(
    "coriander-seeds-powder.jpg",
    "Coriander seeds and powder export product visual"
  ),
  Saffron: localImage("saffron.jpg", "Saffron export product visual"),
  Onion: localImage("onions.jpg", "Onion export product visual"),
  "Mango & Mango Concentrate": localImage(
    "mango-mango-concentrate.jpg",
    "Mango and mango concentrate export product visual"
  ),
  Tamarind: localImage("tamarind.jpg", "Tamarind export product visual"),
  "Moringa Powder": localImage("moringa-powder.jpg", "Moringa powder export product visual"),
  "Sesame Seeds": localImage("sesame-seeds.jpg", "Sesame seeds export product visual"),
  Millets: localImage("millets.jpg", "Millets export product visual"),
  Papad: localImage("papad.jpg", "Papad export product visual"),
  "Phool Makhana": localImage("phool-makhana.jpg", "Phool makhana export product visual"),
  "Neem Oil": localImage("neem-oil.jpg", "Neem oil export product visual"),
  "Waste Cotton": localImage("waste-cotton-bale.jpg", "Waste cotton bale export product visual"),
  "Cotton Yarn": localImage("cotton-yarn.jpg", "Cotton yarn export product visual"),
  "Silk Fibre": localImage("silk-fiber.jpg", "Silk fibre export product visual"),
  "Coco Fibre": localImage("coir-fiber.jpg", "Coir fibre export product visual"),
  "Coco Peat": localImage("coco-peat-blocks.jpg", "Coco peat blocks export product visual"),
  "Jute Bags - Customised": localImage("jute-bags.jpg", "Customised jute bag export product visual"),
  "Quartz Lumps": localImage("quartz-lumps.jpg", "Quartz lumps export product visual"),
  "Grill Lights": localImage("grill-lights.jpg", "Vehicle grill lights import product visual"),
  "Projector & LED Headlights": localImage("projector-lights.jpg", "Projector lights import product visual", {
    secondarySrc: catalogImage("led-headlights.jpg"),
    secondaryAlt: "LED headlights import product visual",
  }),
  "Damping Sheets": localImage("damping-sheets.jpg", "Automotive damping sheets import product visual"),
  "4x4 Winches": localImage("4x4-winches.jpg", "4x4 winches import product visual"),
  "On-Board Air Compressors": localImage(
    "on-board-air-compressor.jpg",
    "On-board air compressor import product visual"
  ),
  "PPF - Paint Protection Film": localImage(
    "ppf-paint-protection-film.jpg",
    "Paint protection film import product visual"
  ),
  "Dashboard Gadgets": localImage("ambient-strip-lights.jpg", "Automotive dashboard lighting accessory visual"),
  "Ambient Strip Lights": localImage("ambient-strip-lights.jpg", "Ambient strip lights import product visual"),
  "Camping & Off-Road Kits": localImage(
    "camping-off-road-kits.jpg",
    "Camping and off-road kits import product visual"
  ),
  "Sun Film": localImage("sun-film.jpg", "Automotive sun film import product visual"),
  "Raw Cotton": localImage("raw-cotton.jpg", "Raw cotton import product visual"),
  "Soya Bean": localImage("soya-beans.jpg", "Soya beans import product visual"),
  "Raw Cashew Nuts": localImage("raw-cashew-nuts.jpg", "Raw cashew nuts import product visual"),
  "Stone Flower": localImage("stone-flower.jpg", "Stone flower import product visual"),
  "Pigeon Peas": localImage("pigeon-peas.jpg", "Pigeon peas import product visual"),
  "Kidney Beans": localImage("kidney-beans.jpg", "Kidney beans import product visual"),
  "Black Matpe": localImage("black-matpe.jpg", "Black matpe import product visual"),
  "Cassia Tora Seeds": localImage("cassia-tora-seeds.jpg", "Cassia tora seeds import product visual"),
  "Dry Hibiscus Flower": localImage("dry-hibiscus-flower.jpg", "Dry hibiscus flower import product visual"),
  "Sesame Seeds - African": localImage("sesame-seeds.jpg", "Sesame seeds import product visual"),
  "PVC Regrind": localImage("pvc-regrind-scrap.jpg", "PVC regrind scrap import product visual"),
  "OCC - Corrugated Carton Scrap": localImage(
    "old-corrugated-carton-scrap.jpg",
    "Old corrugated carton scrap import product visual"
  ),
  "Used Beverage Can Scrap": localImage(
    "used-beverage-cans-scrap.jpg",
    "Used beverage cans scrap import product visual"
  ),
};

export const productImageSlot = (productName) =>
  productImages[productName] || imageSlot("Product visual", `${productName} product image`);

export const internationalImages = {
  hero: {
    src: catalogImage("red-chilli-powder.jpg"),
    alt: "Red chilli and powder prepared as an ORAC International export product",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "ORAC International product imagery prepared for export and import conversations.",
  },
  banner: {
    src: catalogImage("coir-fiber.jpg"),
    alt: "Coir fibre export product visual from ORAC International",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "A catalogue-led view of sourcing, verification, and movement.",
  },
  exports: {
    "Pulses & Lentils": imageSlot(
      "Product image",
      "Selected pulses and lentils for export",
      catalogImage("toor-dal.jpg")
    ),
    "Spices & Aromatics": imageSlot(
      "Trade image",
      "Spices and aromatics sourced for export",
      catalogImage("cardamom.jpg")
    ),
    "Fresh, Dry & Processed Agri": imageSlot(
      "Product image",
      "Fresh, dry, and processed agri products",
      catalogImage("mango-mango-concentrate.jpg")
    ),
    "Fibres, Coir & Industrial": imageSlot(
      "Product image",
      "Coir fibres and industrial export materials",
      catalogImage("coir-fiber.jpg")
    ),
  },
  imports: {
    "Automotive Parts & Accessories": imageSlot(
      "Import image",
      "Automotive accessories for import into India",
      catalogImage("camping-off-road-kits.jpg")
    ),
    "Grill Lights": imageSlot(
      "Import image",
      "Vehicle grill lights imported by ORAC International",
      catalogImage("grill-lights.jpg")
    ),
    "Projector & LED Headlights": imageSlot(
      "Import image",
      "Projector and LED headlights for automotive import",
      catalogImage("projector-lights.jpg")
    ),
    "Damping Sheets": imageSlot(
      "Import image",
      "Automotive damping sheets for ride refinement",
      catalogImage("damping-sheets.jpg")
    ),
    "4x4 Winches": imageSlot(
      "Import image",
      "4x4 winches for off-road automotive import",
      catalogImage("4x4-winches.jpg")
    ),
    "On-Board Air Compressors": imageSlot(
      "Import image",
      "On-board air compressors for off-road vehicles",
      catalogImage("on-board-air-compressor.jpg")
    ),
    "Agri Imports - Africa & Asia": imageSlot(
      "Product image",
      "Agricultural imports from Africa and Asia",
      catalogImage("pigeon-peas.jpg")
    ),
    "Industrial & Scrap Imports": imageSlot(
      "Import image",
      "Industrial and scrap imports",
      catalogImage("used-beverage-cans-scrap.jpg")
    ),
  },
};
