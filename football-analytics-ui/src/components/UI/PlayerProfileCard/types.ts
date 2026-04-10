export type PlayerProfileCardProps = {
  player: {
    name: string;
    age: number;
    height: number;
    preferredFoot: string;
    position: string;
    shirtNumber: number;
    team: string;
    country: string;
  };
  playerId: number;
};

export const positionMap: any = {
  G: "Goleiro",
  D: "Defensor",
  M: "Meio-campo",
  F: "Atacante"
};