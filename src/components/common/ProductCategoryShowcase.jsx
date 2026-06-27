import React, { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Reveal from "./Reveal";
import ProductPanel from "./ProductPanel";
import IconBadge from "./IconBadge";

export default function ProductCategoryShowcase({
  collections,
  getImage,
  eyebrow,
  title,
  text,
  label = "Product catalogue",
}) {
  const [activeCollectionId, setActiveCollectionId] = useState(collections[0]?.id || "");
  const activeCollection = useMemo(
    () => collections.find((collection) => collection.id === activeCollectionId) || collections[0],
    [activeCollectionId, collections]
  );
  const [activeCategoryByCollection, setActiveCategoryByCollection] = useState(() =>
    Object.fromEntries(collections.map((collection) => [collection.id, collection.categories[0]?.title || ""]))
  );

  const activeTitle = activeCategoryByCollection[activeCollection?.id] || activeCollection?.categories[0]?.title || "";

  const activeCategory = useMemo(
    () =>
      activeCollection?.categories.find((category) => category.title === activeTitle) ||
      activeCollection?.categories[0],
    [activeCollection, activeTitle]
  );

  if (!activeCollection || !activeCategory) return null;

  const activeIndex = activeCollection.categories.findIndex((category) => category.title === activeCategory.title);
  const panelId = `products-${activeCollection.id}-${activeCategory.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const productTotal = collections.reduce(
    (total, collection) =>
      total + collection.categories.reduce((collectionTotal, category) => collectionTotal + category.products.length, 0),
    0
  );

  const setActiveCategory = (categoryTitle) => {
    setActiveCategoryByCollection((current) => ({
      ...current,
      [activeCollection.id]: categoryTitle,
    }));
  };

  const collectionIcon = (id = "") => (id.includes("import") ? ArrowDownToLine : ArrowUpFromLine);

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
            {String(collections.length).padStart(2, "0")} collections / {String(productTotal).padStart(2, "0")} products
          </small>
        </div>
      </Reveal>

      <Reveal className="product-collection-switch" delay={70} role="tablist" aria-label="Product collections">
        {collections.map((collection) => {
          const isActive = collection.id === activeCollection.id;

          return (
            <button
              key={collection.id}
              type="button"
              className={isActive ? "is-active" : ""}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCollectionId(collection.id)}
            >
              <IconBadge icon={collectionIcon(collection.id)} className="icon-badge-soft" size={17} />
              <span>{collection.label}</span>
              <small>{collection.short}</small>
            </button>
          );
        })}
      </Reveal>

      <Reveal className="product-showcase-selector" delay={80}>
        <div className="product-showcase-tabs" role="tablist" aria-label={label}>
          {activeCollection.categories.map((category) => {
            const isActive = category.title === activeCategory.title;

            return (
              <button
                key={category.title}
                type="button"
                className={isActive ? "is-active" : ""}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveCategory(category.title)}
              >
                <span>{category.title}</span>
                <small>{String(category.products.length).padStart(2, "0")}</small>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="product-showcase-stage">
        <Reveal className="product-showcase-intro" delay={120}>
          <small>{activeCollection.short}</small>
          <span>{activeCollection.label}</span>
          <p>{activeCollection.description}</p>
        </Reveal>

        <Reveal className="product-showcase-category-note" delay={140}>
          <small>{String(activeIndex + 1).padStart(2, "0")}</small>
          <span>{activeCategory.title}</span>
          <p>{activeCategory.intro}</p>
        </Reveal>

        <div id={panelId} key={`${activeCollection.id}-${activeCategory.title}`} className="product-showcase-grid" role="tabpanel">
          {activeCategory.products.map((product, index) => (
            <ProductPanel
              key={`${activeCategory.title}-${product.name}`}
              product={product}
              image={getImage(product.name)}
              index={Math.min(index, 8)}
              className="product-showcase-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
