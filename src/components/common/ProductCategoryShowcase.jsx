import { useState } from "react";
import { FileDown } from "lucide-react";
import CarouselControls from "./CarouselControls";
import Reveal from "./Reveal";
import ProductPanel from "./ProductPanel";
import ProductSpecModal from "./ProductSpecModal";
import useCardCarousel from "./useCardCarousel";
import { pad2 } from "../../utils/pad2";

const countProducts = (categories) =>
  categories.reduce((total, category) => total + category.products.length, 0);

/**
 * One category inside a portfolio - its own numbered band, its own intro and
 * its own track. The categories used to be flattened into a single run of
 * products per collection, which lost the distinction the trade catalogue is
 * organised by (Fibres/Coir, Spices, Pulses & Nuts, ... on export; Agri
 * Commodities and Scrap on import). Each is now read as its own chapter.
 */
function ProductCategoryRow({ collectionId, category, index, getImage, onSelectProduct }) {
  const productCount = category.products.length;
  const { scrollerRef, canScrollPrev, canScrollNext, updateScrollState, scrollByCard } = useCardCarousel({
    dependency: productCount,
  });

  return (
    <Reveal as="article" className="product-category-row" delay={index * 70}>
      <div className="product-category-head">
        <div className="product-category-title">
          <span className="product-category-number" aria-hidden="true">
            {pad2(index + 1)}
          </span>
          <div>
            <h4>{category.title}</h4>
            {category.intro ? <p>{category.intro}</p> : null}
          </div>
        </div>
        <div className="product-category-aside">
          {category.catalogueHref ? (
            <a className="catalogue-download" href={category.catalogueHref} download>
              <FileDown size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>Catalogue</span>
            </a>
          ) : null}
          <small className="product-category-count">{pad2(productCount)} products</small>
          <CarouselControls
            label={category.title}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            onPrev={() => scrollByCard(-1)}
            onNext={() => scrollByCard(1)}
          />
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="product-showcase-grid product-carousel-track"
        role="group"
        aria-label={`${category.title} products`}
        tabIndex={0}
        onScroll={updateScrollState}
        onMouseEnter={updateScrollState}
      >
        {category.products.map((product, productIndex) => (
          <ProductPanel
            key={`${collectionId}-${category.title}-${product.name}`}
            product={product}
            image={getImage(product.name)}
            index={Math.min(productIndex, 8)}
            className="product-showcase-card"
            headingLevel="h5"
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </Reveal>
  );
}

/* No per-collection row-head here: the showcase-level head above
   (eyebrow + title + description, ProductCategoryShowcase below) already
   states the collection's name and description - this component is only
   ever handed one collection (OracInternational.jsx), so a second
   "Export Portfolio" / "Import Portfolio" heading directly beneath the
   first was a plain duplicate, not a distinct piece of information. */
function ProductCollection({ collection, getImage, index, onSelectProduct }) {
  return (
    <Reveal className="product-collection" delay={index * 110}>
      <div className="product-collection-categories">
        {collection.categories.map((category, categoryIndex) => (
          <ProductCategoryRow
            key={category.title}
            collectionId={collection.id}
            category={category}
            index={categoryIndex}
            getImage={getImage}
            onSelectProduct={onSelectProduct}
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
  const [activeProduct, setActiveProduct] = useState(null);
  const productTotal = collections.reduce(
    (total, collection) => total + countProducts(collection.categories),
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
          <ProductCollection
            key={collection.id}
            collection={collection}
            getImage={getImage}
            index={index}
            onSelectProduct={(product, image) => setActiveProduct({ product, image })}
          />
        ))}
      </div>

      <ProductSpecModal
        product={activeProduct?.product}
        image={activeProduct?.image}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
