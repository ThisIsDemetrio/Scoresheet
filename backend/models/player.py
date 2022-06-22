from pydantic import BaseModel

from bson import ObjectId

class Player(BaseModel):
    _id: ObjectId
    id: str
    name: str
    avatarUrl: str | None = None
    groups: list[str]

    class Config:
        schema_extra = {
            "Creation example": {
                "id": "",
                "name": "Erica",
                "avatar": "cat",
                "groups": []
            }
        }
