/**
 * Adds a prefix to a string.
 */
export type Prefix<T extends string, P extends string> = `${P}${T}`;

/**
 * Adds a prefix to a string, but only if the string does not already start with the prefix.
 */
export type EnsurePrefix<T extends string, P extends string> = T extends `${P}${string}`
	? T
	: Prefix<T, P>;

/**
 * Removes a prefix from a string (if it exists).
 */
export type UnPrefix<T extends string, P extends string> = T extends `${P}${infer U extends string}`
	? U
	: T;

/**
 * Adds a suffix to a string.
 */
export type Suffix<T extends string, S extends string> = `${T}${S}`;

/**
 * Adds a suffix to a string, but only if the string does not already end with the suffix.
 */
export type EnsureSuffix<
	T extends string,
	S extends string,
> = T extends `${infer U extends string}${S}` ? U : Suffix<T, S>;

/**
 * Removes a suffix from a string (if it exists).
 */
export type UnSuffix<T extends string, S extends string> = T extends `${infer U extends string}${S}`
	? U
	: T;
