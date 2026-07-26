import { ArrowUpRight, Globe2, Mail } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import Reveal from "../components/common/Reveal";
import WhatsAppIcon from "../components/common/WhatsAppIcon";
import { contactDetails } from "../data/contactData";
import oracLogo from "../assets/logos/orac-orange.svg";

/**
 * One contact action. Built as a ruled row rather than a bordered box inside
 * a bordered card: label, value and affordance sit on a four-column grid so
 * the icons, the kind labels and the values each line up down the column, and
 * a single hairline separates one action from the next.
 *
 * `channel` opts a row into its service's own cue - WhatsApp's green appears
 * only on the glyph, at the same optical weight as the mail icon, never as a
 * filled button.
 */
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
        <ContactRow
          icon={WhatsAppIcon}
          kind="WhatsApp"
          text={phone}
          href={whatsappUrl}
          channel="whatsapp"
          external
        />
        {email ? (
          <ContactRow
            icon={Mail}
            kind="Email"
            text={email}
            href={`mailto:${email}`}
            channel="email"
          />
        ) : null}
        {website ? (
          <ContactRow
            icon={Globe2}
            kind="Web"
            text={website}
            href={`https://${website}`}
            channel="web"
            external
          />
        ) : null}
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
              Held by <strong>ORAC Holdings</strong>
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
              name={contactDetails.international.name}
              role={contactDetails.international.role}
              location={contactDetails.international.location}
              phone={contactDetails.international.phone}
              email={contactDetails.international.email}
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
