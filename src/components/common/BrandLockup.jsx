import { Fragment } from "react";

export default function BrandLockup({ items = ["ORAC"], className = "" }) {
  const parts = Array.isArray(items) ? items : String(items).split("/");

  return (
    <p className={`brand-lockup ${className}`.trim()} aria-label={parts.join(" / ")}>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 ? <span className="brand-lockup-mark">/</span> : null}
          <span>{part.trim()}</span>
        </Fragment>
      ))}
    </p>
  );
}
