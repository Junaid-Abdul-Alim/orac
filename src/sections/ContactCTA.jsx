import Button from "../components/common/Button";
import Reveal from "../components/common/Reveal";

export default function ContactCTA({ title = "Start a conversation with ORAC Holdings.", text }) {
  return (
    <section className="section contact-cta">
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
