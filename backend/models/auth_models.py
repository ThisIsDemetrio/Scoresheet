from pydantic import BaseModel

from backend.models.player_models import Player


class LoginModel(BaseModel):
    username: str
    password: str


class UserModel(LoginModel):
    playerId: str


class SignupModel(BaseModel):
    signupData: LoginModel
    player: Player


class AuthenticatedUserModel(BaseModel):
    accessToken: str
    player: Player


class Settings(BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"
