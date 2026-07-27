import { useId } from "react";

/**
 * WhatsApp glyph, drawn locally as an inline SVG path rather than hotlinked
 * or approximated with lucide's generic MessageCircle speech bubble, which is
 * what the contact rows previously used - so "WhatsApp" was labelled with an
 * icon that reads as a comment, not as the service.
 *
 * Filled with WhatsApp's own brand gradient (#25D366 -> #128C7E) rather than
 * `currentColor`, so it always renders as the real WhatsApp green regardless
 * of the row's own text colour - a fixed brand mark, not a themeable icon.
 */
export default function WhatsAppIcon({ size = 16, className = "", title }) {
  const gradientId = useId();

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
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
        fill={`url(#${gradientId})`}
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Z"
      />
      <path
        fill={`url(#${gradientId})`}
        d="M8.53 7.33c-.18-.4-.37-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.67 2.67 4.12 3.64 2.04.8 2.45.64 2.89.6.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.74-1.8Z"
      />
    </svg>
  );
}
