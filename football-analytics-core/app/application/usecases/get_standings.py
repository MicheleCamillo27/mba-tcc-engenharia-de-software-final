from app.domain.repositories.standings_repository import StandingsRepository


class GetStandingsUseCase:

    def __init__(self, repository: StandingsRepository):
        self.repository = repository

    def execute(self):
        return self.repository.get_all_standings()