import BrandLockup from "../components/common/BrandLockup";
import ContactActionRow from "../components/common/ContactActionRow";
import ContactBrandCard from "../components/common/ContactBrandCard";
import GmailIcon from "../components/common/GmailIcon";
import Reveal from "../components/common/Reveal";
import WhatsAppIcon from "../components/common/WhatsAppIcon";
import { contactDetails } from "../data/contactData";

// Same two-column contact pattern as InternationalContactCTA.jsx: a
// "held by ORAC Holdings" brand card on the left, the venture's own contact
// person on the right. See ORAC LUXE Website Corrections, item 8. The action
// rows share the .contact-action system defined in 13-international.css.
export default function LuxeContactCTA() {
  return (
    <section className="section international-contact-cta" aria-labelledby="luxe-contact-title">
      <div className="container">
        <Reveal className="international-contact-head">
          <BrandLockup items={["ORAC LUXE"]} />
          <span className="eyebrow">Fashion enquiries and meaningful collaborations begin here.</span>
          <h2 id="luxe-contact-title">We would love to hear from you.</h2>
        </Reveal>

        <div className="international-contact-grid">
          <ContactBrandCard heldByLabel="ORAC HOLDINGS" />

          <div className="international-contact-people">
            <Reveal as="article" className="international-contact-card" delay={130}>
              <div className="international-contact-card-top">
                <span className="eyebrow">Managing Director, ORAC Luxe</span>
                <h3>Ohm Pranav</h3>
                <p>India</p>
              </div>
              <div className="international-contact-links">
                <ContactActionRow
                  icon={WhatsAppIcon}
                  kind="WhatsApp"
                  text={contactDetails.holding.phone}
                  href={`https://wa.me/${contactDetails.holding.phone.replace(/\D/g, "")}`}
                  channel="whatsapp"
                  external
                />
                <ContactActionRow
                  icon={GmailIcon}
                  kind="Email"
                  text={contactDetails.holding.secondaryEmail}
                  href={`mailto:${contactDetails.holding.secondaryEmail}`}
                  channel="email"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
