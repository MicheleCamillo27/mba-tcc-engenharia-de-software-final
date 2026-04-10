import { FaTrophy, FaUserAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import NavigationCard from "../../components/UI/NavigationCard";

import styles from "./style.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar />

      <Content>
        <div className={styles.wrapper}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Dashboard Futebol</h1>
            <p className={styles.subtitle}>
              Análise tática e desempenho de jogadores e times
            </p>
          </div>

          <div className={styles.cards}>
            <NavigationCard
              icon={<FaTrophy size={50} />}
              title="Torneios"
              description="Competições e campeonatos disponíveis"
              onClick={() => navigate("/tournaments")}
            />

            <NavigationCard
              icon={<FaUsers size={50} />}
              title="Times"
              description="Classificação, cores e elenco completo"
              onClick={() => navigate("/teams")}
            />

            <NavigationCard
              icon={<FaUserAlt size={50} />}
              title="Jogadores"
              description="Performance, radar e mapa de calor"
              onClick={() => navigate("/players")}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}