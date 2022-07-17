from fastapi import APIRouter
from models.game_models import Game
import BL.game_logic as GameLogic

router = APIRouter(prefix="/Game")


@router.get("/Get/{id}", tags=["Game management"])
async def create_game(id: str) -> list[Game]:
    return GameLogic.get_game_by_id(id)


@router.get("/GetByGroup/{groupId}", tags=["Game management"])
async def get_games_by_groupId(groupId: str) -> list[Game]:
    return GameLogic.get_games_by_groupId(groupId)


@router.post("/Create/{id}", tags=["Game management"])
async def create_game(id: str, playerId: str, password: str) -> None:
    return GameLogic.create_game(id)


@router.post("/Update/{id}", tags=["Game management"])
async def update_game(id: str) -> None:
    return GameLogic.update_game(id)


@router.delete("/delete/{id}", tags=["Game management"])
async def delete_game(id: str) -> None:
    return GameLogic.delete_game(id)
