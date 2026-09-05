import { useState } from "react";
import { Download, FileDown } from "lucide-react";
import CarouselControls from "../components/common/CarouselControls";
import ProductPanel from "../components/common/ProductPanel";
import ProductSpecModal from "../components/common/ProductSpecModal";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";
import SectionHeader from "../components/common/SectionHeader";
import useCardCarousel from "../components/common/useCardCarousel";
import { pad2 } from "../utils/pad2";
import { neumatrixCategories, neumatrixIntro, neumatrixLedLightsContent } from "../data/neumatrixData";
import neumatrixLogo from "../assets/images/international/brand/neumatrix-led-logo.webp";
import aesNeumatrixDistributionCover from "../assets/images/international/brand/aes-neumatrix-distribution-cover.webp";

// Cover-only categories (coverOnly: true in neumatrixData.js) show a single
// brand image instead of a product carousel - keyed by title here rather
// than in the data file, which stays plain data with no asset imports.
const categoryCoverImages = {
  "AES / NEUMATRIX - Distribution": aesNeumatrixDistributionCover,
};

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
              <small>
                {pending ? "Coming soon" : `${pad2(count)} ${count === 1 ? "product" : "products"}`}
              </small>
            </span>
          </ItemTag>
        );
      })}
    </nav>
  );
}

function NeumatrixCategory({ category, index, getImage, onSelectProduct }) {
  const productCount = category.products.length;
  const { scrollerRef, canScrollPrev, canScrollNext, updateScrollState, scrollByCard } = useCardCarousel({
    dependency: productCount,
  });

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
              <span>{category.coverOnly ? "Download Brochure" : "Catalogue"}</span>
            </a>
          ) : null}
          {!category.coverOnly ? (
            <>
              <small className="neumatrix-category-count">
                {pad2(productCount)} {productCount === 1 ? "product" : "products"}
              </small>
              {productCount > 1 ? (
                <CarouselControls
                  label={category.title}
                  canScrollPrev={canScrollPrev}
                  canScrollNext={canScrollNext}
                  onPrev={() => scrollByCard(-1)}
                  onNext={() => scrollByCard(1)}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      {category.coverOnly ? (
        <div className="neumatrix-category-cover">
          <SafeImage
            src={categoryCoverImages[category.title]}
            alt={category.title}
            className="neumatrix-category-cover-photo"
            fallbackLabel={category.title}
          />
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className="product-showcase-grid product-carousel-track neumatrix-category-track"
          role="group"
          aria-label={`${category.title} products`}
          tabIndex={0}
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
      )}
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
