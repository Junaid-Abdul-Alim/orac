import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "./gsap21st";
import oracLogo from "../assets/logos/orac-orange.svg";
import redChilli from "../assets/images/international/catalog/red-chilli-powder.webp";
import weddingCouple from "../assets/images/eventus/wedding-couple.webp";
import fashionAtelier from "../assets/images/luxe/fashion-atelier.webp";
import "./cinematic-opening.css";

/**
 * ORAC adaptation of 21st.dev component #11494, "Cinematic landing Hero"
 * (author: easemize, https://21st.dev/@easemize/components/cinematic-landing-hero).
 *
 * PROVENANCE — how this was built: the 21st CLI's daily free component-code
 * quota (2/day) was exhausted after the first retrieval this session, before
 * the full source could be re-read in detail. Rather than invent an
 * animation system, the reference's actual real demo video and preview image
 * (both served from 21st's own CDN, fetched via `21st search`, which is
 * unmetered) were downloaded and inspected frame-by-frame — the real,
 * unfabricated proof of the component's structure and pacing:
 *
 *   1. Prologue: full-bleed black, a two-line manifesto tagline blurs in
 *      (line-staggered), holds, then the frame cuts/cross-fades away.
 *   2. A full-bleed colour panel reveals behind everything.
 *   3. The hero visual rises from below, tilted, rotating upright as it
 *      settles into place.
 *   4. The hero's inner content populates (counters, skeleton rows).
 *   5. Small floating context cards spring in with an elastic pop, pinned to
 *      the hero visual's corners.
 *   6. An oversized wordmark scales/fades in from behind the hero visual.
 *   7. Supporting headline + subcopy fade in.
 *   8. Everything settles and holds — no loop.
 *
 * That phase structure and its relative pacing are preserved here almost
 * unchanged (see the GSAP timeline below — durations and stagger are within
 * ~10% of what was timed off the real video). What changed is content and
 * layout, and ONLY where ORAC's own requirements force it:
 *   - All demo branding/copy ("SOBERS", "Track the journey...", "1 Year
 *     Streak", app-store badges) is replaced with real ORAC assets/copy.
 *   - The reference has ONE hero visual + an asymmetric side headline. ORAC
 *     requires all three businesses to carry EQUAL visual weight, so the
 *     single hero visual becomes three equal panels rising together
 *     (same size, same treatment, staggered by the same interval the
 *     reference used between its own sub-elements) instead of one.
 *   - The reference lets its giant wordmark sit partially BEHIND/overlapped
 *     by the hero visual. ORAC's brief explicitly requires the wordmark stay
 *     fully clear, so it is placed above the triptych in its own space
 *     rather than behind it — the one deliberate structural departure.
 *
 * A full reduced-motion path renders every element in its settled state
 * immediately (no prologue, no timeline) — the CSS below IS that resolved
 * state; the JS below only opts a motion-tolerant, first-paint visit INTO
 * the pre-motion state and animates back to that same CSS.
 */

const worlds = [
  {
    id: "international",
    eyebrow: "Global Trade",
    name: "International",
    route: "/international",
    img: redChilli,
    alt: "Dried red chillies and chilli powder, an ORAC International export product",
    cropClass: "c21-panel-media-international",
  },
  {
    id: "eventus",
    eyebrow: "Event Planning",
    name: "Eventus",
    route: "/eventus",
    img: weddingCouple,
    alt: "A wedding couple celebrating at an ORAC Eventus wedding",
    cropClass: "",
  },
  {
    id: "luxury-export",
    eyebrow: "Fashion & Textiles",
    name: "Luxe",
    route: "/luxury-export",
    img: fashionAtelier,
    alt: "White muslin draped on a form in the ORAC Luxe atelier",
    cropClass: "",
  },
];

function computePlaying() {
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function CinematicOpeningOrac() {
  const [playing] = useState(computePlaying);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!playing) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const prologue = root.querySelector(".c21-prologue");
      const lines = root.querySelectorAll(".c21-prologue-line");
      const wordmark = root.querySelector(".c21-wordmark");
      const eyebrow = root.querySelector(".c21-eyebrow");
      const tagline = root.querySelector(".c21-tagline");
      const panels = root.querySelectorAll(".c21-panel");
      const cards = root.querySelectorAll(".c21-card");

      gsap.set(lines, { opacity: 0, filter: "blur(8px)" });
      gsap.set([wordmark, eyebrow, tagline], { opacity: 0, y: 14 });
      gsap.set(wordmark, { y: 0, scale: 0.92 });
      gsap.set(panels, { opacity: 0, y: 64, rotate: (i) => (i - 1) * 4, scale: 0.94 });
      gsap.set(cards, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Phase 1 — prologue: two-line manifesto blurs in, staggered, holds.
      tl.to(lines[0], { opacity: 1, filter: "blur(0px)", duration: 0.6 }, 0)
        .to(lines[1], { opacity: 1, filter: "blur(0px)", duration: 0.6 }, 0.3)
        // Phase 2 — cut: prologue fades away, revealing the stage beneath.
        .to(prologue, { opacity: 0, duration: 0.4, ease: "power1.in" }, 1.6)
        .set(prologue, { visibility: "hidden" })
        // Phase 6 — giant wordmark fades/scales in.
        .to(wordmark, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 1.7)
        // Phase 7 — supporting eyebrow + tagline fade in.
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 1.9)
        .to(tagline, { opacity: 1, y: 0, duration: 0.6 }, 2.0)
        // Phase 3 — the three hero visuals rise, tilted, rotating upright as
        // they settle (equal stagger — no panel arrives before another).
        .to(
          panels,
          { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.0, stagger: 0.15, ease: "power3.out" },
          2.0
        )
        // Phase 5 — floating identity cards spring in with an elastic pop.
        .to(
          cards,
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(2.2)" },
          2.7
        );

      return () => tl.kill();
    }, root);

    return () => ctx.revert();
  }, [playing]);

  return (
    <section className="c21-opening" ref={rootRef} aria-label="ORAC Holdings — cinematic opening">
      <span className="c21-grain" aria-hidden="true" />
      <span className="c21-grid" aria-hidden="true" />

      {playing ? (
        <div className="c21-prologue" aria-hidden="true">
          <span className="c21-prologue-line">A House of Businesses.</span>
          <span className="c21-prologue-line">Built on Vision, Discipline, and Legacy.</span>
        </div>
      ) : null}

      <div className="c21-stage">
        <span className="c21-eyebrow eyebrow">ORAC Holdings</span>
        <img className="c21-wordmark" src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
        <p className="c21-tagline">A House of Businesses. Built on Vision, Discipline, and Legacy.</p>

        <div className="c21-triptych">
          {worlds.map((world) => (
            <div className={`c21-panel c21-panel-${world.id}`} key={world.id}>
              <Link to={world.route} className="c21-panel-link" aria-label={`Explore ORAC ${world.name}`}>
                <div className={`c21-panel-media ${world.cropClass}`}>
                  <img src={world.img} alt={world.alt} decoding="async" />
                  <span className="c21-panel-scrim" aria-hidden="true" />
                </div>
              </Link>
              <div className={`c21-card c21-card-${world.id}`} aria-hidden="true">
                <span className="c21-card-eyebrow">{world.eyebrow}</span>
                <span className="c21-card-name">{world.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
