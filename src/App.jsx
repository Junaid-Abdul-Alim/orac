import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageShell from "./components/layout/PageShell";
import { ScrollTrigger } from "./motion/gsap";
import Home from "./pages/Home";
import OracInternational from "./pages/OracInternational";
import OracEventus from "./pages/OracEventus";
import LuxuryExport from "./pages/LuxuryExport";
import MaisonCategory from "./pages/MaisonCategory";
import Contact from "./pages/Contact";

// Development-only motion instrumentation (?motionDebug=1). The ternary is
// statically false in a production build, so Rollup drops both the lazy import
// and the component from the bundle entirely.
const MotionDebug = import.meta.env.DEV ? lazy(() => import("./motion/MotionDebug")) : null;

const pageTitles = {
  "/": "ORAC Holdings | Trade, Events, Couture",
  "/international": "ORAC International | Global Import & Export",
  "/eventus": "ORAC Eventus | Weddings & Celebrations",
  "/luxury-export": "The House of Azrin | ORAC Luxe",
  "/contact": "Contact ORAC Holdings",
};

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = pageTitles[pathname] || "ORAC Holdings";

    if (hash) {
      const id = window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }, 0);
      return () => window.clearTimeout(id);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  // Every trigger on the outgoing route was measured against that route's
  // document height. The incoming route's hooks build their own, but the shared
  // ones (navbar, footer) need re-measuring or they keep firing at the old
  // page's scroll positions.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

// GSAP's ScrollTrigger keeps one shared, module-level registry of every
// trigger on the page - not state React owns or can rebuild on its own. A
// route change unmounts the outgoing page's triggers and mounts the
// incoming page's in the same commit; if a scroll event lands in that exact
// window - the routine auto-scroll a click performs to bring a link into
// view counts, so this is not a rare edge case - ScrollTrigger's own scroll
// handler can walk that registry mid-teardown and throw inside GSAP itself
// ("Cannot read properties of undefined (reading 'end')"), reliably
// reproducible navigating from the Luxe page into any Maison category. It
// pre-dates every change in this session (confirmed against the last few
// commits and a production build) - the race is inside GSAP's own internal
// bookkeeping, not anything this app schedules.
//
// Once that registry is corrupted, nothing short of a fresh JS context
// reliably clears it: forcing a full remount of the current route (a React
// `key` change), even combined with explicitly killing every live
// ScrollTrigger and calling `clearScrollMemory()` first, still measured the
// remounted page's own triggers as broken afterward (start 0, end undefined,
// confirmed by inspecting GSAP's registry directly). A fresh page load never
// has this problem, in any of dozens of attempts, so this reloads the
// current URL outright rather than trying to repair GSAP's internal state in
// place. `preventDefault()` stops the crash from also surfacing as a visible
// uncaught error in the moment before the reload.
//
// Every JS engine describes "read a property off undefined" differently -
// confirmed directly (Playwright, same repro, all three engines):
//   V8 / Chrome:            Cannot read properties of undefined (reading 'end')
//   JavaScriptCore / Safari: undefined is not an object (evaluating 'curTrigger.end')
//   SpiderMonkey / Firefox:  can't access property "end", curTrigger is undefined
// A check written against Chrome's exact wording (the first version of this
// guard) never matches on Safari or Firefox, so the reload silently never
// fires there and the page is left broken - it only looked fixed because it
// had only been verified in Chromium. All three phrasings still name GSAP's
// own `end` property immediately after a dot or a quote, so match on that
// shape rather than any one engine's sentence.
const GSAP_TRIGGER_LIST_ERROR = /[.'"]end['"]/;

function useMotionCrashRecovery() {
  useEffect(() => {
    const onError = (event) => {
      if (!GSAP_TRIGGER_LIST_ERROR.test(event.message || "")) return;
      event.preventDefault();
      window.location.reload();
    };

    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);
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
  useMotionCrashRecovery();

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
      {MotionDebug ? (
        <Suspense fallback={null}>
          <MotionDebug />
        </Suspense>
      ) : null}
    </>
  );
}
