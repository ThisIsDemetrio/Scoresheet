from models.group_models import GroupModel, GroupParticipantModel, GroupWithPasswordModel


def map_from_GroupModel(group: GroupModel) -> dict:
    return {
        "id": group.id,
        "name": group.name,
        "creatorId": group.creatorId,
        "avatar": group.avatar,
        "participants": map_from_GroupParticipantModel(group.participants),
    }


def map_to_GroupModel(group: dict) -> GroupModel:
    return GroupModel(
        id=group["id"],
        name=group["name"],
        creatorId=group["creatorId"],
        avatar=group["avatar"],
        participants=map_to_GroupParticipantModel(group["participants"]),
    )


def map_to_GroupWithPasswordModel(group: dict) -> GroupWithPasswordModel:
    result = map_to_GroupModel(group)
    result.password = group["password"]
    return result


def map_from_GroupModel_and_password(group: GroupModel, password: str) -> dict:
    result = map_from_GroupModel(group)
    result["password"] = password
    return result


def map_from_GroupParticipantModel(participant: GroupParticipantModel) -> dict:
    return {
        "playerId": participant.playerId,
        "isActive": participant.isActive
    }


def map_to_GroupParticipantModel(participant: dict) -> GroupParticipantModel:
    return GroupParticipantModel(playerId=participant["playerId"], isActive=participant["isActive"])
