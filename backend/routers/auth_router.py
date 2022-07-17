

from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from BL import auth_logic
from models.auth_models import AuthenticatedUserModel, ChangePasswordModel, LoginModel, SignupModel
from models.operation_response import OperationResponseModel
from models.player_models import PlayerModel


router = APIRouter(prefix="/Auth", tags=["Authentication"])


@router.get('/IsUsernameAvailable/{username}')
async def isUsernameAvailable(username: str) -> bool:
    return await auth_logic.isUsernameAvailable(username)


@router.post('/Login')
async def login(loginData: LoginModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    return await auth_logic.login(loginData, Authorize)


@router.post('/Signup')
async def signup(signupData: SignupModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    return await auth_logic.signup(signupData, Authorize)


@router.get('/Update/{playerId}')
async def update(playerId: str, playerData: PlayerModel) -> bool:
    return await auth_logic.update(playerId, playerModel=playerData)


@router.post('/ChangePassword/{playerId}')
async def changePassword(playerId: str, passwordModel: ChangePasswordModel) -> OperationResponseModel:
    return await auth_logic.changePassword(playerId, passwordModel)


# TODO: Is this needed?
@router.get('/test-jwt')
async def user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()
    return {"user": 123124124, 'data': 'jwt test works'}
    #current_user = Authorize.get_jwt_subject()
    # return {"user": current_user, 'data': 'jwt test works'}
