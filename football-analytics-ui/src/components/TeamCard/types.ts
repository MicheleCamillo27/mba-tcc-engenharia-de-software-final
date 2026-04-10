import type { TeamStanding } from "../../services/teams/types";

export interface TeamCardProps {
  data: TeamStanding;
  onClick?: () => void;
}