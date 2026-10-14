/**
 * Converts a number in string form to its number representation.
 * 
 * @example
 * type R1 = ToNumber<"123">; // 123
 */
export type ToNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
