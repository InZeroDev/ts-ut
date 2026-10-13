export type Prefix<T extends string, P extends string> = `${P}${T}`;

export type EnsurePrefix<T extends string, P extends string> = T extends `${P}${string}` ? T : Prefix<T, P>;

export type UnPrefix<T extends string, P extends string> = T extends `${P}${infer U extends string}` ? U : T;

export type Suffix<T extends string, S extends string> = `${T}${S}`;

export type EnsureSuffix<T extends string, S extends string> = T extends `${infer U extends string}${S}` ? U : Suffix<T, S>;

export type UnSuffix<T extends string, S extends string> = T extends `${infer U extends string}${S}` ? U : T;