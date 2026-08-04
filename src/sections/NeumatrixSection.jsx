import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Download, FileDown } from "lucide-react";
import ProductPanel from "../components/common/ProductPanel";
import ProductSpecModal from "../components/common/ProductSpecModal";
import Reveal from "../components/common/Reveal";
import SectionHeader from "../components/common/SectionHeader";
import { pad2 } from "../utils/pad2";
import { neumatrixCategories, neumatrixIntro, neumatrixLedLightsContent } from "../data/neumatrixData";
import neumatrixLogo from "../assets/images/international/brand/neumatrix-led-logo.webp";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * A technical manifest of the four categories, readable before the visitor
 * commits to scrolling the full range. Doubles as in-page navigation for the
 * three categories that have a track to jump to; the fourth (no confident
 * product match yet — see neumatrixData.js) stays listed but unlinked rather
 * than reserving a full-height "coming soon" card further down the page.
 */
function NeumatrixIndex({ categories }) {
  return (
    <nav className="neumatrix-index" aria-label="NEUMATRIX range index">
      {categories.map((category, index) => {
        const count = category.products.length;
        const pending = count === 0;
        const ItemTag = pending ? "span" : "a";

        return (
          <ItemTag
            key={category.title}
            className={`neumatrix-index-item ${pending ? "is-pending" : ""}`.trim()}
            href={pending ? undefined : `#neumatrix-${slugify(category.title)}`}
            aria-disabled={pending ? "true" : undefined}
          >
            <span className="neumatrix-index-number">{pad2(index + 1)}</span>
            <span className="neumatrix-index-copy">
              <strong>{category.title}</strong>
              <small>{pending ? "Coming soon" : `${pad2(count)} ${count === 1 ? "product" : "products"}`}</small>
            </span>
          </ItemTag>
        );
      })}
    </nav>
  );
}

function NeumatrixCategory({ category, index, getImage, onSelectProduct }) {
  const scrollerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const productCount = category.products.length;

  const updateScrollState = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    setCanScrollPrev(element.scrollLeft > 8);
    setCanScrollNext(maxScroll > 8 && element.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, productCount]);

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
    <Reveal
      as="article"
      id={`neumatrix-${slugify(category.title)}`}
      className="neumatrix-category"
      delay={index * 80}
    >
      <div className="neumatrix-category-head">
        <div className="neumatrix-category-title">
          <span className="neumatrix-category-number">{pad2(index + 1)}</span>
          <div>
            <h3>{category.title}</h3>
            <p>{category.intro}</p>
          </div>
        </div>
        <div className="neumatrix-category-aside">
          {category.catalogueHref ? (
            <a className="catalogue-download" href={category.catalogueHref} download>
              <FileDown size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>Catalogue</span>
            </a>
          ) : null}
          <small className="neumatrix-category-count">
            {pad2(productCount)} {productCount === 1 ? "product" : "products"}
          </small>
          {productCount > 1 ? (
            <div className="product-carousel-controls" aria-label={`${category.title} carousel controls`}>
              <button
                type="button"
                aria-label={`Previous ${category.title} products`}
                disabled={!canScrollPrev}
                onClick={() => scrollByCard(-1)}
              >
                <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Next ${category.title} products`}
                disabled={!canScrollNext}
                onClick={() => scrollByCard(1)}
              >
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="product-showcase-grid product-carousel-track neumatrix-category-track"
        aria-label={`${category.title} products`}
        onScroll={updateScrollState}
        onMouseEnter={updateScrollState}
      >
        {category.products.map((product, productIndex) => (
          <ProductPanel
            key={product.name}
            product={product}
            image={getImage(product.name)}
            description={product.story}
            index={productIndex}
            className="product-showcase-card"
            headingLevel="h4"
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </Reveal>
  );
}

export default function NeumatrixSection({ getImage }) {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <section className="section neumatrix-section" aria-label="NEUMATRIX automotive brand">
      <div className="container">
        <div className="neumatrix-brand-head">
          <img
            className="neumatrix-logo"
            src={neumatrixLogo}
            alt="NEUMATRIX LED"
            width={1049}
            height={322}
            loading="eager"
          />
          <SectionHeader
            eyebrow="A Part of ORAC International"
            title={<span className="sr-only">NEUMATRIX</span>}
            text={neumatrixIntro}
          />
        </div>

        <NeumatrixIndex categories={neumatrixCategories} />

        <Reveal className="neumatrix-led-panel" delay={60}>
          <h3>{neumatrixLedLightsContent.title}</h3>
          {neumatrixLedLightsContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="button button-secondary neumatrix-led-download"
            href="/downloads/neumatrix-automotive-led-lights-catalogue.pdf"
            download
          >
            <Download size={15} strokeWidth={1.8} aria-hidden="true" />
            {neumatrixLedLightsContent.cta}
          </a>
        </Reveal>

        <div className="neumatrix-category-grid">
          {neumatrixCategories.map((category, index) =>
            category.products.length > 0 ? (
              <NeumatrixCategory
                key={category.title}
                category={category}
                index={index}
                getImage={getImage}
                onSelectProduct={(product, image) => setActiveProduct({ product, image })}
              />
            ) : null
          )}
        </div>
      </div>

      <ProductSpecModal
        product={activeProduct?.product}
        image={activeProduct?.image}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
