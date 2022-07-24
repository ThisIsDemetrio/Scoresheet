export enum OperationReasonCode {
	Success = 1,
	GroupNotEmpty,
	OldPasswordNotValid,
}

export interface OperationResponseModel {
	success: boolean;
	reasonCode: OperationReasonCode;
}
