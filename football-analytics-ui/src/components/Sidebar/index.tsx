import { FaFutbol, FaHome, FaTrophy, FaUsers } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

import styles from "./style.module.css";

export default function Sidebar() {
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <IoIosFootball size={28} color="var(--accent)" />
        Football Analytics
      </h2>

      <Link to="/" className={`${styles.link} ${isActive("/") ? styles.active : ""}`}>
        <FaHome />
        Início
      </Link>

      <Link to="/tournaments" className={`${styles.link} ${isActive("/tournaments") ? styles.active : ""}`}>
        <FaTrophy />
        Torneios
      </Link>

      <Link to="/teams" className={`${styles.link} ${isActive("/teams") ? styles.active : ""}`}>
        <FaUsers />
        Times
      </Link>

      <Link to="/players" className={`${styles.link}`} >
        <FaFutbol />
        Jogadores
      </Link>
    </div>
  );
}