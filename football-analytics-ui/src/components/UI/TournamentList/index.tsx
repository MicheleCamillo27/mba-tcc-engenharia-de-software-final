import styles from "./styles.module.css";
import type { TournamentListProps } from "./types";


export default function TournamentList({ items, onClick }: TournamentListProps) {
  return (
    <ul className={styles.list}>
      {items.map((t) => (
        <li
          key={t.id}
          className={styles.item}
          onClick={() => onClick?.(t)}
        >
          <span className={styles.name}>{t.name}</span>

        </li>
      ))}
    </ul>
  );
}