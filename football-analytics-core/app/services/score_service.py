from datetime import datetime

from app.services.api_service import SofaAPI
from app.transformers.tournament_transformer import normalize_tournaments


class Score:
    def __init__(self, version="v1", sport="football", timeUTC=None):
        self.version = version
        self.sport = sport
        self.now = timeUTC or datetime.utcnow()
        self.api = SofaAPI()

    def _format_date(self, date=None):
        date = date or self.now
        return date.strftime("%Y-%m-%d")


    # buscar relaçacao de caterogiras existemte exe: BRAZIL: id": 13
    def get_categories_all(self):
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/categories/all"
        )

    # buscar torneios pela ID da categoria football exe: BRAZIL: id": 13
    def tournaments_country(self, category_id=13):
        data = self.api.get(
            f"/api/{self.version}/category/{category_id}/unique-tournaments"
        )
        return normalize_tournaments(data)

    # buscar sessão de torneio pelo ID exe: Brasileiro Serie A id: 325
    def unique_tournaments_seasons(self, tournament_id=325):
        return self.api.get(
            f"/api/{self.version}/unique-tournament/{tournament_id}/seasons"
        )
    
    # buscar classificao do torneio pelo countryId e idSeason exe   Brasileiro Serie A 2026 -87678
    def unique_tournaments_seasons_standings_country(self, tournament_id=325, season_id=87678):
        return self.api.get(
            f"/api/{self.version}/unique-tournament/{tournament_id}/season/{season_id}/standings/total"
        )

    # buscar Times exe: Corinthians id: 1957
    def get_players_by_team(self, teamId=1957):
        return self.api.get(
            f"/api/{self.version}/team/{teamId}/players"
        )

    # buscar caracteristicas do jogador
    def player(self, player_id=950454):
        return self.api.get(
            f"/api/{self.version}/player/{player_id}"
        )
    
    # buscar mapa do jogador
    def player_heatmap_overall(self, player_id=950454, tournament_id=325, season_id=87678):
        return self.api.get(
            f"/api/{self.version}/player/{player_id}/unique-tournament/{tournament_id}/season/{season_id}/heatmap/overall"
        )
    
    # buscar estatistica do jogador
    def player_statistics_overall(self, player_id=950454, tournament_id=325, season_id=87678):
        return self.api.get(
            f"/api/{self.version}/player/{player_id}/unique-tournament/{tournament_id}/season/{season_id}/statistics/overall"
        )
    
