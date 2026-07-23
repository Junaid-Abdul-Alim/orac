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
 * venture's accent token, see variables.css) and `reverse` (image side),
 * while sharing one structure, one type system, and one motion language -
 * "distinct worlds, one house" rather than three unrelated layouts.
 */
export default function VentureChapter({
  tone,
  reverse = false,
  eyebrow,
  title,
  text,
  points = [],
  cta,
  image,
  imageLabel,
}) {
  return (
    <section className={`section venture-chapter venture-chapter-${tone}`}>
      <div className={`container editorial-layout ${reverse ? "reverse" : ""}`.trim()}>
        {reverse ? (
          <Reveal>
            <ImagePanel image={image} label={imageLabel} className="preview-image-panel" />
          </Reveal>
        ) : null}
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} text={text} />
          {points.length ? (
            <Reveal className="editorial-list">
              {points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </Reveal>
          ) : null}
          <Reveal>
            <Button to={cta.to}>{cta.label}</Button>
          </Reveal>
        </div>
        {reverse ? null : (
          <Reveal>
            <ImagePanel image={image} label={imageLabel} className="preview-image-panel" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
