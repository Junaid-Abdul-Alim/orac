import { useId, useState } from "react";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";

/**
 * Vault XIII — The House of Azrin's colour index.
 *
 * The tones, their names and their hex values are read off the House's own
 * Vault XIII artwork (see luxeData.js), so the swatch strip and the banner
 * above it finally describe the same palette. Previously the strip showed six
 * ORAC brand CSS values under labels that appear nowhere in the artwork.
 *
 * Presentation follows the colour-house convention (Farrow & Ball's colour
 * index, Windows' anchored information panel): flat colour fields with no card
 * chrome, a hairline rule as the only structural device, and one readout that
 * names the selected tone rather than repeating a code under every swatch.
 * Selecting a tone is the interaction - it tells you what that colour is and
 * what the House photographed for it, which is information the grid alone
 * cannot carry at this size.
 */
export default function VaultPalette({ vault }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const readoutId = useId();
  const active = vault.swatches[activeIndex];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="section vault-section" aria-labelledby={`${readoutId}-title`}>
      <Reveal className="vault-banner">
        <SafeImage
          src={vault.image.src}
          alt={vault.image.alt}
          fallbackLabel={vault.image.label}
          className="vault-image"
        />
      </Reveal>

      <div className="container vault-layout">
        <Reveal className="vault-copy" delay={60}>
          <span className="eyebrow">I · {vault.eyebrow}</span>
          <h2 className="vault-name" id={`${readoutId}-title`}>
            {vault.name}
          </h2>
          <p>{vault.tagline}</p>

          {/* The readout is the component's live region: it names the tone the
              visitor is pointing at, so the swatch row itself stays clean. */}
          <div className="vault-readout" aria-live="polite">
            <span className="vault-readout-chip" style={{ background: active.value }} aria-hidden="true" />
            <span className="vault-readout-text">
              <strong>{active.name}</strong>
              <small>
                {active.value} · {active.note}
              </small>
            </span>
            <span className="vault-readout-index" aria-hidden="true">
              {pad(activeIndex + 1)}/{pad(vault.swatches.length)}
            </span>
          </div>
        </Reveal>

        <Reveal className="vault-swatches" delay={140} role="list" aria-label={`${vault.name} colour index`}>
          {vault.swatches.map((swatch, index) => (
            <button
              key={swatch.name}
              type="button"
              role="listitem"
              className={`vault-swatch ${index === activeIndex ? "is-active" : ""}`.trim()}
              style={{ "--swatch": swatch.value }}
              aria-pressed={index === activeIndex}
              aria-label={`${swatch.name}, ${swatch.value}, ${swatch.note}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span className="vault-swatch-chip" aria-hidden="true" />
              <span className="vault-swatch-label" aria-hidden="true">
                <small>{pad(index + 1)}</small>
                {swatch.name}
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
