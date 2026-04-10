import type { Heatmap } from "../../services/players/types";

export type HeatPoint = {
  x: number;
  y: number;
  value: number;
};
export interface HeatmapProps {
  data: Heatmap;
}


export type AnalysisResult = {
  profile: string;
  defensePct: number;
  midfieldPct: number;
  attackPct: number;
  avgX: number;
  avgY: number;
};

export type Zone = {
  name: string;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

export type D3Props = d3.Selection<SVGSVGElement | null, unknown, null, undefined>
