import { useEffect, useState } from "react";

/**
 * Decides — once, synchronously, during initial render — whether the homepage
 * opening should play its full cinematic convergence/separation sequence
 * (Blueprint §3, M1/M2/M9/M10) or render straight to the resolved end-state.
 *
 * The decision is made in a useState initializer (not a useEffect) so the
 * correct state is committed on the very first paint: a returning-this-session
 * or reduced-motion visitor never sees a flash of the initial hidden frame
 * (Blueprint §3 reduced-motion, §10 returning-visitor). The base CSS is the
 * resolved end-state; only the `.is-opening` class this hook drives opts INTO
 * the animation, so with JS disabled or slow the static composition still
 * renders correctly.
 *
 * - Reduced motion  -> resolved (skip the animation logic entirely, §3/M10).
 * - Already seen this session -> resolved (light Reveal stagger only, §3/M9).
 * - First visit this session -> play, then set the sessionStorage flag.
 *
 * `compact` is read once at mount (the sequence is <2s; a mid-sequence resize
 * across the breakpoint is a non-issue) so the mobile alternative (§3 mobile,
 * M1/M2 mobile) can skip creating the expensive directional force elements
 * rather than paint-and-hide them.
 *
 * All storage/matchMedia access is guarded so a failing or unavailable API
 * degrades to "render the resolved state," never to a broken page.
 */
const SESSION_KEY = "orac-opening-seen";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const COMPACT_QUERY = "(max-width: 820px)";
const PLAY_MS_DESKTOP = 1900;
const PLAY_MS_COMPACT = 1300;

function mediaMatches(query) {
  try {
    return typeof window !== "undefined" && window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function hasSeenThisSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeenThisSession() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage unavailable (private mode, disabled, quota) — the sequence has
    // still played; it simply may replay on the next visit. Never throw.
  }
}

function computeInitialState() {
  const reduce = mediaMatches(REDUCE_QUERY);
  const compact = mediaMatches(COMPACT_QUERY);
  const play = !reduce && !hasSeenThisSession();
  return { mode: play ? "play" : "resolved", compact };
}

export default function useOpeningSequence() {
  const [{ mode, compact }] = useState(computeInitialState);
  // "resolved" is already at its final state, so it is done from the start.
  const [done, setDone] = useState(mode !== "play");

  useEffect(() => {
    if (mode !== "play") return undefined;

    markSeenThisSession();

    // One timer (not a setTimeout chain): after the whole CSS-driven timeline
    // has finished, drop `.is-opening` so the held animations are removed and
    // the DOM settles into the plain resolved state (its final keyframes match
    // the resolved CSS, so there is no visual jump). The three force/ring
    // elements unmount at the same moment — no animation continues past the
    // opening's final state.
    const total = compact ? PLAY_MS_COMPACT : PLAY_MS_DESKTOP;
    const timer = window.setTimeout(() => setDone(true), total);
    return () => window.clearTimeout(timer);
  }, [mode, compact]);

  return { playing: mode === "play" && !done, compact };
}
