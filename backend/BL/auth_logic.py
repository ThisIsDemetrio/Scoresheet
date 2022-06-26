from backend.models.auth import AccessTokenModel, AuthenticationModel
from fastapi import Depends
from fastapi_jwt_auth import AuthJWT
from backend.utils.utils import hashString
from database import auth_collection

# TODO: Add method to check if username is taken


async def login(loginData: AuthenticationModel, Authorize: AuthJWT = Depends()) -> AccessTokenModel:
    # TODO: Add an Error model
    user = await auth_collection.find_one({"username": loginData.username})
    if (user is None):
        return False
    hashedPassword = hashString(loginData.password)
    if (user.password != hashedPassword):
        return False

    access_token = Authorize.create_access_token(subject=loginData.username)
    return {"access_token": access_token}


async def signup(loginData: AuthenticationModel, Authorize: AuthJWT = Depends()) -> AccessTokenModel:
    # TODO: Do this
    access_token = Authorize.create_access_token(subject=loginData.username)
    return {"access_token": access_token}


async def logout(username: str) -> None:
    # TODO: Do something here plz
    return None
