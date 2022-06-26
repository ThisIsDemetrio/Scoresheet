import enum


class DeleteGroupReasonCode(enum.Enum):
    Success: 1
    GroupNotEmpty: 2


class DeleteGroupResponse:
    success: bool
    reasonCode: DeleteGroupReasonCode
