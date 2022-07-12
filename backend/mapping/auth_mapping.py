from ..models.auth_models import UserModel


def map_from_UserModel(player: UserModel) -> dict:
    return {
        "username": player.username,
        "password": player.password,
        "playerId": player.playerId,
    }


def map_To_UserModel(player: dict) -> UserModel:
    return UserModel(username=player["username"], password=player["password"], playerId=player["playerId"])
