export enum OperationReasonCode {
	UnhandledFailure = 0,
	Success = 1,
	GroupNotEmpty,
	PasswordNotValid,
	GroupNotFound,
}

export interface OperationResponseModel {
	success: boolean;
	reasonCode: OperationReasonCode;
}
