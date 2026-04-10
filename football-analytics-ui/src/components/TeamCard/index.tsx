import { getTeamImage } from "../../services/teams/teamService";
import { CardBase } from "../UI/Cardbase/CardBase";

import styles from "./style.module.css";

import type { TeamCardProps } from "./types";

export default function TeamCard({ data, onClick }: TeamCardProps) {

  const { team, position } = data;

  return (
    <CardBase onClick={onClick}>
      <div className={styles.position}>{position}º</div>
      <img src={getTeamImage(team.id)} alt={team.name} className={styles.logo} />
      <h2 className={styles.name}>{team.name}</h2>
      <span className={styles.code}>{team.nameCode}</span>
      <div
        className={styles.colorBar}
        style={{
          background: `linear-gradient(90deg, ${team.teamColors.primary}, ${team.teamColors.secondary})`
        }}
      />
    </CardBase>
  );
}