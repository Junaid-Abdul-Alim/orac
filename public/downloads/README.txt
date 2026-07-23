Drop the Maison Series catalogue here.

The Luxe page's "Download catalogue" button links to:
  /downloads/the-house-of-azrin-catalogue.pdf

Add that PDF to this folder (keep the exact filename) and the button works
with no code changes. To use a different filename, update `catalogue.href`
in src/data/luxeData.js.

---

ORAC International's catalogue buttons expect these files (drop them in with
the exact filenames below and each button works with no code changes):

  orac-international-export-portfolio-catalogue.pdf
    Export Portfolio "Download catalogue" button.
    Update the href in src/pages/OracInternational.jsx if you rename it.

  orac-international-import-portfolio-catalogue.pdf
    Import Portfolio "Download catalogue" button.
    Update the href in src/pages/OracInternational.jsx if you rename it.

  neumatrix-automotive-led-lights-catalogue.pdf
    Neumatrix "Automotive LED Lights" download button.
    Update the href in src/sections/NeumatrixSection.jsx if you rename it.

  neumatrix-led-headlights-catalogue.pdf
  neumatrix-other-led-lights-spares-catalogue.pdf
  neumatrix-projector-fog-lights-catalogue.pdf
  neumatrix-automotive-off-road-parts-catalogue.pdf
    Per-category "Click to view the catalogue" links on the Neumatrix
    section. Filenames are derived from each category's title in
    src/data/neumatrixData.js (lowercased, non-alphanumeric runs replaced
    with a single hyphen) — keep category titles and filenames in sync if
    either changes.
