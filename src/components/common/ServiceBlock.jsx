import React from "react";
import { Camera, Gift, MapPinned, Music, Palette, Route, Sparkles, Utensils } from "lucide-react";
import Reveal from "./Reveal";
import ImagePanel from "./ImagePanel";
import IconBadge from "./IconBadge";

const serviceIcon = (title = "") => {
  const key = title.toLowerCase();

  if (key.includes("decor") || key.includes("styling")) return Palette;
  if (key.includes("venue") || key.includes("logistics")) return MapPinned;
  if (key.includes("catering")) return Utensils;
  if (key.includes("entertainment")) return Music;
  if (key.includes("gifting") || key.includes("keepsake")) return Gift;
  if (key.includes("memory")) return Camera;
  if (key.includes("guest")) return Sparkles;
  if (key.includes("planning") || key.includes("coordination")) return Route;

  return Sparkles;
};

export default function ServiceBlock({ title, points, image, index = 0 }) {
  return (
    <Reveal as="article" className="service-block" delay={index * 70}>
      {image ? <ImagePanel image={image} label={title} className="service-block-image" delay={0} /> : null}
      <div className="service-block-top">
        <IconBadge icon={serviceIcon(title)} className="icon-badge-soft" size={17} />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Reveal>
  );
}
