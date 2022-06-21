from tokenize import group
from fastapi import APIRouter
from backend.models.delete_group_response import DeleteGroupResponse
from backend.models.group import Group
from backend.models.player import Player
import backend.BL.group_logic as GroupLogic

router = APIRouter(prefix="/group")


@router.post("/Add")
async def create_group(group: Group, password: str) -> None:
    return GroupLogic.create_group(group, password)


@router.put("/update/{id}")
async def update_group(id: str, group: Group, password: str) -> None:
    return GroupLogic.update_group(id, group, password)


@router.get("/GetPlayers/{id}")
async def get_players_in_group(id: str) -> list[Player]:
    return GroupLogic.get_players_in_group(id)


@router.post("/Join/{groupId}")
async def join_group(groupId: str, playerId: str, password: str) -> None:
    return GroupLogic.join_group(playerId, groupId, password)


@router.post("/Leave/{groupId}")
async def leave_group(groupId: str, playerId: str) -> None:
    return GroupLogic.leave_group(playerId, groupId)


@router.delete("/delete/{groupId}")
async def delete_group(groupId: str, playerId: str) -> DeleteGroupResponse:
    return GroupLogic.delete_group(playerId, groupId)
