import useMotionReveal from "../../motion/useMotionReveal";

/**
 * Major editorial media. Opens from a concealed state into its frame while the
 * photograph settles back out of a slight over-scale.
 *
 * `variant` selects which world's opening it uses - see MEDIA_VARIANTS in
 * src/motion/useMotionReveal.js. Anything not passing a variant gets the
 * shared "panel" opening, so this stays a drop-in replacement for the previous
 * component.
 */
export default function ImageReveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
  variant = "panel",
  motionId,
}) {
  const ref = useMotionReveal({ kind: "media", delay, variant });

  return (
    <Tag
      ref={ref}
      className={`image-reveal ${className}`.trim()}
      data-motion="media"
      data-motion-variant={variant}
      data-motion-id={motionId}
    >
      {children}
    </Tag>
  );
}
