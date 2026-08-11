import { imageSlot } from "./imageSlot";
import coverLandscape from "../assets/images/international/hero/cover-landscape.webp";
import coverPortrait from "../assets/images/international/hero/cover-portrait.webp";
import bannerLandscape from "../assets/images/international/hero/banner-landscape.webp";
import bannerPortrait from "../assets/images/international/hero/banner-portrait.webp";
import homeCargoCompass from "../assets/images/international/hero/global-network-cargo-ship.webp";

const catalogAssets = import.meta.glob("../assets/images/international/catalog/*.{jpg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const catalogImage = (fileName) => catalogAssets[`../assets/images/international/catalog/${fileName}`] || "";

const localImage = (fileName, alt, options) =>
  imageSlot("Product image", alt, catalogImage(fileName), options);

// Official ORAC International product photography (src/assets/images/international/README.md).
// Every product below is now sourced from ORAC's own catalogue imagery -
// clean, uncropped studio photography with no baked-in branding to work
// around, unlike the earlier stock placeholders.
const productImages = {
  "Urad Dal": localImage("urad-dal-official.webp", "Urad dal export product visual"),
  "Toor Dal": localImage("toor-dal-official.webp", "Toor dal export product visual"),
  "Masoor Dal": localImage("masoor-dal-official.webp", "Masoor dal export product visual"),
  "Cashew Nuts": localImage("cashew-nuts-official.webp", "Cashew nuts export product visual"),
  Cardamom: localImage("cardamom-official.webp", "Cardamom export product visual"),
  "Red Chilli & Powder": localImage(
    "red-chilli-powder-official.webp",
    "Red chilli and powder export product visual"
  ),
  "Cumin Seeds & Powder": localImage(
    "cumin-seeds-powder-official.webp",
    "Cumin seeds and powder export product visual"
  ),
  "Turmeric & Powder": localImage("turmeric-powder-official.webp", "Turmeric and powder export product visual"),
  "Coriander Seeds & Powder": localImage(
    "coriander-seeds-powder-official.webp",
    "Coriander seeds and powder export product visual"
  ),
  Saffron: localImage("saffron-official.webp", "Saffron export product visual"),
  Onion: localImage("onions-official.webp", "Onion export product visual"),
  "Mango & Mango Concentrate": localImage(
    "mango-mango-concentrate-official.webp",
    "Mango and mango concentrate export product visual"
  ),
  Tamarind: localImage("tamarind-official.webp", "Tamarind export product visual"),
  "Moringa Powder": localImage("moringa-powder-official.webp", "Moringa powder export product visual"),
  "Sesame Seeds": localImage("sesame-seeds-official.webp", "Sesame seeds export product visual"),
  Millets: localImage("millets-official.webp", "Millets export product visual"),
  Papad: localImage("papad-official.webp", "Papad export product visual"),
  "Phool Makhana": localImage("phool-makhana-official.webp", "Phool makhana export product visual"),
  "Neem Oil": localImage("neem-oil-official.webp", "Neem oil export product visual"),
  "Waste Cotton": localImage("waste-cotton-bale-official.webp", "Waste cotton bale export product visual"),
  "Cotton Yarn": localImage("cotton-yarn-official.webp", "Cotton yarn export product visual"),
  "Silk Fibre": localImage("silk-fiber-official.webp", "Silk fibre export product visual"),
  "Coco Fibre": localImage("coir-fiber-official.webp", "Coir fibre export product visual"),
  "Coco Peat": localImage("coco-peat-blocks-official.webp", "Coco peat blocks export product visual"),
  "Jute Bags - Customised": localImage("jute-bags-official.webp", "Customised jute bag export product visual"),
  "Quartz Lumps": localImage("quartz-lumps-official.webp", "Quartz lumps export product visual"),
  "Other LED Lights & Spares": localImage(
    "grill-lights-official.webp",
    "Vehicle grill lights import product visual"
  ),
  "Projector & Fog Lights": localImage("projector-lights-official.webp", "Projector and fog lights import product visual"),
  "LED Headlights": localImage("led-headlights-official.webp", "LED headlights import product visual"),
  "Damping Sheets": localImage("damping-sheets-official.webp", "Automotive damping sheets import product visual"),
  "4x4 Winches": localImage("4x4-winches-official.webp", "4x4 winches import product visual"),
  "On-Board Air Compressors": localImage(
    "on-board-air-compressor-official.webp",
    "On-board air compressor import product visual"
  ),
  "PPF - Paint Protection Film": localImage(
    "ppf-paint-protection-film-official.webp",
    "Paint protection film import product visual"
  ),
  "Ambient Strip Lights": localImage(
    "ambient-strip-lights-official.webp",
    "Ambient strip lights import product visual"
  ),
  "Camping & Off-Road Kits": localImage(
    "camping-off-road-kits-official.webp",
    "Camping and off-road kits import product visual"
  ),
  "Sun Film": localImage("sun-film-official.webp", "Automotive sun film import product visual"),
  "Raw Cotton": localImage("raw-cotton-official.webp", "Raw cotton import product visual"),
  "Soya Bean": localImage("soya-beans-official.webp", "Soya beans import product visual"),
  "Raw Cashew Nuts": localImage("raw-cashew-nuts-official.webp", "Raw cashew nuts import product visual"),
  "Stone Flower": localImage("stone-flower-official.webp", "Stone flower import product visual"),
  "Pigeon Peas": localImage("pigeon-peas-official.webp", "Pigeon peas import product visual"),
  "Kidney Beans": localImage("kidney-beans-official.webp", "Kidney beans import product visual"),
  "Black Matpe": localImage("black-matpe-official.webp", "Black matpe import product visual"),
  "Cassia Tora Seeds": localImage("cassia-tora-seeds-official.webp", "Cassia tora seeds import product visual"),
  "Dry Hibiscus Flower": localImage(
    "dry-hibiscus-flower-official.webp",
    "Dry hibiscus flower import product visual"
  ),
  "Sesame Seeds - African": localImage("sesame-seeds-official.webp", "Sesame seeds import product visual"),
  "PVC Regrind": localImage("pvc-regrind-scrap-official.webp", "PVC regrind scrap import product visual"),
  "OCC - Corrugated Carton Scrap": localImage(
    "old-corrugated-carton-scrap-official.webp",
    "Old corrugated carton scrap import product visual"
  ),
  "Used Beverage Can Scrap": localImage(
    "used-beverage-cans-scrap-official.webp",
    "Used beverage cans scrap import product visual"
  ),
};

export const productImageSlot = (productName) =>
  productImages[productName] || imageSlot("Product visual", `${productName} product image`);

export const internationalImages = {
  // Homepage-only slot (Home.jsx's venture chapter, a shared cross-venture
  // layout with its own fixed-ratio crop tuning - see 04-sections.css), out
  // of scope for the /international page's own official-photography pass.
  hero: {
    src: homeCargoCompass,
    alt: "A container ship approaching at night beneath a glowing world map of trade connections, city skyline in the background",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "ORAC International product imagery prepared for export and import conversations.",
  },
  opening: {
    src: catalogImage("coir-fiber.webp"),
    alt: "Coir fibre bales and rolled matting, an ORAC International export product",
    label: "Trade image",
  },
  // The /international page's own hero - real ORAC photography, not stock.
  // `mobileSrc` is a distinct portrait recomposition (not a crop of the
  // landscape file), swapped in under 820px by SafeImage's <picture> support.
  pageHero: {
    src: coverLandscape,
    mobileSrc: coverPortrait,
    alt: "Aerial view of a container port with ships being loaded, marked with the ORAC wordmark",
    label: "Trade image",
  },
  // A complete, already-composed ORAC graphic (wordmark, "What We Do" icon
  // set, and the "Your Vision. Our Commitment." line all baked in) - shown
  // whole, with no separate overlaid title/description, so nothing on top
  // duplicates what the image already says.
  banner: {
    src: bannerLandscape,
    mobileSrc: bannerPortrait,
    alt: "ORAC International's What We Do capability graphic over an aerial container ship photo: Export, Import, Sourcing, Trade Management, Supplier Network, Compliance & Documentation - Your Vision. Our Commitment.",
  },
  exports: {
    "Pulses & Lentils": imageSlot(
      "Product image",
      "Selected pulses and lentils for export",
      catalogImage("toor-dal-official.webp")
    ),
    "Spices & Aromatics": imageSlot(
      "Trade image",
      "Spices and aromatics sourced for export",
      catalogImage("cardamom-official.webp")
    ),
    "Fresh, Dry & Processed Agri": imageSlot(
      "Product image",
      "Fresh, dry, and processed agri products",
      catalogImage("mango-mango-concentrate-official.webp")
    ),
    "Fibres, Coir & Industrial": imageSlot(
      "Product image",
      "Coir fibres and industrial export materials",
      catalogImage("coir-fiber-official.webp")
    ),
  },
  imports: {
    "Automotive Parts & Accessories": imageSlot(
      "Import image",
      "Automotive accessories for import into India",
      catalogImage("camping-off-road-kits-official.webp")
    ),
    "Grill Lights": imageSlot(
      "Import image",
      "Vehicle grill lights imported by ORAC International",
      catalogImage("grill-lights-official.webp")
    ),
    "Projector & LED Headlights": imageSlot(
      "Import image",
      "Projector and LED headlights for automotive import",
      catalogImage("projector-lights-official.webp")
    ),
    "Damping Sheets": imageSlot(
      "Import image",
      "Automotive damping sheets for ride refinement",
      catalogImage("damping-sheets-official.webp")
    ),
    "4x4 Winches": imageSlot(
      "Import image",
      "4x4 winches for off-road automotive import",
      catalogImage("4x4-winches-official.webp")
    ),
    "On-Board Air Compressors": imageSlot(
      "Import image",
      "On-board air compressors for off-road vehicles",
      catalogImage("on-board-air-compressor-official.webp")
    ),
    "Agri Imports - Africa & Asia": imageSlot(
      "Product image",
      "Agricultural imports from Africa and Asia",
      catalogImage("pigeon-peas-official.webp")
    ),
    "Industrial & Scrap Imports": imageSlot(
      "Import image",
      "Industrial and scrap imports",
      catalogImage("used-beverage-cans-scrap-official.webp")
    ),
  },
};
