import { useId } from "react";
import ImageReveal from "../components/common/ImageReveal";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";

/**
 * Vault XIII — The House of Azrin's colour index.
 *
 * The House's own Vault XIII artwork (see luxeData.js) already prints every
 * tone with its number, name and hex, so the section presents that artwork
 * and names it - nothing more. The selectable swatch grid and its live
 * readout that used to sit beneath the copy have been removed; the artwork
 * carries the same information without a second, interactive copy of it.
 *
 * Order is copy-then-artwork, and the motion follows the reading order rather
 * than running against it: the eyebrow, the name and the line beneath it
 * arrive first, and only once they have settled does the artwork open. The
 * `seam` variant is Luxe's own opening - a wipe across from the left edge,
 * following the stitch line - so the palette is introduced and then revealed,
 * instead of the page leading with an image nobody has been told the name of
 * yet. The delay is the beat between the two, not a stall: it is shorter than
 * the copy's own duration, so the artwork starts while the name is still
 * settling and the section reads as one movement.
 */
export default function VaultPalette({ vault }) {
  const titleId = useId();

  return (
    <section className="section vault-section" aria-labelledby={titleId}>
      <div className="container vault-layout">
        <Reveal className="vault-copy">
          <span className="eyebrow">I · {vault.eyebrow}</span>
          <h2 className="vault-name" id={titleId}>
            {vault.name}
          </h2>
          <p>{vault.tagline}</p>
        </Reveal>
      </div>

      <ImageReveal className="vault-banner" variant="seam" delay={260}>
        <SafeImage
          src={vault.image.src}
          mobileSrc={vault.image.mobileSrc}
          alt={vault.image.alt}
          fallbackLabel={vault.image.label}
          className="vault-image"
        />
      </ImageReveal>
    </section>
  );
}
