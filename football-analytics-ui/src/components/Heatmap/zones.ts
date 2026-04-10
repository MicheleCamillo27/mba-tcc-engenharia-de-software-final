import type { HeatmapPositionPoints } from "../../services/players/types";
import type { Zone } from "./types";


export const zones: Zone[] = [
  // Defesa
  { name: "Defesa Esq", xStart: 0, xEnd: 33, yStart: 66, yEnd: 100 },
  { name: "Defesa Centro", xStart: 33, xEnd: 66, yStart: 66, yEnd: 100 },
  { name: "Defesa Dir", xStart: 66, xEnd: 100, yStart: 66, yEnd: 100 },

  // Meio
  { name: "Meio Esq", xStart: 0, xEnd: 33, yStart: 33, yEnd: 66 },
  { name: "Meio Centro", xStart: 33, xEnd: 66, yStart: 33, yEnd: 66 },
  { name: "Meio Dir", xStart: 66, xEnd: 100, yStart: 33, yEnd: 66 },

  // Ataque
  { name: "Ataque Esq", xStart: 0, xEnd: 33, yStart: 0, yEnd: 33 },
  { name: "Ataque Centro", xStart: 33, xEnd: 66, yStart: 0, yEnd: 33 },
  { name: "Ataque Dir", xStart: 66, xEnd: 100, yStart: 0, yEnd: 33 },
];

export function calculateZones(positions: HeatmapPositionPoints[]) {
  const zonesCalculated = zones.map(zone => {
    const total = positions
      .filter(p =>
        p.x >= zone.xStart &&
        p.x < zone.xEnd &&
        p.y >= zone.yStart &&
        p.y < zone.yEnd
      )
      .reduce((sum, p) =>  sum + (p.count ?? 0), 0);

    return {
      ...zone,
      value: total
    };
  });

  const totalGlobal = zonesCalculated.reduce((sum, z) => sum + z.value, 0);

  return zonesCalculated.map(z => ({
    ...z,
    percentage: totalGlobal
      ? Number(((z.value / totalGlobal) * 100).toFixed(1))
      : 0
  }));
}