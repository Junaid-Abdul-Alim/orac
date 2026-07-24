import Reveal from "./Reveal";

/**
 * The ORAC Frame - the single recurring aperture that signals "you are
 * entering a world" (see docs/ORAC-EXPERIENCE-BLUEPRINT.md §6). It recurs as
 * a position and proportion, not a literal animated character:
 *
 * - `variant="identity"` - the homepage opening: holds the ORAC wordmark and
 *   one line of copy, no imagery.
 * - `variant="venture"` - the larger venture-preview card (image + name,
 *   text row beneath), used further down the page.
 * - `variant="venture-compact"` - the homepage opening's three equal-weight
 *   business apertures (Blueprint §2/§4). Same aperture idea as "venture",
 *   but sized and labelled for the first viewport: the eyebrow/name overlay
 *   the image and its scrim instead of sitting in a separate text row below,
 *   which is what lets three of them plus the wordmark and fork fit inside
 *   360x640 with zero scroll. Accepts a `tone` matching a venture id
 *   ("international" | "eventus" | "luxe") to pick up that venture's accent
 *   token via CSS (see variables.css --accent-*).
 *
 * Deliberately plain: a bordered aperture built from existing tokens
 * (--radius-lg, --rule, --shadow-*), no new animation system.
 */
export default function Frame({ variant = "identity", tone, className = "", delay = 0, children }) {
  const classes = ["orac-frame", `orac-frame-${variant}`, tone ? `orac-frame-${tone}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Reveal className={classes} delay={delay}>
      {children}
    </Reveal>
  );
}
