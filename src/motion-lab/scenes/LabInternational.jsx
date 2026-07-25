import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import useGsapScene from "../useGsapScene";
import { gsap, MM } from "../gsap";
import redChilli from "../../assets/images/international/catalog/red-chilli-powder.webp";
import coirFiber from "../../assets/images/international/catalog/coir-fiber.webp";
import turmeric from "../../assets/images/international/catalog/turmeric-powder.webp";
import millets from "../../assets/images/international/catalog/millets.webp";
import cumin from "../../assets/images/international/catalog/cumin-seeds-powder.webp";

// Tight product-texture crops for the "manifest / ledger" strip. Each source
// (coir/turmeric/millets/cumin, all 1122×1402) prints its own logo band top
// and caption band bottom; the CSS crop (scale + centre) shows only the
// central product texture, never the baked text.
const manifest = [
  { src: coirFiber, alt: "Coir fibre bale texture", origin: "Coir · fibre" },
  { src: turmeric, alt: "Turmeric powder texture", origin: "Turmeric · powder" },
  { src: millets, alt: "Millets grain texture", origin: "Millets · grain" },
  { src: cumin, alt: "Cumin seed and powder texture", origin: "Cumin · seed" },
];

const points = [
  "Agricultural commodities",
  "Natural fibres and industrial minerals",
  "Automotive accessories and import commodities",
];

/**
 * SCENE 4 — International: Products & Route (storyboard §5, thread state 3
 * "Route"). The shared chapter structure (text left / framed product right)
 * kept, but differentiated into an operational trade world:
 *  - a precise, subject-aware crop of red-chilli-powder.webp showing ONLY the
 *    chilli basket + powder bowl + burlap (the baked "ORAC INTERNATIONAL / RED
 *    CHILLI" label panel on the right ~40% is cropped out — acceptance
 *    criterion: no baked-in ORAC label visible in the crop);
 *  - the gold thread as a trade **Route** polyline drawn across the frame;
 *  - a real-text edge label (instrument feel) and a manifest strip of tight
 *    product-texture crops (ledger register).
 *
 * GSAP/ScrollTrigger only where scroll-progress genuinely helps: the Route
 * draw and the "cargo arrival" left-edge clip of the product, both bound to
 * the entry band and resting after. Reduced-motion users match neither
 * matchMedia branch, so the CSS resolved state (route drawn, product fully
 * revealed) stands with no ScrollTriggers created.
 */
export default function LabInternational() {
  const rootRef = useGsapScene((mm, root) => {
    const route = root.querySelector(".lab-route path");
    const nodes = root.querySelectorAll(".lab-route circle");
    const photo = root.querySelector(".lab-intl-photo");
    const frame = root.querySelector(".lab-intl-frame");

    mm.add(MM.desktop, () => {
      // Band runs from the frame entering to CENTRED (≈ a viewport of scroll):
      // the product "arrives like cargo" (a left→right clip wipe) while the gold
      // trade route draws across it, both spread over the whole band so the
      // movement is clearly perceptible, then rests.
      // NOTE: 1.36 is the CSS crop scale that pushes the baked "ORAC
      // INTERNATIONAL / RED CHILLI" label off-frame. The zoom stays >= 1.36 the
      // whole time (1.46 -> 1.36) so the label is NEVER exposed while still
      // adding a subtle settle. transform-origin matches the CSS crop.
      gsap.set(route, { strokeDashoffset: 100 });
      gsap.set(nodes, { opacity: 0 });
      gsap.set(photo, { clipPath: "inset(0 100% 0 0)", scale: 1.46, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top bottom", end: "center center", scrub: 1 },
      });
      tl.to(photo, { clipPath: "inset(0 0% 0 0)", ease: "none", duration: 0.7 }, 0)
        .to(photo, { scale: 1.36, ease: "none", duration: 0.85 }, 0)
        .to(route, { strokeDashoffset: 0, ease: "none", duration: 0.75 }, 0.2)
        .to(nodes, { opacity: 1, duration: 0.12, stagger: 0.55 }, 0.35);
    });

    mm.add(MM.mobile, () => {
      // One-shot on enter — shorter, no scrub, no per-scroll work.
      gsap.set(route, { strokeDashoffset: 100 });
      gsap.set(photo, { clipPath: "inset(0 100% 0 0)" });
      gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top 78%", once: true },
      })
        .to(photo, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.out" })
        .to(route, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 0.1)
        .to(nodes, { opacity: 1, duration: 0.2 }, 0.25);
    });
  });

  return (
    <section ref={rootRef} className="lab-scene lab-chapter lab-intl" aria-labelledby="lab-intl-title">
      <div className="container lab-chapter-inner">
        <div className="lab-chapter-copy">
          <Reveal className="lab-chapter-head">
            <span className="eyebrow">ORAC International</span>
            <h2 id="lab-intl-title">Export and import trading across chosen categories.</h2>
            <p>
              ORAC International handles agri-commodities, natural fibres, industrial minerals, and automotive
              accessories with responsible sourcing and quality verification.
            </p>
          </Reveal>

          <Reveal className="editorial-list" delay={80}>
            {points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </Reveal>

          <Reveal className="lab-chapter-actions" delay={120}>
            <Link className="button" to="/international">
              Visit International
            </Link>
            <small className="lab-chapter-meta">Chennai — Singapore aligned</small>
          </Reveal>

          <Reveal className="lab-manifest" delay={160} aria-label="Trade manifest — product textures">
            {manifest.map((item) => (
              <figure key={item.origin} className="lab-manifest-tile">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption>{item.origin}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>

        <Reveal className="lab-chapter-frame lab-intl-frame">
          <div className="lab-frame-media">
            <img
              className="lab-intl-photo"
              src={redChilli}
              alt="Dried red chillies in a basket beside a bowl of red chilli powder on burlap — an ORAC International agri-export"
              loading="lazy"
              decoding="async"
            />
          </div>
          <svg
            className="lab-thread lab-route"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M2 15 L34 23 L64 30 L98 52" pathLength="100" />
            <circle cx="2" cy="15" r="1.7" />
            <circle cx="98" cy="52" r="1.7" />
          </svg>
          <span className="lab-frame-edge" aria-hidden="true">
            Origin · India
          </span>
        </Reveal>
      </div>
    </section>
  );
}
