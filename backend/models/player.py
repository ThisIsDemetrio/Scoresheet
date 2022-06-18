from pydantic import BaseModel


class Player(BaseModel):
    id: str
    name: str
    avatarUrl: str | None = None

    class Config:
        schema_extra = {
            "example": {
                "id": "",
                "name": "Erica",
                "avatar": "cat",
            }
        }
