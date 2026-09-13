import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { companies } from "../../data/companyData";
import { contactDetails } from "../../data/contactData";
import GmailIcon from "../common/GmailIcon";
import WhatsAppIcon from "../common/WhatsAppIcon";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const primaryPhone = contactDetails.holding.phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${primaryPhone}`;
  const emailUrl = `mailto:${contactDetails.holding.email}`;
  const activeVenture = ventureForPath(location.pathname);

  // Navigating closes the mobile menu. Done as a render-phase reset against
  // the previous pathname rather than in an effect: React re-runs this
  // component with the new state before it commits, so the menu is already
  // closed on the first paint of the new route instead of open for one frame
  // and then shut by a cascading second render.
  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (lastPathname !== location.pathname) {
    setLastPathname(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`navbar ${scrolled || open ? "is-solid" : ""}`}
      data-venture={activeVenture || undefined}
    >
      <Link className="brand" to="/" aria-label="ORAC Holdings home">
        <img className="brand-logo" src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        {companies.map((company) => (
          <NavLink key={company.id} to={company.route} className="nav-venture-link">
            <span>{company.shortName}</span>
          </NavLink>
        ))}
        <NavLink to="/contact">Contact</NavLink>
        <div className="nav-contact-actions" role="group" aria-label="Quick contact links">
          <a
            className="nav-action-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Contact ORAC on WhatsApp"
          >
            <WhatsAppIcon size={16} />
          </a>
          <a href={emailUrl} aria-label="Email ORAC">
            <GmailIcon size={16} strokeWidth={1.7} />
          </a>
        </div>
      </nav>

      <div className={`nav-island ${open ? "is-open" : ""}`}>
        <button
          className="nav-island-trigger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-island-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-island-icon">
            <span />
            <span />
          </span>
        </button>

        <nav
          id="nav-island-panel"
          className="nav-island-panel"
          aria-label="Mobile navigation"
          aria-hidden={!open}
        >
          <NavLink to="/" end tabIndex={open ? 0 : -1}>
            <span>Home</span>
            <i className="nav-island-dot" aria-hidden="true" />
          </NavLink>
          {companies.map((company) => (
            <NavLink key={company.id} to={company.route} className="nav-venture-link" tabIndex={open ? 0 : -1}>
              <span>{company.shortName}</span>
              <i className="nav-island-dot" aria-hidden="true" />
            </NavLink>
          ))}
          <NavLink to="/contact" tabIndex={open ? 0 : -1}>
            <span>Contact</span>
            <i className="nav-island-dot" aria-hidden="true" />
          </NavLink>
          <div className="nav-island-actions" role="group" aria-label="Quick contact links">
            <a
              className="nav-action-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Contact ORAC on WhatsApp"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon size={15} />
            </a>
            <a
              href={emailUrl}
              aria-label="Email ORAC"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <GmailIcon size={15} strokeWidth={1.7} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
