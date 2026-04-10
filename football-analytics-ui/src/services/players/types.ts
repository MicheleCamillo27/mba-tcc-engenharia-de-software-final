export interface Node {
  id: string;
  group: string;
}

export interface ForceResponse {
  nodes: Node[];
}

export interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  height: number;
  weight: number;
  preferred_foot: string;
  jersey_number: string;
  date_of_birth: string;
  country: Country;
}

export interface PlayersResponse {
  data: Player[];
}
export interface HeatmapPositionPoints {
  x: number;
  y: number;
  count: number;
}
export interface HeatmapPositions {
  points: HeatmapPositionPoints[];
  matches: number;
  events: any[];
}

export interface Heatmap {
  player_id: number;
  tournament_id: number;
  season_id: number;
  positions: HeatmapPositions;
}

