import React from "react";
import Reveal from "./Reveal";

export default function ProcessTimeline({ steps, className = "" }) {
  return (
    <div className={`process-timeline ${className}`.trim()}>
      {steps.map((step, index) => (
        <Reveal as="article" className="timeline-step" key={step.title} delay={index * 90}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          {step.body ? <p>{step.body}</p> : null}
        </Reveal>
      ))}
    </div>
  );
}
