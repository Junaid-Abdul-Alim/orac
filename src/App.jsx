import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import OracInternational from "./pages/OracInternational";
import OracEventus from "./pages/OracEventus";
import LuxuryExport from "./pages/LuxuryExport";
import MaisonCategory from "./pages/MaisonCategory";
import Contact from "./pages/Contact";

const pageTitles = {
  "/": "ORAC Holding | Trade, Events, Couture",
  "/international": "ORAC International | Global Import & Export",
  "/eventus": "ORAC Eventus | Weddings & Celebrations",
  "/luxury-export": "The House of Azrin | ORAC Luxe",
  "/contact": "Contact ORAC Holding",
};

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = pageTitles[pathname] || "ORAC Holding";

    if (hash) {
      window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

// A brief, consistent cross-fade on route change - the only new route-level
// motion in the redesign (see docs/ORAC-REDESIGN-SPEC.md §3, §8). Uses
// --dur-base/--ease-smooth via the .route-fade CSS class; reduced-motion
// users get the instant end-state for free from the existing global
// prefers-reduced-motion block (11-responsive.css), which forces all
// transition-durations to ~0.
function RouteFade({ children }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return undefined;
    previousPathname.current = pathname;
    setVisible(false);
    const raf = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return <div className={`route-fade ${visible ? "is-visible" : ""}`}>{children}</div>;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <PageShell>
        <RouteFade>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/international" element={<OracInternational />} />
            <Route path="/eventus" element={<OracEventus />} />
            <Route path="/luxury-export" element={<LuxuryExport />} />
            <Route path="/luxury-export/:categorySlug" element={<MaisonCategory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteFade>
      </PageShell>
      <Footer />
    </>
  );
}
