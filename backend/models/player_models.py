from pydantic import BaseModel
from bson.objectid import ObjectId


class PlayerModel(BaseModel):
    id: str
    name: str
    avatarUrl: str | None = None
    groups: list[str]

    class Config:
        schema_extra = {
            "Creation example": {
                "_id": 'ObjectId("55880c251df42d0466919268")',
                "id": "uuid4Id",
                "name": "Erica",
                "avatar": "cat",
                "groups": ["scrabbleGroupId"]
            }
        }
