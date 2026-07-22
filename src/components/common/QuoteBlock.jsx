import Reveal from "./Reveal";

export default function QuoteBlock({ eyebrow = "ORAC Standard", quote, caption }) {
  return (
    <section className="quote-block">
      <div className="container">
        <Reveal className="quote-block-inner">
          <span className="eyebrow">{eyebrow}</span>
          <blockquote>{quote}</blockquote>
          {caption ? <p>{caption}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
