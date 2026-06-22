import spicesMarket from "../assets/images/international/spices-market.jpg";
import spicesSpoons from "../assets/images/international/spices-spoons.jpg";
import pulsesBowls from "../assets/images/international/pulses-bowls.jpg";
import lentils from "../assets/images/international/lentils.jpg";
import cashews from "../assets/images/international/cashews.jpg";
import cardamom from "../assets/images/international/cardamom.jpg";
import sesameSeeds from "../assets/images/international/sesame-seeds.jpg";
import saffronCardamom from "../assets/images/international/saffron-cardamom.jpg";
import turmericPowder from "../assets/images/international/turmeric-powder.jpg";
import cuminSeeds from "../assets/images/international/cumin-seeds.jpg";
import corianderSeeds from "../assets/images/international/coriander-seeds.jpg";
import redChilliPowder from "../assets/images/international/red-chilli-powder.jpg";
import onions from "../assets/images/international/onions.jpg";

const imageSlot = (label = "Image to be added", alt = "Image to be added", src = "") => ({
  src,
  alt,
  label,
});

const localImage = (src, alt) => imageSlot("Product image", alt, src);

const productImages = {
  "Urad Dal": localImage(pulsesBowls, "Assorted pulses for export trade"),
  "Toor Dal": localImage(pulsesBowls, "Pulses arranged in bowls for agricultural trade"),
  "Masoor Dal": localImage(lentils, "Red lentils for pulse trade"),
  "Cashew Nuts": localImage(cashews, "Cashew nuts for export"),
  Cardamom: localImage(cardamom, "Cardamom pods arranged for trade"),
  "Red Chilli & Powder": localImage(redChilliPowder, "Red chilli powder and spices"),
  "Cumin Seeds & Powder": localImage(cuminSeeds, "Cumin seeds for export"),
  "Turmeric & Powder": localImage(turmericPowder, "Turmeric powder for export"),
  "Coriander Seeds & Powder": localImage(corianderSeeds, "Coriander seeds for export"),
  Saffron: localImage(saffronCardamom, "Saffron and cardamom spice detail"),
  Onion: localImage(onions, "Onions for agricultural trade"),
  "Sesame Seeds": localImage(sesameSeeds, "Sesame seeds for export"),
  Millets: localImage(pulsesBowls, "Grain and pulse bowls for agricultural trade"),
  "Raw Cashew Nuts": localImage(cashews, "Cashew nuts for import trade"),
  "Pigeon Peas": localImage(pulsesBowls, "Pulses for import trade"),
  "Kidney Beans": localImage(pulsesBowls, "Assorted beans and pulses for import trade"),
  "Black Matpe": localImage(lentils, "Dark lentils and pulses for import trade"),
  "Sesame Seeds - African": localImage(sesameSeeds, "Sesame seeds for African import trade"),
};

export const productImageSlot = (productName) =>
  productImages[productName] || imageSlot("Image to be added", `${productName} product image`);

export const internationalImages = {
  hero: {
    src: spicesMarket,
    alt: "Assorted herbs and spices prepared for international trade",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "Premium herbs and spices imagery for ORAC International trade presentation.",
  },
  banner: {
    src: spicesSpoons,
    alt: "Spices arranged in spoons for sourcing and export",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "Agricultural sourcing image for the ORAC International trade section.",
  },
  exports: {
    "Pulses & Lentils": imageSlot("Product image", "Premium pulses and lentils for export", pulsesBowls),
    "Spices & Aromatics": imageSlot("Trade image", "Spices and aromatics sourced for export", spicesSpoons),
    "Fresh, Dry & Processed Agri": imageSlot("Product image", "Fresh onions and agricultural produce", onions),
    "Fibres, Coir & Industrial": imageSlot("Image to be added", "Fibres coir and industrial export materials"),
  },
  imports: {
    "Automotive Parts & Accessories": imageSlot(
      "Image to be added",
      "Premium automotive accessories for import into India"
    ),
    "Grill Lights": imageSlot("Image to be added", "Vehicle grill lights imported by ORAC International"),
    "Projector & LED Headlights": imageSlot("Image to be added", "Projector and LED headlights for automotive import"),
    "Damping Sheets": imageSlot("Image to be added", "Automotive damping sheets for ride refinement"),
    "4x4 Winches": imageSlot("Image to be added", "4x4 winches for off-road automotive import"),
    "On-Board Air Compressors": imageSlot("Image to be added", "On-board air compressors for off-road vehicles"),
    "Agri Imports - Africa & Asia": imageSlot("Product image", "Agricultural imports from Africa and Asia", pulsesBowls),
    "Industrial & Scrap Imports": imageSlot("Image to be added", "Industrial and scrap imports"),
  },
};
