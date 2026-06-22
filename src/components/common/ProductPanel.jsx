import React from "react";
import Reveal from "./Reveal";
import ImagePanel from "./ImagePanel";

export default function ProductPanel({ product, image, index = 0, className = "" }) {
  return (
    <Reveal as="article" className={`product-panel ${className}`.trim()} delay={index * 45}>
      {image ? <ImagePanel image={image} className="product-panel-image" delay={0} /> : null}
      <span>{product.tag}</span>
      <h3>{product.name}</h3>
      <p>{product.story}</p>
    </Reveal>
  );
}
