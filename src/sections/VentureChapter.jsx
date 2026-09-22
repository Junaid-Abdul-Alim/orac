import Button from "../components/common/Button";
import ImagePanel from "../components/common/ImagePanel";
import SectionHeader from "../components/common/SectionHeader";
import ContinuumMark from "../components/motion/ContinuumMark";
import ChapterMark from "../components/motion/ChapterMark";
import { chapters, ventureWhy } from "../data/storyData";

/**
 * How the continuum expresses itself inside each venture chapter, and which
 * clip-path "door" the image opens through. Derived from `tone` rather than
 * passed at the call site, so a chapter cannot be given a world's colours and
 * another world's motion.
 */
const CHAPTER_MOTION = {
  international: { variant: "door", mark: "route" },
  eventus: { variant: "frame", mark: "frame" },
  // No mark: the "seam" mark (a dashed stitch line down the image's left
  // edge) read as an unwanted dotted border on the photograph and was
  // removed per feedback. `variant: "seam"` still controls the image's own
  // clip-path opening (04-sections.css), which is unrelated and unaffected.
  luxe: { variant: "seam" },
};

/**
 * One venture chapter (stage 3 of the homepage journey - see
 * docs/ORAC-REDESIGN-SPEC.md §2, §4). Replaces the three near-identical
 * preview sections (InternationalPreview / EventusPreview / LuxePreview),
 * which shared the exact same "editorial-section" markup and differed only
 * in copy, image, and button target - a confirmed literal duplication.
 *
 * Home-only, plain markup: the copy groups (`.section-header`,
 * `.editorial-list`, `.venture-chapter-actions`) and the image panel
 * (`bare` ImagePanel) carry no reveal of their own. useHomeMotion.js's
 * per-tone scene (international/eventus/luxe) drives them with one
 * scroll-scrubbed timeline each, so the image opening, the heading, the
 * route/frame/seam mark, and the supporting copy all advance together as the
 * visitor scrolls rather than firing once and staying.
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
  const motion = CHAPTER_MOTION[tone] || {};

  return (
    <section className={`section venture-chapter venture-chapter-${tone}`} data-continuum-phase={tone}>
      <div className="container story-chapter-head">
        <ChapterMark {...chapters[tone]} />
      </div>
      {/* Copy always precedes media in the DOM (reading order, and one
          predictable mobile stack for all three chapters); `reverse` only
          swaps the visual columns, and only once the layout is actually
          two-column. */}
      <div className={`container editorial-layout ${reverse ? "reverse" : ""}`.trim()}>
        <div className="editorial-copy">
          <SectionHeader bare eyebrow={eyebrow} title={title} text={text} />
          {ventureWhy[tone] ? (
            <p className="chapter-why">
              <span className="chapter-why-label">Why it exists</span>
              {ventureWhy[tone]}
            </p>
          ) : null}
          {points.length ? (
            <div className="editorial-list">
              {points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          ) : null}
          <div className="venture-chapter-actions">
            <Button to={cta.to}>{cta.label}</Button>
            {meta ? <small className="venture-chapter-meta">{meta}</small> : null}
          </div>
        </div>

        <div className="editorial-media venture-chapter-media">
          <ImagePanel
            bare
            image={image}
            label={imageLabel}
            className="preview-image-panel"
            variant={motion.variant}
          />
          {motion.mark ? <ContinuumMark kind={motion.mark} /> : null}
        </div>
      </div>
    </section>
  );
}
