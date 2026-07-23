import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { companies } from "../../data/companyData";
import { contactDetails } from "../../data/contactData";
import BusinessSwitcher from "../common/BusinessSwitcher";
import oracLogo from "../../assets/logos/orac-orange.svg";

// Maps a route prefix to the venture id whose accent token (see
// variables.css) the nav should pick up - the "which world am I in" cue
// called for in the redesign spec. Home and Contact carry no accent.
const ventureRoutes = [
  { prefix: "/international", venture: "international" },
  { prefix: "/eventus", venture: "eventus" },
  { prefix: "/luxury-export", venture: "luxe" },
];

function ventureForPath(pathname) {
  return ventureRoutes.find(({ prefix }) => pathname.startsWith(prefix))?.venture ?? null;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const businessMenuRef = useRef(null);
  const businessMenuId = useId();
  const primaryPhone = contactDetails.holding.phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${primaryPhone}`;
  const emailUrl = `mailto:${contactDetails.holding.email}`;
  const activeVenture = ventureForPath(location.pathname);

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
    <header
      className={`navbar ${scrolled || open ? "is-solid" : ""}`}
      data-venture={activeVenture || undefined}
    >
      <Link className="brand" to="/" aria-label="ORAC Holding home">
        <img className="brand-logo" src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
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
            <span>Companies</span>
            <ChevronDown className="nav-chevron" size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <BusinessSwitcher
            id={businessMenuId}
            open={businessOpen}
            onNavigate={() => setBusinessOpen(false)}
          />
        </div>
        <NavLink to="/contact">Contact</NavLink>
        <div className="nav-contact-actions" aria-label="Quick contact links">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact ORAC on WhatsApp">
            <MessageCircle size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a href={emailUrl} aria-label="Email ORAC">
            <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
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

      <nav className={`mobile-menu ${open ? "is-open" : ""}`} aria-label="Mobile navigation" hidden={!open}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <div className="mobile-menu-group">
          <span>Companies</span>
          {companies.map((company) => (
            <NavLink key={company.id} to={company.route}>
              <span>{company.name}</span>
              <small>{company.purpose}</small>
            </NavLink>
          ))}
        </div>
        <NavLink to="/contact">Contact</NavLink>
        <div className="mobile-contact-actions" aria-label="Quick contact links">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <MessageCircle size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <a href={emailUrl} onClick={() => setOpen(false)}>
            <Mail size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
