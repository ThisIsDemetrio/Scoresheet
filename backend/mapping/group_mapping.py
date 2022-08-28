from models.group_models import GroupModel, GroupParticipantModel, GroupWithPasswordModel
from models.shared_models import IdTextModel


def map_to_GroupModel(group: dict) -> GroupModel:
    return GroupModel(
        id=group["id"],
        name=group["name"],
        creatorId=group["creatorId"],
        avatar=group["avatar"],
        participants=list(map(map_to_GroupParticipantModel,
                              group["participants"] or [])),
    )


def map_to_GroupWithPasswordModel(group: dict) -> GroupWithPasswordModel:
    return GroupWithPasswordModel(
        id=group["id"],
        name=group["name"],
        password=group["password"],
        creatorId=group["creatorId"],
        avatar=group["avatar"],
        participants=list(map(map_to_GroupParticipantModel,
                              group["participants"] or [])),
    )


def map_from_GroupModel_and_password(group: GroupModel, password: str) -> dict:
    return {
        "id": group.id,
        "name": group.name,
        "password": password,
        "creatorId": group.creatorId,
        "avatar": group.avatar,
        "participants": list(map(map_from_GroupParticipantModel, group.participants or []))
    }


def map_from_GroupParticipantModel(participant: GroupParticipantModel) -> dict:
    return {
        "playerId": participant.playerId,
        "isActive": participant.isActive
    }


def map_to_GroupParticipantModel(participant: dict) -> GroupParticipantModel:
    return GroupParticipantModel(playerId=participant["playerId"], isActive=participant["isActive"])


def map_to_IdTextModel(group: dict) -> IdTextModel:
    return IdTextModel(
        id=group["id"],
        text=group["name"]
    )
