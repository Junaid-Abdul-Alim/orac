Drop the Maison Series catalogue here.

The Luxe page's "Download catalogue" button links to:
  /downloads/the-house-of-azrin-catalogue.pdf

Add that PDF to this folder (keep the exact filename) and the button works
with no code changes. To use a different filename, update `catalogue.href`
in src/data/luxeData.js.

---

ORAC International's catalogue chips expect these files (drop them in with
the exact filenames below and each chip works with no code changes). Every
filename below is already present in this folder as of the last update.

  orac-international-fibres-coir-industrial-catalogue.pdf
  orac-international-fresh-processed-dry-catalogue.pdf
  orac-international-pulses-nuts-catalogue.pdf
  orac-international-spices-catalogue.pdf
    Export Portfolio category catalogue chips. `catalogueHref` on each
    category in src/data/internationalData.js (exportCategories).

  orac-international-agri-commodities-catalogue.pdf
    Import Portfolio "Agri Commodities" category catalogue chip.
    `catalogueHref` on that category in internationalData.js
    (importCategories). The "Scrap" category intentionally has no chip -
    no combined catalogue PDF exists for it, only three per-product sheets
    (OCC / PVC Regrind / UBC), which aren't wired up individually.

  neumatrix-automotive-led-lights-catalogue.pdf
    Neumatrix "Automotive LED Lights" intro panel download button.
    href in src/sections/NeumatrixSection.jsx.

  neumatrix-projector-fog-lights-catalogue.pdf
  neumatrix-automotive-off-road-parts-catalogue.pdf
    Per-category catalogue chips on the Neumatrix section. `catalogueHref`
    on each category in src/data/neumatrixData.js. The "LED Lights &
    Spares" category intentionally has no chip - the only source document
    for it is a 90-page generic multi-brand supplier catalogue, not an
    ORAC-branded sheet, so it isn't presented as ORAC's own literature.

Every href above is a plain `/downloads/<filename>.pdf` path plus a
category- or product-name-derived slug where noted - update both the file
here and the corresponding `catalogueHref` together if either changes.
