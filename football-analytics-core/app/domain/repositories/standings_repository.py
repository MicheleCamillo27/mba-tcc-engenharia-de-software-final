
from abc import ABC, abstractmethod
from typing import List
from app.domain.entities.standing import Standing


class StandingsRepository(ABC):

    @abstractmethod
    def get_all_standings(self) -> List[Standing]:
        pass