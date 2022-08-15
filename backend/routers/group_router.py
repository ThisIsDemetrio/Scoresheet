from fastapi import APIRouter
from models.operation_response import OperationResponseModel
from models.group_models import JoinGroupModel, UpdateGroupModel
import BL.group_logic as GroupLogic

router = APIRouter(prefix="/Group")

# TODO: Add method to change password
# TODO: Add method to search group by name


@router.post("/Add", tags=["Group management"])
async def create_group(data: UpdateGroupModel) -> None:
    return GroupLogic.create_group(data.group, data.password)


@router.put("/update/{id}", tags=["Group management"])
async def update_group(id: str, group: UpdateGroupModel, password: str) -> None:
    return GroupLogic.update_group(id, group, password)


@router.post("/Join", tags=["Group management"])
async def join_group(data: JoinGroupModel) -> OperationResponseModel:
    return GroupLogic.join_group(data.playerId, data.groupId, data.password)


@router.post("/Leave/{groupId}", tags=["Group management"])
async def leave_group(groupId: str, playerId: str) -> None:
    return GroupLogic.leave_group(playerId, groupId)


@router.delete("/delete/{groupId}", tags=["Group management"])
async def delete_group(groupId: str, playerId: str) -> OperationResponseModel:
    return GroupLogic.delete_group(playerId, groupId)
