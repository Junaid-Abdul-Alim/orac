// A chapter title-card strip: number, a rule that draws across, then the
// chapter's name and the venture it belongs to. Markup only - useStoryMotion.js
// owns the drawing. Decorative and redundant with the section's own heading,
// so it is hidden from assistive tech rather than read twice.
export default function ChapterMark({ no, title, note, className = "" }) {
  return (
    <div className={`chapter-mark ${className}`.trim()} data-chapter aria-hidden="true">
      <span className="chapter-mark-no">{no}</span>
      <span className="chapter-mark-rule" data-chapter-rule />
      <span className="chapter-mark-title">{title}</span>
      <span className="chapter-mark-note">{note}</span>
    </div>
  );
}
