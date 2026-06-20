import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ImagePanel from "./ImagePanel";

export default function CompanyCard({ company, index = 0 }) {
  const isSoon = company.status === "Opening Soon";
  const visualLabel = isSoon ? "Opening Soon" : "Image to be added";

  return (
    <Reveal as="article" className={`company-card ${isSoon ? "is-soon" : ""}`} delay={index * 90}>
      <Link to={company.route} aria-label={company.name}>
        <div className="company-product-visual">
          <ImagePanel
            image={{ src: company.image, alt: `${company.name} visual`, label: visualLabel }}
            label={isSoon ? "Opening Soon" : company.label}
            dark={isSoon}
            className="company-image-panel"
          />
        </div>
        <div className="company-card-body">
          <span>{company.status}</span>
          <h3>{company.name}</h3>
          <p className="company-label">{company.label}</p>
          <p>{company.summary}</p>
          <small>{company.cta}</small>
        </div>
      </Link>
    </Reveal>
  );
}
