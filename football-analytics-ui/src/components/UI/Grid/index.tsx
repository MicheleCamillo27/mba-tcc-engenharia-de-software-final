import styles from "./styles.module.css";

interface Props {
  columns?: number;
  children: React.ReactNode;
}

export default function Grid({ columns = 2, children }: Props) {
  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  );
}