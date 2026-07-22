import Reveal from "./Reveal";

export default function SectionHeader({ eyebrow, title, text, align = "left" }) {
  return (
    <Reveal className={`section-header section-header-${align}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </Reveal>
  );
}
