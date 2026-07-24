import luxeAtelier from "../assets/images/luxe/fashion-atelier.webp";
import vaultXiiiPalette from "../assets/images/luxe/vault-xiii-palette.jpg";
import maisonCollage from "../assets/images/luxe/maison-collage.webp";
import frontDresses from "../assets/images/maison/fronts/dresses.jpg";
import frontCoOrds from "../assets/images/maison/fronts/co-ords.jpg";
import frontTunics from "../assets/images/maison/fronts/tunics.jpg";
import frontSignatureBottoms from "../assets/images/maison/fronts/signature-bottoms.jpg";
import dressesLook01 from "../assets/images/maison/looks/dresses/look-01.jpg";
import dressesLook02 from "../assets/images/maison/looks/dresses/look-02.jpg";
import dressesLook03 from "../assets/images/maison/looks/dresses/look-03.jpg";
import dressesLook04 from "../assets/images/maison/looks/dresses/look-04.jpg";
import dressesLook05 from "../assets/images/maison/looks/dresses/look-05.jpg";
import dressesLook06 from "../assets/images/maison/looks/dresses/look-06.jpg";
import coOrdsLook01 from "../assets/images/maison/looks/co-ords/look-01.jpg";
import coOrdsLook02 from "../assets/images/maison/looks/co-ords/look-02.jpg";
import coOrdsLook03 from "../assets/images/maison/looks/co-ords/look-03.jpg";
import coOrdsLook04 from "../assets/images/maison/looks/co-ords/look-04.jpg";
import coOrdsLook05 from "../assets/images/maison/looks/co-ords/look-05.jpg";
import coOrdsLook06 from "../assets/images/maison/looks/co-ords/look-06.jpg";
import tunicsLook01 from "../assets/images/maison/looks/tunics/look-01.jpg";
import tunicsLook02 from "../assets/images/maison/looks/tunics/look-02.jpg";
import tunicsLook03 from "../assets/images/maison/looks/tunics/look-03.jpg";
import tunicsLook04 from "../assets/images/maison/looks/tunics/look-04.jpg";
import tunicsLook05 from "../assets/images/maison/looks/tunics/look-05.jpg";
import tunicsLook06 from "../assets/images/maison/looks/tunics/look-06.jpg";
import signatureBottomsLook01 from "../assets/images/maison/looks/signature-bottoms/look-01.jpg";
import signatureBottomsLook02 from "../assets/images/maison/looks/signature-bottoms/look-02.jpg";
import signatureBottomsLook03 from "../assets/images/maison/looks/signature-bottoms/look-03.jpg";
import signatureBottomsLook04 from "../assets/images/maison/looks/signature-bottoms/look-04.jpg";
import signatureBottomsLook05 from "../assets/images/maison/looks/signature-bottoms/look-05.jpg";
import signatureBottomsLook06 from "../assets/images/maison/looks/signature-bottoms/look-06.jpg";
import { imageSlot } from "./imageSlot";
import { pad2 } from "../utils/pad2";

export const luxeImages = {
  hero: imageSlot(
    "The House of Azrin",
    "Fashion atelier workspace for ORAC Luxe and The House of Azrin",
    luxeAtelier
  ),
  opening: imageSlot(
    "ORAC Luxe image",
    "Fashion atelier workspace for ORAC Luxe and The House of Azrin",
    luxeAtelier
  ),
};

// Full-bleed collage introducing the Maison Series categories together.
export const maisonBanner = imageSlot(
  "The Maison Series",
  "The House of Azrin — Dresses, Co-ords, Tunics, and Signature Bottoms styled together",
  maisonCollage
);

// i) Hero tagline
export const luxeTagline = "Where Elegance meets Intention.";

// ii) Colour palette category — "Vault XIII".
export const vaultXiii = {
  name: "Vault XIII",
  eyebrow: "The Palette",
  tagline: "A vault of thirteen tones — the quiet language every Azrin piece is cut from.",
  image: imageSlot(
    "Vault XIII",
    "The House of Azrin Vault XIII colour palette — thirteen tones from ivory to burnt sienna",
    vaultXiiiPalette
  ),
  swatches: [
    { name: "Ink", value: "#1A1814" },
    { name: "Graphite", value: "#3A3630" },
    { name: "Stone", value: "#6E6860" },
    { name: "Gold", value: "#B8975A" },
    { name: "Champagne", value: "#D4AF78" },
    { name: "Cream", value: "#FAF8F4" },
  ],
};

// iii) Brand categories — "The House Editions".
export const houseEditions = [
  {
    id: "curated-style",
    title: "Curated Style",
    tagline: "A refined edit of timeless silhouettes, curated for every chapter of your journey.",
  },
  {
    id: "couture-essentials",
    title: "Couture Essentials",
    tagline: "The foundation of a timeless wardrobe, elevated through couture craftsmanship.",
  },
  {
    id: "the-bespoke-artisan",
    title: "The Bespoke Artisan",
    tagline: "Transforming your vision into garments that are uniquely yours.",
  },
];

// iv) Main content — "What is Azrin" (sample copy, refine as needed).
export const whatIsAzrin = {
  eyebrow: "What is Azrin",
  title: "A house built on intention, not season.",
  paragraphs: [
    "The House of Azrin is a fashion and textile venture under ORAC Luxe, built for people who believe that what they wear should be considered, not convenient.",
    "We work in three registers — a curated edit of timeless style, couture essentials made to last, and a bespoke atelier that turns a single vision into a single garment. Every stitch is set with the belief that clothing can carry intention.",
    "We are not a fast-fashion brand. There is no seasonal pressure, no volume target. There is only the work, done well, for a long relationship between the garment and the person who wears it.",
  ],
};

// v) Product categories — "Maison Series". Each links to its own page.
// Stories are the six looks per category from "Maison Series Story.docx".
const makeModels = (label, stories, images) =>
  stories.map((story, index) => {
    const number = pad2(index + 1);
    return {
      id: `look-${number}`,
      side: index % 2 === 0 ? "left" : "right",
      name: `Look ${number}`,
      story,
      image: imageSlot(
        `${label} · Look ${number}`,
        `${label} look ${number} for The House of Azrin`,
        images?.[index]
      ),
    };
  });

const dressesLooks = [
  dressesLook01,
  dressesLook02,
  dressesLook03,
  dressesLook04,
  dressesLook05,
  dressesLook06,
];

const coOrdsLooks = [coOrdsLook01, coOrdsLook02, coOrdsLook03, coOrdsLook04, coOrdsLook05, coOrdsLook06];

const tunicsLooks = [tunicsLook01, tunicsLook02, tunicsLook03, tunicsLook04, tunicsLook05, tunicsLook06];

const signatureBottomsLooks = [
  signatureBottomsLook01,
  signatureBottomsLook02,
  signatureBottomsLook03,
  signatureBottomsLook04,
  signatureBottomsLook05,
  signatureBottomsLook06,
];

const dressesStories = [
  "Fluid silk crepe with an abstract painterly print in soft powder blue. A structured shirt collar, concealed front placket, and self-fabric waist tie create an elegant silhouette, while softly gathered sleeves and a flowing midi hem bring graceful movement. French seams, lightweight lining, and clean internal finishing ensure lasting comfort and refinement.",
  "Premium matte crepe with a smooth finish and effortless drape. A classic shirt collar, concealed button fastening, and softly elasticated waist offer gentle structure, complemented by neatly finished cuffs, precise topstitching, and a clean hem. Fine internal construction delivers a polished finish throughout.",
  "Textured floral jacquard with subtle woven detailing and a softly structured silhouette. A bateau neckline, sculpted bodice, and carefully placed box pleats create balanced volume through the skirt. Fully lined with concealed side pockets, an invisible zip closure, and clean internal seam finishing.",
  "Breathable linen-viscose blend with a naturally soft texture and fluid drape. Oversized utility pockets, rolled sleeves, and a relaxed shoulder line add understated character, while a self-fabric belt shapes the waist. Concealed button fastening, side slits, and neatly finished interiors complete the design.",
  "Rich stretch crepe with a softly structured hand feel. A bateau neckline, sculpted waist, and fluid cape sleeves create an elegant silhouette with graceful movement. Precision panel construction, an invisible back zip, full lining, and immaculate internal finishing enhance comfort and fit.",
  "Luxurious satin-backed crepe with a fluid, graceful drape. A refined bateau neckline and sculpted princess seams shape the bodice before flowing into a full-length skirt. Concealed back zip, lightweight lining, and clean internal finishing allow effortless movement while preserving the gown's elegant structure.",
];

const coOrdsStories = [
  "Tailored in a rich burnt sienna hue, the silhouette speaks through restraint rather than excess. Fine pintuck detailing and a clean mandarin collar lend quiet structure, while fluid cotton drapes with effortless ease. Designed for moments that demand confidence without spectacle, it embodies refined simplicity and timeless elegance.",
  "Rendered in an uncompromising shade of black, the silhouette is elevated through quiet precision and subtle texture. A delicately woven tonal jacquard lends depth beneath the surface, while the cropped shirt and fluid wide-leg trousers create a balance of structure and ease. Refined in every proportion, it is designed for the woman whose confidence is expressed through understated elegance rather than ornamentation.",
  "Inspired by the timeless richness of emerald landscapes, this silhouette captures the quiet confidence of modern femininity. Tailored with a graceful boat neckline and a sculpted bodice, the design is elevated by a softly flared peplum that enhances the waist with effortless refinement. The textured jacquard midi skirt introduces depth and movement, creating a harmonious balance between structure and fluidity. Every detail is composed with intention, where impeccable craftsmanship meets understated sophistication. Designed to inspire presence rather than attention, it is a timeless expression of elegance, confidence, and enduring beauty.",
  "Infused with timeless heritage and quiet luxury, this blush nude silhouette is elevated with delicate floral motifs, ornate border detailing, and an elegantly embellished neckline. The flowing asymmetric tunic and fluid wide-leg trousers create effortless movement, celebrating refined craftsmanship with enduring sophistication.",
  "Defined by understated elegance and impeccable tailoring, this stone-hued silhouette reflects the essence of modern luxury. The sleeveless structured vest is elevated with an asymmetric button placket and subtle woven texture, while fluid wide-leg trousers lend effortless movement and refined balance. Thoughtfully crafted with clean lines and timeless proportions, it is designed for the woman who embraces quiet confidence, effortless sophistication, and enduring style.",
  "Reflecting the tranquillity of coastal mornings, this sea mist ensemble celebrates lightness, movement, and refined craftsmanship. The softly textured shirt and fluid wide-leg trousers create a silhouette that is graceful, contemporary, and quietly luxurious.",
];

const tunicsStories = [
  "Crafted in a fluid viscose blend, the burnt sienna tunic is detailed with fine pintucks and a softly gathered stand collar, finished with an elegant self-tie bow. Side slits and a relaxed silhouette create effortless movement, balanced by utility-inspired cargo trousers in washed cotton twill. A composition of refined tailoring and understated ease.",
  "Rendered in tonal floral jacquard, the tunic features a mandarin neckline, wide sleeves, and an easy silhouette that celebrates texture through subtle craftsmanship. Washed denim cargo trousers lend contrast with utilitarian pockets and raw hems, creating a modern dialogue between artisanal detailing and contemporary tailoring.",
  "A soft blush silhouette enriched with delicate geometric embroidery and tonal threadwork across the yoke, sleeves, and borders. Gentle gathers through the waist create graceful volume, while wide-leg denim introduces a relaxed balance. Intricate craftsmanship meets everyday sophistication.",
  "Cut from airy textured cotton, the oversized tunic is defined by finely stitched pintucks, a clean band collar, and a softly curved hem. Relaxed proportions and wide sleeves enhance its effortless drape, paired with fluid wide-leg denim for a quiet expression of modern luxury.",
  "Delicately woven tonal jacquard lends depth to this sea mist silhouette, finished with a clean split neckline, generous sleeves, and an easy shift profile. The fluid construction and understated texture celebrate refined simplicity with effortless elegance.",
  "Tailored in richly textured cotton, the burgundy tunic features a structured shirt collar, delicate pinstripes, and softly gathered peplum panels that introduce graceful volume. Balanced with relaxed ivory trousers, the silhouette combines architectural tailoring with everyday comfort in a timeless palette.",
];

const signatureBottomsStories = [
  "A study in effortless elegance, this ivory ensemble pairs a fluid shirt with impeccably tailored wide-leg trousers. Soft draping, relaxed sleeves, and clean proportions create a silhouette that moves with quiet confidence, where understated luxury becomes the defining statement.",
  "Soft powder blue tailoring introduces a fresh perspective on contemporary dressing. Crisp pleats, fluid wide-leg trousers, and a minimalist silhouette balance structure with ease, offering refined sophistication for every occasion.",
  "Rich emerald tones meet sculptural movement through cascading layered ruffles and a beautifully textured finish. Paired with a softly draped cape silhouette, the ensemble celebrates graceful femininity, fluid motion, and timeless refinement.",
  "Delicate texture lends quiet depth to this sage green mini skirt, thoughtfully tailored with clean lines and subtle utility detailing. Paired with a minimalist fitted bodice, the silhouette feels youthful, polished, and effortlessly modern.",
  "A softly woven jacquard enriches the graceful mermaid silhouette with subtle texture and movement. Sculpted through impeccable tailoring, the design contours the body before unfolding into a fluid hem, creating a refined expression of timeless elegance.",
  "Deep burgundy tailoring brings richness to a timeless silhouette. The sleeveless pintuck blouse introduces delicate craftsmanship, while fluid high-waisted trousers with a sculptural waist tie create a harmonious balance of structure, softness, and quiet confidence.",
];

export const maisonSeries = [
  {
    id: "dresses",
    slug: "dresses",
    name: "Dresses",
    subtitle: "A-line & Shirt Dress",
    intro: "Fluid A-line and shirt-dress silhouettes, cut to move with you.",
    landscape: imageSlot("Dresses", "The House of Azrin dresses — Maison Series", frontDresses),
    models: makeModels("Dresses", dressesStories, dressesLooks),
  },
  {
    id: "co-ords",
    slug: "co-ords",
    name: "Co-ords",
    subtitle: "Two-piece sets",
    intro: "Considered two-piece sets that read as one intentional line.",
    landscape: imageSlot("Co-ords", "The House of Azrin co-ords — Maison Series", frontCoOrds),
    models: makeModels("Co-ords", coOrdsStories, coOrdsLooks),
  },
  {
    id: "tunics",
    slug: "tunics",
    name: "Tunics",
    subtitle: "Everyday ease",
    intro: "Elevated tunics built for ease without losing their line.",
    landscape: imageSlot("Tunics", "The House of Azrin tunics — Maison Series", frontTunics),
    models: makeModels("Tunics", tunicsStories, tunicsLooks),
  },
  {
    id: "signature-bottoms",
    slug: "signature-bottoms",
    name: "Signature Bottoms",
    subtitle: "Skirts & Pants",
    intro: "Skirts and trousers engineered as the foundation of a considered wardrobe.",
    landscape: imageSlot(
      "Signature Bottoms",
      "The House of Azrin signature bottoms — Maison Series",
      frontSignatureBottoms
    ),
    models: makeModels("Signature Bottoms", signatureBottomsStories, signatureBottomsLooks),
  },
];

export const maisonBySlug = Object.fromEntries(maisonSeries.map((category) => [category.slug, category]));

// Downloadable catalogue (below Maison Series). Drop the PDF at the href path
// in public/ and it works with no further changes.
export const catalogue = {
  eyebrow: "The Maison Catalogue",
  title: "Take the collection with you.",
  text: "A considered look-book of the Maison Series — silhouettes, fabrics, and the stories behind each piece.",
  href: "/downloads/the-house-of-azrin-catalogue.pdf",
  fileLabel: "Download catalogue (PDF)",
};

export const azrinValues = [
  {
    title: "Deliberate Making",
    text: "We slow down at every step. Nothing leaves this house without consideration - in material, construction, and purpose.",
  },
  {
    title: "Fabric First",
    text: "Good clothing begins with good cloth. We source with care and offer our materials to others who share that belief.",
  },
  {
    title: "Craft as Value",
    text: "Handmade is not a trend here. It is how things have always been made well, and how we believe they still should be.",
  },
  {
    title: "Built to Last",
    text: "We make things for a long relationship. With the garment, with the wearer, and with the idea that quality outlasts seasons.",
  },
];

export const azrinFounder = {
  name: "Ashrin Rahmathullah",
  role: "Founder & Creative Director",
  brand: "The House of Azrin | ORAC Luxe",
  location: "Tiruchirappalli, Tamil Nadu",
  quote:
    "We did not set out to build a brand. We set out to make things that last - in the hands of the people who wear them, and in the way they are made.",
  body: "Azrin is named to carry softness and strength in equal measure. That duality is present in everything we make.",
  continuation:
    "The House of Azrin sits within ORAC Luxe - a business house that builds ventures with care. Our place within ORAC means we have the foundation to grow without losing what makes us particular.",
};
