import { useState } from "react";
import { Link } from "react-router-dom";
import useGsapScene from "../useGsapScene";
import { gsap, MM } from "../gsap";
import oracLogo from "../../assets/logos/orac-orange.svg";
import coirFiber from "../../assets/images/international/catalog/coir-fiber.webp";
import weddingCouple from "../../assets/images/eventus/wedding-couple.webp";
import fashionAtelier from "../../assets/images/luxe/fashion-atelier.webp";

// The three worlds. Each opening fragment is a real crop of the SAME photo its
// aperture uses, so the convergence is visibly three ORAC businesses and the
// handoff into the resting apertures is a true 1:1 spatial morph (not a
// dissolve-and-refade like the production opening).
const worlds = [
  {
    id: "international",
    label: "Global Trade",
    name: "International",
    route: "/international",
    img: coirFiber,
    alt: "Coir fibre bales, an ORAC International export product",
    edge: "from the left",
  },
  {
    id: "eventus",
    label: "Event Planning",
    name: "Eventus",
    route: "/eventus",
    img: weddingCouple,
    alt: "A wedding couple celebrating, captured by ORAC Eventus",
    edge: "from above",
  },
  {
    id: "luxe",
    label: "Fashion & Textiles",
    name: "Luxe",
    route: "/luxury-export",
    img: fashionAtelier,
    alt: "White muslin draped on a form in the ORAC Luxe atelier",
    edge: "from the right",
  },
];

// Review posture: the /motion-lab prototype REPLAYS the opening on every load
// (and every client-side mount) so the convergence is always reviewable —
// unlike production, which keeps the once-per-session gate (useOpeningSequence)
// for returning-visitor usability. Reduced-motion still resolves straight to
// the static end-state (Scene 2), exactly what the base CSS renders.
function computeMode() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "resolved" : "play";
  } catch {
    return "resolved";
  }
}

/**
 * SCENE 1 (Convergence & Formation) + SCENE 2 (Three Worlds Resolved).
 * Storyboard §1/§5. The corrected/retimed opening:
 *  - all three real fragments enter LARGE and legible (Eventus readable at
 *    ~40% blur, Luxe at full opacity) — not tiny thumbnails;
 *  - they converge to the gold ring BELOW the wordmark's optical box, so the
 *    wordmark (front layer) forms over cleared space and is never obstructed;
 *  - the gold FORK is born from the ring (the thread's first state);
 *  - each fragment then travels to and BECOMES its own aperture (measured 1:1
 *    handoff: International→left, Eventus→centre, Luxe→right);
 *  - the resolved composition = three EQUAL apertures + wordmark + fork, which
 *    is also the returning-visitor / reduced-motion static state.
 *
 * The base CSS renders that resolved state; GSAP only opts a first-session,
 * no-preference visit INTO the animation, and every animated element resolves
 * to the CSS end-state — so a JS/GSAP failure, reduced motion, or a returning
 * visit always shows the complete, legible frame.
 */
export default function LabOpening() {
  const [mode] = useState(computeMode);
  const playing = mode === "play";

  const rootRef = useGsapScene((mm, root) => {
    if (!playing) return; // returning / reduced → CSS resolved state stands

    const identity = root.querySelector(".lab-opening-word");
    const eyebrow = root.querySelector(".lab-opening-eyebrow");
    const tagline = root.querySelector(".lab-opening-tagline");
    const forkPath = root.querySelector(".lab-opening-fork path");
    const ring = root.querySelector(".lab-opening-ring");
    const apertures = gsap.utils.toArray(root.querySelectorAll(".lab-aperture"));

    mm.add(MM.desktop, () => {
      const stage = root; // rootRef is the .lab-opening-stage element itself
      const frags = worlds.map((w) => root.querySelector(`.lab-frag-${w.id}`));
      const intlRoute = root.querySelector(".lab-frag-international .lab-frag-route path");
      const eventusImg = root.querySelector(".lab-frag-eventus .lab-frag-media img");

      // If the fragment layer isn't present (e.g. not playing), leave the CSS
      // resolved state untouched rather than risk a crash.
      if (!stage || frags.some((f) => !f) || apertures.length < 3) return;

      // Measure the 1:1 handoff BEFORE any transform is applied: from each
      // fragment's converged (centred) box to its matching aperture's box.
      const stageRect = stage.getBoundingClientRect();
      const handoffs = worlds.map((w, i) => {
        const ap = apertures[i].getBoundingClientRect();
        const f = frags[i].getBoundingClientRect();
        return {
          x: ap.left + ap.width / 2 - (f.left + f.width / 2),
          y: ap.top + ap.height / 2 - (f.top + f.height / 2),
          sx: ap.width / f.width,
          sy: ap.height / f.height,
        };
      });

      const sw = stageRect.width;
      const sh = stageRect.height;
      const starts = [
        { x: -sw * 0.36, y: sh * 0.02 }, // International — from the left
        { x: 0, y: -sh * 0.42 }, // Eventus — from above
        { x: sw * 0.36, y: sh * 0.02 }, // Luxe — from the right
      ];
      // A fanned triptych so ALL THREE fragments are clearly visible and
      // legible for a beat (corrects the production opening, where fragments
      // pile at one point). Centre held slightly higher so each edge reads.
      const spread = Math.min(200, sw * 0.16);
      const fan = [
        { x: -spread, y: 14, rotation: -5 }, // International, tilted left
        { x: 0, y: -2, rotation: 0 }, // Eventus, centre-back
        { x: spread, y: 14, rotation: 5 }, // Luxe, tilted right
      ];

      // Pre-motion states (committed before paint by useLayoutEffect).
      gsap.set(identity, { opacity: 0, scale: 0.97, transformOrigin: "center 70%" });
      gsap.set([eyebrow, tagline], { opacity: 0, y: 10 });
      gsap.set(forkPath, { strokeDashoffset: 100 });
      gsap.set(apertures, { opacity: 0, y: 14 });
      gsap.set(ring, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      gsap.set(intlRoute, { strokeDashoffset: 100 });
      gsap.set(eventusImg, { filter: "blur(5px)" });
      frags.forEach((f, i) =>
        gsap.set(f, { opacity: 0, x: starts[i].x, y: starts[i].y, scale: 0.88, rotation: fan[i].rotation })
      );

      const tl = gsap.timeline();
      tl.timeScale(0.82); // slow the convergence a touch so it reads clearly

      // Phase A — enter to the fanned triptych (0 → ~0.66s). Each fragment
      // travels from its own edge to its fan slot around the gold ring; the
      // ring holds gold; International draws its route; Eventus sharpens
      // ~40%→~8% (readable, then crisp); Luxe enters at full opacity.
      tl.to(ring, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(1.6)" }, 0);
      frags.forEach((f, i) => {
        tl.to(
          f,
          { opacity: 1, x: fan[i].x, y: fan[i].y, scale: 1, rotation: fan[i].rotation, duration: 0.62, ease: "power2.out" },
          0.03 + i * 0.06
        );
      });
      tl.to(eventusImg, { filter: "blur(0.6px)", duration: 0.5, ease: "none" }, 0.14);
      tl.to(intlRoute, { strokeDashoffset: 0, duration: 0.44, ease: "power1.inOut" }, 0.2);

      // Phase B — form (0.66 → ~0.96s). The ring hands off to the wordmark,
      // which fades/scales in ABOVE the fan (never over it); eyebrow + tagline
      // rise. The fan drifts down a touch, settling toward the apertures.
      tl.to(frags, { y: "+=16", duration: 0.24, ease: "power1.inOut" }, 0.66);
      tl.to(ring, { opacity: 0, scale: 1.06, duration: 0.24, ease: "power1.out" }, 0.66);
      tl.to(identity, { opacity: 1, scale: 1, duration: 0.34, ease: "power2.out" }, 0.7);
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.32 }, 0.76);
      tl.to(tagline, { opacity: 1, y: 0, duration: 0.32 }, 0.82);

      // Phase C — fork births the thread, fragments hand off 1:1 into apertures
      // (0.92 → ~1.6s). Each fragment lands on its aperture and cross-fades as
      // that aperture resolves in place.
      tl.to(forkPath, { strokeDashoffset: 0, duration: 0.34, ease: "power1.inOut" }, 0.92);
      const H = 1.02;
      frags.forEach((f, i) => {
        tl.to(
          f,
          { x: handoffs[i].x, y: handoffs[i].y, scaleX: handoffs[i].sx, scaleY: handoffs[i].sy, rotation: 0, duration: 0.54, ease: "power2.inOut" },
          H + i * 0.06
        );
        tl.to(apertures[i], { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, H + 0.24 + i * 0.06);
        tl.to(f, { opacity: 0, duration: 0.3, ease: "power1.out" }, H + 0.34 + i * 0.06);
      });

      return () => tl.kill();
    });

    mm.add(MM.mobile, () => {
      // Compact recomposition (no travelling fragments on the small screen):
      // wordmark + tagline resolve, the fork appears as a short centred tick,
      // then the three apertures band-wipe in as a vertical stack.
      gsap.set(identity, { opacity: 0, scale: 0.98 });
      gsap.set([eyebrow, tagline], { opacity: 0, y: 8 });
      gsap.set(forkPath, { strokeDashoffset: 100 });
      gsap.set(apertures, { opacity: 0, clipPath: "inset(0 0 82% 0)" });

      const tl = gsap.timeline();
      tl.to(identity, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0.05)
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.28 }, 0.2)
        .to(tagline, { opacity: 1, y: 0, duration: 0.28 }, 0.28)
        .to(forkPath, { strokeDashoffset: 0, duration: 0.26 }, 0.34)
        .to(
          apertures,
          { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.44, ease: "power2.out", stagger: 0.12 },
          0.42
        );

      return () => tl.kill();
    });
  });

  return (
    <section className="lab-scene lab-opening" aria-label="ORAC Holdings — origin">
      <div className="lab-opening-stage" ref={rootRef}>
        {playing ? (
          <div className="lab-frag-layer" aria-hidden="true">
            {worlds.map((w) => (
              <div key={w.id} className={`lab-frag lab-frag-${w.id}`}>
                <div className="lab-frag-media">
                  <img src={w.img} alt="" aria-hidden="true" decoding="async" />
                  {w.id === "international" ? (
                    <svg
                      className="lab-frag-route"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      focusable="false"
                    >
                      <path d="M8 78 L36 54 L62 60 L92 26" pathLength="100" />
                      <circle cx="8" cy="78" r="2.4" />
                      <circle cx="92" cy="26" r="2.4" />
                    </svg>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="lab-opening-identity">
          <span className="lab-opening-ring" aria-hidden="true" />
          <span className="eyebrow lab-opening-eyebrow">ORAC Holdings</span>
          <h1 className="lab-opening-word">
            <span className="sr-only">ORAC Holdings</span>
            <img src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
          </h1>
          <p className="lab-opening-tagline">
            A House of Businesses. Built on Vision, Discipline, and Legacy.
          </p>
        </div>

        <svg
          className="lab-thread lab-opening-fork"
          viewBox="0 0 300 60"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M150 0 L150 26 M150 26 L26 60 M150 26 L150 60 M150 26 L274 60" pathLength="100" />
        </svg>

        <div className="lab-opening-ventures">
          {worlds.map((w) => (
            <Link
              key={w.id}
              to={w.route}
              className={`lab-aperture lab-aperture-${w.id}`}
              data-ap={w.id}
              aria-label={`Explore ORAC ${w.name}`}
            >
              <div className="lab-aperture-media">
                <img src={w.img} alt={w.alt} decoding="async" fetchpriority="high" />
                <span className="lab-aperture-scrim" />
              </div>
              <div className="lab-aperture-label">
                <span className="eyebrow">{w.label}</span>
                <h2>{w.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
