from pydantic import BaseModel


class AuthenticationModel(BaseModel):
    id: str
    password: str


class Settings(BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"
