import { Globe2, Mail, MessageCircle } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import { contactDetails } from "../data/contactData";
import oracLogo from "../assets/logos/orac-orange.svg";

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

function ContactPerson({ name, role, location, phone, email, website }) {
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}`;

  return (
    <Reveal as="article" className="international-contact-card">
      <div className="international-contact-card-top">
        <span className="eyebrow">{role}</span>
        <h3>{name}</h3>
        {location ? <p>{location}</p> : null}
      </div>
      <div className="international-contact-links">
        <ContactRow icon={MessageCircle} kind="WhatsApp" text={phone} href={whatsappUrl} />
        {email ? <ContactRow icon={Mail} kind="Email" text={email} href={`mailto:${email}`} /> : null}
        {website ? <ContactRow icon={Globe2} kind="Web" text={website} href={`https://${website}`} /> : null}
      </div>
    </Reveal>
  );
}

export default function InternationalContactCTA() {
  return (
    <section className="section international-contact-cta" aria-labelledby="international-contact-title">
      <div className="container">
        <Reveal className="international-contact-head">
          <BrandLockup items={["ORAC", "International"]} />
          <span className="eyebrow">V · Contact</span>
          <h2 id="international-contact-title">Trade enquiries and partner conversations begin here.</h2>
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
              Held by <strong>ORAC Holding</strong>
            </p>
            <p className="international-contact-tagline">Trade, events, and fashion under one house.</p>
            <p className="international-contact-collective">
              A collective of ventures united by one purpose.
            </p>
          </Reveal>

          <div className="international-contact-people">
            <ContactPerson
              name="Ohm Pranav"
              role="Managing Director"
              location="India"
              phone={contactDetails.holding.phone}
              email={contactDetails.holding.secondaryEmail}
              website={contactDetails.holding.website}
            />
            <ContactPerson
              name={contactDetails.africa.name}
              role={contactDetails.africa.role}
              location={contactDetails.africa.location}
              phone={contactDetails.africa.phone}
              email={contactDetails.africa.email}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
