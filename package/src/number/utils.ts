export type ToNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
