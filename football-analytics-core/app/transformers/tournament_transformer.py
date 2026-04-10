def normalize_tournaments(data):
    tournaments = []

    for group in data.get("groups", []):
        for tournament in group.get("uniqueTournaments", []):
            tournaments.append({
                "id": tournament.get("id"),
                "name": tournament.get("name"),
                "slug": tournament.get("slug"),
                "country": tournament.get("category", {}).get("name"),
                "sport": tournament.get("category", {}).get("sport", {}).get("name"),
                "userCount": tournament.get("userCount"),
            })

    return tournaments