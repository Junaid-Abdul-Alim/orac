import React from "react";
import BrandLockup from "../components/common/BrandLockup";
import Reveal from "../components/common/Reveal";
import { contactDetails } from "../data/contactData";

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="container">
        <Reveal className="contact-heading">
          <BrandLockup items={["ORAC", "Contact"]} />
          <span className="eyebrow">Start a Conversation</span>
          <h1>Let's build something together.</h1>
          <p>
            Whether it is a trade enquiry, an event booking, or a conversation, ORAC is open to the right one.
          </p>
          <div className="contact-hero-panel" aria-hidden="true">
            <span />
            <small>Chennai / Singapore / Thanjavur / Africa</small>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal as="article" className="contact-card" delay={0}>
            <span>General enquiry</span>
            <h2>ORAC Holding</h2>
            <p>Ohm Pranav P.R. / Founder & Managing Director / Chennai, India</p>
            <a href={`mailto:${contactDetails.holding.email}`}>{contactDetails.holding.email}</a>
            <a href={`mailto:${contactDetails.holding.secondaryEmail}`}>{contactDetails.holding.secondaryEmail}</a>
            <a href={`tel:${contactDetails.holding.phone.replaceAll(" ", "")}`}>{contactDetails.holding.phone}</a>
            <a href={`https://${contactDetails.holding.website}`}>{contactDetails.holding.website}</a>
          </Reveal>

          <Reveal as="article" className="contact-card" delay={80}>
            <span>Trade enquiry</span>
            <h2>ORAC International - Singapore</h2>
            <p>{contactDetails.international.name} / {contactDetails.international.role} / {contactDetails.international.location}</p>
            <a href={`tel:${contactDetails.international.phone.replaceAll(" ", "")}`}>{contactDetails.international.phone}</a>
            <a href={`mailto:${contactDetails.international.email}`}>{contactDetails.international.email}</a>
          </Reveal>

          <Reveal as="article" className="contact-card contact-card-wide" delay={160}>
            <span>Event enquiry</span>
            <h2>ORAC Eventus</h2>
            <p>{contactDetails.eventus.address}</p>
            {contactDetails.eventus.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a>
            ))}
            {contactDetails.eventus.emails.map((email) => (
              <a key={email} href={`mailto:${email}`}>{email}</a>
            ))}
            <p>{contactDetails.eventus.social.join(" / ")} on Instagram & Facebook</p>
          </Reveal>

          <Reveal as="article" className="contact-card" delay={240}>
            <span>Africa trade desk</span>
            <h2>{contactDetails.africa.name}</h2>
            <p>{contactDetails.africa.role} / {contactDetails.africa.location}</p>
            <a href={`tel:${contactDetails.africa.phone.replaceAll(" ", "")}`}>{contactDetails.africa.phone}</a>
            <a href={`mailto:${contactDetails.africa.email}`}>{contactDetails.africa.email}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
