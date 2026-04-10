import { useEffect, useState } from "react";
import { FaBirthdayCake, FaFutbol, FaRulerVertical, FaShoePrints } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { IoFlag } from "react-icons/io5";
import { MdSportsSoccer } from "react-icons/md";

import { getPlayerImage } from "../../../services/players/playerService";

import { positionMap, type PlayerProfileCardProps } from "./types";

import styles from "./styles.module.css";

export default function PlayerProfileCard({ player, playerId }: PlayerProfileCardProps) {

  const [image, setImage] = useState<any>();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getPlayerImage(playerId)
        setImage(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDetails()
  }, [playerId]);

  return (
    <div className={styles.container}>

      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={player.name}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <h2>{player.name}</h2>

        <div className={styles.grid}>

          <div className={styles.item}>
            <FaBirthdayCake />
            <div>
              <span>Idade</span>
              <strong>{player.age} anos</strong>
            </div>
          </div>

          <div className={styles.item}>
            <FaRulerVertical />
            <div>
              <span>Altura</span>
              <strong>{player.height} cm</strong>
            </div>
          </div>

          <div className={styles.item}>
            <MdSportsSoccer />
            <div>
              <span>Posição</span>
              <strong>{positionMap[player.position] || player.position}</strong>
            </div>
          </div>

          <div className={styles.item}>
            <FaFutbol />
            <div>
              <span>Camisa</span>
              <strong>{player.shirtNumber}</strong>
            </div>
          </div>

          <div className={styles.item}>
            <FaShoePrints />
            <div>
              <span>Pé</span>
              <strong>{player.preferredFoot === "Right" ? "Direito" : "Esquerdo"}</strong>
            </div>
          </div>

          <div className={styles.item}>
            <GiSoccerKick />
            <div>
              <span>Time</span>
              <strong>{player.team}</strong>
            </div>
          </div>

          <div className={styles.item}>
            <IoFlag />
            <div>
              <span>País</span>
              <strong>{player.country}</strong>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}