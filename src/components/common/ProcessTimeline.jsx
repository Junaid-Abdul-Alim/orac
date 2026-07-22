import {
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Headphones,
  MapPinned,
  Search,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Reveal from "./Reveal";
import IconBadge from "./IconBadge";
import { pad2 } from "../../utils/pad2";

const stepIcon = (title = "") => {
  const key = title.toLowerCase();

  if (key.includes("consult")) return Handshake;
  if (key.includes("planning")) return ClipboardCheck;
  if (key.includes("execution")) return Send;
  if (key.includes("delivery")) return FileCheck2;
  if (key.includes("source")) return Search;
  if (key.includes("verify")) return ShieldCheck;
  if (key.includes("document")) return FileCheck2;
  if (key.includes("ship")) return Truck;
  if (key.includes("support")) return Headphones;

  return MapPinned;
};

export default function ProcessTimeline({ steps, className = "" }) {
  return (
    <div className={`process-timeline ${className}`.trim()}>
      {steps.map((step, index) => (
        <Reveal as="article" className="timeline-step" key={step.title} delay={index * 90}>
          <div className="timeline-step-top">
            <IconBadge icon={stepIcon(step.title)} className="icon-badge-soft" size={17} />
            <span>{pad2(index + 1)}</span>
          </div>
          <h3>{step.title}</h3>
          {step.body ? <p>{step.body}</p> : null}
        </Reveal>
      ))}
    </div>
  );
}
