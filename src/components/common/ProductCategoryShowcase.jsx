import React, { useMemo, useState } from "react";
import Reveal from "./Reveal";
import ProductPanel from "./ProductPanel";

export default function ProductCategoryShowcase({
  categories,
  getImage,
  eyebrow,
  title,
  text,
  label = "Product categories",
}) {
  const [activeTitle, setActiveTitle] = useState(categories[0]?.title || "");

  const activeCategory = useMemo(
    () => categories.find((category) => category.title === activeTitle) || categories[0],
    [activeTitle, categories]
  );

  if (!activeCategory) return null;

  return (
    <section className="product-showcase" aria-label={label}>
      <Reveal className="product-showcase-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </Reveal>

      <Reveal className="product-showcase-tabs" delay={80} role="tablist" aria-label={label}>
        {categories.map((category) => {
          const isActive = category.title === activeCategory.title;

          return (
            <button
              key={category.title}
              type="button"
              className={isActive ? "is-active" : ""}
              role="tab"
              aria-selected={isActive}
              aria-controls={`products-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              onClick={() => setActiveTitle(category.title)}
            >
              <span>{category.title}</span>
              <small>{String(category.products.length).padStart(2, "0")}</small>
            </button>
          );
        })}
      </Reveal>

      <Reveal className="product-showcase-intro" delay={120}>
        <span>{activeCategory.title}</span>
        <p>{activeCategory.intro}</p>
      </Reveal>

      <div
        id={`products-${activeCategory.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="product-showcase-grid"
        role="tabpanel"
      >
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
    </section>
  );
}
