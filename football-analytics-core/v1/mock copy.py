# import requests

# url = "https://webws.365scores.com/web/games/results/?langId=31&timezoneName=America/Sao_Paulo&userCountryId=-1&appTypeId=5&competitions=113"

# try:
#     response = requests.get(url)
#     response.raise_for_status()  # verifica erro HTTP
    
#     data = response.json()

#     for item in data.get("games", []):
#         home = item.get("homeCompetitor", {}).get("name")
#         away = item.get("awayCompetitor", {}).get("name")
#         print(f"{home} x {away}")

# except requests.exceptions.RequestException as e:
#     print("Erro na requisição:", e)

# import requests

# url = "https://webws.365scores.com/web/athletes/nextGame"

# params = {
#     "appTypeId": 5,
#     "langId": 31,
#     "timezoneName": "America/Sao_Paulo",
#     "userCountryId": 21,
#     "athletes": 9701,
#     "fullDetails": "true",
#     "topBookmaker": 161
# }

# headers = {
#     "accept": "*/*",
#     "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
#     "origin": "https://www.365scores.com",
#     "referer": "https://www.365scores.com/",
#     "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
# }

# response = requests.get(url, params=params, headers=headers)

# print(response.status_code)
# print(response.json())  # se for JSON