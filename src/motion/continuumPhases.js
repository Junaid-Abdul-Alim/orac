/**
 * The nine states of the ORAC Continuum, in page order.
 *
 * The `id` is written onto the rail as `data-phase` while that section owns the
 * screen, and 14-motion.css gives each phase its own line character - a spine,
 * a trade route, a film perforation, a running stitch, an architectural rule.
 * One thread, nine jobs, rather than nine unrelated gold lines.
 *
 * Sections opt in by carrying a matching `data-continuum-phase`.
 */
export const CONTINUUM_PHASES = [
  { id: "opening", label: "Origin" },
  { id: "holding", label: "Holding" },
  { id: "international", label: "International" },
  { id: "global", label: "Reach" },
  { id: "eventus", label: "Eventus" },
  { id: "luxe", label: "Luxe" },
  { id: "why", label: "Why ORAC" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export const phaseIndex = (id) => CONTINUUM_PHASES.findIndex((phase) => phase.id === id);
