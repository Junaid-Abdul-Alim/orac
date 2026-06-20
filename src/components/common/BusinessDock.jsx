import React from "react";
import { Link } from "react-router-dom";
import { companies } from "../../data/companyData";

export default function BusinessDock({ className = "", compact = false }) {
  return (
    <nav className={`business-dock ${compact ? "business-dock-compact" : ""} ${className}`.trim()} aria-label="ORAC businesses">
      {companies.map((company) => (
        <Link key={company.id} to={company.route} className={company.status !== "Active" ? "is-opening" : ""}>
          <span>{company.shortName}</span>
          <small>{company.status === "Active" ? company.label : "Opening Soon"}</small>
        </Link>
      ))}
    </nav>
  );
}
