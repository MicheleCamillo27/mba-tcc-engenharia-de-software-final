import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { Card } from "../../components/UI/Card";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Input from "../../components/UI/Input";
import List from "../../components/UI/List";

import { getPlayers } from "../../services/players/playerService";
import type { Player } from "../../services/players/types";


export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPlayers();

        const sortedPlayers = [...data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setPlayers(sortedPlayers);
        setFilteredPlayers(sortedPlayers);

      } catch (err) {
        console.error("fetchData: ", err);
      }
    }

    fetchData();
  }, []);

  function handleSearch(value: string) {
    const filtered = players.filter((player) =>
      player?.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPlayers(filtered);
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <Card>
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaSearch size={20} color="var(--accent)" />
              Buscar Jogador
            </h1>
          </div>

          <div style={{ maxWidth: "500px", marginBottom: "16px" }}>
            <Input
              placeholder="Digite o nome do jogador..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <List
            items={filteredPlayers?.map((p) => p.name)}
            onClick={(name) => navigate(`/player/${name}`)}
          />
        </Card>
      </Content>
    </Container>
  );
}