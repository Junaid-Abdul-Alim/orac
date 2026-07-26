import useReveal from "../../hooks/useReveal";

export default function ImageReveal({ as: Tag = "div", className = "", children, delay = 0 }) {
  // Major media settles slightly later than surrounding copy, so the image is
  // comfortably on screen before its mask opens.
  const { ref, visible } = useReveal({ delay, rootMargin: "0px 0px -16% 0px", threshold: 0.05 });

  return (
    <Tag
      ref={ref}
      className={`image-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
