import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { DESKTOP_QUERY, DUR, EASE, MOBILE_QUERY, STAGGER, START } from "./motionTokens";
import { hasSettled, markSettled, restoreDrawn } from "./settled";

/**
 * Prime an SVG path for stroke drawing.
 *
 * `getTotalLength()` is in user units, so every path armed this way must be
 * drawn without `vector-effect: non-scaling-stroke` - see the note in
 * ContinuumMark.jsx for what happens otherwise.
 *
 * Returns null for a path that has already been drawn, so that rebuilding this
 * context cannot wind a finished line back to invisible (see settled.js).
 */
function armDraw(path) {
  if (!path) return null;
  if (hasSettled(path)) {
    restoreDrawn(path);
    return null;
  }
  const length = path.getTotalLength?.() || 0;
  if (!length) return null;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
  return path;
}

// Once a line is fully drawn it should stop depending on the measurement that
// drew it, or a later resize leaves a stale dash pattern chopping the end off.
function releaseDash(paths) {
  const list = Array.isArray(paths) ? paths : [paths];
  list.filter(Boolean).forEach(markSettled);
  restoreDrawn(list.filter(Boolean));
}

/**
 * Scene direction for the homepage - the ORAC Continuum's nine states and the
 * motion that belongs to each one.
 *
 * Everything here is scoped to a single `gsap.context`, so a route change tears
 * down every timeline and every ScrollTrigger it created. Nothing in here hides
 * content on its own: each timeline is a `fromTo`, so if it never runs the
 * element is simply where the stylesheet left it.
 *
 * Trigger ids are deliberate and stable - they are what `?motionDebug=1` lists,
 * and what a future reviewer greps for.
 */
export default function useHomeMotion(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;
    // Reduced motion and any GSAP failure both land here, and neither creates a
    // single trigger.
    if (!document.documentElement.classList.contains("orac-motion-ready")) return undefined;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const mm = gsap.matchMedia();

      const scenes = (isDesktop) => {
        const t = isDesktop ? 1 : 0.8;
        const reach = isDesktop ? 1 : 0.6;

        /* ---------------------------------------------------------------
           Scene 1 - Opening. The composition is already resolved on load;
           this only gives it a settle, then lets the three worlds separate
           by a hair as the visitor starts to scroll, so the axis reads as
           consolidating into the rail rather than simply scrolling away.
           No pin, no scrub of layout - transforms only.
           --------------------------------------------------------------- */
        const fork = q(".origin-fork path")[0];
        if (fork && armDraw(fork)) {
          gsap.to(fork, {
            strokeDashoffset: 0,
            duration: 1.1 * t,
            ease: EASE.draw,
            delay: 0.25,
          });
        }

        // The scrub deliberately targets the link *inside* each aperture, not
        // the aperture itself. The aperture is a Reveal, whose entry tween ends
        // with `clearProps: "transform"` - and clearing a transform that a live
        // scrub is also writing left the three frames stranded 38px low once
        // the visitor scrolled back to the top. Two animations, two elements.
        const ventures = q(".origin-venture .venture-compact-link");
        if (ventures.length === 3) {
          gsap.fromTo(
            ventures,
            { x: (i) => (i - 1) * -14 * reach },
            {
              x: (i) => (i - 1) * 16 * reach,
              ease: "none",
              scrollTrigger: {
                id: "opening-separate",
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }

        /* ---------------------------------------------------------------
           Scene 2 - Holding introduction. The spine draws downward first,
           and the statement rises out from behind it. This is the section
           that hands the thread to International.
           --------------------------------------------------------------- */
        const spine = q('[data-mark="spine"] [data-draw]')[0];
        if (spine) {
          gsap.fromTo(
            spine,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.25 * t,
              ease: EASE.draw,
              scrollTrigger: {
                id: "holding-reveal",
                trigger: ".holding-intro",
                start: START.section,
                once: true,
              },
            }
          );
        }

        const statement = q(".holding-statement")[0];
        if (statement) {
          gsap.fromTo(
            statement,
            { y: 34 * reach, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: DUR.text * t,
              ease: EASE.enter,
              scrollTrigger: { id: "holding-statement", trigger: statement, start: START.text, once: true },
            }
          );
        }

        /* ---------------------------------------------------------------
           Scene 3 - International. The image opens like a container door
           (handled by the media variant), and the trade route draws across
           it afterwards so the route lands on a photograph that is already
           readable.
           --------------------------------------------------------------- */
        const routeSvg = q('[data-mark="route"]')[0];
        if (routeSvg) {
          const routePath = routeSvg.querySelector("[data-draw]");
          const routeNodes = routeSvg.querySelectorAll("[data-draw-node]");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "international-route",
              trigger: ".venture-chapter-international",
              start: START.line,
              once: true,
            },
            onComplete: () => routePath && releaseDash(routePath),
          });
          if (routePath && armDraw(routePath)) {
            tl.to(routePath, { strokeDashoffset: 0, duration: DUR.draw * t, ease: EASE.draw }, 0.35);
          }
          tl.fromTo(
            routeNodes,
            { scale: 0, opacity: 0, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.45 * t, ease: "back.out(2)", stagger: DUR.draw * t * 0.75 },
            0.4
          );
        }

        /* ---------------------------------------------------------------
           Scene 4 - Global Reach. Deliberately NOT staged from here.

           The map wrapper is already a Reveal, and giving it a second fromTo
           from this hook put two independent gsap.contexts on one element:
           under StrictMode's mount/cleanup/mount, one context's revert()
           restored an "original" value the other had already overwritten, and
           the map stuck at opacity 0 permanently. It now carries the
           `global-map` trigger id through its own Reveal instead.

           The corridors are staged by useCorridorMotion, called from
           GlobalReach - they do not exist yet at this point in the lifecycle,
           because Geographies fetches its topojson at runtime. See that file.
           --------------------------------------------------------------- */

        /* ---------------------------------------------------------------
           Scene 5 - Eventus. The corridor becomes the edge of a photograph:
           the frame brackets draw outward, then the image opens out of a
           letterboxed band (media variant "frame").
           --------------------------------------------------------------- */
        const frameSvg = q('[data-mark="frame"]')[0];
        if (frameSvg) {
          const brackets = frameSvg.querySelectorAll("[data-draw]");
          brackets.forEach((b) => armDraw(b));
          gsap
            .timeline({
              scrollTrigger: {
                id: "eventus-frame",
                trigger: ".venture-chapter-eventus",
                start: START.line,
                once: true,
              },
              onComplete: () => releaseDash(Array.from(brackets)),
            })
            .fromTo(
              frameSvg,
              { scale: 1.04, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6 * t, ease: EASE.media }
            )
            .to(brackets, { strokeDashoffset: 0, duration: 1.0 * t, ease: EASE.draw, stagger: 0.08 }, 0.1);
        }

        /* ---------------------------------------------------------------
           Scene 6 - Luxe. The frame edge becomes a tailoring seam: the
           guide line and its running stitch are revealed downward through a
           clip rectangle, and the image wipes open from that same edge
           (media variant "seam"). Stiller than Eventus by design.
           --------------------------------------------------------------- */
        const seamSvg = q('[data-mark="seam"]')[0];
        if (seamSvg) {
          const clip = seamSvg.querySelector("[data-seam-clip]");
          const stitch = seamSvg.querySelector(".continuum-seam-stitch");
          const guide = seamSvg.querySelector(".continuum-seam-guide");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "luxe-seam",
              trigger: ".venture-chapter-luxe",
              start: START.line,
              once: true,
            },
          });
          if (stitch) gsap.set(stitch, { strokeDasharray: "7 7" });
          if (clip) {
            gsap.set(clip, { attr: { height: 0 } });
            tl.to(clip, { attr: { height: 400 }, duration: 1.4 * t, ease: EASE.draw }, 0.2);
          }
          if (guide)
            tl.fromTo(guide, { opacity: 0 }, { opacity: 1, duration: 0.5 * t, ease: EASE.enter }, 0.2);
        }

        /* ---------------------------------------------------------------
           Scene 7 - Why ORAC. Intensity drops. The seam straightens into a
           single architectural rule and the cards arrive quietly.
           --------------------------------------------------------------- */
        const divider = q('[data-mark="divider"] [data-draw]')[0];
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.15 * t,
              ease: EASE.draw,
              scrollTrigger: { id: "why-orac", trigger: ".why-section", start: START.section, once: true },
            }
          );
        }

        /* ---------------------------------------------------------------
           Scene 8 - Leadership. Institutional, near-static: one line down
           the group and a node per leader. Nothing competes with the names.
           --------------------------------------------------------------- */
        const timeline = q('[data-mark="timeline"]')[0];
        if (timeline) {
          const line = timeline.querySelector("[data-draw]");
          const nodes = timeline.querySelectorAll("[data-draw-node]");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "leadership",
              trigger: ".leadership-section",
              start: START.section,
              once: true,
            },
          });
          if (line)
            tl.fromTo(
              line,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 1.2 * t, ease: EASE.draw }
            );
          if (nodes.length) {
            tl.fromTo(
              nodes,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4 * t, ease: "back.out(1.7)", stagger: STAGGER.card },
              0.35
            );
          }
        }

        /* ---------------------------------------------------------------
           Scene 9 - Contact. Motion very nearly stops. The thread becomes a
           short guide pointing at the contact action, and that is all.
           --------------------------------------------------------------- */
        const guideLine = q('[data-mark="guide"] [data-draw]')[0];
        if (guideLine) {
          gsap.fromTo(
            guideLine,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 0.95 * t,
              ease: EASE.draw,
              scrollTrigger: { id: "contact", trigger: ".contact-cta", start: START.section, once: true },
            }
          );
        }
      };

      mm.add(DESKTOP_QUERY, () => scenes(true));
      mm.add(MOBILE_QUERY, () => scenes(false));

      return () => mm.revert();
    }, scopeRef);

    // The homepage adds a lot of height at once; make sure every trigger it
    // just created measured against the final layout.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [scopeRef]);
}
