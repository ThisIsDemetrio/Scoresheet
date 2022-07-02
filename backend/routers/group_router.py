from tokenize import group
from fastapi import APIRouter
from backend.models.delete_group_response import DeleteGroupResponse
from backend.models.group_models import Group
from backend.models.player_models import PlayerModel
import backend.BL.group_logic as GroupLogic

router = APIRouter(prefix="/Group")


@router.post("/Add", tags=["Group management"])
async def create_group(group: Group, password: str) -> None:
    return GroupLogic.create_group(group, password)


@router.put("/update/{id}", tags=["Group management"])
async def update_group(id: str, group: Group, password: str) -> None:
    return GroupLogic.update_group(id, group, password)


@router.get("/GetPlayers/{id}", tags=["Group management"])
async def get_players_in_group(id: str) -> list[PlayerModel]:
    return GroupLogic.get_players_in_group(id)


@router.post("/Join/{groupId}", tags=["Group management"])
async def join_group(groupId: str, playerId: str, password: str) -> None:
    return GroupLogic.join_group(playerId, groupId, password)


@router.post("/Leave/{groupId}", tags=["Group management"])
async def leave_group(groupId: str, playerId: str) -> None:
    return GroupLogic.leave_group(playerId, groupId)


@router.delete("/delete/{groupId}", tags=["Group management"])
async def delete_group(groupId: str, playerId: str) -> DeleteGroupResponse:
    return GroupLogic.delete_group(playerId, groupId)
