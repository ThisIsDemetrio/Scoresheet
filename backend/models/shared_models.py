from pydantic import BaseModel


class IdTextModel(BaseModel):
    id: str
    text: str
