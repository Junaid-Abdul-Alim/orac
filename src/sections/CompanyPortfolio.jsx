import React from "react";
import BusinessCard from "../components/common/BusinessCard";
import SectionHeader from "../components/common/SectionHeader";
import { companies } from "../data/companyData";

export default function CompanyPortfolio() {
  return (
    <section className="section portfolio-section" id="companies">
      <div className="container">
        <SectionHeader
          eyebrow="Our Companies"
          title="The ventures currently presented by ORAC."
          text="The supplied company content currently details ORAC International and ORAC Eventus. ORAC Luxe and ORAC Evolution are shown only as opening soon."
        />
        <div className="business-showcase-grid">
          {companies.map((company, index) => (
            <BusinessCard key={company.id} business={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
