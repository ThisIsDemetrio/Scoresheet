export type Nil = null | undefined;
export type Optional<T extends any = any> = T | Nil;
