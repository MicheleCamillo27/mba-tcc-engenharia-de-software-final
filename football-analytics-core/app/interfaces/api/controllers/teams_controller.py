# from fastapi import APIRouter, Depends

# from app.infrastructure.repositories.team_repository_mock import TeamRepositoryMock
# from app.application.usecases.get_teams import GetTeamsUseCase

# router = APIRouter(prefix="/teams", tags=["teams"])


# def get_repository():
#     return TeamRepositoryMock()


# @router.get("/")
# def get_teams(repository: TeamRepositoryMock = Depends(get_repository)):
#     usecase = GetTeamsUseCase(repository)
#     return usecase.execute()