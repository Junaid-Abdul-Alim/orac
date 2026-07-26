import OriginSequence from "./OriginSequence";

// The homepage opening (see docs/ORAC-EXPERIENCE-BLUEPRINT.md §1/§2/Phase 4).
// `.home-hero` keeps its existing section-level treatment (full-bleed
// cream/white gradient, nav-height-aware min-height); the actual
// composition - ORAC identity, forking rule, three business apertures - is
// `OriginSequence`, which collapses the old sequential "wordmark alone, then
// scroll for the ventures" stages into one static, resolved, on-load view.
export default function HomeHero() {
  return (
    <section className="home-hero" data-continuum-phase="opening">
      <div className="container home-hero-inner">
        <OriginSequence />
      </div>
    </section>
  );
}
