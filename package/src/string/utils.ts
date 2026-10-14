export type Stringable = string | number | boolean | bigint | null | undefined;

export type Suggest<T extends string> = T | (string & {});

export type Stringify<T> = T extends Stringable ? `${T}` : never;

export type Concat<A extends string, B extends string, S extends string = ""> = `${A}${S}${B}`;
