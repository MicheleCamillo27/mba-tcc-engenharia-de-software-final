import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import type { PlayerRadarChartProps } from "./types";


export default function PlayerRadarChart({ data }: PlayerRadarChartProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ResponsiveContainer width="90%" height="100%">
        <RadarChart data={data}>

          <PolarGrid stroke="#2a2a2a" />

          {/* LABELS*/}
          <PolarAngleAxis
            dataKey="metric"
            stroke="#a1a1a1"
            tick={{ fontSize: 16 }}
          />

          {/* ESCALA */}
          <PolarRadiusAxis
            stroke="#555"
            tick={{ fontSize: 20 }}
            axisLine={false}
          />

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "#fff"
            }}
          />

          {/* RADAR */}
          <Radar
            dataKey="value"
            stroke="#d4af37"
            fill="#d4af37"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}