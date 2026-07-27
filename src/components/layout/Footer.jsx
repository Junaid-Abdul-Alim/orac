import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { companies } from "../../data/companyData";
import { contactDetails } from "../../data/contactData";
import GmailIcon from "../common/GmailIcon";
import oracLogo from "../../assets/logos/orac-orange.svg";

export default function Footer() {
  const corridors = ["India", "Singapore", "Africa"];

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src={oracLogo} alt="ORAC" loading="lazy" decoding="async" />
          <span className="footer-kicker">ORAC Holdings</span>
          <h2>Trade, events, and fashion under one house.</h2>
          <p>
            A focused business house building ventures with clear roles, careful execution, and long-term
            intent.
          </p>
          <div className="footer-corridors" aria-label="ORAC corridors">
            {corridors.map((corridor) => (
              <span key={corridor}>
                <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
                {corridor}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Businesses</h3>
          <div className="footer-link-list">
            {companies.map((company) => (
              <Link key={company.id} to={company.route}>
                <span>{company.shortName}</span>
                <small>{company.label}</small>
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <div className="footer-link-list">
            <Link to="/contact">
              <span>General enquiry</span>
              <small>Holding desk</small>
            </Link>
            <Link to="/contact">
              <span>Trade enquiry</span>
              <small>International desk</small>
            </Link>
            <Link to="/contact">
              <span>Event enquiry</span>
              <small>Eventus desk</small>
            </Link>
          </div>
          <a className="footer-mail" href={`mailto:${contactDetails.holding.email}`}>
            <GmailIcon size={15} strokeWidth={1.8} />
            {contactDetails.holding.email}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>Copyright 2026 ORAC Holdings. All rights reserved.</p>
        <p>Chennai | India | Global corridors</p>
      </div>
    </footer>
  );
}
