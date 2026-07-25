import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import useGsapScene from "../useGsapScene";
import { gsap, MM } from "../gsap";
import { vaultXiii } from "../../data/luxeData";
import fashionAtelier from "../../assets/images/luxe/fashion-atelier.webp";
import ivoryGown from "../../assets/images/maison/looks/dresses/look-02.jpg";

const points = [
  "Ready-to-wear and fabric materials",
  "White-label and B2B foundations",
  "In-house atelier and handmade crochet",
];

// Real Vault XIII tones from luxeData — used as material chips (no baked text,
// unlike full-frame crops of the palette image).
const chips = vaultXiii.swatches.filter((s) => ["Cream", "Champagne", "Gold", "Stone"].includes(s.name));

/**
 * SCENE 7 — Luxe × The House of Azrin: Seam & Cloth (storyboard §5, thread
 * state 6 "Seam"). The Eventus frame edge thins into a running gold stitch
 * along fabric, and the clean garment is REVEALED BY the seam (a clip-wipe
 * travelling top→down along the stitch line) rather than by a fade — cloth
 * "made" rather than faded in. Slowest, most restrained of the three worlds.
 *
 * Reduced motion / mobile: garment shown resolved, seam drawn, no scrubbed
 * wipe (matchMedia creates no ScrollTriggers under reduced motion; the CSS
 * base state is the finished garment + drawn stitch).
 */
export default function LabLuxe() {
  const rootRef = useGsapScene((mm, root) => {
    const frame = root.querySelector(".lab-luxe-frame");
    const gown = root.querySelector(".lab-luxe-gown");
    const seamClip = root.querySelector(".lab-luxe-seam-clip");

    mm.add(MM.desktop, () => {
      // Band runs from the frame entering to CENTRED (≈ a viewport of scroll),
      // so the garment is being "made" by the seam while it is in view. The
      // stitch draws first, then the clean garment wipes in top→down behind it,
      // with a slight settle so there's continuous, legible movement.
      // Gown revealed top→down (bottom inset 100%→0), following the seam that
      // draws top→down — so the garment is visibly "made" along the stitch.
      gsap.set(gown, { clipPath: "inset(0 0 100% 0)", scale: 1.05, transformOrigin: "center top" });
      gsap.set(seamClip, { scaleY: 0, transformOrigin: "top" });
      gsap
        .timeline({ scrollTrigger: { trigger: frame, start: "top bottom", end: "center center", scrub: 1 } })
        .to(seamClip, { scaleY: 1, ease: "none", duration: 0.7 }, 0)
        .to(gown, { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 0.85 }, 0.12)
        .to(gown, { scale: 1, ease: "none", duration: 0.85 }, 0.12);
    });

    mm.add(MM.mobile, () => {
      // Straight clip-reveal on enter, quick seam draw.
      gsap.set(gown, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(seamClip, { scaleY: 0, transformOrigin: "top" });
      gsap
        .timeline({ scrollTrigger: { trigger: frame, start: "top 78%", once: true } })
        .to(seamClip, { scaleY: 1, duration: 0.7, ease: "power1.inOut" }, 0)
        .to(gown, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.out" }, 0.08);
    });
  });

  return (
    <section ref={rootRef} className="lab-scene lab-chapter lab-luxe" aria-labelledby="lab-luxe-title">
      <div className="container lab-chapter-inner">
        <div className="lab-chapter-copy">
          <Reveal className="lab-chapter-head">
            <span className="eyebrow">ORAC Luxe</span>
            <h2 id="lab-luxe-title">Fashion shaped around cloth, craft, and restraint.</h2>
            <p>
              ORAC Luxe is the fashion and textile side of ORAC: ready-to-wear, white-label fabric foundations,
              atelier pieces, and handmade craft with a slower sense of making.
            </p>
          </Reveal>

          <Reveal className="editorial-list" delay={80}>
            {points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </Reveal>

          <Reveal className="lab-chapter-actions" delay={120}>
            <Link className="button" to="/luxury-export">
              Visit ORAC Luxe
            </Link>
            <small className="lab-chapter-meta">The House of Azrin</small>
          </Reveal>

          <Reveal className="lab-swatch-row" delay={160} aria-label="Vault XIII material tones">
            {chips.map((chip) => (
              <span key={chip.name} className="lab-swatch">
                <span className="lab-swatch-chip" style={{ background: chip.value }} aria-hidden="true" />
                {chip.name}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="lab-chapter-frame lab-luxe-frame">
          <div className="lab-frame-media lab-luxe-media">
            <img
              className="lab-luxe-atelier"
              src={fashionAtelier}
              alt="White muslin draped on a dress form in the ORAC Luxe atelier"
              loading="lazy"
              decoding="async"
            />
            <img
              className="lab-luxe-gown"
              src={ivoryGown}
              alt="A finished ivory satin gown by The House of Azrin"
              loading="lazy"
              decoding="async"
            />
          </div>

          <svg
            className="lab-thread lab-luxe-seam"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath id="lab-luxe-seam-clip" clipPathUnits="userSpaceOnUse">
                <rect className="lab-luxe-seam-clip" x="0" y="0" width="100" height="100" />
              </clipPath>
            </defs>
            <path
              className="lab-luxe-seam-line"
              d="M60 3 C 53 28, 66 56, 57 97"
              clipPath="url(#lab-luxe-seam-clip)"
            />
          </svg>

          <span className="lab-frame-corner lab-luxe-corner" aria-hidden="true">
            The House of Azrin
          </span>
        </Reveal>
      </div>
    </section>
  );
}
