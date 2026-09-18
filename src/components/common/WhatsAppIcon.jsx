import { useId } from "react";

/**
 * WhatsApp glyph, drawn locally as an inline SVG rather than hotlinked or
 * approximated with lucide's generic MessageCircle speech bubble, which is
 * what the contact rows previously used - so "WhatsApp" was labelled with an
 * icon that reads as a comment, not as the service.
 *
 * Built the same way as GmailIcon.jsx - `fill="none"` root, a white-filled
 * main shape with a colour stroke outline, a small solid detail on top, same
 * `strokeWidth` prop - so the two contact icons read as one matched pair
 * (same line weight, same white base) instead of the bubble sitting next to
 * the envelope as a solid colour blob. That mismatch in ink weight is also
 * what made the bubble look off-centre next to the light envelope: a solid
 * fill with an off-axis tail carries more visual weight toward the tail than
 * a thin outline does, so it read as pulled left even though the geometry
 * itself isn't.
 */
export default function WhatsAppIcon({ size = 16, strokeWidth = 1.6, className = "", title }) {
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
        <linearGradient id={gradientId} x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2CDA6A" />
          <stop offset="1" stopColor="#0E8A61" />
        </linearGradient>
      </defs>
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"
        fill="#fff"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        fill={`url(#${gradientId})`}
        d="M8.53 7.33c-.18-.4-.37-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.67 2.67 4.12 3.64 2.04.8 2.45.64 2.89.6.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.74-1.8Z"
      />
    </svg>
  );
}
