import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { Card } from "../../components/UI/Card";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Input from "../../components/UI/Input";
import List from "../../components/UI/List";

import Breadcrumb from "../../components/UI/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import type { Player } from "../../services/players/types";
import { getTeamPlayers } from "../../services/teams/teamService";
import { saveBreadcrumbData } from "../../utils/navigationStorage";


export default function TeamsPlayers() {
  const items = useBreadcrumb();
  const location = useLocation();
  const navigate = useNavigate();

  const { tournamentId, seasonId, teamId } = useParams<{
    tournamentId: string;
    seasonId: string;
    teamId: string;
  }>();
  const parsedTeamId = teamId ? Number(teamId) : 0;
  const tournamentName = location.state?.name || "Torneio";

  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);


  function handleSearch(value: string) {
    const filtered = players.filter((player) =>
      player?.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPlayers(filtered);
  }

  function handlePlayerClick(playerId: number, playerName: string) {
    saveBreadcrumbData({
      playerName
    });

    navigate(
      `/tournaments/${tournamentId}/seasons/${seasonId}/teams/${teamId}/players/${playerId}`,
      {
        state: { playerName, tournamentName }
      }
    );
  }

  useEffect(() => {
    if (!parsedTeamId) return;

    async function fetchData() {
      try {

        const data = await getTeamPlayers(parsedTeamId);
        const sortedPlayers = [...data].sort((a, b) => a.name.localeCompare(b.name));

        setPlayers(sortedPlayers);
        setFilteredPlayers(sortedPlayers);

      } catch (err) {
        console.error("fetchData: ", err);
      }
    }

    fetchData();
  }, []);


  return (
    <Container>
      <Sidebar />

      <Content>
        <Breadcrumb items={items} />
        <Card>
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaSearch size={20} color="var(--accent)" />
              Buscar Jogador do time
            </h1>
          </div>

          <div style={{ maxWidth: "500px", marginBottom: "16px" }}>
            <Input
              placeholder="Digite o nome do jogador..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <List
            items={filteredPlayers || []}
            onClick={(player) => handlePlayerClick(player.id, player.name)}
          />
          {!filteredPlayers.length && 'Jogador não encontrado'}
        </Card>
      </Content>
    </Container>
  );
}