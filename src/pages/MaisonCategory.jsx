import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLockup from "../components/common/BrandLockup";
import InteractiveImage from "../components/common/InteractiveImage";
import Reveal from "../components/common/Reveal";
import { maisonBySlug, maisonSeries } from "../data/luxeData";
import usePageMotion from "../motion/usePageMotion";

// `delay` is the model's index *within its own column* (see the two filtered
// arrays below), not its index in the category's full model list - the two
// columns read top to bottom independently, so each needs its own 0,1,2...
// cadence rather than the interleaved 0,2,4 / 1,3,5 the full list would give.
function ModelStory({ model, align, delay }) {
  return (
    <Reveal as="article" className={`maison-model maison-model-${align}`} kind="card" delay={delay}>
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
  const scope = useRef(null);
  usePageMotion(scope, "luxe");

  useEffect(() => {
    if (category) {
      document.title = `${category.name} | ORAC Luxe`;
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/luxury-export" replace />;
  }

  const leftModels = category.models.filter((model) => model.side === "left");
  const rightModels = category.models.filter((model) => model.side === "right");

  return (
    <div className="maison-category-page" ref={scope} data-motion-identity="luxe">
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
              {leftModels.map((model, index) => (
                <ModelStory key={model.id} model={model} align="left" delay={index * 90} />
              ))}
            </div>
            <div className="maison-column maison-column-right">
              {rightModels.map((model, index) => (
                <ModelStory key={model.id} model={model} align="right" delay={index * 90} />
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
