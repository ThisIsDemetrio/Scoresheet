from fastapi import FastAPI
from backend.routers import game_router, group_router, player_router

app = FastAPI()

app.include_router(group_router.router)
app.include_router(player_router.router)
app.include_router(game_router.router)
