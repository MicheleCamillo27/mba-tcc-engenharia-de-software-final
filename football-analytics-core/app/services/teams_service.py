import requests


class TeamService:

    def __init__(self):
        self.session = requests.Session()

        self.headers = {
            "accept": "*/*",
            "cache-control": "max-age=0",
        }

        self.session.headers.update(self.headers)

        self.base_url = "https://img.sofascore.com/api/v1/team"

    def get_team_image(self, team_id: int):

        url = f"{self.base_url}/{team_id}/image"

        response = self.session.get(url)
        response.raise_for_status()

        content_type = response.headers.get("content-type", "image/png")

        return response.content, content_type