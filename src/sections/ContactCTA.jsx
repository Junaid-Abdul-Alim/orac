import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";
import ContinuumMark from "../components/motion/ContinuumMark";

export default function ContactCTA({ title = "Start a conversation with ORAC Holdings.", text }) {
  return (
    <section className="section contact-cta" data-continuum-phase="contact">
      {/* The thread's last job: a short guide leading down into the contact
          action. Motion all but stops here. */}
      <ContinuumMark kind="guide" className="contact-guide" />
      <div className="container contact-cta-inner">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
          <Button to="/contact" variant="secondary">
            Contact Us
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
