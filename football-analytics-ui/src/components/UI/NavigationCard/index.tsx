import type { NavigationCardProps } from "./types";

import { CardBase } from "../Cardbase/CardBase";
import styles from "./styles.module.css";


export default function NavigationCard({
  icon,
  title,
  description,
  onClick
}: NavigationCardProps) {
  return (
    <CardBase onClick={onClick}>
      <div className={styles.icon}>{icon}</div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </CardBase>
  );
}