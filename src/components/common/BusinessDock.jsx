import { Link } from "react-router-dom";
import { companies } from "../../data/companyData";

export default function BusinessDock({ className = "", compact = false }) {
  return (
    <nav
      className={`business-dock ${compact ? "business-dock-compact" : ""} ${className}`.trim()}
      aria-label="ORAC businesses"
    >
      {companies.map((company) => (
        <Link key={company.id} to={company.route}>
          <span>{company.shortName}</span>
          <small>{company.label}</small>
        </Link>
      ))}
    </nav>
  );
}
