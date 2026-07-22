import Reveal from "./Reveal";

export default function ServiceCard({ title, body, index = 0 }) {
  return (
    <Reveal as="article" className="service-card" delay={index * 70}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
    </Reveal>
  );
}
