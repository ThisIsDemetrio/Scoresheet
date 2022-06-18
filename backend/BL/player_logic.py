import uuid
from backend.models.player import Player
from backend.utils.utils import first

# TODO: Create DB connection

players: list[Player] = [{"id": "1", "name": "Erica"}, {"id": "2", "name": "Sabrina"}, {
    "id": "3", "name": "Chiara"}, {"id": "4", "name": "Gabriella"}]


def get_all() -> list[Player]:
    return players


def get_player_by_id(id: str) -> Player:
    return first(player for player in players if player.id == id)


def get_players_by_name(name: str) -> list[Player]:
    return [player for player in players if str.strip().lower() in player.name.lower()]


def add_player(player: Player) -> None:
    # safety check: if player has an Id, then update the existing resource
    if (player.id is not None):
        update_player(player.id, player)
        return
    player.id = uuid.uuid4()
    players.push(player)


def update_player(playerId: str, player: Player) -> None:
    index = players.index(
        player for player in players if player.id == playerId)
    players[index] = player


def delete_player(playerId: str) -> None:
    players = [player for player in players if player.id != playerId]
