import { OperationReasonCode } from "./operation-response.model";

export type Nil = null | undefined;
export type Optional<T extends any = any> = T | Nil;

export type OperationResponseHandlerMap = { [key in OperationReasonCode]?: () => void };
