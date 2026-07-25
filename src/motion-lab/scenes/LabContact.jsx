import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";

/**
 * SCENE 10 — Contact: The Close (storyboard §5, thread state 8 "Guide"). The
 * ink-dark close that gives the page real closure. The gold thread's last
 * state is a short vertical Guide line drawing the eye from the statement down
 * to the CTA; it draws top→down once on enter (CSS, gated on is-visible), then
 * rests — the calmest scene. The gold carries from cream onto the dark ground,
 * mirroring the opening (light-resolves-to-worlds vs dark-resolves-to-invite).
 */
export default function LabContact() {
  return (
    <section className="lab-scene lab-contact" aria-labelledby="lab-contact-title">
      <div className="container lab-contact-inner">
        <Reveal className="lab-contact-copy">
          <span className="eyebrow">Contact</span>
          <h2 id="lab-contact-title">Explore the right ORAC venture or start a conversation.</h2>
          <p>Choose a business, send an enquiry, or work with ORAC on the next serious opportunity.</p>

          <svg
            className="lab-thread lab-guide"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="1" y1="0" x2="1" y2="100" pathLength="100" />
          </svg>

          <Link className="button button-secondary" to="/contact">
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
