import { useLocation, useParams } from "react-router-dom";
import { getBreadcrumbData } from "../utils/navigationStorage";

export function useBreadcrumb() {
  const location = useLocation();
  const params = useParams();

  const storageData = getBreadcrumbData();

  const state = location.state || {};

  const breadcrumb = [];

  // base
  breadcrumb.push({
    label: "Torneios",
    path: "/tournaments"
  });

  // tournament
  if (params.tournamentId) {
    const name =
      state.tournamentName ||
      storageData.tournamentName ||
      `Torneio ${params.tournamentId}`;

    breadcrumb.push({
      label: name,
      path: `/tournaments/${params.tournamentId}`
    });
  }

  // season
  if (params.seasonId) {
    breadcrumb.push({
      label: `Temporada ${params.seasonId}`
    });
  }

  // team
  if (params.teamId) {
    const teamName =
      state.teamName ||
      storageData.teamName ||
      `Time ${params.teamId}`;

    breadcrumb.push({
      label: teamName,
      path: `/tournaments/${params.tournamentId}/seasons/${params.seasonId}/teams/${params.teamId}/players`
    });
  }

  // player
  if (params.playerId) {
    const playerName =
      state.playerName ||
      storageData.playerName ||
      `Jogador ${params.playerId}`;

    breadcrumb.push({
      label: playerName
    });
  }

  return breadcrumb;
}