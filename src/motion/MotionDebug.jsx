import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "./gsap";
import { MOTION_READY_CLASS } from "./runtime";
import { REDUCED_MOTION_QUERY } from "./motionTokens";
import "./motion-debug.css";

/**
 * `?motionDebug=1` - a development-only readout of what the motion system is
 * actually doing.
 *
 * It exists to diagnose failure, not to prove success: a trigger reporting
 * progress 0.42 tells you the plumbing works, and nothing at all about whether
 * a human can see the animation. The visual proof lives in captured frames.
 *
 * App.jsx only mounts this behind `import.meta.env.DEV`, so the component, its
 * styles and the ScrollTrigger.defaults markers call are all dropped from a
 * production build by Rollup's dead-code elimination.
 */
export default function MotionDebug() {
  const { search } = useLocation();
  const enabled = new URLSearchParams(search).get("motionDebug") === "1";
  const [triggers, setTriggers] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;

    // Markers themselves are enabled in runtime.js, before any trigger exists -
    // setting them here would only affect triggers created after this panel
    // mounts, which is none of them.
    ScrollTrigger.refresh();

    let raf = 0;
    const loop = () => {
      setTriggers(
        ScrollTrigger.getAll().map((t) => ({
          id: t.vars.id || "(unnamed)",
          progress: t.progress,
          active: t.isActive,
        }))
      );
      setTick((n) => n + 1);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      // Leave marker defaults alone; runtime.js owns them.
    };
  }, [enabled]);

  if (!enabled) return null;

  const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const ready = document.documentElement.classList.contains(MOTION_READY_CLASS);
  const branch = window.matchMedia("(max-width: 860px)").matches ? "mobile" : "desktop";
  const named = triggers.filter((t) => t.id !== "(unnamed)");
  const stranded = document.querySelectorAll("[data-motion]:not([data-motion-state])").length;

  const replay = () => {
    ScrollTrigger.getAll().forEach((t) => {
      if (t.animation) t.animation.progress(0).pause();
      t.disable(false);
      t.enable(false);
    });
    ScrollTrigger.refresh();
  };

  return (
    <aside className="motion-debug" data-tick={tick}>
      <header>
        <strong>ORAC motion debug</strong>
        <button type="button" onClick={replay}>
          Replay reveals
        </button>
      </header>
      <dl>
        <div>
          <dt>Triggers</dt>
          <dd>
            {triggers.length} ({named.length} named)
          </dd>
        </div>
        <div>
          <dt>Motion ready</dt>
          <dd>{ready ? "yes" : "no"}</dd>
        </div>
        <div>
          <dt>Reduced motion</dt>
          <dd>{reduced ? "ACTIVE" : "off"}</dd>
        </div>
        <div>
          <dt>Branch</dt>
          <dd>{branch}</dd>
        </div>
        <div>
          <dt>Unarmed reveals</dt>
          <dd className={stranded ? "is-bad" : ""}>{stranded}</dd>
        </div>
      </dl>
      <ul>
        {named.map((t) => (
          <li key={t.id} className={t.active ? "is-active" : ""}>
            <span>{t.id}</span>
            <em>{t.progress.toFixed(2)}</em>
          </li>
        ))}
      </ul>
    </aside>
  );
}
