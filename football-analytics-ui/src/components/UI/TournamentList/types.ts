import type { Tournament } from "../../../services/tournaments/types";

export type TournamentListProps = {
  items: Tournament[];
  onClick?: (t: Tournament) => void;
};