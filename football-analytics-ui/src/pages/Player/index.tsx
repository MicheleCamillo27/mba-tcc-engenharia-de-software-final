import { useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import { MdHeatPump } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";

import Heatmap from "../../components/Heatmap";
import { analyzePlayerProfile } from "../../components/Heatmap/analyzer";
import type { AnalysisResult } from "../../components/Heatmap/types";
import RadarChart from "../../components/RadarChart";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/UI/Breadcrumb";
import { Card, CardBody, CardHeader } from "../../components/UI/Card";
import Container from "../../components/UI/Container";
import Content from "../../components/UI/Content";
import Grid from "../../components/UI/Grid";
import PlayerProfileCard from "../../components/UI/PlayerProfileCard";
import ProgressBar from "../../components/UI/ProgressBar";

import { useBreadcrumb } from "../../hooks/useBreadcrumb";

import { getPlayerDetails, getPlayerHeatmap, getPlayerRadar } from "../../services/players/playerService";


export default function Player() {
  const {
    tournamentId,
    seasonId,
    playerId
  } = useParams<{
    tournamentId: string;
    seasonId: string;
    teamId: string;
    playerId: string;
  }>();

  const items = useBreadcrumb();
  const location = useLocation();
  const playerName = location.state?.playerName;

  const parsedPlayerId = playerId ? Number(playerId) : 0;
  const parsedTournamentId = tournamentId ? Number(tournamentId) : 0;
  const parsedSeasonId = seasonId ? Number(seasonId) : 0;


  const [radar, setRadar] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState<any>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [playerDetails, setPlayerDetails] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {

      if (!playerId || !playerName) return;

      try {
        setLoading(true);
        setError(null);

        const [radarRes, heatmapRes] = await Promise.all([
          getPlayerRadar(parsedPlayerId, parsedTournamentId, parsedSeasonId),
          getPlayerHeatmap(parsedPlayerId, parsedTournamentId, parsedSeasonId),
        ]);

        const formattedRadar = Object.keys(radarRes?.metrics || {}).map((key) => ({
          metric: key,
          value: radarRes.metrics[key],
        }));

        setRadar(formattedRadar);
        setHeatmap(heatmapRes);

        if (heatmapRes?.positions?.points?.length) {
          const result = analyzePlayerProfile(heatmapRes.positions.points);
          setAnalysis(result);
        } else { setAnalysis(null) }

      } catch (err) {
        console.error("fetchPlayerData: ", err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerData();
  }, [parsedPlayerId, playerName]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getPlayerDetails(parsedPlayerId);
        setPlayerDetails(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (parsedPlayerId) {
      fetchDetails();
    }
  }, [parsedPlayerId]);


  return (
    <Container>
      <Sidebar />

      <Content>
        <Breadcrumb items={items} />

        {playerDetails && (
          <Card>
            <PlayerProfileCard
              player={playerDetails}
              playerId={parsedPlayerId}
            />
          </Card>
        )}

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            {analysis && (
              <Card>
                <CardHeader>
                  <h2>Análise de Perfil</h2>
                </CardHeader>

                <div>
                  <h3 style={{ padding: "0.5em 0 0.5em 0" }}>{analysis.profile}</h3>
                  <ProgressBar label="Defesa" value={analysis.defensePct} />
                  <ProgressBar label="Meio-campo" value={analysis.midfieldPct} />
                  <ProgressBar label="Ataque" value={analysis.attackPct} />
                </div>
              </Card>
            )}

            <div style={{ padding: "0.7em" }}></div>

            <Grid columns={2}>

              <Card>
                <CardHeader>
                  <h2 style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <FaChartBar size={18} color="var(--accent)" />
                    Radar
                  </h2>
                </CardHeader>

                <CardBody>
                  {radar.length > 0 && <RadarChart data={radar} />}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h2 style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <MdHeatPump size={18} color="var(--accent)" />
                    Heatmap
                  </h2>
                </CardHeader>

                <CardBody>
                  {heatmap?.positions?.points?.length > 0 && (
                    <Heatmap data={heatmap} />
                  )}
                </CardBody>
              </Card>

            </Grid>
          </>
        )}

      </Content>
    </Container >
  );
}