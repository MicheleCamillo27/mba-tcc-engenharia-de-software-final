import styles from "./styles.module.css";

export default function Content({ children }: any) {
  return <div className={styles.content}>{children}</div>;
}