import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import ContinuumMark from "../components/motion/ContinuumMark";

/**
 * `bare` is for the homepage only, where a section-level scrub timeline (see
 * useHomeMotion.js) animates the heading and action directly. OracEventus
 * renders this same component without the prop and keeps its existing
 * Reveal-driven behaviour untouched.
 */
export default function ContactCTA({
  title = "Start a conversation with ORAC Holdings.",
  text,
  bare = false,
}) {
  const inner = (
    <>
      <span className="eyebrow">Contact</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
      <Button to="/contact" variant="secondary">
        Contact Us
      </Button>
    </>
  );

  return (
    <section className="section contact-cta" data-continuum-phase="contact">
      {/* The thread's last job: a short guide leading down into the contact
          action. Motion all but stops here. */}
      <ContinuumMark kind="guide" className="contact-guide" />
      <div className="container contact-cta-inner">
        {bare ? <div className="contact-cta-copy">{inner}</div> : <Reveal>{inner}</Reveal>}
      </div>
    </section>
  );
}
