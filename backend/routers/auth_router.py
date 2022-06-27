

from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from backend.BL import auth_logic
from backend.models.auth_models import AuthenticatedUserModel, LoginModel, SignupModel


router = APIRouter(prefix="/Auth")


@router.post('/Login', tags=["Authentication"])
async def login(loginData: LoginModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    return await auth_logic.login(loginData)


@router.post('/Signup', tags=["Authentication"])
async def signup(signupData: SignupModel, Authorize: AuthJWT = Depends()) -> AuthenticatedUserModel:
    return await auth_logic.signup(signupData)


@router.get('/test-jwt', tags=["Authentication"])
async def user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()
    return {"user": 123124124, 'data': 'jwt test works'}
    #current_user = Authorize.get_jwt_subject()
    # return {"user": current_user, 'data': 'jwt test works'}
