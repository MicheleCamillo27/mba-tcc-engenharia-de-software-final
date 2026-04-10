import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/UI/Breadcrumb";
import { Card } from "../../components/UI/Card";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Input from "../../components/UI/Input";
import TournamentList from "../../components/UI/TournamentList";


import { getTournaments } from "../../services/tournaments/tournamentsService";
import type { Tournament } from "../../services/tournaments/types";

import { useBreadcrumb } from "../../hooks/useBreadcrumb";


import { saveBreadcrumbData } from "../../utils/navigationStorage";
import styles from "./styles.module.css";


export default function Tournaments() {
  const navigate = useNavigate();
  const items = useBreadcrumb();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filtered, setFiltered] = useState<Tournament[]>([]);

  function handleSearch(value: string) {
    const result = tournaments.filter((t) =>
      t.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  }

  function handleClick(tournament: Tournament) {
    saveBreadcrumbData({
      tournamentName: tournament.name
    });

    navigate(`/tournaments/${tournament.id}`, {
      state: { name: tournament.name }
    });
  }

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getTournaments();

        const sorted = [...data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setTournaments(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error(err);
      }
    }

    fetch();
  }, []);

  return (
    <Container>
      <Sidebar />

      <Content>
        <Breadcrumb items={items} />
        <Card>
          <div className={styles.header}>
            <h1>
              <FaTrophy size={20} color="var(--accent)" />
              Torneios
            </h1>
          </div>

          <div className={styles.search}>
            <Input
              placeholder="Buscar torneio..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <TournamentList
            items={filtered}
            onClick={handleClick}
          />
        </Card>
      </Content>
    </Container>
  );
}