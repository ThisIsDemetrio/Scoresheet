import uuid
from backend.models.delete_group_response import DeleteGroupReasonCode, DeleteGroupResponse
from backend.models.group import Group, GroupParticipant
from backend.BL.player_logic import players
import pydash

from backend.models.player import Player
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


def create_group(group: Group, password: str) -> None:
    if (group.id is not None):
        update_group(group)

    group.id = uuid.uuid4()
    group.password = hashString(password)
    groups.append(group)


def update_group(id: str, group: Group, password: str) -> None:
    # TODO: Handle ValueError
    index = groups.index(group for group in groups if group.id == id)
    if (groups[index].password != hashString(password)):
        raise Exception("Password not valid")

    if (group.password == ""):
        group.password = groups[index].password
    groups[index] = group


def get_players_in_group(id: str) -> list[Player]:
    group: Group = pydash.find(groups, lambda group: group.id == id)
    playerIds: list[str] = pydash.map_(group.participants, "id")
    return [player for player in players if player.id in playerIds]


def join_group(playerId: str, groupId: str, password: str) -> None:
    index = groups.index(group for group in groups if group.id == id)
    if (groups[index].password != hashString(password)):
        raise Exception("Password not valid")

    playerInGroup = pydash.find(
        groups[index].participants, lambda player: player.id == playerId)
    if (playerInGroup is None):
        participant = GroupParticipant()
        participant.playerId = playerId
        participant.isActive = True
        groups[index].participants.append(participant)
    else:
        playerInGroup.isActive = True


def leave_group(playerId: str, groupId: str) -> None:
    index = groups.index(group for group in groups if group.id == id)
    if (groups[index].creatorId == playerId):
        raise Exception("You can leave the group you created")

    playerInGroup = pydash.find(
        groups[index].participants, lambda player: player.id == playerId)
    playerInGroup.isActive = False


def delete_group(playerId: str, groupId: str) -> DeleteGroupResponse:
    index = groups.index(group for group in groups if group.id == id)

    result = DeleteGroupResponse()
    canDelete = len(
        groups[index].participants) == 1 and groups[index].creatorId == playerId

    if (not canDelete):
        result.success = False
        result.reasonCode = DeleteGroupReasonCode.GroupNotEmpty
    else:
        result.success = True
        result.reasonCode = DeleteGroupReasonCode.Success

    return result
