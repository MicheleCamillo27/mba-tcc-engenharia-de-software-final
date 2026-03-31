
import json
from typing import List
from pathlib import Path

from app.domain.entities.standing import Standing, Team, TeamColors
from app.domain.repositories.standings_repository import StandingsRepository


class StandingsRepositoryMockJson(StandingsRepository):

    def __init__(self):
        base_path = Path(__file__).resolve().parents[2]
        self.file_path = base_path / "data" / "brasileirao-serie-a-2026.json"

    def get_all_standings(self) -> List[Standing]:
        with open(self.file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        rows = data["standings"][0]["rows"]

        standings = []

        for row in rows:
            team_data = row["team"]

            team = Team(
                name=team_data["name"],
                nameCode=team_data["nameCode"],
                id=team_data["id"],
                teamColors=TeamColors(**team_data["teamColors"])
            )

            standings.append(
                Standing(
                    team=team,
                    position=row["position"]
                )
            )

        return standings