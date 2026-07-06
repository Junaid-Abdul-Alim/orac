import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays, Gem, Globe2 } from "lucide-react";
import { companies } from "../../data/companyData";
import IconBadge from "./IconBadge";

const companyIcons = {
  international: Globe2,
  eventus: CalendarDays,
  "luxury-export": Gem,
};

export default function BusinessSwitcher({ id, open = false, onNavigate }) {
  return (
    <div className="business-switcher-panel" id={id} role="menu" aria-label="ORAC companies" hidden={!open}>
      {companies.map((company) => (
        <NavLink key={company.id} to={company.route} onClick={onNavigate} role="menuitem">
          <div className="business-switcher-top">
            {company.logo ? (
              <img className="business-switcher-logo" src={company.logo} alt="" loading="lazy" decoding="async" />
            ) : null}
            <IconBadge icon={companyIcons[company.id]} className="icon-badge-soft" size={16} />
          </div>
          <span>{company.name}</span>
          <small>{company.purpose}</small>
        </NavLink>
      ))}
    </div>
  );
}
