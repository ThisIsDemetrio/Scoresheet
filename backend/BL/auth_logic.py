from backend.mapping.auth_mapping import map_from_UserModel
from backend.mapping.player_mapping import map_from_PlayerModel
from backend.models.auth_models import AuthenticatedUserModel, UserModel, LoginModel, SignupModel
from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from backend.utils.utils import generateUuid4, hashString
from backend.database import auth_collection, players_collection


async def isUsernameAvailable(username: str) -> bool:
    user = await auth_collection.find_one({"username": username})
    return user is None


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


async def signup(data: SignupModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    if (await isUsernameAvailable(data.signupData.username) == False):
        raise HTTPException(400, "Username taken")

    player = data.player
    player.id = str(generateUuid4())

    await players_collection.insert_one(map_from_PlayerModel(player))

    user = UserModel(
        username=data.signupData.username,
        password=hashString(data.signupData.password),
        playerId=player.id
    )

    auth_collection.insert_one(map_from_UserModel(user))

    accessToken = Authorize.create_access_token(subject=data.username)
    return AuthenticatedUserModel(accessToken=accessToken, player=player)


async def logout(username: str) -> None:
    # TODO: Do something here plz
    return None
