import Reveal from "./Reveal";
import { pad2 } from "../../utils/pad2";

export default function ServiceCard({ title, body, index = 0 }) {
  return (
    <Reveal as="article" className="service-card" delay={index * 70}>
      <span>{pad2(index + 1)}</span>
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
    </Reveal>
  );
}
