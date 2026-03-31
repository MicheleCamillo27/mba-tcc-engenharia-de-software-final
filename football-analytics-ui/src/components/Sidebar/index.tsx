import { Link } from "react-router-dom";
import styles from "./style.module.css";

import { FaHome } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <IoIosFootball size={28} color="var(--accent)" />
        Football Analytics
      </h2>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <FaHome size={20} />
          Início
        </Link>
      </nav>
    </div>
  );
}