import { Globe, Mail, Phone } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import ContactActionRow from "../components/common/ContactActionRow";
import Reveal from "../components/common/Reveal";
import { contactDetails } from "../data/contactData";
import { pad2 } from "../utils/pad2";
import oracLogo from "../assets/logos/orac-orange.svg";

const KIND_ICON = { Phone, Email: Mail, Web: Globe };

// The same hairline `.contact-action` row (icon / kind / value / arrow) the
// International and Luxe contact CTAs already use - one interaction
// language for every way ORAC can be reached, not a second one invented for
// this page.
function ContactRow({ kind, text, href }) {
  const Icon = KIND_ICON[kind] || Mail;
  return <ContactActionRow icon={Icon} kind={kind} text={text} href={href} iconSize={16} />;
}

function DirectoryEntry({ index, label, org, person, note, actions, geoColumns, wide }) {
  return (
    <Reveal
      as="article"
      className={`contact-directory-entry ${wide ? "contact-directory-entry-wide" : ""}`.trim()}
      delay={index * 60}
    >
      <div className="contact-directory-entry-head">
        <span className="contact-directory-index">{pad2(index)}</span>
        <div>
          <span className="eyebrow">{label}</span>
          <h2>{org}</h2>
          {person ? <p>{person}</p> : null}
        </div>
      </div>

      {geoColumns ? (
        <div className="contact-directory-geo">
          {geoColumns.map((column) => (
            <div className="contact-directory-geo-column" key={column.title}>
              <h3>{column.title}</h3>
              {column.actions.map((action) => (
                <ContactRow key={`${action.kind}-${action.text}`} {...action} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="contact-directory-actions">
          {actions.map((action) => (
            <ContactRow key={`${action.kind}-${action.text}`} {...action} />
          ))}
        </div>
      )}

      {note ? <p className="contact-directory-note">{note}</p> : null}
    </Reveal>
  );
}

const contactEntries = [
  {
    label: "General Enquiry",
    org: "ORAC Holdings",
    person: "Ohm Pranav / Founder / India",
    actions: [
      { kind: "Email", text: contactDetails.holding.email, href: `mailto:${contactDetails.holding.email}` },
      {
        kind: "Email",
        text: contactDetails.holding.secondaryEmail,
        href: `mailto:${contactDetails.holding.secondaryEmail}`,
      },
      {
        kind: "Phone",
        text: contactDetails.holding.phone,
        href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
      },
      {
        kind: "Web",
        text: contactDetails.holding.website,
        href: `https://${contactDetails.holding.website}`,
      },
    ],
  },
  {
    label: "Investment Enquiry",
    org: "ORAC Holdings",
    person: "Rak J / Co-Founder / Singapore",
    note: contactDetails.international.address,
    actions: [
      {
        kind: "Email",
        text: contactDetails.international.email,
        href: `mailto:${contactDetails.international.email}`,
      },
      {
        kind: "Phone",
        text: contactDetails.international.phone,
        href: `tel:${contactDetails.international.phone.replaceAll(" ", "")}`,
      },
      {
        kind: "Phone",
        text: contactDetails.holding.phone,
        href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
      },
      {
        kind: "Web",
        text: contactDetails.holding.website,
        href: `https://${contactDetails.holding.website}`,
      },
    ],
  },
  {
    label: "Trade Enquiry",
    org: "ORAC International",
    person: "Three regional desks for export, import, and sourcing conversations.",
    wide: true,
    geoColumns: [
      {
        title: "Singapore",
        actions: [
          {
            kind: "Phone",
            text: contactDetails.international.phone,
            href: `tel:${contactDetails.international.phone.replaceAll(" ", "")}`,
          },
          {
            kind: "Email",
            text: contactDetails.international.email,
            href: `mailto:${contactDetails.international.email}`,
          },
        ],
      },
      {
        title: "India",
        actions: [
          {
            kind: "Phone",
            text: contactDetails.holding.phone,
            href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
          },
          {
            kind: "Email",
            text: contactDetails.holding.secondaryEmail,
            href: `mailto:${contactDetails.holding.secondaryEmail}`,
          },
        ],
      },
      {
        title: "Africa",
        actions: [
          {
            kind: "Phone",
            text: contactDetails.africa.phone,
            href: `tel:${contactDetails.africa.phone.replaceAll(" ", "")}`,
          },
          { kind: "Email", text: contactDetails.africa.email, href: `mailto:${contactDetails.africa.email}` },
        ],
      },
    ],
  },
  {
    label: "Event Enquiry",
    org: "ORAC Eventus",
    person: contactDetails.eventus.address,
    wide: true,
    note: (
      <>
        Singapore office — {contactDetails.international.address}
        <br />
        {contactDetails.eventus.social.join(" / ")} on Instagram & Facebook
      </>
    ),
    actions: [
      ...contactDetails.eventus.phones.map((phone) => ({
        kind: "Phone",
        text: phone,
        href: `tel:${phone.replaceAll(" ", "")}`,
      })),
      {
        kind: "Phone",
        text: contactDetails.international.phone,
        href: `tel:${contactDetails.international.phone.replaceAll(" ", "")}`,
      },
      ...contactDetails.eventus.emails.map((email) => ({
        kind: "Email",
        text: email,
        href: `mailto:${email}`,
      })),
    ],
  },
  {
    label: "Luxe Enquiry",
    org: "ORAC Luxe",
    person: contactDetails.luxe.address,
    note: `${contactDetails.luxe.social} on Instagram`,
    actions: [
      ...contactDetails.luxe.emails.map((email) => ({
        kind: "Email",
        text: email,
        href: `mailto:${email}`,
      })),
      {
        kind: "Email",
        text: contactDetails.holding.secondaryEmail,
        href: `mailto:${contactDetails.holding.secondaryEmail}`,
      },
      {
        kind: "Phone",
        text: contactDetails.holding.phone,
        href: `tel:${contactDetails.holding.phone.replaceAll(" ", "")}`,
      },
    ],
  },
];

export default function Contact() {
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
          <div className="contact-directory-list">
            {contactEntries.map((entry, index) => (
              <DirectoryEntry key={entry.label} index={index + 1} {...entry} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
