from fastapi import APIRouter
from fastapi.responses import Response

from app.application.usecases.get_standings import GetStandingsUseCase
from app.infrastructure.repositories.standings_repository_json import StandingsRepositoryMockJson

from app.services.teams_service import TeamService
from app.services.score_service import Score

from app.domain.entities.player import Player, Country


router = APIRouter(prefix="/teams", tags=["teams"])

service = TeamService()
score = Score(sport="football")
repository = StandingsRepositoryMockJson()


@router.get("/")
def get_standings():

    usecase = GetStandingsUseCase(repository)
    return usecase.execute()


@router.get("/{team_id}/image")
def get_team_image(team_id: int):

    content, content_type = service.get_team_image(team_id)

    return Response(content=content, media_type=content_type)


@router.get("/{team_id}/players")
def get_team_player(team_id: int = 1957):
    try:
        data = score.get_players_by_team(team_id)
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
    except Exception as e:
        return {"error": str(e)}