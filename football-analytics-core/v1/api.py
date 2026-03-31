import requests


def is_json(response):
    try:
        return response.json()
    except Exception:
        return response.text


class SofaAPI:
    def __init__(self):
        self.base_url = "https://api.sofascore.com"
        self.session = requests.Session()

        self.headers = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "origin": "https://www.sofascore.com",
            "referer": "https://www.sofascore.com/",
            "user-agent": "Mozilla/5.0"
        }

        self.session.headers.update(self.headers)

    def get(self, endpoint):
        url = f"{self.base_url}{endpoint}"
        response = self.session.get(url)
        response.raise_for_status()
        return is_json(response)