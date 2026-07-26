import useMotionReveal from "../../motion/useMotionReveal";

/**
 * A content group that enters as the visitor scrolls to it.
 *
 * The markup contract is unchanged - every one of the twenty-six files using
 * this component keeps working untouched - but the engine underneath is now
 * GSAP + ScrollTrigger instead of IntersectionObserver + a CSS transition.
 *
 * `data-motion` is what the stylesheet keys the hidden initial state off, and
 * it only bites under `html.orac-motion-ready`. With JavaScript off, or GSAP
 * broken, or reduced motion requested, this renders as a plain element already
 * in its final position.
 *
 * `kind="card"` is for grid items: shorter travel, shorter duration, meant to
 * be paired with an incremental `delay` across siblings.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
  kind = "text",
  motionId,
  style,
  ...props
}) {
  const ref = useMotionReveal({ kind, delay });

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-motion={kind === "card" ? "card" : "reveal"}
      data-motion-id={motionId}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
