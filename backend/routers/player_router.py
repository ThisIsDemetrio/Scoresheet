from fastapi import APIRouter
import backend.BL.player_logic as PlayerLogic
from backend.models.player import Player
router = APIRouter()


@router.get("/players/GetAll", tags=["players"])
async def get_all() -> list[Player]:
    return PlayerLogic.get_all()


@router.get("/players/GetById/{id}", tags=["players"])
async def get_player_by_id(id: str) -> Player:
    return PlayerLogic.get_player_by_id(id)


@router.get("/players/FilterPlayers/{name}", tags=["players"])
async def filter_players(name: str) -> list[Player]:
    return PlayerLogic.get_players_by_name(name)


@router.post("/players/Add")
async def add_player(player: Player) -> None:
    return PlayerLogic.add_player(player)


@router.put("/players/update/{id}")
async def update_player(id: str, player: Player) -> None:
    return PlayerLogic.update_player(id, player)


@router.delete("/players/delete/{id}")
async def delete_player(id: str) -> None:
    return PlayerLogic.delete_player(id)
