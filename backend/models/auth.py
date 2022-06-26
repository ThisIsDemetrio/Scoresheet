from pydantic import BaseModel


class AuthenticationModel(BaseModel):
    username: str
    password: str


class UserModel(AuthenticationModel):
    playerId: str


class AccessTokenModel(BaseModel):
    access_token: str


class Settings(BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"
