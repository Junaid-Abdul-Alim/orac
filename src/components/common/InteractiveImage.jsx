import { useRef } from "react";
import SafeImage from "./SafeImage";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * A lightweight stand-in for a movable 3D model: the image tilts toward the
 * pointer (or finger) to suggest depth, and settles back on release. Transforms
 * are written straight to the DOM so dragging never triggers a React re-render.
 * Swap in a real <model-viewer> here once glTF assets are available.
 */
export default function InteractiveImage({ image, maxTilt = 12, className = "", label }) {
  const stageRef = useRef(null);

  const applyTilt = (event) => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;

    const point = event.touches?.[0] ?? event;
    const rect = stage.getBoundingClientRect();
    const relX = (point.clientX - rect.left) / rect.width - 0.5;
    const relY = (point.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--tilt-x", `${(-relY * maxTilt).toFixed(2)}deg`);
    stage.style.setProperty("--tilt-y", `${(relX * maxTilt).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={stageRef}
      className={`interactive-image ${className}`.trim()}
      onPointerMove={applyTilt}
      onPointerLeave={resetTilt}
      onTouchMove={applyTilt}
      onTouchEnd={resetTilt}
    >
      <div className="interactive-image-plane">
        <SafeImage
          src={image?.src}
          alt={image?.alt || label || ""}
          fallbackLabel={image?.label || label || "The House of Azrin"}
          className="interactive-image-photo"
        />
      </div>
      <span className="interactive-image-hint" aria-hidden="true">
        Move to explore
      </span>
    </div>
  );
}
