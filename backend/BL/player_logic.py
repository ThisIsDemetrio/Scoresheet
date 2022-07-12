from backend.models.player_models import PlayerModel
from backend.database import players_collection
from bson.objectid import ObjectId

# TODO: Create DB connection
players: list[PlayerModel] = [
    {"id": "1", "name": "Erica"},
    {"id": "2", "name": "Sabrina"},
    {"id": "3", "name": "Chiara"},
    {"id": "4", "name": "Gabriella"}
]


async def get_all() -> list[PlayerModel]:
    result = []
    async for player in players_collection.find():
        result.append(player)
    return result


async def get_player_by_id(id: str) -> PlayerModel:
    return await players_collection.find_one({"_id": ObjectId(id)})


async def get_players_by_id(ids: list[str]) -> list[PlayerModel]:
    objectIds = []
    for id in ids:
        objectIds.append(ObjectId(id))
    return await players_collection.find({"_id": {"$in": objectIds}})


async def get_players_by_name(name: str) -> list[PlayerModel]:
    return await players_collection.find({"name": name})


async def update_player(playerId: str, player: PlayerModel) -> None:
    if (len(player) < 1):
        return

    await players_collection.update_one({"_id": ObjectId(id)}, {"$set": player})


async def delete_player(playerId: str) -> None:
    player = await get_player_by_id(playerId)
    if player:
        await players_collection.delete_one({"_id": ObjectId(playerId)})
