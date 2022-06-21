from fastapi import FastAPI

from backend.routers import group_router, player_router

app = FastAPI()

app.include_router(group_router.router)
app.include_router(player_router.router)
