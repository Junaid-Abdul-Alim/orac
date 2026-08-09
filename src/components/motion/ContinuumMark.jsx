import { useId } from "react";

/**
 * The continuum's in-section expressions - the thread's gold line rendered
 * as it looks once inside a section. Every one of them starts at the edge the
 * thread arrives from - the top, or the left - so a section visibly receives
 * the line rather than growing its own unrelated gold decoration.
 *
 * Markup only. The drawing is owned by useHomeMotion / usePageMotion so that
 * every trigger carries a reviewable id and lives in one timeline per section.
 */
export default function ContinuumMark({ kind, className = "", nodes = 0 }) {
  const uid = useId().replace(/:/g, "");
  const cls = `continuum-mark continuum-mark-${kind} ${className}`.trim();

  // Structural lines. Cheap transforms rather than SVG, because a straight
  // rule scaled from one end is indistinguishable from a drawn one and costs
  // nothing.
  if (kind === "spine" || kind === "divider" || kind === "guide") {
    return (
      <span className={cls} data-mark={kind} aria-hidden="true">
        <span className="continuum-mark-line" data-draw />
      </span>
    );
  }

  if (kind === "timeline") {
    return (
      <span className={cls} data-mark={kind} aria-hidden="true">
        <span className="continuum-mark-line" data-draw />
        {Array.from({ length: nodes }, (_, i) => (
          <span className="continuum-mark-node" data-draw-node key={i} style={{ "--i": i }} />
        ))}
      </span>
    );
  }

  /* A cinema frame opening around the photograph: four corner brackets, drawn
   * outward from the corners.
   *
   * Deliberately NOT `vector-effect: non-scaling-stroke`, which is the obvious
   * choice here and is wrong: it moves the dash pattern into screen space while
   * `getTotalLength()` keeps reporting user units. Inside a `preserveAspectRatio
   * ="none"` box those two disagree by exactly the stretch factor, so the draw
   * tween reaches `strokeDashoffset: 0` with about 60% of the bracket on screen
   * and simply stops there. Plain user-unit strokes stay in step with
   * getTotalLength(); the cost is that the stroke is stretched by the same
   * ratio as the box, which for a 3px line is not visible.
   */
  if (kind === "frame") {
    return (
      <svg
        className={cls}
        data-mark="frame"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {[
          "M10 74 L10 10 L84 10",
          "M316 10 L390 10 L390 74",
          "M390 226 L390 290 L316 290",
          "M84 290 L10 290 L10 226",
        ].map((d) => (
          <path key={d} className="continuum-frame-bracket" data-draw d={d} fill="none" />
        ))}
      </svg>
    );
  }

  // A tailoring seam: a guide line with a running stitch beside it, revealed
  // top-to-bottom through a clip rectangle so the stitches appear one after
  // another instead of marching along the path.
  if (kind === "seam") {
    const clipId = `seam-clip-${uid}`;
    return (
      <svg
        className={cls}
        data-mark="seam"
        viewBox="0 0 60 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <rect data-seam-clip x="0" y="0" width="60" height="400" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <path
            className="continuum-seam-guide"
            d="M30 4 L30 396"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="continuum-seam-stitch"
            d="M30 4 L30 396"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    );
  }

  return null;
}
