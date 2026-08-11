import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageShell from "./components/layout/PageShell";
import { gsap, ScrollTrigger, requestRefresh } from "./motion/gsap";
import { MOTION_READY_CLASS } from "./motion/runtime";
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
  // page's scroll positions. requestRefresh() defers past the route-change
  // commit on its own (see motion/gsap.js) - no timer needed here.
  useEffect(() => {
    requestRefresh();
  }, [pathname]);

  return null;
}

// GSAP's ScrollTrigger keeps one shared, module-level registry of every
// trigger on the page - not state React owns or can rebuild on its own. A
// trigger's own refresh() walks that registry live, by index, with no
// snapshot, and GSAP itself can call that on a single newly created trigger
// (bypassing its own safe, snapshot-based full refresh) the moment a scroll
// event arrives before that trigger has been measured once. See gsap.js's
// refreshNow() for the exact mechanism, read directly out of
// gsap/src/ScrollTrigger.js (installed 3.15.0, also the latest published
// release - there is no upstream fix to upgrade into) and the fix built
// around it: every hook that creates ScrollTrigger timelines now measures
// them synchronously, in the same tick, before the browser can process the
// scroll event that would otherwise race it.
//
// This handler is what's left over for a GSAP failure that fix didn't
// anticipate - a defensive backstop, not the mechanism this bug is fixed by.
//
// A motion-library exception is not an application failure: nothing here
// held any state the visitor's session depends on, so there is nothing to
// reload for. Instead this discards GSAP's corrupted registry outright and
// returns every animated element to the same fully-visible, finished
// composition the site already renders with no JavaScript, a failed GSAP
// load, or prefers-reduced-motion (see runtime.js's own comment on
// MOTION_READY_CLASS) - motion stops, the page stays exactly where the
// visitor left it, and the site keeps working.
//
// Every JS engine describes "read a property off undefined" differently -
// confirmed directly (Playwright, same repro, all three engines):
//   V8 / Chrome:            Cannot read properties of undefined (reading 'end')
//   JavaScriptCore / Safari: undefined is not an object (evaluating 'curTrigger.end')
//   SpiderMonkey / Firefox:  can't access property "end", curTrigger is undefined
// All three name GSAP's own `end` property immediately after a dot or a
// quote, so match on that shape rather than any one engine's sentence.
const GSAP_TRIGGER_LIST_ERROR = /[.'"]end['"]/;

// Reuses GSAP's own bookkeeping (gsap.globalTimeline holds every top-level
// tween/timeline, scroll-triggered or not) rather than hardcoding the
// selector list of everything the site currently animates, which would
// silently miss anything added later.
//
// The tween list has to be captured *before* any ScrollTrigger is killed:
// killing a trigger reverts it first (ScrollTrigger.js's disable() ->
// revert(true, true)), which can detach its animation from gsap.globalTimeline
// as part of putting the pin/measurement state back - so a trigger killed
// first and then searched for second is already gone from the search.
// Capturing up front and killing everything after fixed a real bug here: a
// scroll-triggered `once: true` reveal that had not yet played (still at its
// hidden "from" state) was left permanently invisible because its tween was
// missed by exactly this ordering mistake.
function shutDownMotion() {
  const targets = new Set();
  const tweens = gsap.globalTimeline.getChildren(true, true, false);
  tweens.forEach((tween) => {
    tween.targets().forEach((target) => {
      if (target && target.nodeType === 1) targets.add(target);
    });
  });

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  tweens.forEach((tween) => tween.kill());
  targets.forEach((target) => gsap.set(target, { clearProps: "all" }));

  // The CSS hidden/translated initial states in 14-motion.css are all scoped
  // under this class; removing it makes every section render in its finished
  // composition by definition, the same guarantee runtime.js documents for a
  // GSAP-less visitor.
  document.documentElement.classList.remove(MOTION_READY_CLASS);
}

function useMotionCrashRecovery() {
  useEffect(() => {
    const onError = (event) => {
      if (!GSAP_TRIGGER_LIST_ERROR.test(event.message || "")) return;
      event.preventDefault();
      shutDownMotion();
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
