from pydantic import BaseModel


class PlayerModel(BaseModel):
    id: str
    name: str
    avatar: str | None = None
    # TODO: Is this necessary? There's no logic that populates this
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
