import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// Adapted from the shadcn-registry "globe" component (cobe.js), with one
// structural change: that snippet drives rotation through an `onRender`
// callback, which is cobe v1's API. The `cobe` version actually published to
// npm today is v2 (see node_modules/cobe/dist/index.d.ts) - v2 dropped
// `onRender` entirely in favour of an imperative `globe.update(state)` call,
// so this drives its own requestAnimationFrame loop and calls that instead.
// Without this change the globe would render its single initial frame and
// then sit static forever (auto-rotate and drag would both silently no-op).
//
// This project also has no Tailwind/shadcn `cn()` helper (see
// src/components/ui/README.md), so class names are plain strings and the
// layout/colour rules that would otherwise be Tailwind utilities live in
// styles/partials/15-globe.css.
const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({ className = "", config = GLOBE_CONFIG }) {
  const phiRef = useRef(config.phi ?? 0);
  const rRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rRef.current = delta / 200;
    }
  };

  const onResize = () => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    // cobe's own rAF loop was v1-only (see the module comment above); a
    // reduced-motion visitor still gets the fully rendered globe, it just
    // never spins on its own - checked once per mount, matching the
    // static-per-visit pattern the rest of the site's motion code uses.
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    let frameId = requestAnimationFrame(function animate() {
      if (!pointerInteracting.current && !prefersReducedMotion) phiRef.current += 0.005;
      globe.update({
        phi: phiRef.current + rRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      frameId = requestAnimationFrame(animate);
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- config intentionally read once at mount, matching the upstream component
  }, []);

  return (
    <div className={`orac-globe ${className}`.trim()}>
      <canvas
        className="orac-globe-canvas"
        ref={canvasRef}
        onPointerDown={(event) => updatePointerInteraction(event.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => event.touches[0] && updateMovement(event.touches[0].clientX)}
      />
    </div>
  );
}
