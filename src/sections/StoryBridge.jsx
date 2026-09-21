// A cinematic title card between two homepage chapters. It adds no content
// of its own beyond one connecting sentence; its job is to close one world
// and open the next. The sentence resolves word by word as the visitor scrolls
// (useStoryMotion.js), and reads as a plain sentence to assistive tech and to
// anyone whose motion is reduced.
export default function StoryBridge({ kicker, line, index, total }) {
  const words = line.split(" ");
  // Everything after the first full stop is the second beat of the line and
  // takes the accent treatment.
  const beat = words.findIndex((word) => word.endsWith(".")) + 1;

  return (
    <section className="story-bridge" data-story-bridge aria-label={kicker}>
      <span className="story-bridge-bar story-bridge-bar-top" data-bridge-bar aria-hidden="true" />
      <div className="container story-bridge-inner">
        <span className="story-bridge-cut" aria-hidden="true">
          Cut {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <p className="story-bridge-line">
          {words.map((word, i) => (
            <span
              className={`story-bridge-word${beat > 0 && i >= beat ? " is-second" : ""}${i === beat && beat > 0 ? " is-beat-start" : ""}`}
              data-bridge-word
              key={`${word}-${i}`}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <span className="story-bridge-kicker" aria-hidden="true">
          {kicker}
        </span>
      </div>
      <span className="story-bridge-bar story-bridge-bar-bottom" data-bridge-bar aria-hidden="true" />
    </section>
  );
}
