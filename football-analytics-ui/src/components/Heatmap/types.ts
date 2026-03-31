export interface HeatPoint {
  x: number;
  y: number;
  value: number;
}

export interface HeatmapResponse {
  player: string;
  positions: HeatPoint[];
}

export interface HeatmapResponseProps {
  data: HeatmapResponse;
}