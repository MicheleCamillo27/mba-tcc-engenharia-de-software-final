from score import Score
from heatmap_plot import plot_heatmap


if __name__ == "__main__":
    score = Score(sport="football")

    # Ex: https://www.sofascore.com/api/v1/country/alpha2
    # print("get_lang")
    # print(score.get_lang())

    # Ex: https://www.sofascore.com/api/v1/config/country-sport-priorities/country
    # print("get_country")
    # print(score.get_country())


    # Ex:  https://www.sofascore.com/api/v1/sport/football/categories/all
    # print("get_categories_all")
    # print(score.get_categories_all())

    # Ex: https://www.sofascore.com/api/v1/config/country-sport-priorities/country
    # print("get_by_country")
    # print(score.get_by_country())

    # https://www.sofascore.com/api/v1/config/default-unique-tournaments/BR/football
    # print("unique_tournaments_football")
    # print(score.unique_tournaments_football())
   
    # https://www.sofascore.com/api/v1/unique-tournament/325
    # print("unique_tournaments_country")
    # print(score.unique_tournaments_country(325))

    # https://www.sofascore.com/api/v1/unique-tournament/325/seasons
    # print("unique_tournaments_seasons_country")
    # print(score.unique_tournaments_seasons_country(325))

    # https://www.sofascore.com/api/v1/unique-tournament/325/season/87678/standings/total
    # print("unique_tournaments_seasons_standings_country")
    # print(score.unique_tournaments_seasons_standings_country(325, 87678))


    # Rodada do campeonato
    # https://www.sofascore.com/api/v1/unique-tournament/325/season/87678/rounds
    
    # partidas pelo rodada
    # https://www.sofascore.com/api/v1/unique-tournament/325/season/87678/events/round/4



    # Busca informacoes do campeonato
    # https://www.sofascore.com/api/v1/tournament/83/season/87678/standings/total

    # buscar time
    # https://www.sofascore.com/api/v1/team/1957

    # buscar jogadores pelo time 
    # https://www.sofascore.com/api/v1/team/1957/players


    print("get_players_by_team")
    # print(score.get_players_by_team(1957))
    players = score.get_players_info(teamId=1957)

    print(players)
    # for p in players:
    #     print(p)


# -------------------------------------------------
    player_id = 138833
    tournament_id = 372
    season_id = 86993

    print("Buscando heatmap...")

    data = score.player_heatmap_overall(
        player_id,
        tournament_id,
        season_id
    )

    # plot_heatmap(
    #     data,
    #     player_name="Neymar Jr.",
    #     competition="Brasileirão",
    #     season="2026",
    #     filename="heatmap_espn_style.png"
    # )

    # modelo 2
    plot_heatmap(
        data,
        title="Heatmap do Jogador",
        filename="heatmap_espn_style.png"
    )






    # https://www.sofascore.com/api/v1/sofascore-news/pt/posts?page=1&per_page=12&categories=news-pt
    # print("statistics")
    # print(score.statistics(12117219))

    # print("🔴 Jogos ao vivo:")
    # print(score.live_events())

    # print("\n📅 Jogos agendados:")
    # print(score.scheduled_events())