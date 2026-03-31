import json
from typing import List
from pathlib import Path

from app.domain.entities.player import Player, Country
from app.domain.repositories.player_repository import PlayerRepository


class PlayerRepositoryMockJson(PlayerRepository):

    def __init__(self):
        base_path = Path(__file__).resolve().parents[2]
        self.file_path = base_path / "data" / "players-corinthians-2026.json"

    def get_all_players(self) -> List[Player]:

        with open(self.file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        players = []

        for item in data["players"]:
            p = item["player"]

            player = Player(
                id=p["id"],
                name=p["name"],
                position=p.get("position", ""),
                height=p.get("height", 0),
                weight=p.get("weight", 0),
                preferred_foot=p.get("preferredFoot", ""),
                jersey_number=p.get("jerseyNumber", ""),
                date_of_birth=p.get("dateOfBirth", ""),
                country=Country(
                    name=p["country"]["name"],
                    alpha2=p["country"]["alpha2"],
                    alpha3=p["country"]["alpha3"]
                )
            )

            players.append(player)

        return players