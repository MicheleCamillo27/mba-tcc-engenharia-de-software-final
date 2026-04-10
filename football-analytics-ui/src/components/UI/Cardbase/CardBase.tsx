import type { CardBaseProps } from "./types";

import styles from "./styles.module.css";

export function CardBase({ children, onClick, className, ...rest }: CardBaseProps) {
  return (
    <div
      className={`${styles.card} ${className || ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}