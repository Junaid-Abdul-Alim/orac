import { useState } from "react";
import { Download } from "lucide-react";
import ProductPanel from "../components/common/ProductPanel";
import ProductSpecModal from "../components/common/ProductSpecModal";
import Reveal from "../components/common/Reveal";
import SafeImage from "../components/common/SafeImage";
import SectionHeader from "../components/common/SectionHeader";
import { pad2 } from "../utils/pad2";
import { neumatrixCategories, neumatrixIntro, neumatrixLedLightsContent } from "../data/neumatrixData";

function NeumatrixCategory({ category, index, getImage, onSelectProduct }) {
  const hasProducts = category.products.length > 0;

  return (
    <Reveal as="article" className="neumatrix-category" delay={index * 80}>
      <div className="neumatrix-category-head">
        <span className="neumatrix-category-number">{pad2(index + 1)}</span>
        <div>
          <h3>{category.title}</h3>
          <p>{category.intro}</p>
        </div>
      </div>

      {hasProducts ? (
        <div className="neumatrix-category-products">
          {category.products.map((product, productIndex) => (
            <ProductPanel
              key={product.name}
              product={product}
              image={getImage(product.name)}
              index={productIndex}
              className="product-showcase-card"
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="neumatrix-category-empty">
          <p>Catalogue coming soon.</p>
        </div>
      )}

      <a
        className="neumatrix-category-download"
        href={`/downloads/neumatrix-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-catalogue.pdf`}
        download
      >
        <Download size={15} strokeWidth={1.8} aria-hidden="true" />
        Click to view the catalogue
      </a>
    </Reveal>
  );
}

export default function NeumatrixSection({ getImage }) {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <section className="section neumatrix-section" aria-label="NEUMATRIX automotive brand">
      <div className="container">
        <div className="neumatrix-brand-head">
          <div className="neumatrix-logo-mark" aria-hidden="true">
            <SafeImage src="" alt="" fallbackLabel="NEUMATRIX" className="neumatrix-logo-fallback" />
          </div>
          <SectionHeader eyebrow="A Part of ORAC International" title="NEUMATRIX" text={neumatrixIntro} />
        </div>

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
            {neumatrixLedLightsContent.cta}
          </a>
        </Reveal>

        <div className="neumatrix-category-grid">
          {neumatrixCategories.map((category, index) => (
            <NeumatrixCategory
              key={category.title}
              category={category}
              index={index}
              getImage={getImage}
              onSelectProduct={(product, image) => setActiveProduct({ product, image })}
            />
          ))}
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
