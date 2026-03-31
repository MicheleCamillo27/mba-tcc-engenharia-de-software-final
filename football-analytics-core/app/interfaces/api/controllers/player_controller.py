from fastapi import APIRouter

from app.infrastructure.repositories.player_repository_json import PlayerRepositoryMockJson
from app.application.usecases.get_players import GetPlayersUseCase
from app.application.usecases.generate_radar_chart_data import GenerateRadarChartData
from app.application.usecases.generate_force_graph_data import GenerateForceGraphData
from app.application.usecases.generate_heatmap_data import GenerateHeatmapData

router = APIRouter(prefix="/players", tags=["players"])

repository = PlayerRepositoryMockJson()


@router.get("/")
def get_players():

    usecase = GetPlayersUseCase(repository)
    return usecase.execute()


@router.get("/graph/force")
def force_graph():

    players = GetPlayersUseCase(repository).execute()
    data = GenerateForceGraphData().execute(players)

    return data


@router.get("/graph/radar")
def radar_chart(player_name: str):

    return GenerateRadarChartData().execute(player_name)


@router.get("/graph/heatmap")
def heatmap(player_name: str):

    return GenerateHeatmapData().execute(player_name)
