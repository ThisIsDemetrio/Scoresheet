from pydantic import BaseModel
from bson.objectid import ObjectId


class GroupParticipantModel(BaseModel):
    playerId: str
    isActive: bool


class GroupModel(BaseModel):
    id: str
    name: str
    creatorId: str
    password: str
    avatar: str
    participants: list[GroupParticipantModel]

    class Config:
        schema_extra = {
            "Creation example": {
                "_id": 'ObjectId("55880c251df42d0466919268")',
                "name": "Scrabble lovers",
                "creatorId": "1",
                "password": "",
                "avatar": "Scrabble",
                "participants": [{"playerId": "1", "isActive": True}]
            }
        }
