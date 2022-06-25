import uuid
from backend.models.game import Game


# TODO: Create DB connection
games: list[Game] = [
    {
        "id": "game01",
        "finished": False,
        "groupId": "group01",
        "participantIds": ["1", "2", "3", "4"],
        "results": [
            {"2": 21},
            {"4": 19},
            {"1": 17},
            {"3": 17}
        ],
        "score": [
            [11, 9, 7, 10],
            [6, 12, 10, 9]
        ]
    }
]


def get_games_by_groupId(groupId) -> list[Game]:
    return [game for game in games if game.groupId == groupId]


def get_game_by_id(id: str) -> list[Game]:
    return [game for game in games if game.id == id]


def create_game(game: Game) -> None:
    # safety check: if player has an Id, then update the existing resource
    if (game.id is not None):
        update_game(game.id, game)
        return
    game.id = uuid.uuid4()
    games.append(game)


def update_game(gameId: str, game: Game) -> None:
    # TODO: Handle ValueError?
    index = games.index(
        game for game in games if game.id == gameId)
    games[index] = game


def delete_game(gameId: str) -> None:
    games = [game for game in games if game.id != gameId]
