def calculate_metric(stats: dict, weights: dict) -> float:
    value = 0

    for stat_name, weight in weights.items():
        stat_value = stats.get(stat_name, 0)
        value += stat_value * weight

    return value


def normalize(value: float) -> int:
    return max(0, min(99, int(value)))