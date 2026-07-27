import { useId } from "react";

/**
 * Gmail glyph - envelope silhouette with the brand's red flap - drawn locally
 * so email actions carry a real, recognisable service mark instead of
 * lucide's generic outline `Mail` icon, the same reasoning that put a real
 * WhatsApp glyph on the WhatsApp actions (see WhatsAppIcon.jsx).
 *
 * Fixed to Gmail's own red gradient rather than `currentColor`, matching how
 * WhatsAppIcon is pinned to WhatsApp green - a brand mark, not a themeable icon.
 */
export default function GmailIcon({ size = 16, strokeWidth = 1.6, className = "", title }) {
  const gradientId = useId();

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gradientId} x1="2" y1="5" x2="22" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EA4335" />
          <stop offset="1" stopColor="#C5221F" />
        </linearGradient>
      </defs>
      <rect
        x="2.25"
        y="5"
        width="19.5"
        height="14"
        rx="2.3"
        fill="#fff"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
      />
      <path
        d="M3.1 6 12 13.1 20.9 6"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
