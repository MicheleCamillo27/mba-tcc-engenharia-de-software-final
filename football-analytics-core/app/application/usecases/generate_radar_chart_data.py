import random


class GenerateRadarChartData:

    def execute(self, player_name: str):

        return {
            "player": player_name,
            "metrics": {
                "finishing": random.randint(60, 95),
                "speed": random.randint(60, 95),
                "dribbling": random.randint(60, 95),
                "passing": random.randint(60, 95),
                "physical": random.randint(60, 95)
            }
        }