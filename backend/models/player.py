from pydantic import BaseModel


class Player(BaseModel):
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
