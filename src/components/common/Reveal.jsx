import useReveal from "../../hooks/useReveal";

export default function Reveal({ as: Tag = "div", className = "", children, delay = 0, style, ...props }) {
  const { ref, visible } = useReveal({ delay });

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
