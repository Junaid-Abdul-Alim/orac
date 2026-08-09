import { ArrowUpRight } from "lucide-react";

/**
 * One hairline contact action row (icon / kind / value / arrow), shared by
 * every place ORAC surfaces a phone/email/web action - the International and
 * Luxe contact CTAs, and the Contact page directory. `channel` opts into a
 * per-service class hook (`.contact-action-${channel}`) used by the
 * International/Luxe CTAs for their WhatsApp/email/web colour cues; the
 * Contact page passes none, so it renders the bare `.contact-action` class it
 * always has.
 */
export default function ContactActionRow({ icon: Icon, kind, text, href, channel, external, iconSize = 17 }) {
  return (
    <a
      className={`contact-action ${channel ? `contact-action-${channel}` : ""}`.trim()}
      href={href}
      aria-label={`${kind}: ${text}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="contact-action-icon" aria-hidden="true">
        <Icon size={iconSize} strokeWidth={1.7} />
      </span>
      <span className="contact-action-kind">{kind}</span>
      <span className="contact-action-value">{text}</span>
      <ArrowUpRight className="contact-action-arrow" size={15} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}
