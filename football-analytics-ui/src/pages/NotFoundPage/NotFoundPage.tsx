import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";

import { CardBase } from "../../components/UI/Cardbase/CardBase";

import styles from "./styles.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <div className={styles.wrapper}>
          <CardBase style={{ padding: "60px 40px" }}>
            <FaExclamationTriangle size={60} style={{ color: "var(--accent)" }} />
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>
              Ops! A página que você está procurando não existe.
            </p>
            <button
              className={styles.button}
              onClick={() => navigate("/")}
            >
              Voltar para o Dashboard
            </button>
          </CardBase>
        </div>
      </Content>
    </Container>
  );
}