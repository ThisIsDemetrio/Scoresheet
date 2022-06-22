from typing import Dict
from pydantic import BaseModel


class Game(BaseModel):
    id: str
    finished: bool
    groupId: str
    participantIds: list[str]
    results: Dict[str, int]
    score: list[list[int]]
