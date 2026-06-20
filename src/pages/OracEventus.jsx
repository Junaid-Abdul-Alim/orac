import React from "react";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import ServiceBlock from "../components/common/ServiceBlock";
import ProcessTimeline from "../components/common/ProcessTimeline";
import EditorialGallery from "../components/common/EditorialGallery";
import ContactCTA from "../sections/ContactCTA";
import EventusVelorawedSection from "../sections/EventusVelorawedSection";
import Hero from "../components/common/Hero";
import { clientReasons, eventusProcess, eventusServices } from "../data/eventusData";
import { eventusImages } from "../data/eventusImages";

export default function OracEventus() {
  return (
    <>
      <Hero
        lockup={["ORAC", "Eventus"]}
        eyebrow="Premium Event Management"
        title="ORAC EVENTUS"
        kicker="Weddings, Celebrations & Moments, Mastered"
        text="Building celebrations that are felt, not just seen."
        heroNote="Chennai-based full-service event management"
        image={eventusImages.hero}
      />

      <EventusVelorawedSection />

      <section className="section">
        <div className="container split-layout">
          <SectionHeader eyebrow="Who We Are" title="Building celebrations that are felt, not just seen." />
          <Reveal className="rich-copy">
            <p>
              ORAC Eventus is a Chennai-based full-service event management company built around one belief: a wedding
              or celebration should feel effortless for the family hosting it, and unforgettable for everyone who
              attends it.
            </p>
            <p>
              ORAC Eventus takes complete ownership from the first planning conversation to the final frame delivered:
              decor, catering coordination, venues, entertainment, gifting, and the entire photography and cinematography experience handled
              under one roof by one accountable team.
            </p>
            <p>
              Whether it is an intimate engagement or a destination wedding for three hundred guests, ORAC Eventus and
              VELORAWED bring the same standard of care to every celebration they take on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <SectionHeader eyebrow="What We Do" title="Everything your celebration needs." />
          <div className="service-grid">
            {eventusServices.map((service, index) => (
              <ServiceBlock
                key={service.title}
                title={service.title}
                points={service.points}
                image={eventusImages.services[service.title]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section eventus-gallery-section">
        <div className="container">
          <SectionHeader
            eyebrow="Eventus Gallery"
            title="From the first decor sketch to the last guest leaving with a gift in hand."
            text="ORAC Eventus designs and manages every layer of a celebration. Choose a single service or hand over the entire event."
          />
          <EditorialGallery images={eventusImages.gallery} />
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeader eyebrow="How We Work" title="From first call to final frame." />
          <ProcessTimeline steps={eventusProcess} className="process-four" />
        </div>
      </section>

      <section className="section why-section">
        <div className="container split-layout">
          <SectionHeader eyebrow="Why Clients Choose Us" title="A single team you can rely on." />
          <Reveal className="reason-panel-list">
            {clientReasons.map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Plan your celebration with ORAC Eventus." />
    </>
  );
}
