from models.group_models import GroupParticipantModel, GroupModel


def map_from_GroupModel(group: GroupModel) -> dict:
    return {
        "id": group.id,
        "name": group.name,
        "creatorId": group.creatorId,
        "password": group.password,
        "avatar": group.avatar,
        "participants": map_from_GroupParticipantModel(group.participants),
    }


def map_to_GroupModel(group: dict) -> GroupModel:
    return GroupModel(
        id=group["id"],
        name=group["name"],
        creatorId=group["creatorId"],
        password=group["password"],
        avatar=group["avatar"],
        participants=map_to_GroupParticipantModel(group["participants"]),
    )


def map_from_GroupParticipantModel(participant: GroupParticipantModel) -> dict:
    return {
        "playerId": participant.playerId,
        "isActive": participant.isActive
    }


def map_to_GroupParticipantModel(participant: dict) -> GroupParticipantModel:
    return GroupParticipantModel(playerId=participant["playerId"], isActive=participant["isActive"])
