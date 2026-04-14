import math


def calculate_metric(stats: dict, weights: dict) -> float:
    value = 0

    for stat_name, weight in weights.items():
        stat_value = stats.get(stat_name, 0)
        value += stat_value * weight

    return value


def normalize(value: float) -> float:
    max_value = 20

    normalized = (value / max_value) * 100
    return min(round(normalized, 2), 100)

def normalize_impact(value: float) -> float:
    return min(math.log1p(value) / math.log1p(300) * 100, 100)