import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TeamCard from "../../components/TeamCard";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Grid from "../../components/UI/Grid";

import { getTeams } from "../../services/teams/teamService";
import type { TeamStanding } from "../../services/teams/types";

import styles from "./styles.module.css";


export default function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState<TeamStanding[]>([]);

  function handleTeamClick(teamId: number) {
    navigate(`/teams/${teamId}/players`);
  }

  useEffect(() => {
    async function fetchTeams() {
      try {
        const data = await getTeams();

        const sorted = [...data].sort((a, b) => a.position - b.position);

        setTeams(sorted);
      } catch (err) {
        console.error("Erro ao buscar times", err);
      }
    }

    fetchTeams();
  }, []);

  return (
    <Container>
      <Sidebar />

      <Content>
        <h1 className={styles.title}>
          <FaUsers size={20} color="var(--accent)" />
          Times
        </h1>

        <Grid columns={4}>
          {teams.map((team) => (
            <TeamCard key={team.team.id} data={team} onClick={() => handleTeamClick(team.team.id)} />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}