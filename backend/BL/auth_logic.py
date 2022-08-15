from mapping.auth_mapping import map_to_UserModel, map_from_UserModel
from mapping.player_mapping import map_to_PlayerModel, map_from_PlayerModel
from models.auth_models import AuthenticatedUserModel, ChangePasswordModel, UserModel, LoginModel, SignupModel
from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from models.operation_response import OperationReasonCode, OperationResponseModel
from models.player_models import PlayerModel
from utils.utils import generateUuid4, hashString
from database import auth_collection, players_collection


async def isUsernameAvailable(username: str) -> bool:
    user = await auth_collection.find_one({"username": username})
    return user is None


async def login(loginData: LoginModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    userDB = await auth_collection.find_one({"username": loginData.username})
    user = map_to_UserModel(userDB)

    if (user is None):
        raise HTTPException(404, "User not found")

    hashedPassword = hashString(loginData.password)
    if (user.password != hashedPassword):
        raise HTTPException(401, "Password not valid")

    playerDB = await players_collection.find_one({"id": user.playerId})
    player = map_to_PlayerModel(playerDB)
    if (player is None):
        raise HTTPException(404, "Player not found")

    accessToken = Authorize.create_access_token(subject=loginData.username)
    return AuthenticatedUserModel(accessToken=accessToken, userData=player)


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

    accessToken = Authorize.create_access_token(
        subject=data.signupData.username)
    return AuthenticatedUserModel(accessToken=accessToken, userData=player)


async def update(playerId: str, playerModel: PlayerModel) -> bool:
    playerDB = await players_collection.find_one({"id": playerId})
    if (playerDB is None):
        raise HTTPException(400, "Player with this Id not found")

    player = map_to_PlayerModel(playerDB)
    player.avatar = playerModel.avatar
    player.name = playerModel.name

    await players_collection.update_one({"id": playerId}, {"$set": map_from_PlayerModel(player)})
    return True


async def changePassword(playerId: str, passwordModel: ChangePasswordModel) -> OperationResponseModel:
    userDB = await auth_collection.find_one({"playerId": playerId})
    if (userDB is None):
        raise HTTPException(400, "User with this playerId not found")

    user = map_to_UserModel(userDB)
    result = OperationResponseModel()

    hashedOldPassword = hashString(passwordModel.oldPassword)
    if (hashedOldPassword != user.password):
        result.success = False
        result.reasonCode = OperationReasonCode.PasswordNotValid
        return result

    user.password = hashString(passwordModel.newPassword)
    await auth_collection.update_one({"playerId": playerId}, {"$set": map_from_UserModel(user)})

    result.success = True
    result.reasonCode = OperationReasonCode.Success
    return result


async def logout(username: str) -> None:
    # TODO: Do something here plz
    return None
