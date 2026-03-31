from datetime import datetime
from v1.api import SofaAPI

class Score:
    def __init__(self, version="v1", sport="football", timeUTC=None):
        self.version = version
        self.sport = sport
        self.now = timeUTC or datetime.utcnow()
        self.api = SofaAPI()

    def _format_date(self, date=None):
        date = date or self.now
        return date.strftime("%Y-%m-%d")
    
    # buscar linguagem
    def get_lang(self):
        return self.api.get(f"/api/{self.version}/country/alpha2")
    
    #  buscar tipos de esporte no pais
    def get_country(self):
        return self.api.get(f"/api/{self.version}/config/country-sport-priorities/country")

  # buscar relaçacao de caterogiras existemte exe: BRAZIL: id": 13
    def get_categories_all(self):
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/categories/all"
        )

    #  buscar tipos de esporte pelo pais
    def get_by_country(self, country="BR"):
        return self.api.get(f"/api/{self.version}/config/country-sport-priorities/country/{country}")
    
    #  buscar total de eventos no pais por esporte
    def get_event_count(self, count="-10800"):
        return self.api.get(f"/api/{self.version}/sport/{count}/event-count")

    # buscar torneios padrao existentes
    def unique_tournaments_football(self, lang="BR"):
        return self.api.get(
            f"/api/{self.version}/config/default-unique-tournaments/{lang}/football"
        )
    
    # buscar torneios pelo ID do pais (eid vem da api unique_tournaments_football)
    def unique_tournaments_country(self, countryId=325):
        return self.api.get(
            f"/api/{self.version}/unique-tournament/{countryId}"
        )

    # buscar torneios pelo ID do pais (eid vem da api unique_tournaments_football)
    def unique_tournaments_seasons_country(self, countryId=325):
        return self.api.get(
            f"/api/{self.version}/unique-tournament/{countryId}/seasons"
        )
    
    # buscar classificao do torneio pelo countryId e idSeason
    def unique_tournaments_seasons_standings_country(self, countryId=325, idSeason=87678):
        return self.api.get(
            f"/api/{self.version}/unique-tournament/{countryId}/season/{idSeason}/standings/total"
        )


    # Heatmap geral do jogador por torneio e temporada
    # Ex:
    # https://www.sofascore.com/api/v1/player/138833/unique-tournament/372/season/86993/heatmap/overall
    def player_heatmap_overall(self, player_id, tournament_id, season_id):
        return self.api.get(
            f"/api/{self.version}/player/{player_id}/unique-tournament/{tournament_id}/season/{season_id}/heatmap/overall"
        )


    def get_players_by_team(self, teamId=1957):
        return self.api.get(
            f"/api/{self.version}/team/{teamId}/players"
        )
    
    def get_players_info(self, teamId=1957):
        response = self.get_players_by_team(teamId)
        players = response.get("players", [])

        players_info = []

        # for p in players:
        #     player = p.get("player", {})
        #     team = player.get("team", {})
        #     tournament = team.get("primaryUniqueTournament", {})

        #     info = {
        #         "id": player.get("id"),
        #         "name": player.get("name"),
        #         "slug": player.get("slug"),
        #         "position": player.get("position"),
        #         "positions_detailed": player.get("positionsDetailed", []),
        #         "team_name": team.get("name"),
        #         "team_code": team.get("nameCode"),
        #         "championship_name": tournament.get("name"),
        #         "championship_id": tournament.get("id"),
        #         "championship_slug": tournament.get("slug"),
        #     }
        #     players_info.append(info)

        for p in players:
            player = p.get("player", {})
            team = player.get("team", {})
            tournament = team.get("primaryUniqueTournament", {})
            country = player.get("country", {})

            info = {
                "id": player.get("id"),
                "name": player.get("name"),
                "slug": player.get("slug"),
                "position": player.get("position"),
                "positions_detailed": player.get("positionsDetailed", []),
                "weight": player.get("weight"),
                "height": player.get("height"),
                "jersey_number": player.get("jerseyNumber"),
                "date_of_birth": player.get("dateOfBirth"),
                "preferred_foot": player.get("preferredFoot"),
                "user_count": player.get("userCount"),
                "deceased": player.get("deceased"),
                "gender": player.get("gender"),
                "sofascore_id": player.get("sofascoreId"),
                "country": {
                    "alpha2": country.get("alpha2"),
                    "alpha3": country.get("alpha3"),
                    "name": country.get("name"),
                    "slug": country.get("slug"),
                },
                "team_name": team.get("name"),
                "team_code": team.get("nameCode"),
                "championship_name": tournament.get("name"),
                "championship_id": tournament.get("id"),
                "championship_slug": tournament.get("slug"),
            }

            players_info.append(info)
        return players_info


    # DECOBRIR PRA QUE SERVER CADA CHAMADA

    def scheduled_events(self, date_event=None):
        date_event = date_event or self._format_date()
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/scheduled-events/{date_event}"
        )

    def odds_providers(self, lang="BR"):
        return self.api.get(
            f"/api/{self.version}/odds/providers/{lang}/web"
        )

   




   

    def today(self, date_event=None, count="-10800"):
        date_event = date_event or self._format_date()
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/{date_event}/{count}/categories"
        )

    def trending_top_players(self):
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/trending-top-players"
        )

    def odds_featured_events(self, page=1, date_event=None, rand="-10800"):
        date_event = date_event or self._format_date()
        return self.api.get(
            f"/api/{self.version}/odds/{page}/featured-events/{self.sport}/{date_event}/{rand}"
        )

    def fractional_odds(self, event, page=1):
        return self.api.get(
            f"/api/{self.version}/event/{event}/odds/{page}/featured"
        )

    def football_featured_events(self, page=1):
        return self.api.get(
            f"/api/{self.version}/odds/{page}/featured-events/football"
        )

    def heatmap(self, event, player):
        return self.api.get(
            f"/api/{self.version}/event/{event}/player/{player}/heatmap"
        )

    def featured_odds(self, event, page=1):
        return self.api.get(
            f"/api/{self.version}/event/{event}/odds/{page}/featured"
        )

    def all_data(self, event, page=1):
        return self.api.get(
            f"/api/{self.version}/event/{event}/odds/{page}/all"
        )

    def votes(self, event):
        return self.api.get(
            f"/api/{self.version}/event/{event}/votes"
        )

    def statistics(self, event):
        return self.api.get(
            f"/api/{self.version}/event/{event}/statistics"
        )

    def live_events(self):
        return self.api.get(
            f"/api/{self.version}/sport/{self.sport}/events/live"
        )

    def open_url(self, url):
        response = self.api.session.get(url)
        response.raise_for_status()
        return response.json()