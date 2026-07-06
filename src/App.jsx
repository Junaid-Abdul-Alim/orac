import React from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import OracInternational from "./pages/OracInternational";
import OracEventus from "./pages/OracEventus";
import LuxuryExport from "./pages/LuxuryExport";
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

export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <PageShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/international" element={<OracInternational />} />
          <Route path="/eventus" element={<OracEventus />} />
          <Route path="/luxury-export" element={<LuxuryExport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
      <Footer />
    </>
  );
}
