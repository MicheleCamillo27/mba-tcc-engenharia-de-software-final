import type { HeatmapPositionPoints } from "../../services/players/types";
import type { AnalysisResult } from "./types";


export function analyzePlayerProfile(positions: HeatmapPositionPoints[] = []): AnalysisResult {

  if (!positions.length) {
    console.log("[AnalyzePlayerProfile] Sem dados para analize")
    return {
      profile: "Sem dados",
      defensePct: 0,
      midfieldPct: 0,
      attackPct: 0,
      avgX: 0,
      avgY: 0
    };
  }

  let defense = 0;
  let midfield = 0;
  let attack = 0;
  let total = 0;

  positions.forEach((p) => {
    total += p.count;

    if (p.x < 33) defense += p.count;
    else if (p.x < 66) midfield += p.count;
    else attack += p.count;
  });

  const defensePct = (defense / total) * 100;
  const midfieldPct = (midfield / total) * 100;
  const attackPct = (attack / total) * 100;

  const avgX =
    positions.reduce((sum, p) => sum + p.x * p.count, 0) / total;

  const avgY =
    positions.reduce((sum, p) => sum + p.y * p.count, 0) / total;

  const isGoalkeeper =
    defensePct > 65 &&
    attackPct < 10 &&
    avgX < 30;

  let profile = "Indefinido";

  if (isGoalkeeper) profile = "Goleiro";
  else if (defensePct > midfieldPct && defensePct > attackPct) profile = "Defensor";
  else if (midfieldPct > defensePct && midfieldPct > attackPct) profile = "Meio-campista";
  else if (attackPct > defensePct && attackPct > midfieldPct) profile = "Atacante";

  return {
    profile,
    defensePct,
    midfieldPct,
    attackPct,
    avgX,
    avgY
  };
}