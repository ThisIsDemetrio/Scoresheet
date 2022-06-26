

from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from backend.models.auth import AuthenticationModel


router = APIRouter(prefix="/Auth")


@router.get("/", tags=["Authentication"])
def read_root():
    return {"Hello": "World Rasyue"}


@router.post('/login', tags=["Authentication"])
def login(loginData: AuthenticationModel, Authorize: AuthJWT = Depends()):
    # user.username
    # user.password
    # this is the part where we will check the user credentials with our database record
    # but since we are not going to use any db, straight away we will just create the token and send it back
    # subject identifier for who this token is for example id or username from database
    access_token = Authorize.create_access_token(subject=loginData.username)
    return {"access_token": access_token}


@router.get('/test-jwt', tags=["Authentication"])
def user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()
    return {"user": 123124124, 'data': 'jwt test works'}
    #current_user = Authorize.get_jwt_subject()
    # return {"user": current_user, 'data': 'jwt test works'}
