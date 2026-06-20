import React from "react";
import { NavLink } from "react-router-dom";
import { companies } from "../../data/companyData";

export default function BusinessSwitcher({ onNavigate }) {
  return (
    <div className="business-switcher-panel">
      {companies.map((company) => (
        <NavLink key={company.id} to={company.route} onClick={onNavigate}>
          {company.logo ? <img className="business-switcher-logo" src={company.logo} alt="" /> : null}
          <span>{company.name}</span>
          <small>{company.purpose}</small>
        </NavLink>
      ))}
    </div>
  );
}
