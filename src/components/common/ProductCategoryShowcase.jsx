import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpFromLine } from "lucide-react";
import Reveal from "./Reveal";
import ProductPanel from "./ProductPanel";
import IconBadge from "./IconBadge";
import { pad2 } from "../../utils/pad2";

function ProductCollectionCarousel({ collection, getImage, index }) {
  const scrollerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const CollectionIcon = collection.id.includes("import") ? ArrowDownToLine : ArrowUpFromLine;

  const products = useMemo(
    () =>
      collection.categories.flatMap((category) =>
        category.products.map((product) => ({
          ...product,
          category: category.title,
        }))
      ),
    [collection.categories]
  );

  const updateScrollState = () => {
    const element = scrollerRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    setCanScrollPrev(element.scrollLeft > 8);
    setCanScrollNext(maxScroll > 8 && element.scrollLeft < maxScroll - 8);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [products.length]);

  const scrollByCard = (direction) => {
    const element = scrollerRef.current;
    if (!element) return;

    const card = element.querySelector(".product-showcase-card");
    const cardWidth = card?.getBoundingClientRect().width || element.clientWidth * 0.82;
    element.scrollBy({
      left: direction * (cardWidth + 18),
      behavior: "smooth",
    });
  };

  return (
    <Reveal className="product-collection-carousel" delay={index * 110}>
      <div className="product-collection-row-head">
        <div>
          <IconBadge icon={CollectionIcon} className="icon-badge-soft" size={17} />
          <div>
            <small>{collection.short}</small>
            <h3>{collection.label}</h3>
            <p>{collection.description}</p>
          </div>
        </div>
        <div className="product-carousel-controls" aria-label={`${collection.label} carousel controls`}>
          <button
            type="button"
            aria-label={`Previous ${collection.label} products`}
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Next ${collection.label} products`}
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="product-showcase-grid product-carousel-track"
        aria-label={`${collection.label} products`}
        onScroll={updateScrollState}
        onMouseEnter={updateScrollState}
      >
        {products.map((product, productIndex) => (
          <ProductPanel
            key={`${collection.id}-${product.category}-${product.name}`}
            product={product}
            image={getImage(product.name)}
            index={Math.min(productIndex, 8)}
            className="product-showcase-card"
          />
        ))}
      </div>
    </Reveal>
  );
}

export default function ProductCategoryShowcase({
  collections,
  getImage,
  eyebrow,
  title,
  text,
  label = "Product catalogue",
}) {
  const productTotal = collections.reduce(
    (total, collection) =>
      total +
      collection.categories.reduce(
        (collectionTotal, category) => collectionTotal + category.products.length,
        0
      ),
    0
  );

  return (
    <section className="product-showcase" aria-label={label}>
      <Reveal className="product-showcase-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <div className="product-showcase-context">
          {text ? <p>{text}</p> : null}
          <small>
            {pad2(collections.length)} collections / {pad2(productTotal)} products
          </small>
        </div>
      </Reveal>

      <div className="product-showcase-stage">
        {collections.map((collection, index) => (
          <ProductCollectionCarousel
            key={collection.id}
            collection={collection}
            getImage={getImage}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
