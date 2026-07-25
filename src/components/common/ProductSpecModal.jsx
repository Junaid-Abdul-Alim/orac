import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SafeImage from "./SafeImage";

export default function ProductSpecModal({ product, image, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="product-spec-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="product-spec-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-spec-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="product-spec-close"
          aria-label="Close specification sheet"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>

        {image ? (
          <div className="product-spec-media">
            <SafeImage
              src={image.src}
              alt={image.alt || product.name}
              fallbackLabel={image.label || product.name}
            />
          </div>
        ) : null}

        <div className="product-spec-body">
          <span className="product-spec-tag">{product.tag}</span>
          <h3 id="product-spec-title">{product.name}</h3>
          {product.story ? <p className="product-spec-story">{product.story}</p> : null}

          <dl className="product-spec-list">
            {product.spec ? (
              <div>
                <dt>Specification</dt>
                <dd>{product.spec}</dd>
              </div>
            ) : null}
            {product.origin ? (
              <div>
                <dt>Origin</dt>
                <dd>{product.origin}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </div>
  );
}
