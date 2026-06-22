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

## Notes

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
