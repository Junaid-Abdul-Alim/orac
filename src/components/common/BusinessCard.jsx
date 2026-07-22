import { Link } from "react-router-dom";
import { CalendarDays, Gem, Globe2 } from "lucide-react";
import SafeImage from "./SafeImage";
import IconBadge from "./IconBadge";

const businessIcons = {
  international: Globe2,
  eventus: CalendarDays,
  "luxury-export": Gem,
};

export default function BusinessCard({ business, index = 0 }) {
  const BusinessIcon = businessIcons[business.id];

  return (
    <article className={`business-card business-card-${business.id}`}>
      <Link to={business.route} aria-label={`${business.name} - ${business.label}`}>
        <div className="business-card-visual" aria-hidden="true">
          {business.image ? (
            <SafeImage
              src={business.image}
              alt=""
              className="business-card-image"
              fallbackLabel={business.name}
            />
          ) : null}
          <span className="business-card-scrim" />
          <span className="business-card-number">{String(index + 1).padStart(2, "0")}</span>
          {business.logo ? (
            <img className="business-card-logo" src={business.logo} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="business-card-orbit" />
          )}
        </div>
        <div className="business-card-body">
          <div className="business-card-status-row">
            <IconBadge icon={BusinessIcon} className="icon-badge-soft" size={16} />
            <p className="business-card-status">{business.label}</p>
          </div>
          <h3>{business.name}</h3>
          <p>{business.purpose}</p>
          <span className="business-card-action">Explore</span>
        </div>
      </Link>
    </article>
  );
}
