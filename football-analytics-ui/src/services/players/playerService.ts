import { api } from "../api";

import type { Player } from "./types";


export async function getPlayers(): Promise<Player[]> {
  const response = await api.get<Player[]>("/players");
  return response.data;
}

export async function getPlayer(): Promise<Player> {
  const response = await api.get<Player>("/player");
  return response.data;
}

export async function getPlayerRadar(playerName: string) {
  const encoded = encodeURIComponent(playerName);

  const response = await api.get(`/players/graph/radar?player_name=${encoded}`);

  return response.data;
}

export async function getPlayerHeatmap(playerName: string) {
  const encoded = encodeURIComponent(playerName);

  const response = await api.get(`/players/graph/heatmap?player_name=${encoded}`);

  return response.data;
}