import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TeamCard from "../../components/TeamCard";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Grid from "../../components/UI/Grid";

import { getTournamentSeasons, getTournamentStandings } from "../../services/tournaments/tournamentsService";

import Breadcrumb from "../../components/UI/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { saveBreadcrumbData } from "../../utils/navigationStorage";
import styles from "./styles.module.css";

export default function TournamentDetails() {
  const { tournamentId } = useParams();
  const items = useBreadcrumb();
  const location = useLocation();
  const navigate = useNavigate();


  const tournamentName = location.state?.name || "Torneio";

  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [teams, setTeams] = useState<any[]>([]);

  function handleTeamClick(teamId: number, teamName: string) {
    saveBreadcrumbData({
      teamName
    });

    navigate(`/tournaments/${tournamentId}/seasons/${selectedSeason}/teams/${teamId}/players`, {
      state: { name: tournamentName }
    });
  }


  useEffect(() => {
    async function fetchSeasons() {
      try {
        if (!tournamentId) return;

        const res = await getTournamentSeasons(Number(tournamentId));
        const seasonsData = res.seasons || [];

        setSeasons(seasonsData);

        if (seasonsData.length > 0) {
          setSelectedSeason(seasonsData[0].id);
        }

      } catch (err) {
        console.error("Erro ao buscar seasons", err);
      }
    }

    fetchSeasons();
  }, [tournamentId]);


  useEffect(() => {
    async function fetchStandings() {
      try {
        if (!tournamentId || !selectedSeason) return;

        const res = await getTournamentStandings(Number(tournamentId), selectedSeason);

        const rows = res?.standings?.[0]?.rows || [];

        setTeams(rows);

      } catch (err) {
        console.error("Erro ao buscar standings", err);
      }
    }

    fetchStandings();
  }, [tournamentId, selectedSeason]);

  return (
    <Container>
      <Sidebar />

      <Content>
        <Breadcrumb items={items} />
        <h1 className={styles.title}>
          <FaTrophy size={20} color="var(--accent)" />
          {tournamentName}
        </h1>

        <div className={styles.seasons}>
          {seasons.map((s) => (
            <button
              key={s.id}
              className={`${styles.seasonBtn} ${selectedSeason === s.id ? styles.active : ""}`}
              onClick={() => setSelectedSeason(s.id)}
            >
              {s.year}
            </button>
          ))}
        </div>

        <Grid columns={4}>
          {teams.map((row) => (
            <TeamCard
              key={row.team.id}
              data={{
                team: row.team,
                position: row.position
              }}
              onClick={() => handleTeamClick(row.team.id, row.team.name)}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}