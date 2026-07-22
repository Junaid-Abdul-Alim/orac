import useReveal from "../../hooks/useReveal";

export default function ImageReveal({ as: Tag = "div", className = "", children, delay = 0 }) {
  const { ref, visible } = useReveal({ delay, rootMargin: "0px 0px 18% 0px", threshold: 0.05 });

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
