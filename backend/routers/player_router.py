from fastapi import APIRouter
import BL.player_logic as PlayerLogic
from models.player_models import PlayerModel
from models.shared_models import IdTextModel

router = APIRouter(prefix="/Players")


@router.get("/GetAll", tags=["Player management"])
async def get_all() -> list[PlayerModel]:
    return await PlayerLogic.get_all()


@router.get("/GetById/{id}", tags=["Player management"])
async def get_player_by_id(id: str) -> PlayerModel:
    return await PlayerLogic.get_player_by_id(id)


@router.get("/GetGroupsByName/{name}", tags=["Player management"])
async def get_players_by_name(name: str) -> list[IdTextModel]:
    return await PlayerLogic.get_players_by_name(name)


@router.post("/Add", tags=["Player management"])
async def add_player(player: PlayerModel) -> None:
    return await PlayerLogic.add_player(player)


@router.put("/update/{id}", tags=["Player management"])
async def update_player(id: str, player: PlayerModel) -> None:
    return await PlayerLogic.update_player(id, player)


@router.delete("/delete/{id}", tags=["Player management"])
async def delete_player(id: str) -> None:
    return await PlayerLogic.delete_player(id)
