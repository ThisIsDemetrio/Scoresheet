from lib2to3.pytree import Base
from pydantic import BaseModel

from bson import ObjectId


class GroupParticipant(BaseModel):
    playerId: str
    isActive: bool


class Group(BaseModel):
    _id: ObjectId
    id: str
    name: str
    creatorId: str
    password: str
    avatarUrl: str
    participants: list[GroupParticipant]

    class Config:
        schema_extra = {
            "Creation example": {
                "id": "",
                "name": "Scrabble lovers",
                "creatorId": "1",
                "password": "",
                "avatar": "Scrabble",
                "participants": [{"playerId": "1", "isActive": True}]
            }
        }
