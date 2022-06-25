from backend.models.player import Player
from backend.database import players_collection
from bson.objectid import ObjectId

# TODO: Create DB connection
players: list[Player] = [
    {"id": "1", "name": "Erica"},
    {"id": "2", "name": "Sabrina"},
    {"id": "3", "name": "Chiara"},
    {"id": "4", "name": "Gabriella"}
]


async def get_all() -> list[Player]:
    result = []
    async for player in players_collection.find():
        result.append(player)
    return result


async def get_player_by_id(id: str) -> Player:
    return await players_collection.find_one({"_id": ObjectId(id)})


async def get_players_by_name(name: str) -> list[Player]:
    return await players_collection.find({name: name})


async def add_player(player: Player) -> None:
    # safety check: if player has an Id, then update the existing resource
    if (player.id is not None):
        update_player(player.id, player)
        return
    await players_collection.insert_one(player)


async def update_player(playerId: str, player: Player) -> None:
    # TODO: Handle ValueError?
    await players_collection.update_one({"_id": ObjectId(id)}, {"$set": player})


async def delete_player(playerId: str) -> None:
    player = await players_collection.find_one({"_id": ObjectId(playerId)})
    if player:
        await players_collection.delete_one({"_id": ObjectId(playerId)})
