import { Link } from "react-router-dom";

export default function Button({ children, to, variant = "primary", className = "" }) {
  return (
    <Link className={`button button-${variant} ${className}`.trim()} to={to}>
      {children}
    </Link>
  );
}
