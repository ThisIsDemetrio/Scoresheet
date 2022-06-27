import uuid
from backend.models.delete_group_response import DeleteGroupReasonCode, DeleteGroupResponse
from backend.models.group_models import Group, GroupParticipant
from backend.BL import player_logic
from backend.database import groups_collection
from bson.objectid import ObjectId
import pydash

from backend.models.player_models import Player
from backend.utils.utils import hashString

# TODO: Create DB connection
groups: list[Group] = [
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


async def get_group_by_id(id: str) -> Player:
    return await groups_collection.find_one({"_id": ObjectId(id)})


async def create_group(group: Group, password: str) -> None:
    if (group.id is not None):
        await update_group(group)

    group.password = hashString(password)
    await groups_collection.insert_one(group)


async def update_group(id: str, groupToUpdate: Group, password: str) -> None:
    if (len(groupToUpdate) < 1):
        raise Exception("Data not valid")

    group = await get_group_by_id(id)
    if (group.password != hashString(password)):
        raise Exception("Password not valid")

    if (groupToUpdate.password == ""):
        groupToUpdate.password = group.password
    await groups_collection.update_one({"_id": ObjectId(id)}, {"$set": group})


async def get_players_in_group(id: str) -> list[Player]:
    group: Group = groups_collection.find_one({"_id": ObjectId(id)})
    playerIds: list[str] = []
    for participant in group.participants:
        playerIds.append(participant.playerId)
    return await player_logic.get_players_by_name(playerIds)


async def join_group(playerId: str, groupId: str, password: str) -> None:
    # index = groups.index(group for group in groups if group.id == id)
    groupToJoin = await get_group_by_id(groupId)
    if (groupToJoin.password != hashString(password)):
        raise Exception("Password not valid")

    playerInGroup = pydash.find(
        groupToJoin.participants, lambda player: player.id == playerId)
    if (playerInGroup is None):
        participant = GroupParticipant()
        participant.playerId = playerId
        participant.isActive = True
        groupToJoin.participants.append(participant)
    else:
        playerInGroup.isActive = True

    await groups_collection.update_one({"_id": groupToJoin._id}, {"$set": groupToJoin})


async def leave_group(playerId: str, groupId: str) -> None:
    groupToLeave = await get_group_by_id(groupId)
    if (groupToLeave.creatorId == playerId):
        raise Exception("You can leave the group you created")

    playerInGroup = pydash.find(
        groupToLeave.participants, lambda player: player.id == playerId)
    playerInGroup.isActive = False
    await groups_collection.update_one({"_id": groupToLeave._id}, {"$set": groupToLeave})


async def delete_group(playerId: str, groupId: str) -> DeleteGroupResponse:
    groupToRemove = await get_group_by_id(groupId)

    result = DeleteGroupResponse()
    canDelete = len(
        groupToRemove.participants) == 1 and groupToRemove.creatorId == playerId

    if (not canDelete):
        result.success = False
        result.reasonCode = DeleteGroupReasonCode.GroupNotEmpty
    else:
        groups_collection.delete_one({"_id": ObjectId(groupId)})
        result.success = True
        result.reasonCode = DeleteGroupReasonCode.Success

    return result
