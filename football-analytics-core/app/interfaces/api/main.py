from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.interfaces.api.controllers.health_controller import router as health_router
from app.interfaces.api.controllers.player_controller import router as player_router
from app.interfaces.api.controllers.standings_controller import router as standings_router
from app.interfaces.api.controllers.teams_controller import router as teams_router


app = FastAPI(
    title="Football Analytics API",
    version="1.0"
)

# Habilitar CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(health_router)
app.include_router(standings_router)
app.include_router(teams_router)
app.include_router(player_router)
