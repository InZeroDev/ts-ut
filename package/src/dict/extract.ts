import type { AreEqual, HasType, IsNever } from "../other";
import type { DictKey, SuggestKey } from "./utils";
import type { Keys, KeysOfType, Values } from "./keyof";
import type { Dict, Known } from "./utils";

/**
 * Extracts union members whose specified properties contain at least one of the specified value types.
 *
 * @example
 * type Obj = { a: string } | { a: number | boolean } | { a: null };
 *
 * type R1 = Extract<Obj, { a: string | number }>; // { a: string }
 * type R2 = ExtractByValue<Obj, { a: string | number }>; // { a: string } | { a: number | boolean }
 */
export type ExtractByValue<T, M extends Partial<Dict<Keys<T>>>> = T extends T
	? Values<{
			[P in keyof M]: P extends keyof T ? HasType<T[P], M[P]> : false;
		}> extends true
		? T
		: never
	: never;

/**
 * Extracts union members whose specified properties exactly match the specified value types.
 *
 * @example
 * type Obj = { a: string } | { a: string | boolean } | { a: null };
 *
 * type R1 = Extract<Obj, { a: string | boolean }>; // { a: string } | { a: string | boolean }
 * type R2 = ExtractByExactValue<Obj, { a: string | boolean }>; // { a: string | boolean }
 */
export type ExtractByExactValue<T, M extends Partial<Dict<Keys<T>>>> = T extends T
	? Values<{
			[P in keyof M]: P extends keyof T ? AreEqual<T[P], M[P]> : false;
		}> extends true
		? T
		: never
	: never;

/**
 * Extracts types assignable to `U` from values of `T`.
 *
 * By default, extraction is applied to all properties. If K is specified,
 * extraction is limited to those keys, leaving the remaining properties unchanged.
 *
 * @example
 * type T = { a: string | number, b: string | number };
 *
 * type R1 = ExtractFromValues<T, string>; // { a: string, b: string };
 */
export type ExtractFromValues<T, U, K extends SuggestKey<Keys<Known<T>>> = never> = {
	[P in keyof T]: Extract<T[P], U> extends infer R
		? IsNever<K> extends true
			? R
			: P extends K
				? R
				: T[P]
		: never;
};

/**
 * Excludes types assignable to `U` from values of `T`.
 *
 * By default, exclusion is applied to all properties. If K is specified,
 * exclusion is limited to those keys, leaving the remaining properties unchanged.
 *
 * @example
 * type T = { a: string | undefined, b: string | undefined };
 *
 * type R1 = ExcludeFromValues<T, string>; // { a: string, b: string };
 */
export type ExcludeFromValues<T, U, K extends SuggestKey<Keys<Known<T>>> = never> = {
	[P in keyof T]: Exclude<T[P], U> extends infer R
		? IsNever<K> extends true
			? R
			: P extends K
				? R
				: T[P]
		: never;
};
