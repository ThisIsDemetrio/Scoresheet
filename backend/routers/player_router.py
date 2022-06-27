from fastapi import APIRouter
import backend.BL.player_logic as PlayerLogic
from backend.models.player_models import Player

router = APIRouter(prefix="/Players")


@router.get("/GetAll", tags=["Player management"])
async def get_all() -> list[Player]:
    return await PlayerLogic.get_all()


@router.get("/GetById/{id}", tags=["Player management"])
async def get_player_by_id(id: str) -> Player:
    return await PlayerLogic.get_player_by_id(id)


@router.get("/FilterPlayers/{name}", tags=["Player management"])
async def filter_players(name: str) -> list[Player]:
    return await PlayerLogic.get_players_by_name(name)


@router.post("/Add", tags=["Player management"])
async def add_player(player: Player) -> None:
    return await PlayerLogic.add_player(player)


@router.put("/update/{id}", tags=["Player management"])
async def update_player(id: str, player: Player) -> None:
    return await PlayerLogic.update_player(id, player)


@router.delete("/delete/{id}", tags=["Player management"])
async def delete_player(id: str) -> None:
    return await PlayerLogic.delete_player(id)
