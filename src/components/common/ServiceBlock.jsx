import React from "react";
import Reveal from "./Reveal";
import ImagePanel from "./ImagePanel";

export default function ServiceBlock({ title, points, image, index = 0 }) {
  return (
    <Reveal as="article" className="service-block" delay={index * 70}>
      {image ? <ImagePanel image={image} label={title} className="service-block-image" delay={0} /> : null}
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Reveal>
  );
}
