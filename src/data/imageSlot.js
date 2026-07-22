/**
 * Builds a normalized image descriptor used across the data layer.
 * `options` can carry extras such as secondarySrc / secondaryAlt.
 */
export const imageSlot = (label = "ORAC visual", alt = "ORAC visual", src = "", options = {}) => ({
  src,
  alt,
  label,
  ...options,
});
