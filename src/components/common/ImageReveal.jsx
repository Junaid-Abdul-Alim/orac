import React from "react";
import { useEffect, useRef, useState } from "react";

export default function ImageReveal({ as: Tag = "div", className = "", children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const fallback = window.setTimeout(() => {
      setVisible(true);
    }, Math.max(900, delay + 700));

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      window.clearTimeout(fallback);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          window.clearTimeout(fallback);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px 18% 0px",
        threshold: 0.05,
      }
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`image-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
