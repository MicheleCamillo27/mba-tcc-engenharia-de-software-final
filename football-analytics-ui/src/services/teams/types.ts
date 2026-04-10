
export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Team {
  id: number;
  name: string;
  nameCode: string;
  teamColors: TeamColors;
}

export interface TeamStanding {
  team: Team;
  position: number;
}
