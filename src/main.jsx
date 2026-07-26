import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { initMotionRuntime } from "./motion/runtime";
import { sweepUnarmedReveals } from "./motion/useMotionReveal";
import "./styles/variables.css";
import "./styles/global.css";

// Runs at module scope: after the document is parsed, before React paints. That
// ordering is what lets 14-motion.css hold an initial hidden state from the very
// first frame without a flash of content appearing and then disappearing.
//
// Returns false when GSAP is unusable or the visitor asked for reduced motion,
// in which case the root class is never added and every section renders in its
// finished composition.
const motionEnabled = initMotionRuntime();

if (motionEnabled) {
  // Last line of defence against a reveal whose effect never ran: anything
  // still holding an un-animated initial state a few seconds after load is
  // released back to visible rather than left invisible.
  window.addEventListener(
    "load",
    () => {
      window.setTimeout(sweepUnarmedReveals, 2500);
    },
    { once: true }
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
