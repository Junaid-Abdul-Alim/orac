import Reveal from "./Reveal";
import oracLogo from "../../assets/logos/orac-orange.svg";

/**
 * The "held by ORAC Holdings" brand panel shared by the International and
 * Luxe contact CTAs - identical markup, differing only in casing of the
 * "held by" label ("ORAC Holdings" vs "ORAC HOLDINGS"), preserved exactly as
 * each caller already renders it.
 */
export default function ContactBrandCard({ heldByLabel }) {
  return (
    <Reveal className="international-contact-brand" delay={70}>
      <img className="international-contact-logo" src={oracLogo} alt="ORAC" loading="lazy" decoding="async" />
      <p className="international-contact-held">
        Held by <strong>{heldByLabel}</strong>
      </p>
      <p className="international-contact-tagline">Trade, events, and fashion under one house.</p>
      <p className="international-contact-collective">A collective of ventures united by one purpose.</p>
    </Reveal>
  );
}
