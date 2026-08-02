import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import SafeImage from "./SafeImage";

/**
 * Page scroll lock, held at module scope so it is idempotent.
 *
 * StrictMode double-invokes effects in development (mount → cleanup → mount),
 * and a naive lock captured `window.scrollY` again on the second mount - by
 * which point the body was mid-restore, so the offset it stored was wrong and
 * closing the sheet threw the visitor ~1,800px up the page. Refcounting the
 * lock means the offset is captured exactly once, from the genuinely unlocked
 * state, however many times the effect runs.
 */
const scrollLock = { depth: 0, offset: 0, previous: null };

function lockScroll() {
  scrollLock.depth += 1;
  if (scrollLock.depth > 1) return;

  const { body } = document;
  scrollLock.offset = window.scrollY;
  scrollLock.previous = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  };
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollLock.offset}px`;
  body.style.width = "100%";
}

function unlockScroll() {
  scrollLock.depth = Math.max(0, scrollLock.depth - 1);
  if (scrollLock.depth > 0 || !scrollLock.previous) return;

  const { body } = document;
  body.style.overflow = scrollLock.previous.overflow;
  body.style.position = scrollLock.previous.position;
  body.style.top = scrollLock.previous.top;
  body.style.width = scrollLock.previous.width;
  scrollLock.previous = null;
  // `html { scroll-behavior: smooth }` would otherwise animate the restore,
  // so the page visibly slides back instead of simply being where it was.
  window.scrollTo({ top: scrollLock.offset, left: 0, behavior: "instant" });
}

/**
 * One group from `product.specGroups`, rendered as whichever shape its own
 * source table was: a plain label/value list for most spec sections, a real
 * `<table>` for groups that are genuinely a matrix (e.g. a winch's model
 * range across pulling capacity / rope length / weight), or a tag list for
 * groups that were just a set of applications/features on the sheet.
 */
function SpecGroup({ group }) {
  return (
    <div className="product-spec-group">
      <h4 className="product-spec-group-title">{group.title}</h4>

      {group.type === "table" ? (
        <div className="product-spec-table-wrap">
          <table className="product-spec-table">
            <thead>
              <tr>
                {group.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : group.type === "tags" ? (
        <ul className="product-spec-tags">
          {group.items.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : (
        <dl className="product-spec-list">
          {group.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/**
 * Product specification sheet.
 *
 * Rendered through a portal on document.body. It used to render inline inside
 * the section that owns it, and `.route-fade` (App.jsx) carries a transform -
 * which makes it the containing block for every `position: fixed` descendant.
 * The backdrop's `inset: 0` therefore resolved to the whole *document*, not
 * the viewport, so `place-items: center` centred the dialog in the middle of a
 * 15,000px page and focusing it scrolled the visitor ~1,800px down. Portalling
 * out of the routed tree restores real viewport-fixed positioning, which is
 * what removes the scroll jump and puts the dialog inside the viewport on a
 * phone.
 */
export default function ProductSpecModal({ product, image, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  // Callers pass an inline arrow, so `onClose` is a new function on every
  // render. Depending on it re-ran this whole effect mid-open, tearing down
  // the scroll lock and re-capturing the offset as 0 - which is why closing
  // used to dump the visitor back at the top of the page. The ref keeps the
  // handler current while the effect depends only on whether a product is
  // open.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!product) return undefined;

    const previouslyFocused = document.activeElement;
    lockScroll();
    // preventScroll keeps the focus call itself from moving the viewport.
    closeButtonRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
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
      unlockScroll();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [product]);

  if (!product) return null;

  return createPortal(
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

          {product.specGroups?.length ? (
            <div className="product-spec-groups">
              {product.specGroups.map((group) => (
                <SpecGroup key={group.title} group={group} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
