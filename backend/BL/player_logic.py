from mapping.player_mapping import map_to_IdTextModel
from models.shared_models import IdTextModel
from models.player_models import PlayerModel
from database import players_collection
from bson.objectid import ObjectId


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


async def get_players_by_name(text: str) -> list[IdTextModel]:
    # TODO: Index must be present to search by text or this might not work
    groupsDB = await players_collection.find({"$text": {"$search": text}})
    return map(map_to_IdTextModel, groupsDB)


async def update_player(playerId: str, player: PlayerModel) -> None:
    if (len(player) < 1):
        return

    await players_collection.update_one({"_id": ObjectId(id)}, {"$set": player})


async def delete_player(playerId: str) -> None:
    player = await get_player_by_id(playerId)
    if player:
        await players_collection.delete_one({"_id": ObjectId(playerId)})
