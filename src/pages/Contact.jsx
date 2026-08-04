import { CalendarDays, Gem, Globe2, Landmark, TrendingUp } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import IconBadge from "../components/common/IconBadge";
import Reveal from "../components/common/Reveal";
import { contactDetails } from "../data/contactData";
import oracLogo from "../assets/logos/orac-orange.svg";

function ContactCard({ icon, label, title, description, links = [], note, delay = 0, wide = false }) {
  return (
    <Reveal as="article" className={`contact-card ${wide ? "contact-card-wide" : ""}`.trim()} delay={delay}>
      <div className="contact-card-top">
        <IconBadge icon={icon} className="icon-badge-soft" size={17} />
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {links.length ? (
        <div className="contact-link-list">
          {links.map((link) => (
            <a key={`${link.kind}-${link.href}-${link.text}`} href={link.href} aria-label={link.label}>
              <span>{link.kind || "Contact"}</span>
              <strong>{link.text}</strong>
            </a>
          ))}
        </div>
      ) : null}
      {note ? <p className="contact-card-note">{note}</p> : null}
    </Reveal>
  );
}

export default function Contact() {
  const contactCards = [
    {
      icon: Landmark,
      label: "General enquiry",
      title: "ORAC Holdings",
      description: "Ohm Pranav / Managing Director / India",
      links: [
        {
          href: `mailto:${contactDetails.holding.email}`,
          text: contactDetails.holding.email,
          label: "Email ORAC Holdings",
          kind: "Email",
        },
        {
          href: `mailto:${contactDetails.holding.secondaryEmail}`,
          text: contactDetails.holding.secondaryEmail,
          label: "Email ORAC information desk",
          kind: "Email",
        },
        {
          href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
          text: contactDetails.holding.phone,
          label: "Call ORAC Holdings",
          kind: "Phone",
        },
        {
          href: `https://${contactDetails.holding.website}`,
          text: contactDetails.holding.website,
          label: "Visit ORAC Holdings website",
          kind: "Web",
        },
      ],
    },
    {
      icon: TrendingUp,
      label: "Investment enquiry",
      title: "ORAC Holdings",
      description: "Rak J / Director / Singapore",
      links: [
        {
          href: `mailto:${contactDetails.international.email}`,
          text: contactDetails.international.email,
          label: "Email the ORAC Holdings investment desk",
          kind: "Email",
        },
        {
          href: `tel:${contactDetails.international.phone.replaceAll(" ", "")}`,
          text: contactDetails.international.phone,
          label: "Call the ORAC Holdings investment desk",
          kind: "Phone",
        },
        {
          href: `https://${contactDetails.holding.website}`,
          text: contactDetails.holding.website,
          label: "Visit ORAC Holdings website",
          kind: "Web",
        },
      ],
      note: contactDetails.international.address,
    },
    {
      icon: Globe2,
      label: "Trade enquiry",
      title: "ORAC International",
      description: "Three regional desks for export, import, and sourcing conversations.",
      wide: true,
      links: [
        {
          href: `tel:${contactDetails.international.phone.replaceAll(" ", "")}`,
          text: contactDetails.international.phone,
          label: `Call the Singapore desk - ${contactDetails.international.name}, ${contactDetails.international.role}`,
          kind: "Singapore",
        },
        {
          href: `mailto:${contactDetails.international.email}`,
          text: contactDetails.international.email,
          label: "Email the Singapore desk",
          kind: "Singapore",
        },
        {
          href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
          text: contactDetails.holding.phone,
          label: "Call the India desk - Ohm Pranav, Managing Director",
          kind: "India",
        },
        {
          href: `mailto:${contactDetails.holding.secondaryEmail}`,
          text: contactDetails.holding.secondaryEmail,
          label: "Email the India desk",
          kind: "India",
        },
        {
          href: `tel:${contactDetails.africa.phone.replaceAll(" ", "")}`,
          text: contactDetails.africa.phone,
          label: `Call the Africa desk - ${contactDetails.africa.role}, ${contactDetails.africa.location}`,
          kind: "Africa",
        },
        {
          href: `mailto:${contactDetails.africa.email}`,
          text: contactDetails.africa.email,
          label: "Email the Africa desk",
          kind: "Africa",
        },
      ],
    },
    {
      icon: CalendarDays,
      label: "Event enquiry",
      title: "ORAC Eventus",
      description: contactDetails.eventus.address,
      wide: true,
      links: [
        ...contactDetails.eventus.phones.map((phone) => ({
          href: `tel:${phone.replaceAll(" ", "")}`,
          text: phone,
          label: `Call ORAC Eventus at ${phone}`,
          kind: "Phone",
        })),
        ...contactDetails.eventus.emails.map((email) => ({
          href: `mailto:${email}`,
          text: email,
          label: `Email ORAC Eventus at ${email}`,
          kind: "Email",
        })),
      ],
      note: `${contactDetails.eventus.social.join(" / ")} on Instagram & Facebook`,
    },
    {
      icon: Gem,
      label: "Luxe enquiry",
      title: "ORAC Luxe / The House of Azrin",
      description: `${contactDetails.luxe.name} / ${contactDetails.luxe.location}`,
      links: [
        {
          href: `tel:${contactDetails.luxe.phone.replaceAll(" ", "")}`,
          text: contactDetails.luxe.phone,
          label: "Call The House of Azrin",
          kind: "Phone",
        },
        ...contactDetails.luxe.emails.map((email) => ({
          href: `mailto:${email}`,
          text: email,
          label: `Email The House of Azrin at ${email}`,
          kind: "Email",
        })),
      ],
      note: `${contactDetails.luxe.social} on Instagram`,
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <Reveal className="contact-heading">
            <BrandLockup items={["ORAC", "Contact"]} />
            <span className="eyebrow">Start a Conversation</span>
            <img className="contact-hero-logo" src={oracLogo} alt="ORAC" loading="eager" decoding="async" />
            <h1>Let's build something together.</h1>
            <p>
              Choose the ORAC desk that fits your enquiry. Each message reaches the team closest to the work.
            </p>
            <div className="contact-hero-panel" aria-hidden="true">
              <span />
              <small>India / Singapore / Africa</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section contact-directory" aria-labelledby="contact-directory-title">
        <div className="container">
          <Reveal className="contact-directory-head">
            <span className="eyebrow">Contact Directory</span>
            <h2 id="contact-directory-title">One house. The right desk.</h2>
          </Reveal>
          <div className="contact-grid">
            {contactCards.map((card, index) => (
              <ContactCard key={card.label} {...card} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
