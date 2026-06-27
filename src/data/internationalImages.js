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
import coirFibre from "../assets/images/international/coir-fibre.jpg";
import automotiveLightbar from "../assets/images/international/automotive-lightbar.jpg";
import vehicleHeadlight from "../assets/images/international/vehicle-headlight.jpg";
import offroadVehicle from "../assets/images/international/offroad-vehicle.jpg";
import autoScrap from "../assets/images/international/auto-scrap.jpg";
import industrialMetal from "../assets/images/international/industrial-metal.jpg";
import mangoes from "../assets/images/international/mangoes.jpg";
import tamarind from "../assets/images/international/tamarind.jpg";
import moringaLeaves from "../assets/images/international/moringa-leaves.jpg";
import textileFactory from "../assets/images/international/textile-factory.jpg";
import lotusSeedPod from "../assets/images/international/lotus-seed-pod.jpg";
import neemLeaves from "../assets/images/international/neem-leaves.jpg";
import hibiscus from "../assets/images/international/hibiscus.jpg";
import soybean from "../assets/images/international/soybean.jpg";
import cardboardBoxes from "../assets/images/international/cardboard-boxes.jpg";
import aluminiumCans from "../assets/images/international/aluminium-cans.jpg";
import plasticRecycling from "../assets/images/international/plastic-recycling.jpg";
import kidneyBeans from "../assets/images/international/kidney-beans.jpg";
import quartzCrystals from "../assets/images/international/quartz-crystals.jpg";
import papadFlatbread from "../assets/images/international/papad-flatbread.jpg";

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
  "Mango & Mango Concentrate": localImage(mangoes, "Ripe mangoes for export trade"),
  Tamarind: localImage(tamarind, "Tamarind pods for agricultural trade"),
  "Moringa Powder": localImage(moringaLeaves, "Moringa leaves for wellness export products"),
  "Sesame Seeds": localImage(sesameSeeds, "Sesame seeds for export"),
  Millets: localImage(pulsesBowls, "Grain and pulse bowls for agricultural trade"),
  Papad: localImage(papadFlatbread, "Traditional flatbread and papad-style food products"),
  "Phool Makhana": localImage(lotusSeedPod, "Lotus seed pod representing makhana trade"),
  "Neem Oil": localImage(neemLeaves, "Neem leaves for agricultural oil products"),
  "Waste Cotton": localImage(textileFactory, "Textile factory for cotton fibre trade"),
  "Cotton Yarn": localImage(textileFactory, "Cotton yarn and textile production"),
  "Silk Fibre": localImage(textileFactory, "Textile fibre production for export"),
  "Coco Fibre": localImage(coirFibre, "Coconut coir fibre for industrial trade"),
  "Coco Peat": localImage(coirFibre, "Coconut coir and peat material for export"),
  "Jute Bags - Customised": localImage(coirFibre, "Natural fibre packaging material"),
  "Quartz Lumps": localImage(quartzCrystals, "Quartz crystals and mineral material"),
  "Grill Lights": localImage(automotiveLightbar, "Vehicle grill lights for automotive import"),
  "Projector & LED Headlights": localImage(vehicleHeadlight, "Vehicle headlight for automotive import"),
  "Damping Sheets": localImage(autoScrap, "Automotive material and parts for import"),
  "4x4 Winches": localImage(offroadVehicle, "Off-road vehicle equipment for import"),
  "On-Board Air Compressors": localImage(offroadVehicle, "Off-road vehicle equipment for import"),
  "PPF - Paint Protection Film": localImage(vehicleHeadlight, "Automotive paint protection and detailing import"),
  "Dashboard Gadgets": localImage(automotiveLightbar, "Automotive dashboard and lighting accessories"),
  "Ambient Strip Lights": localImage(automotiveLightbar, "Automotive interior and exterior lighting"),
  "Camping & Off-Road Kits": localImage(offroadVehicle, "Off-road camping and recovery equipment"),
  "Sun Film": localImage(vehicleHeadlight, "Automotive tint and protection import"),
  "Raw Cotton": localImage(textileFactory, "Raw cotton and textile fibre import"),
  "Soya Bean": localImage(soybean, "Soybean products for agricultural import"),
  "Raw Cashew Nuts": localImage(cashews, "Cashew nuts for import trade"),
  "Stone Flower": localImage(hibiscus, "Botanical product for spice and herbal import"),
  "Pigeon Peas": localImage(pulsesBowls, "Pulses for import trade"),
  "Kidney Beans": localImage(kidneyBeans, "Red kidney beans for import trade"),
  "Black Matpe": localImage(lentils, "Dark lentils and pulses for import trade"),
  "Cassia Tora Seeds": localImage(sesameSeeds, "Seeds for industrial and agricultural import"),
  "Dry Hibiscus Flower": localImage(hibiscus, "Hibiscus flower for botanical import"),
  "Sesame Seeds - African": localImage(sesameSeeds, "Sesame seeds for African import trade"),
  "PVC Regrind": localImage(plasticRecycling, "Plastic recycling material for PVC regrind import"),
  "OCC - Corrugated Carton Scrap": localImage(cardboardBoxes, "Corrugated carton scrap for paper recycling"),
  "Used Beverage Can Scrap": localImage(aluminiumCans, "Used beverage cans for aluminium recycling"),
};

export const productImageSlot = (productName) =>
  productImages[productName] || imageSlot("Image to be added", `${productName} product image`);

export const internationalImages = {
  hero: {
    src: spicesMarket,
    alt: "Assorted herbs and spices prepared for international trade",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "Herbs and spices imagery for ORAC International trade presentation.",
  },
  banner: {
    src: spicesSpoons,
    alt: "Spices arranged in spoons for sourcing and export",
    label: "Trade image",
    title: "Source. Verify. Move with care.",
    description: "Agricultural sourcing image for the ORAC International trade section.",
  },
  exports: {
    "Pulses & Lentils": imageSlot("Product image", "Selected pulses and lentils for export", pulsesBowls),
    "Spices & Aromatics": imageSlot("Trade image", "Spices and aromatics sourced for export", spicesSpoons),
    "Fresh, Dry & Processed Agri": imageSlot("Product image", "Fresh onions and agricultural produce", onions),
    "Fibres, Coir & Industrial": imageSlot("Product image", "Coir fibres and industrial export materials", coirFibre),
  },
  imports: {
    "Automotive Parts & Accessories": imageSlot(
      "Import image",
      "Automotive accessories for import into India",
      automotiveLightbar
    ),
    "Grill Lights": imageSlot("Import image", "Vehicle grill lights imported by ORAC International", automotiveLightbar),
    "Projector & LED Headlights": imageSlot(
      "Import image",
      "Projector and LED headlights for automotive import",
      vehicleHeadlight
    ),
    "Damping Sheets": imageSlot("Import image", "Automotive damping sheets for ride refinement", autoScrap),
    "4x4 Winches": imageSlot("Import image", "4x4 winches for off-road automotive import", offroadVehicle),
    "On-Board Air Compressors": imageSlot(
      "Import image",
      "On-board air compressors for off-road vehicles",
      offroadVehicle
    ),
    "Agri Imports - Africa & Asia": imageSlot("Product image", "Agricultural imports from Africa and Asia", pulsesBowls),
    "Industrial & Scrap Imports": imageSlot("Import image", "Industrial and scrap imports", industrialMetal),
  },
};
