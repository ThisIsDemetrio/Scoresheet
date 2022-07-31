from mapping.group_mapping import map_to_GroupModel, map_from_GroupModel
from models.operation_response import OperationReasonCode, OperationResponseModel
from models.group_models import GroupModel, GroupParticipantModel
from BL import player_logic
from database import groups_collection
from bson.objectid import ObjectId
import pydash

from models.player_models import PlayerModel
from utils.utils import hashString

# TODO: Create DB connection
groups: list[GroupModel] = [
    {
        "id": "group01",
        "name": "Scrabble Group",
        "avatarUrl": "scrabble",
        "participants": [
            {"id": "1", "isActive": True},
            {"id": "2", "isActive": True},
            {"id": "3", "isActive": True},
            {"id": "4", "isActive": True}
        ]
    }
]

# TODO: Add mappings


async def get_group_by_id(id: str) -> PlayerModel:
    group: dict = await groups_collection.find_one({"id": id})
    return map_to_GroupModel(group)


async def create_group(group: GroupModel, password: str) -> None:
    if (group.id is not None):
        await update_group(group)

    group.password = hashString(password)
    await groups_collection.insert_one(map_from_GroupModel(group))


async def update_group(id: str, groupToUpdate: GroupModel, password: str) -> None:
    groupDb = await get_group_by_id(id)
    group: GroupModel = map_to_GroupModel(groupDb)

    if (group.password != hashString(password)):
        raise Exception("Password not valid")

    if (groupToUpdate.password == ""):
        groupToUpdate.password = group.password

    groupToSave = map_from_GroupModel(groupToUpdate)
    await groups_collection.update_one({"id": id}, {"$set": groupToSave})


async def join_group(playerId: str, groupId: str, password: str) -> None:
    # index = groups.index(group for group in groups if group.id == id)
    groupToJoin = await get_group_by_id(groupId)
    if (groupToJoin.password != hashString(password)):
        raise Exception("Password not valid")

    playerInGroup = pydash.find(
        groupToJoin.participants, lambda player: player.id == playerId)
    if (playerInGroup is None):
        participant = GroupParticipantModel()
        participant.playerId = playerId
        groupToJoin.participants.append(participant)
        playerInGroup.isActive = True

    playerInGroup.isActive = True
    await groups_collection.update_one({"id": groupToJoin.id}, {"$set": map_to_GroupModel(groupToJoin)})


async def leave_group(playerId: str, groupId: str) -> None:
    groupToLeave = await get_group_by_id(groupId)
    if (groupToLeave.creatorId == playerId):
        raise Exception("You can leave the group you created")

    playerInGroup = pydash.find(
        groupToLeave.participants, lambda player: player.id == playerId)
    playerInGroup.isActive = False
    await groups_collection.update_one({"id": groupToLeave.id}, {"$set": map_to_GroupModel(groupToLeave)})


async def delete_group(playerId: str, groupId: str) -> OperationResponseModel:
    groupToRemove = await get_group_by_id(groupId)

    result = OperationResponseModel()
    canDelete = len(
        groupToRemove.participants) == 1 and groupToRemove.creatorId == playerId

    if (not canDelete):
        result.success = False
        result.reasonCode = OperationReasonCode.GroupNotEmpty
    else:
        groups_collection.delete_one({"id": groupId})
        result.success = True
        result.reasonCode = OperationReasonCode.Success

    return result
