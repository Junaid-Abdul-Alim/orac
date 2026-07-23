import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import InteractiveImage from "../components/common/InteractiveImage";
import Reveal from "../components/common/Reveal";
import { maisonBySlug, maisonSeries } from "../data/luxeData";

function ModelStory({ model, align }) {
  return (
    <Reveal as="article" className={`maison-model maison-model-${align}`}>
      <InteractiveImage image={model.image} label={model.name} className="maison-model-media" />
      <div className="maison-model-story">
        <span className="maison-model-index">{model.name}</span>
        <p>{model.story}</p>
      </div>
    </Reveal>
  );
}

export default function MaisonCategory() {
  const { categorySlug } = useParams();
  const category = maisonBySlug[categorySlug];

  useEffect(() => {
    if (category) {
      document.title = `${category.name} | The House of Azrin`;
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/luxury-export" replace />;
  }

  const leftModels = category.models.filter((model) => model.side === "left");
  const rightModels = category.models.filter((model) => model.side === "right");

  return (
    <div className="maison-category-page">
      <section className="section maison-category-hero">
        <div className="container">
          <Reveal className="maison-category-heading">
            <BrandLockup items={["Maison Series", category.name]} />
            <Link className="maison-back" to="/luxury-export">
              <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
              All Maison Series
            </Link>
            <span className="eyebrow">Explore</span>
            <h1>{category.name}</h1>
            <p className="maison-category-subtitle">{category.subtitle}</p>
            <p className="maison-category-intro">{category.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section maison-showcase-section">
        <div className="container">
          <div className="maison-showcase" aria-label={`${category.name} looks`}>
            <div className="maison-column maison-column-left">
              {leftModels.map((model) => (
                <ModelStory key={model.id} model={model} align="left" />
              ))}
            </div>
            <div className="maison-column maison-column-right">
              {rightModels.map((model) => (
                <ModelStory key={model.id} model={model} align="right" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section maison-category-next">
        <div className="container">
          <span className="eyebrow">More of the Maison Series</span>
          <div className="maison-next-links">
            {maisonSeries
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Link key={item.id} to={`/luxury-export/${item.slug}`} className="maison-next-link">
                  <span>{item.name}</span>
                  <small>{item.subtitle}</small>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
