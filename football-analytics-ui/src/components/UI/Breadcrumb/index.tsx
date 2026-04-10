import { Link } from "react-router-dom";
import type { BreadcrumbProps } from "./types";

import styles from "./styles.module.css";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link to={item.path} style={{ color: "var(--accent)" }}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {index < items.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
}