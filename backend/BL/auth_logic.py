from xmlrpc.client import boolean
from backend.models.auth_models import AuthenticatedUserModel, UserModel, LoginModel, SignupModel
from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from backend.utils.utils import generateUuid4, hashString
from database import auth_collection, players_collection


async def isUsernameTaken(username: str) -> boolean:
    user = await auth_collection.find({"username": username})
    return user is not None


async def login(loginData: LoginModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    user = await auth_collection.find_one({"username": loginData.username})
    if (user is None):
        raise HTTPException(404, "User not found")

    hashedPassword = hashString(loginData.password)
    if (user.password != hashedPassword):
        raise HTTPException(401, "Password not valid")

    player = await players_collection.find_one({"id": user.playerId})
    if (player is None):
        raise HTTPException(404, "Player not found")

    accessToken = Authorize.create_access_token(subject=loginData.username)
    return AuthenticatedUserModel(accessToken=accessToken, player=player)


async def signup(signupData: SignupModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    if (await isUsernameTaken(signupData.loginData.username)):
        raise HTTPException(400, "Username taken")

    player = signupData.player
    player.id = generateUuid4()
    await players_collection.insert_one(player)

    user = UserModel(
        username=signupData.loginData.username,
        password=hashString(signupData.loginData.password),
        playerId=player.id
    )

    auth_collection.insert_one(user)

    accessToken = Authorize.create_access_token(subject=signupData.username)
    return AuthenticatedUserModel(accessToken=accessToken, player=player)


async def logout(username: str) -> None:
    # TODO: Do something here plz
    return None
