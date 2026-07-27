import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      // React 18.3's runtime only accepts the lowercase `fetchpriority` DOM
      // attribute (camelCase warns at runtime). eslint-plugin-react prefers the
      // React 19 camelCase spelling, so allow the lowercase form until upgrade.
      "react/no-unknown-property": ["error", { ignore: ["fetchpriority"] }],
      // Apostrophes/quotes are everywhere in the editorial copy; escaping them
      // adds noise without safety value for this content-driven marketing site.
      "react/no-unescaped-entities": "off",
      // Syncing local UI state to route/scroll changes (e.g. closing the nav on
      // navigation) and one-time capability fallbacks are valid, intentional
      // effect patterns here — keep the signal as a warning, not a build error.
      "react-hooks/set-state-in-effect": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["*.config.js", "vite.config.js", "eslint.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // react-three-fiber's intrinsic elements (`<pointLight>`,
    // `<meshStandardMaterial>`, ...) map straight to three.js object
    // properties, not DOM attributes - eslint-plugin-react's
    // no-unknown-property rule doesn't know about r3f and flags every one as
    // a typo. Scoped to the one file that actually renders a <Canvas>,
    // rather than loosening the rule for every component in the app.
    files: ["src/components/motion/OriginThread3D.jsx"],
    rules: {
      "react/no-unknown-property": [
        "error",
        { ignore: ["position", "intensity", "emissive", "emissiveIntensity", "roughness"] },
      ],
    },
  },
  prettier,
];
