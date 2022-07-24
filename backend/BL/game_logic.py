from models.game_models import Game
from database import games_collection
from bson.objectid import ObjectId


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


async def get_games_by_groupId(groupId) -> list[Game]:
    return await games_collection.find({"groupId": groupId})


async def get_game_by_id(id: str) -> list[Game]:
    return await games_collection.find({"_id": ObjectId(id)})


async def create_game(game: Game) -> None:
    # safety check: if player has an Id, then update the existing resource
    if (game.id is not None):
        await update_game(game.id, game)
        return
    await games_collection.insert_one(game)


async def update_game(id: str, game: Game) -> None:
    if (len(game) < 1):
        return

    await games_collection.update_one({"_id": ObjectId(id)}, {"$set": game})


async def delete_game(gameId: str) -> None:
    game = await get_game_by_id(gameId)
    if (game):
        await games_collection.delete_one({"_id": ObjectId(gameId)})
