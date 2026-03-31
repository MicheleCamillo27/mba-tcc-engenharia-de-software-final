from fastapi import APIRouter

from app.infrastructure.repositories.standings_repository_json import StandingsRepositoryMockJson
from app.application.usecases.get_standings import GetStandingsUseCase

router = APIRouter(prefix="/standings", tags=["standings"])

repository = StandingsRepositoryMockJson()


@router.get("/teams")
def get_standings():

    usecase = GetStandingsUseCase(repository)
    return usecase.execute()