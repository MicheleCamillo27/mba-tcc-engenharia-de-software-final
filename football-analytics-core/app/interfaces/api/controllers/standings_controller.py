from fastapi import APIRouter


from app.services.score_service import Score


router = APIRouter(prefix="/tournaments", tags=["tournaments"])
score = Score(sport="football")


@router.get("/")
def tournaments_country():
    try:
        data = score.tournaments_country()
        return data
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/{tournament_id}/seasons")
def unique_tournaments_seasons(tournament_id: int = 325):
    try:
        data = score.unique_tournaments_seasons(tournament_id)
        return data
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/{tournament_id}/seasons/{season_id}/standings")
def unique_tournaments_seasons_standings_country(tournament_id: int = 325, season_id: int = 8767):
    try:
        data = score.unique_tournaments_seasons_standings_country(tournament_id, season_id)
        return data
    except Exception as e:
        return {"error": str(e)}
        



