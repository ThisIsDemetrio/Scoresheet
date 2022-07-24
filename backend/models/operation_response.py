import enum


class OperationReasonCode(enum.Enum):
    Success = 1
    GroupNotEmpty = 2
    OldPasswordNotValid = 3


class OperationResponseModel:
    success: bool
    reasonCode: OperationReasonCode
