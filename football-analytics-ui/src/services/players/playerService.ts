import { api } from "../api";

import type { Heatmap } from "./types";


export async function getPlayerDetails(playerId: number) {
  const response = await api.get(`/players/${playerId}`);
  return response.data;
}

export function getPlayerImage(playerId: number) {
  return `${api.defaults.baseURL}/players/${playerId}/image`;
}

export async function getPlayerHeatmap(playerId: number, tournamentId: number, seasonid: number): Promise<Heatmap> {
  const response = await api.get(`/players/${playerId}/tournament/${tournamentId}/seasons/${seasonid}/heatmap`);

  return response.data;
}

export async function getPlayerRadar(playerId: number, tournamentId: number, seasonid: number) {

  const response = await api.get(`/players/${playerId}/tournament/${tournamentId}/seasons/${seasonid}/statistics`);

  return response.data;
}