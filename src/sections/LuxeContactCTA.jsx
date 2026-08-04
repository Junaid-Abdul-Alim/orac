import { ArrowUpRight } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import GmailIcon from "../components/common/GmailIcon";
import Reveal from "../components/common/Reveal";
import WhatsAppIcon from "../components/common/WhatsAppIcon";
import { contactDetails } from "../data/contactData";
import oracLogo from "../assets/logos/orac-orange.svg";

// Same two-column contact pattern as InternationalContactCTA.jsx: a
// "held by ORAC Holdings" brand card on the left, the venture's own contact
// person on the right. See ORAC LUXE Website Corrections, item 8. The action
// rows share the .contact-action system defined in 13-international.css.
function ContactRow({ icon: Icon, kind, text, href, channel, external }) {
  return (
    <a
      className={`contact-action contact-action-${channel}`}
      href={href}
      aria-label={`${kind}: ${text}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="contact-action-icon" aria-hidden="true">
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <span className="contact-action-kind">{kind}</span>
      <span className="contact-action-value">{text}</span>
      <ArrowUpRight className="contact-action-arrow" size={15} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}

export default function LuxeContactCTA() {
  const { luxe } = contactDetails;
  const whatsappUrl = `https://wa.me/${luxe.phone.replace(/\D/g, "")}`;
  const primaryEmail = luxe.emails[luxe.emails.length - 1];

  return (
    <section className="section international-contact-cta" aria-labelledby="luxe-contact-title">
      <div className="container">
        <Reveal className="international-contact-head">
          <BrandLockup items={["ORAC LUXE"]} />
          <span className="eyebrow">Fashion enquiries and meaningful collaborations begin here.</span>
          <h2 id="luxe-contact-title">We would love to hear from you.</h2>
        </Reveal>

        <div className="international-contact-grid">
          <Reveal className="international-contact-brand" delay={70}>
            <img
              className="international-contact-logo"
              src={oracLogo}
              alt="ORAC"
              loading="lazy"
              decoding="async"
            />
            <p className="international-contact-held">
              Held by <strong>ORAC HOLDINGS</strong>
            </p>
            <p className="international-contact-tagline">Trade, events, and fashion under one house.</p>
            <p className="international-contact-collective">
              A collective of ventures united by one purpose.
            </p>
          </Reveal>

          <div className="international-contact-people">
            <Reveal as="article" className="international-contact-card" delay={130}>
              <div className="international-contact-card-top">
                <span className="eyebrow">Founder &amp; Creative Director</span>
                <h3>Athila Ashrin Rahmathullah</h3>
                <p>India</p>
              </div>
              <div className="international-contact-links">
                <ContactRow
                  icon={WhatsAppIcon}
                  kind="WhatsApp"
                  text={luxe.phone}
                  href={whatsappUrl}
                  channel="whatsapp"
                  external
                />
                <ContactRow
                  icon={GmailIcon}
                  kind="Email"
                  text={primaryEmail}
                  href={`mailto:${primaryEmail}`}
                  channel="email"
                />
              </div>
            </Reveal>

            <Reveal as="article" className="international-contact-card" delay={190}>
              <div className="international-contact-card-top">
                <span className="eyebrow">Managing Director, ORAC Luxe</span>
                <h3>Ohm Pranav</h3>
                <p>India</p>
              </div>
              <div className="international-contact-links">
                <ContactRow
                  icon={WhatsAppIcon}
                  kind="WhatsApp"
                  text={contactDetails.holding.phone}
                  href={`https://wa.me/${contactDetails.holding.phone.replace(/\D/g, "")}`}
                  channel="whatsapp"
                  external
                />
                <ContactRow
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
