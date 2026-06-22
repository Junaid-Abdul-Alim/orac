import React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { companies } from "../../data/companyData";
import BusinessSwitcher from "../common/BusinessSwitcher";
import oracLogo from "../../assets/logos/orac-orange.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const businessMenuRef = useRef(null);
  const businessMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setBusinessOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!businessMenuRef.current?.contains(event.target)) {
        setBusinessOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setBusinessOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const onBusinessKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setBusinessOpen(true);
      window.requestAnimationFrame(() => {
        businessMenuRef.current?.querySelector("a")?.focus();
      });
    }
  };

  return (
    <header className={`navbar ${scrolled || open ? "is-solid" : ""}`}>
      <Link className="brand" to="/" aria-label="ORAC Holding home">
        <img className="brand-logo" src={oracLogo} alt="ORAC" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <div
          className={`company-menu business-switcher ${businessOpen ? "is-open" : ""}`}
          ref={businessMenuRef}
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-controls={businessMenuId}
            aria-expanded={businessOpen}
            onClick={() => setBusinessOpen((value) => !value)}
            onKeyDown={onBusinessKeyDown}
          >
            Companies
          </button>
          <BusinessSwitcher id={businessMenuId} onNavigate={() => setBusinessOpen(false)} />
        </div>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <button
        className={`mobile-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`mobile-menu ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        <NavLink to="/">Home</NavLink>
        <div className="mobile-menu-group">
          <span>Companies</span>
          {companies.map((company) => (
            <NavLink key={company.id} to={company.route}>
              <span>{company.name}</span>
              <small>{company.status === "Active" ? company.purpose : "Opening Soon"}</small>
            </NavLink>
          ))}
        </div>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}
