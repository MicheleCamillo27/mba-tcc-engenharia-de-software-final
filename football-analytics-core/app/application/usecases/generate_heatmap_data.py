import random


class GenerateHeatmapData:

    def execute(self, player_name):

        data = []

        for _ in range(50):
            data.append({
                "x": random.randint(0, 100),
                "y": random.randint(0, 100),
                "value": random.randint(1, 5)
            })

        return {
            "player": player_name,
            "positions": data
        }