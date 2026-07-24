import Button from "../components/common/Button";
import Frame from "../components/common/Frame";
import Reveal from "../components/common/Reveal";
import oracLogo from "../assets/logos/orac-orange.svg";

// Stage 1 of the homepage journey ("Origin" - see docs/ORAC-REDESIGN-SPEC.md
// §2). The ORAC Frame holds the identity alone: wordmark and one line of
// positioning copy, nothing else - no venture names, no leadership, no card
// grid. Restraint here is deliberate: the frame device is introduced with
// one dominant idea before it starts holding anything else.
export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="container home-hero-inner">
        <Frame variant="identity" className="home-hero-frame">
          <span className="eyebrow">ORAC Holdings</span>
          <h1 className="home-hero-logo-heading">
            <span className="sr-only">ORAC Holdings</span>
            <img src={oracLogo} alt="ORAC" decoding="async" fetchpriority="high" />
          </h1>
          <p className="hero-line">ORAC - TRADE | EVENTS | COUTURE</p>
          <p className="hero-subtext">
            A House of Ventures. Built on Vision. Forged by Discipline. Defined by Legacy.
          </p>
          <div className="hero-actions">
            <Button to="/#companies">Explore Businesses</Button>
            <Button to="/contact" variant="ghost">
              Start a Conversation
            </Button>
          </div>
        </Frame>
        <Reveal className="hero-brand-panel home-brand-panel" delay={120}>
          <span className="hero-brand-rule" />
          <small>INDIA - SINGAPORE - AFRICA</small>
        </Reveal>
      </div>
    </section>
  );
}
