from fastapi import FastAPI

from backend.routers import player_router

app = FastAPI()

app.include_router(player_router.router)
