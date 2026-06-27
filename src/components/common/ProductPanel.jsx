import React from "react";
import { BadgeCheck, Globe2, Ship, Truck, Warehouse } from "lucide-react";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import IconBadge from "./IconBadge";

const productBadge = (tag = "") => {
  if (tag.includes("Auto")) return "Import Ready";
  if (tag.includes("Industrial")) return "Bulk Supply";
  if (tag.includes("Import")) return "Origin Verified";
  if (tag.includes("Spice") || tag.includes("Nut") || tag.includes("Pulse")) return "Export Quality";
  return "Global Trade";
};

const productBadgeIcon = (tag = "") => {
  if (tag.includes("Auto")) return Truck;
  if (tag.includes("Industrial")) return Warehouse;
  if (tag.includes("Import")) return Ship;
  if (tag.includes("Spice") || tag.includes("Nut") || tag.includes("Pulse")) return BadgeCheck;
  return Globe2;
};

const productSummary = (product) => {
  const tag = product.tag || "";

  if (tag.includes("Pulse")) return "Export-grade Indian pulse for global trade.";
  if (tag.includes("Spice")) return "Selected Indian spice for trade enquiries.";
  if (tag.includes("Nut")) return "Trade-ready nut category for global buyers.";
  if (tag.includes("Vegetable")) return "Fresh agri category for bulk supply.";
  if (tag.includes("Fruit")) return "Indian fruit category for export channels.";
  if (tag.includes("Superfood")) return "Wellness-led agri product for global markets.";
  if (tag.includes("Seed")) return "Seed category prepared for trade movement.";
  if (tag.includes("Fibre")) return "Natural fibre material for bulk trade.";
  if (tag.includes("Coir")) return "Coir-based material for industrial buyers.";
  if (tag.includes("Mineral")) return "Mineral category for verified supply.";
  if (tag.includes("Auto")) return "Selected automotive product for import channels.";
  if (tag.includes("Industrial Import")) return "Industrial import material for Indian markets.";
  if (tag.includes("Agri Import")) return "Origin-sourced agri product for Indian buyers.";

  return "Trade-ready product for business enquiries.";
};

export default function ProductPanel({ product, image, index = 0, className = "" }) {
  return (
    <Reveal
      as="article"
      className={`product-panel ${className}`.trim()}
      delay={index * 45}
    >
      {image ? (
        <div className="product-panel-image">
          <div className="product-panel-image-surface">
            <SafeImage
              src={image.src}
              alt={image.alt || product.name}
              className="product-panel-photo"
              fallbackLabel={image.label || product.name}
            />
          </div>
        </div>
      ) : null}
      <div className="product-panel-meta">
        <span>{product.tag}</span>
        <small>
          <IconBadge icon={productBadgeIcon(product.tag)} className="icon-badge-inline" size={13} />
          {productBadge(product.tag)}
        </small>
      </div>
      <h3>{product.name}</h3>
      <p>{productSummary(product)}</p>
    </Reveal>
  );
}
