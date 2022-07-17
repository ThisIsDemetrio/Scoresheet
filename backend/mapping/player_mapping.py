from models.player_models import PlayerModel


def map_from_PlayerModel(player: PlayerModel) -> dict:
    return {
        "id": player.id,
        "name": player.name,
        "avatarUrl": player.avatar,
        "groups": player.groups,
    }


def map_To_PlayerModel(player: dict) -> PlayerModel:
    return PlayerModel(
        id=player["id"],
        name=player["name"],
        avatar=player["avatar"],
        groups=player["groups"],
    )
