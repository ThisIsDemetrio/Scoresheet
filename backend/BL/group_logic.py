from mapping.group_mapping import map_from_GroupModel_and_password, map_to_GroupModel, map_to_GroupWithPasswordModel, map_to_IdTextModel
from models.group_models import GroupModel, GroupWithPasswordModel, GroupParticipantModel
from models.operation_response import OperationReasonCode, OperationResponseModel
from models.shared_models import IdTextModel
from database import groups_collection
from utils.utils import hashString
from asyncstdlib import list as asyncList


# TODO: Add method to change password


async def get_group_by_id(id: str) -> GroupModel:
    group: dict = await groups_collection.find_one({"id": id})
    return map_to_GroupModel(group)


async def get_groups_by_playerId(playerId: str) -> list[GroupModel]:
    cursor = groups_collection.find({"participants": playerId})
    groupsDB: list[dict] = await asyncList(cursor)
    # groupsDB: list[dict] = []
    # for doc in asyncEnumerate(cursor):
    #     groupsDB.push(doc)
    return list(map(map_to_GroupModel, groupsDB))


async def create_group(group: GroupModel, password: str) -> None:
    # TODO: Add logic to avoid two groups with the same name (methods to find )
    if (group.id is not None):
        await update_group(group.id, group, password)
    else:
        hashedPassword = hashString(password)
        groupToInsert = map_from_GroupModel_and_password(group, hashedPassword)
        await groups_collection.insert_one(groupToInsert)


async def update_group(id: str, groupToUpdate: GroupModel, password: str) -> None:
    groupDb = await get_group_by_id(id)
    groupWithPassword: GroupWithPasswordModel = map_to_GroupWithPasswordModel(
        groupDb)

    if (groupWithPassword.password != hashString(password)):
        raise Exception("Password not valid")

    passwordToUpdate = hashString(
        groupToUpdate.password) if groupToUpdate.password else groupWithPassword.password
    groupToSave = map_from_GroupModel_and_password(
        groupToUpdate, passwordToUpdate)
    await groups_collection.update_one({"id": id}, {"$set": groupToSave})


async def delete_group(playerId: str, groupId: str) -> OperationResponseModel:
    groupToRemove = await get_group_by_id(groupId)
    if (groupToRemove.creatorId != playerId):
        # TODO: Should this an handled failure?
        raise Exception(
            "You cannot request to delete a group you didn't created")

    result = OperationResponseModel()

    if (len(groupToRemove.participants) > 1):
        result.success = False
        result.reasonCode = OperationReasonCode.GroupNotEmpty
    else:
        groups_collection.delete_one({"id": groupId})
        result.success = True
        result.reasonCode = OperationReasonCode.Success

    return result


async def get_groups_by_name(text: str) -> list[IdTextModel]:
    # TODO: Index must be present to search by text or this might not work
    groupsDB = await groups_collection.find({"$text": {"$search": text}})
    return map(map_to_IdTextModel, groupsDB)


async def join_group(playerId: str, groupId: str, password: str) -> OperationResponseModel:
    response = OperationResponseModel()
    response.success = False

    groupToJoin = await get_group_by_id(groupId)

    if (groupToJoin is None):
        response.reasonCode = OperationReasonCode.GroupNotFound
        return response

    if (groupToJoin.password != hashString(password)):
        response.reasonCode = OperationReasonCode.PasswordNotValid
        return response

    playerInGroup = next(
        (participant for participant in groupToJoin.participants if participant.id == playerId), None)

    if (playerInGroup is None):
        playerInGroup = GroupParticipantModel()
        playerInGroup.playerId = playerId
        groupToJoin.participants.append(playerInGroup)

    playerInGroup.isActive = True
    await groups_collection.update_one({"id": groupToJoin.id}, {"$set": map_to_GroupModel(groupToJoin)})

    response.success = True
    response.reasonCode = OperationReasonCode.Success

    return response


async def leave_group(playerId: str, groupId: str) -> None:
    groupToLeave = await get_group_by_id(groupId)
    if (groupToLeave.creatorId == playerId):
        # TODO: Should this an handled failure?
        raise Exception("You cannot request to leave the group you created")

    playerInGroup = next(
        (participant for participant in groupToLeave.participants if participant.id == playerId), None)
    playerInGroup.isActive = False
    await groups_collection.update_one({"id": groupToLeave.id}, {"$set": map_to_GroupModel(groupToLeave)})
