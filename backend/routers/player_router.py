from fastapi import APIRouter
import backend.BL.player_logic as PlayerLogic
from backend.models.player import Player

router = APIRouter(prefix="/Players")


@router.get("/GetAll", tags=["players"])
async def get_all() -> list[Player]:
    return PlayerLogic.get_all()


@router.get("/GetById/{id}", tags=["players"])
async def get_player_by_id(id: str) -> Player:
    return PlayerLogic.get_player_by_id(id)


@router.get("/FilterPlayers/{name}", tags=["players"])
async def filter_players(name: str) -> list[Player]:
    return PlayerLogic.get_players_by_name(name)


@router.post("/Add")
async def add_player(player: Player) -> None:
    return PlayerLogic.add_player(player)


@router.put("/update/{id}")
async def update_player(id: str, player: Player) -> None:
    return PlayerLogic.update_player(id, player)


@router.delete("/delete/{id}")
async def delete_player(id: str) -> None:
    return PlayerLogic.delete_player(id)
