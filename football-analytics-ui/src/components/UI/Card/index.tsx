import styles from "./styles.module.css";

export function Card({ children }: any) {
  return <div className={styles.card}>{children}</div>;
}

export function CardHeader({ children }: any) {
  return <div className={styles.header}>{children}</div>;
}

export function CardBody({ children }: any) {
  return <div className={styles.body}>{children}</div>;
}