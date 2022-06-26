from fastapi import APIRouter
from backend.models.game import Game
import backend.BL.game_logic as GameLogic

router = APIRouter(prefix="/Game")


@router.get("/Get/{id}")
async def create_game(id: str) -> list[Game]:
    return GameLogic.get_game_by_id(id)


@router.get("/GetByGroup/{groupId}")
async def get_games_by_groupId(groupId: str) -> list[Game]:
    return GameLogic.get_games_by_groupId(groupId)


@router.post("/Create/{id}")
async def create_game(id: str, playerId: str, password: str) -> None:
    return GameLogic.create_game(id)


@router.post("/Update/{id}")
async def update_game(id: str) -> None:
    return GameLogic.update_game(id)


@router.delete("/delete/{id}")
async def delete_game(id: str) -> None:
    return GameLogic.delete_game(id)
