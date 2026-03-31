import { useEffect, useState } from "react";
import { FaChartBar, FaFutbol } from "react-icons/fa";
import { MdHeatPump } from "react-icons/md";
import { useParams } from "react-router-dom";

import Heatmap from "../../components/Heatmap";
import RadarChart from "../../components/RadarChart";
import Sidebar from "../../components/Sidebar";
import { Card, CardBody, CardHeader } from "../../components/UI/Card";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Grid from "../../components/UI/Grid";

import { getPlayerHeatmap, getPlayerRadar } from "../../services/players/playerService";


export default function Player() {
  const { name } = useParams();

  const [radar, setRadar] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {

      if (!name) return;

      try {
        setLoading(true);
        setError(null);

        const [radarRes, heatmapRes] = await Promise.all([
          getPlayerRadar(name),
          getPlayerHeatmap(name),
        ]);

        const formattedRadar = Object.keys(radarRes?.metrics).map((key) => ({
          metric: key,
          value: radarRes.metrics[key],
        }));

        setRadar(formattedRadar);
        setHeatmap(heatmapRes);

      } catch (err) {
        console.error("fetchPlayerData", err);
        setError("Erro ao carregar dados do jogador.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerData();
  }, [name]);

  return (
    <Container>
      <Sidebar />

      <Content>
        <h1 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaFutbol size={20} color="var(--accent)" />
          {name}
        </h1>

        {loading && <p>Carregando dados...</p>}

        {error && <p style={{ color: "#ff4d4f" }}>{error}</p>}

        {!loading && !error && (
          <Grid columns={2}>
            <Card>
              <CardHeader>
                <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaChartBar size={20} color="var(--accent)" />
                  Radar
                </h2>
              </CardHeader>
              <CardBody>
                {radar?.length && <RadarChart data={radar} />}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MdHeatPump size={20} color="var(--accent)" />
                  Heatmap
                </h2>
              </CardHeader>
              <CardBody>
                {heatmap?.positions?.length && <Heatmap data={heatmap} />}
              </CardBody>
            </Card>
          </Grid>
        )}

      </Content>
    </Container>
  );
}