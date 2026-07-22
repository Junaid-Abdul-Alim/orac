# ORAC Holding Website

React + Vite website for ORAC Holding and its business verticals.

## Routes

- `/`
- `/international`
- `/eventus`
- `/luxury-export`
- `/contact`

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint & format

```bash
npm run lint          # ESLint (flat config, React + hooks)
npm run format        # Prettier, write
npm run format:check  # Prettier, verify only
```

## Notes

Styles live in `src/styles/`. `global.css` is a barrel that `@import`s the
ordered partials in `src/styles/partials/` (base, navbar, hero, sections,
product-showcase, contact, media-panels, global-reach, luxe, footer,
responsive). Vite inlines the imports at build time, so the compiled CSS is
identical to a single sheet — edit the relevant partial.

The social share image is `public/og-image.png` (1200x630), referenced from the
Open Graph / Twitter tags in `index.html`.

Image locations are centralized in:

- `src/data/internationalImages.js`
- `src/data/eventusImages.js`

International page images are stored locally in `src/assets/images/international`.
Source notes for those assets are kept beside the files.

The interactive global reach map uses `react-simple-maps` and a local topojson file:

- `src/components/common/GlobalReach.jsx`
- `public/geographies/countries-110m.json`

For Hostinger or Apache hosting, upload the generated `dist/.htaccess` file with the rest of the build so React Router routes work on refresh and browser back/forward.

For Vercel hosting, `vercel.json` provides the same React Router fallback so direct page reloads and browser back/forward work on routes such as `/international`, `/eventus`, `/luxury-export`, and `/contact`.
