/**
 * Returns the first character in a given string.
 */
export type FirstChar<T extends string> = T extends `${infer U extends string}${string}`
	? U
	: never;

/**
 * Returns the last character in a given string.
 * 
 * @remarks This type will run `T["length"]` times to reach the last character.
 */
export type LastChar<T extends string> = T extends `${string}${infer U extends string}`
	? U extends ""
		? T
		: LastChar<U>
	: never;
