import { Mail, MessageCircle } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import { contactDetails } from "../data/contactData";
import oracLogo from "../assets/logos/orac-orange.svg";

// Same two-column contact pattern as InternationalContactCTA.jsx: a
// "held by ORAC Holding" brand card on the left, the venture's own contact
// person on the right. See ORAC LUXE Website Corrections, item 8.
function ContactRow({ icon, kind, text, href }) {
  return (
    <a className="international-contact-row" href={href} aria-label={`${kind}: ${text}`}>
      <IconBadge icon={icon} className="icon-badge-soft" size={15} />
      <span>
        <small>{kind}</small>
        <strong>{text}</strong>
      </span>
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
                <ContactRow icon={MessageCircle} kind="WhatsApp" text={luxe.phone} href={whatsappUrl} />
                <ContactRow icon={Mail} kind="Email" text={primaryEmail} href={`mailto:${primaryEmail}`} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
