from fastapi import APIRouter
from fastapi.responses import Response

from app.domain.player.mapper import map_player_metrics
from app.domain.player.mapper import map_player_details
from app.services.score_service import Score
from app.services.player_service import PlayerService

router = APIRouter(prefix="/players", tags=["players"])

score = Score(sport="football")
service = PlayerService()

@router.get("/{player_id}")
def player(player_id: int = 950454):
    try:
        response = score.player(player_id)

        data = map_player_details(response)

        return data
    except Exception as e:
        return {"error": str(e)}

@router.get("/{player_id}/image")
def get_player_image(player_id: int = 950454):

    content, content_type = service.get_team_image(player_id)

    return Response(content=content, media_type=content_type)


@router.get("/{player_id}/tournament/{tournament_id}/seasons/{season_id}/heatmap")
def player_heatmap_overall(player_id: int = 950454, tournament_id: int = 325, season_id: int = 87678):
    try:
        data = score.player_heatmap_overall(player_id, tournament_id, season_id)
        return {
            "player_id": player_id,
            "tournament_id": tournament_id,
            "season_id": season_id,
            "positions": data
        }
    except Exception as e:
        return {"error": str(e)}


@router.get("/{player_id}/tournament/{tournament_id}/seasons/{season_id}/statistics")
def player_statistics_overall(player_id: int = 950454, tournament_id: int = 325, season_id: int = 87678):
    try:
        response = score.player_statistics_overall(player_id, tournament_id, season_id)
        stats = response["statistics"]
        metrics = map_player_metrics(stats)

        return {
            "player": player_id,
            "metrics": metrics
        }
    except Exception as e:
        return {"error": str(e)}
