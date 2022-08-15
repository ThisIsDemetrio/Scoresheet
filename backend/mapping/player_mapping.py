from models.player_models import PlayerModel
from ..models.shared_models import IdTextModel


def map_from_PlayerModel(player: PlayerModel) -> dict:
    return {
        "id": player.id,
        "name": player.name,
        "avatar": player.avatar,
        "groups": player.groups,
    }


def map_to_PlayerModel(player: dict) -> PlayerModel:
    return PlayerModel(
        id=player["id"],
        name=player["name"],
        avatar=player["avatar"],
        groups=player["groups"],
    )


def map_to_IdTextModel(player: dict) -> IdTextModel:
    return IdTextModel(
        id=player["id"],
        text=player["name"]
    )
