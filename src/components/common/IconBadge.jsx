export default function IconBadge({ icon: Icon, className = "", size = 18, label = "" }) {
  if (!Icon) return null;

  return (
    <span
      className={`icon-badge ${className}`.trim()}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : "true"}
      aria-label={label || undefined}
    >
      <Icon size={size} strokeWidth={1.7} />
    </span>
  );
}
