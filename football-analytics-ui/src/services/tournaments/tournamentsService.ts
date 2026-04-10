import { api } from "../api";

import type { Tournament } from "./types";

export async function getTournaments(): Promise<Tournament[]> {
  const response = await api.get("/tournaments");
  return response.data;
}

export async function getTournamentSeasons(tournamentId: number) {
  const response = await api.get(`/tournaments/${tournamentId}/seasons`);
  return response.data;
}

export async function getTournamentStandings(tournamentId: number,seasonId: number) {
  const response = await api.get(`/tournaments/${tournamentId}/seasons/${seasonId}/standings`);
  return response.data;
}