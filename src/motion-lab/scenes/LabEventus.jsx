import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import useGsapScene from "../useGsapScene";
import { gsap, MM } from "../gsap";
import weddingFilmCamera from "../../assets/images/velorawed/wedding-film-camera.webp";
import weddingCouple from "../../assets/images/eventus/wedding-couple.webp";
import velorawedLogo from "../../assets/logos/velorawed-gold.svg";

const points = [
  "Planning, decor and execution",
  "Photography and cinematography through VELORAWED",
  "Clear timelines, clear pricing and one accountable team",
];

/**
 * SCENE 6 — Eventus × VELORAWED: Frame & Focus (storyboard §5, thread state 5
 * "Frame edge"). Geographic precision becomes human moments seen through a
 * real lens. The signature is a content-true rack-focus: a cinematographer's
 * monitor (wedding-film-camera.webp — a literal aperture) resolves from soft
 * to sharp as letterbox bars retract and the gold thread draws around the
 * frame edge, then the frame "opens" to the human moment (wedding-couple).
 *
 * Blur is restricted to the single framed element and resolves to 0 early in
 * the scroll band (never persists at rest) — the storyboard's performance
 * constraint. Reduced motion / mobile: no scrubbed blur.
 */
export default function LabEventus() {
  const rootRef = useGsapScene((mm, root) => {
    const frame = root.querySelector(".lab-eventus-frame");
    const monitor = root.querySelector(".lab-eventus-monitor");
    const human = root.querySelector(".lab-eventus-human");
    const bars = root.querySelectorAll(".lab-eventus-bar");
    const edge = root.querySelector(".lab-eventus-edge rect");

    mm.add(MM.desktop, () => {
      // Deliberately strong so the rack-focus is unmistakable, and the band
      // runs from the frame entering to the frame CENTRED (≈ a full viewport of
      // scroll) so the resolve happens while the frame is in comfortable view —
      // not before it. Spread across the whole band so change is continuous.
      gsap.set(monitor, { filter: "blur(14px)", scale: 1.12, transformOrigin: "center" });
      gsap.set(human, { opacity: 0 });
      gsap.set(bars, { scaleY: 1 });
      gsap.set(edge, { strokeDashoffset: 100 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top bottom", end: "center center", scrub: 1 },
      });
      tl.to(monitor, { filter: "blur(0px)", scale: 1, ease: "none", duration: 0.62 }, 0)
        .to(bars, { scaleY: 0, ease: "none", duration: 0.55 }, 0)
        .to(edge, { strokeDashoffset: 0, ease: "none", duration: 0.7 }, 0.05)
        // The frame opens to the human moment across the back half of the band.
        .to(human, { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
    });

    mm.add(MM.mobile, () => {
      // One framed image, single blur-in on enter — no cross-fade chain.
      gsap.set(monitor, { filter: "blur(10px)" });
      gsap.set(bars, { scaleY: 1 });
      gsap.set(edge, { strokeDashoffset: 100 });
      gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 78%", once: true } })
        .to(monitor, { filter: "blur(0px)", duration: 0.8, ease: "power2.out" })
        .to(bars, { scaleY: 0, duration: 0.6, ease: "power2.out" }, 0)
        .to(edge, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 0.1);
    });
  });

  return (
    <section ref={rootRef} className="lab-scene lab-chapter lab-eventus" aria-labelledby="lab-eventus-title">
      <div className="container lab-chapter-inner">
        <div className="lab-chapter-copy">
          <Reveal className="lab-chapter-head">
            <span className="eyebrow">ORAC Eventus</span>
            <h2 id="lab-eventus-title">Building celebrations that are felt, not just seen.</h2>
            <p>
              ORAC Eventus is a Chennai-based full-service event management company built around one belief:
              the family should feel supported from the first call to the final frame.
            </p>
          </Reveal>

          <Reveal className="editorial-list" delay={80}>
            {points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </Reveal>

          <Reveal className="lab-chapter-actions" delay={120}>
            <Link className="button" to="/eventus">
              Visit Eventus
            </Link>
            <small className="lab-chapter-meta">Est. Chennai</small>
          </Reveal>
        </div>

        <Reveal className="lab-chapter-frame lab-eventus-frame">
          <div className="lab-frame-media lab-eventus-media">
            <img
              className="lab-eventus-monitor"
              src={weddingFilmCamera}
              alt="A cinematographer's monitor in sharp focus framing a seated wedding subject, event lighting behind"
              loading="lazy"
              decoding="async"
            />
            <img
              className="lab-eventus-human"
              src={weddingCouple}
              alt="A wedding couple celebrating, captured by ORAC Eventus with VELORAWED"
              loading="lazy"
              decoding="async"
            />
            <span className="lab-eventus-bar lab-eventus-bar-top" aria-hidden="true" />
            <span className="lab-eventus-bar lab-eventus-bar-bottom" aria-hidden="true" />
          </div>

          <svg
            className="lab-thread lab-eventus-edge"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="1.2" y="1.2" width="97.6" height="97.6" pathLength="100" />
          </svg>

          <span className="lab-frame-corner" aria-hidden="true">
            <img src={velorawedLogo} alt="" />
            <span>Velorawed · On Set</span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
