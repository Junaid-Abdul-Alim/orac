import { Globe2 } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import ContactActionRow from "../components/common/ContactActionRow";
import ContactBrandCard from "../components/common/ContactBrandCard";
import GmailIcon from "../components/common/GmailIcon";
import Reveal from "../components/common/Reveal";
import WhatsAppIcon from "../components/common/WhatsAppIcon";
import { contactDetails } from "../data/contactData";

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
        <ContactActionRow
          icon={WhatsAppIcon}
          kind="WhatsApp"
          text={phone}
          href={whatsappUrl}
          channel="whatsapp"
          external
        />
        {email ? (
          <ContactActionRow
            icon={GmailIcon}
            kind="Email"
            text={email}
            href={`mailto:${email}`}
            channel="email"
          />
        ) : null}
        {website ? (
          <ContactActionRow
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
          <ContactBrandCard heldByLabel="ORAC Holdings" />

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
