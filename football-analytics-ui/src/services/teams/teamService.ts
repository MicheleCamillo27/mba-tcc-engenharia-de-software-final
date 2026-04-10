import { api } from "../api";
import type { Player } from "../players/types";

import type { TeamStanding } from "./types";

export async function getTeams(): Promise<TeamStanding[]> {
  const response = await api.get<TeamStanding[]>("/teams");
  return response.data;
}

export function getTeamImage(teamId: number) {
  return `${api.defaults.baseURL}/teams/${teamId}/image`;
}

export async function getTeamPlayers(teamId: number): Promise<Player[]> {
  const response = await api.get<Player[]>(`/teams/${teamId}/players`);
  return response.data;
}