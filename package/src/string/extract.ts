export type ExtractIfStartsWith<T extends string, P extends string> = T extends `${P}${string}` ? T : never;

export type ExtractIfEndsWith<T extends string, P extends string> = T extends `${string}${P}` ? T : never;

export type ExtractIfContains<T extends string, P extends string> = T extends `${string}${P}${string}` ? T : never;

export type ExcludeIfStartsWith<T extends string, S extends string> = T extends `${S}${string}` ? never : T;

export type ExcludeIfEndsWith<T extends string, S extends string> = T extends `${string}${S}` ? never : T;

export type ExcludeIfContains<T extends string, S extends string> = T extends `${string}${S}${string}` ? never : T;
