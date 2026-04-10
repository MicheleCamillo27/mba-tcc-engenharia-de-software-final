import styles from "./styles.module.css";
import type { ListProps } from "./types";

export default function List<T extends { id: number; name: string }>({
  items,
  onClick,
}: ListProps<T>) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li
          key={item.id}
          className={styles.item}
          onClick={() => onClick(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}