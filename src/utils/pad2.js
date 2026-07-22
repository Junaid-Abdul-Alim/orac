/** Zero-pads a number to a 2-digit label, e.g. 3 -> "03", 12 -> "12". */
export const pad2 = (value) => String(value).padStart(2, "0");
