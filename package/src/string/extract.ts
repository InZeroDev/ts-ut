/**
 * Extracts from a union of strings those that start with a given prefix.
 *
 * @example
 * type Keys = KeyofDeep<Config>; // 'defaults.a' | 'defaults.b' | 'messages.error' | 'messages.success'
 * type R1 = ExtractIfStartsWith<Keys, 'defaults'>; // 'defaults.a' | 'defaults.b'
 * type R2 = ExtractIfStartsWith<Keys, 'messages'>; // 'messages.error' | 'messages.success'
 */
export type ExtractIfStartsWith<T extends string, P extends string> = T extends `${P}${string}`
	? T
	: never;

/**
 * Extracts from a union of strings those that end with a given suffix.
 */
export type ExtractIfEndsWith<T extends string, P extends string> = T extends `${string}${P}`
	? T
	: never;

/**
 * Extracts from a union of strings those that contain a given substring.
 */
export type ExtractIfContains<
	T extends string,
	P extends string,
> = T extends `${string}${P}${string}` ? T : never;

/**
 * Excludes from a union of strings those that start with a given prefix.
 */
export type ExcludeIfStartsWith<T extends string, S extends string> = T extends `${S}${string}`
	? never
	: T;

/**
 * Excludes from a union of strings those that end with a given suffix.
 */
export type ExcludeIfEndsWith<T extends string, S extends string> = T extends `${string}${S}`
	? never
	: T;

/**
 * Excludes from a union of strings those that contain a given substring.
 */
export type ExcludeIfContains<
	T extends string,
	S extends string,
> = T extends `${string}${S}${string}` ? never : T;
