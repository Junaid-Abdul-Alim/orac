import Reveal from "./Reveal";

/**
 * `bare` renders the same markup with no `Reveal` wrapper and no motion of its
 * own - for the homepage only, where a single section-level scrub timeline
 * (see useHomeMotion.js) now animates this element directly. Every other
 * caller (business pages, and any Home usage that doesn't pass it) is
 * unaffected: the default is the exact previous behaviour.
 */
export default function SectionHeader({ eyebrow, title, text, bare = false }) {
  const className = "section-header";
  const content = (
    <>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </>
  );

  if (bare) {
    return <div className={className}>{content}</div>;
  }

  return <Reveal className={className}>{content}</Reveal>;
}
