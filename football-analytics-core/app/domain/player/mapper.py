from datetime import datetime

from app.domain.player.weights import PLAYER_WEIGHTS
from app.domain.player.calculator import calculate_metric, normalize


def map_player_metrics(stats: dict) -> dict:
    result = {}

    for metric_name, weights in PLAYER_WEIGHTS.items():
        raw_value = calculate_metric(stats, weights)
        result[metric_name] = normalize(raw_value)

    return result


def calculate_age(timestamp: int) -> int:
    birth_date = datetime.fromtimestamp(timestamp)
    today = datetime.today()
    return today.year - birth_date.year - (
        (today.month, today.day) < (birth_date.month, birth_date.day)
    )


def map_player_details(response: dict):
    player = response.get("player", {})

    return {
        "id": player.get("id"),
        "name": player.get("name"),
        "shortName": player.get("shortName"),
        "age": calculate_age(player.get("dateOfBirthTimestamp")),
        "height": player.get("height"),
        "preferredFoot": player.get("preferredFoot"),
        "position": player.get("position"),
        "shirtNumber": player.get("shirtNumber"),
        "team": player.get("team", {}).get("name"),
        "country": player.get("country", {}).get("name"),
    }