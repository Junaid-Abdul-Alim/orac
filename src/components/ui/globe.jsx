import createGlobe from "cobe";
import { useCallback, useEffect, useRef } from "react";

// Adapted from a shadcn-registry "cobe-globe" component, converted from TSX
// to plain JS/JSX - this project has no TypeScript or Tailwind build (see
// src/components/ui/README.md), so the interfaces are dropped and the
// Tailwind utility classes/inline canvas styles become the `.orac-globe*`
// rules in styles/partials/15-globe.css.
//
// The marker/arc hover labels below look like they reference undefined CSS
// (`positionAnchor: "--cobe-" + id`, `var(--cobe-visible-{id})`) - they
// don't. This build of `cobe` (node_modules/cobe/dist/index.esm.js) creates
// a 1x1px div per marker/arc on every `globe.update()`, stamps it with
// `anchor-name: --cobe-{id}` (or `--cobe-arc-{id}`) positioned at that
// marker's current on-screen projection, and writes `--cobe-visible-{id}`
// into a `:root` stylesheet block while it's facing the camera. That's a
// real, load-bearing mechanism, not dead code - CSS anchor positioning
// (Chromium-only at the time of writing) is what lets a label track a
// rotating WebGL point without this component doing any 3D math itself.
// Firefox/Safari visitors simply never see the labels; nothing errors.
//
// The drag-with-inertia physics and the theta clamp that stops the globe
// being dragged to look straight down at a pole are upstream's too, kept
// as-is because they're a genuine improvement on the previous (v1-style)
// globe this replaces.
export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  arcColor = [0.3, 0.45, 0.85],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const lastPointer = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((event) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (pointerInteracting.current === null) return;

    const deltaX = event.clientX - pointerInteracting.current.x;
    const deltaY = event.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };

    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const maxVelocity = 0.15;
      velocity.current = {
        phi: Math.max(
          -maxVelocity,
          Math.min(maxVelocity, ((event.clientX - lastPointer.current.x) / dt) * 0.3)
        ),
        theta: Math.max(
          -maxVelocity,
          Math.min(maxVelocity, ((event.clientY - lastPointer.current.y) / dt) * 0.08)
        ),
      };
    }
    lastPointer.current = { x: event.clientX, y: event.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // A reduced-motion visitor still gets the fully rendered, draggable
    // globe - it just never spins on its own, matching the rest of the
    // site's motion conventions.
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const cobeMarkers = markers.map((marker) => ({
      location: marker.location,
      size: markerSize,
      id: marker.id,
    }));
    const cobeArcs = arcs.map((arc) => ({ from: arc.from, to: arc.to, id: arc.id }));

    let globe = null;
    let animationId;
    let phi = 0;
    let resizeObserver;
    let visibilityObserver;
    let disposed = false;
    let fadeInId;
    // Gates the rAF loop itself, not just the idle spin: off-screen (hero
    // scrolled away, or never scrolled to) or a backgrounded tab should stop
    // this canvas from redrawing every frame, not merely skip advancing phi.
    let isOnScreen = true;

    function animate() {
      if (!isPausedRef.current) {
        if (!prefersReducedMotion) phi += speed;

        if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
          phiOffsetRef.current += velocity.current.phi;
          thetaOffsetRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;
        }

        const thetaMin = -0.4;
        const thetaMax = 0.4;
        if (thetaOffsetRef.current < thetaMin) {
          thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
        } else if (thetaOffsetRef.current > thetaMax) {
          thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
        }
      }

      globe.update({
        phi: phi + phiOffsetRef.current + dragOffset.current.phi,
        theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
        dark,
        mapBrightness,
        markerColor,
        baseColor,
        arcColor,
        markerElevation,
        markers: cobeMarkers,
        arcs: cobeArcs,
      });
      animationId = isOnScreen ? requestAnimationFrame(animate) : undefined;
    }

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: cobeMarkers,
        arcs: cobeArcs,
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.7,
      });

      animate();
      fadeInId = window.setTimeout(() => canvas && (canvas.style.opacity = "1"));

      if (typeof IntersectionObserver !== "undefined") {
        visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            const wasOnScreen = isOnScreen;
            isOnScreen = entry.isIntersecting;
            if (isOnScreen && !wasOnScreen && !disposed && !animationId) animate();
          },
          { threshold: 0 }
        );
        visibilityObserver.observe(canvas);
      }
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver.disconnect();
          init();
        }
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.clearTimeout(fadeInId);
      if (animationId) cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  ]);

  return (
    <div className={`orac-globe ${className}`.trim()}>
      <canvas ref={canvasRef} className="orac-globe-canvas" onPointerDown={handlePointerDown} />
      {markers
        .filter((marker) => marker.label)
        .map((marker) => (
          <div
            key={marker.id}
            className="orac-globe-label"
            style={{
              positionAnchor: `--cobe-${marker.id}`,
              opacity: `var(--cobe-visible-${marker.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
            }}
          >
            {marker.label}
          </div>
        ))}
      {arcs
        .filter((arc) => arc.label)
        .map((arc) => (
          <div
            key={arc.id}
            className="orac-globe-label orac-globe-label-arc"
            style={{
              positionAnchor: `--cobe-arc-${arc.id}`,
              opacity: `var(--cobe-visible-arc-${arc.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-arc-${arc.id}, 0)) * 8px))`,
            }}
          >
            {arc.label}
          </div>
        ))}
    </div>
  );
}
