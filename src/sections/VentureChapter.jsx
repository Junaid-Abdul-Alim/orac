import Button from "../components/common/Button";
import ImagePanel from "../components/common/ImagePanel";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";

/**
 * One venture chapter (stage 3 of the homepage journey - see
 * docs/ORAC-REDESIGN-SPEC.md §2, §4). Replaces the three near-identical
 * preview sections (InternationalPreview / EventusPreview / LuxePreview),
 * which shared the exact same "editorial-section" markup and differed only
 * in copy, image, and button target - a confirmed literal duplication.
 *
 * Each venture stays visually distinct through its `tone` (picks up that
 * venture's accent token, see variables.css) and restrained per-tone CSS
 * (image ratio, metadata placement, background) driven entirely by the
 * `venture-chapter-${tone}` class - see Blueprint Phase 5. `reverse` (image
 * side) remains a separate, explicit prop rather than being inferred from
 * tone, since it is a layout decision Home.jsx already makes deliberately.
 * One shared structure, one type system, one motion language - "distinct
 * worlds, one house" rather than three unrelated layouts.
 */
export default function VentureChapter({
  tone,
  reverse = false,
  eyebrow,
  title,
  text,
  points = [],
  meta,
  cta,
  image,
  imageLabel,
}) {
  return (
    <section className={`section venture-chapter venture-chapter-${tone}`}>
      {/* Copy always precedes media in the DOM (reading order, and one
          predictable mobile stack for all three chapters); `reverse` only
          swaps the visual columns, and only once the layout is actually
          two-column. The previous markup reordered the DOM *and* applied
          `order: 2` to the first child, which cancelled out - all three
          chapters rendered image-right, so the alternation the homepage
          was composed around never appeared. */}
      <div className={`container editorial-layout ${reverse ? "reverse" : ""}`.trim()}>
        <div className="editorial-copy">
          <SectionHeader eyebrow={eyebrow} title={title} text={text} />
          {points.length ? (
            <Reveal className="editorial-list" delay={90}>
              {points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </Reveal>
          ) : null}
          <Reveal className="venture-chapter-actions" delay={160}>
            <Button to={cta.to}>{cta.label}</Button>
            {meta ? <small className="venture-chapter-meta">{meta}</small> : null}
          </Reveal>
        </div>
        <ImagePanel
          image={image}
          label={imageLabel}
          className="preview-image-panel editorial-media"
          delay={120}
        />
      </div>
    </section>
  );
}
