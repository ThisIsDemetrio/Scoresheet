from typing import Dict
from pydantic import BaseModel
from bson.objectid import ObjectId


class Game(BaseModel):
    _id: ObjectId
    finished: bool
    groupId: str
    participantIds: list[str]
    results: Dict[str, int]
    score: list[list[int]]
