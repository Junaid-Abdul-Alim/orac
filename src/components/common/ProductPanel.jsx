import { BadgeCheck, Globe2, Ship, Truck, Warehouse } from "lucide-react";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import IconBadge from "./IconBadge";

// Ordered top-to-bottom: the first matching rule wins, mirroring the original
// if-ladders. `badge` carries both the label and its icon so the tag is only
// tested once per product.
const badgeRules = [
  { test: (tag) => tag.includes("Auto"), label: "Import Ready", icon: Truck },
  { test: (tag) => tag.includes("Industrial"), label: "Bulk Supply", icon: Warehouse },
  { test: (tag) => tag.includes("Import"), label: "Origin Verified", icon: Ship },
  { test: (tag) => /Spice|Nut|Pulse/.test(tag), label: "Export Quality", icon: BadgeCheck },
];
const defaultBadge = { label: "Global Trade", icon: Globe2 };
const productBadge = (tag = "") => badgeRules.find((rule) => rule.test(tag)) ?? defaultBadge;

// Order is load-bearing (e.g. "Spice" must win over a later "Agri Import").
const summaryRules = [
  ["Pulse", "Export-grade Indian pulse for global trade."],
  ["Spice", "Selected Indian spice for trade enquiries."],
  ["Nut", "Trade-ready nut category for global buyers."],
  ["Vegetable", "Fresh agri category for bulk supply."],
  ["Fruit", "Indian fruit category for export channels."],
  ["Superfood", "Wellness-led agri product for global markets."],
  ["Seed", "Seed category prepared for trade movement."],
  ["Fibre", "Natural fibre material for bulk trade."],
  ["Coir", "Coir-based material for industrial buyers."],
  ["Mineral", "Mineral category for verified supply."],
  ["Auto", "Selected automotive product for import channels."],
  ["Industrial Import", "Industrial import material for Indian markets."],
  ["Agri Import", "Origin-sourced agri product for Indian buyers."],
];
const defaultSummary = "Trade-ready product for business enquiries.";
const productSummary = (tag = "") =>
  summaryRules.find(([keyword]) => tag.includes(keyword))?.[1] ?? defaultSummary;

const onEnterOrSpace = (handler) => (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handler();
  }
};

/**
 * `headingLevel` exists so a panel can sit at whatever depth its container
 * implies - inside the portfolio the product name is nested under a collection
 * (h3) and a category (h4), so it drops to h5. The visual treatment is carried
 * by `.product-panel-name`, not by the tag, so the level is free to move.
 */
export default function ProductPanel({
  product,
  image,
  index = 0,
  className = "",
  onSelect,
  headingLevel: Heading = "h3",
}) {
  const hasSecondaryImage = Boolean(image?.secondarySrc);
  const badge = productBadge(product.tag);
  const select = onSelect ? () => onSelect(product, image) : undefined;

  return (
    <Reveal
      as="article"
      className={`product-panel ${onSelect ? "product-panel-interactive" : ""} ${className}`.trim()}
      delay={index * 45}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={select}
      onKeyDown={onSelect ? onEnterOrSpace(select) : undefined}
      aria-haspopup={onSelect ? "dialog" : undefined}
      aria-label={onSelect ? `View specification sheet for ${product.name}` : undefined}
    >
      {image ? (
        <div className="product-panel-image">
          <div
            className={`product-panel-image-surface ${hasSecondaryImage ? "has-secondary-image" : ""}`.trim()}
          >
            <SafeImage
              src={image.src}
              alt={image.alt || product.name}
              className="product-panel-photo"
              fallbackLabel={image.label || product.name}
            />
            {hasSecondaryImage ? (
              <SafeImage
                src={image.secondarySrc}
                alt={image.secondaryAlt || product.name}
                className="product-panel-photo product-panel-photo-secondary"
                fallbackLabel={image.label || product.name}
              />
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="product-panel-meta">
        <span>{product.tag}</span>
        <small>
          <IconBadge icon={badge.icon} className="icon-badge-inline" size={13} />
          {badge.label}
        </small>
      </div>
      <Heading className="product-panel-name">{product.name}</Heading>
      <p>{productSummary(product.tag)}</p>
    </Reveal>
  );
}
