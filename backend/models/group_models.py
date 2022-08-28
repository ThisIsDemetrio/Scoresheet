from pydantic import BaseModel


class GroupParticipantModel(BaseModel):
    playerId: str
    isActive: bool


class GroupModel(BaseModel):
    id: str | None
    name: str
    creatorId: str
    avatar: str | None
    participants: list[GroupParticipantModel]

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


class GroupWithPasswordModel(GroupModel):
    password: str


class UpdateGroupModel(BaseModel):
    group: GroupModel
    password: str


class JoinGroupModel(BaseModel):
    playerId: str
    groupId: str
    password: str
