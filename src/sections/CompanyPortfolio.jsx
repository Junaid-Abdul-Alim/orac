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
          title="A focused portfolio of ORAC ventures."
          text="ORAC International, ORAC Eventus, and ORAC Luxe - three active ventures shaped around trade, celebrations, and fashion."
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
