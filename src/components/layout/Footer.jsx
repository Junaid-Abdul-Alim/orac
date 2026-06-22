import React from "react";
import { Link } from "react-router-dom";
import { companies } from "../../data/companyData";
import { contactDetails } from "../../data/contactData";
import oracLogo from "../../assets/logos/orac-orange.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src={oracLogo} alt="ORAC" />
          <h2>One vision. Multiple business worlds.</h2>
        </div>

        <div className="footer-column">
          <h3>Businesses</h3>
          {companies.map((company) => (
            <Link key={company.id} to={company.route}>
              {company.name}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <Link to="/contact">General enquiry</Link>
          <Link to="/contact">Trade enquiry</Link>
          <Link to="/contact">Event enquiry</Link>
          <a href={`mailto:${contactDetails.holding.email}`}>{contactDetails.holding.email}</a>
          <span>{contactDetails.eventus.social.join(" / ")}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>Copyright 2026 ORAC Holding. All rights reserved.</p>
        <p>Chennai | International outlook</p>
      </div>
    </footer>
  );
}
