import styles from "./styles.module.css";
import type { ListProps } from "./types";


export default function List({ items, onClick }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li
          key={item}
          className={styles.item}
          onClick={() => onClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}