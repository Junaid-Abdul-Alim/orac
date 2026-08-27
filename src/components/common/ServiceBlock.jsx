import { Camera, Gift, MapPinned, Music, Palette, Route, Sparkles, Utensils } from "lucide-react";
import ImagePanel from "./ImagePanel";
import IconBadge from "./IconBadge";
import { pad2 } from "../../utils/pad2";

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

// No longer wraps itself in a `Reveal` - it is always rendered inside a
// `.service-grid` that carries `data-motion-grid` (see OracEventus.jsx), so
// the grid's own ScrollTrigger staggers the whole card as one of its
// children. The image inside still opens on its own via `ImagePanel`'s
// `ImageReveal`, so a card entering is two things happening together: the
// card sliding into place and its photo wiping open inside it.
export default function ServiceBlock({ title, tag, points, image, index = 0, variant = "panel" }) {
  return (
    <article className="service-block">
      {image ? (
        <ImagePanel image={image} label={title} className="service-block-image" delay={0} variant={variant} />
      ) : null}
      <div className="service-block-top">
        <IconBadge icon={serviceIcon(title)} className="icon-badge-soft" size={17} />
        <span>{pad2(index + 1)}</span>
      </div>
      <h3>{title}</h3>
      {tag ? <p className="service-block-tag">{tag}</p> : null}
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
