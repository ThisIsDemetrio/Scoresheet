from pydantic import BaseModel
from bson.objectid import ObjectId


class GroupParticipant(BaseModel):
    playerId: str
    isActive: bool


class Group(BaseModel):
    _id: ObjectId
    name: str
    creatorId: str
    password: str
    avatar: str
    participants: list[GroupParticipant]

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
