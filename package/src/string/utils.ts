export type Stringable = string | number | boolean | bigint | null | undefined;

export type Suggest<T extends string> = T | (string & {});

export type Stringify<T extends Stringable> = `${T}`;

export type Concat<A extends string, B extends string, S extends string = ""> = `${A}${S}${B}`;
