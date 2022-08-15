import enum


class OperationReasonCode(enum.Enum):
    Success = 1
    GroupNotEmpty = 2
    PasswordNotValid = 3
    GroupNotFound = 4


class OperationResponseModel:
    success: bool
    reasonCode: OperationReasonCode
