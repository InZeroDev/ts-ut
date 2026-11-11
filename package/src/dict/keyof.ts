import type { IsTuple } from "../_internal";
import type { AreEqual, HasType, Self } from "../other";
import type { Stringify } from "../string";
import type { KeyofTuple } from "../tuple";
import type { Get, GetDeep } from "./get";
import type { Dict, DictKey, Known } from "./utils";

/**
 * Returns all possible keys.
 *
 * @example
 * type Config = { foo: string, bar: number } | { c: 4 };
 *
 * type R1 = keyof Config; // never
 * type R2 = Keys<Config>; // 'foo' | 'bar' | 'c'
 */
export type Keys<T> = T extends T ? keyof T : never;

/**
 * Returns all possible values.
 *
 * @example
 * type Config = { foo: string } | { c: 4 };
 *
 * type R1 = Values<Config>; // string | 4
 */
export type Values<T> = T extends T ? T[keyof T] : never;

/**
 * Returns all possible entries.
 *
 * @example
 * type Config = { foo: string, bar: number } | { c: 4 };
 *
 * type R1 = Entries<Config>; // ["foo" | "bar", string | number] | ["c", 4]
 */
export type Entries<T> = T extends T ? [Keys<T>, Values<T>] : never;

/**
 * A deep version of {@linkcode Keys}.
 *
 * @remarks `R` controls whether to return leaf keys, parent keys, or both (default).
 *
 * @example
 * type Config = { foo: string, bar: { baz: number } };
 *
 * type R1 = KeysDeep<Config> // "foo" | "bar" | "bar.baz"
 * type R2 = KeysDeep<Config, "leaf"> // "foo" | "bar.baz"
 * type R3 = KeysDeep<Config, "parent"> // "bar"
 */
export type KeysDeep<
	T,
	R extends "leaf" | "parent" | "both" = "both",
	_K extends string = "",
> = T extends T
	? Values<{
			[P in keyof T as P extends string | number ? P : never]-?: T[P] extends infer TP
				? Next<P & (string | number), _K> extends infer N extends string
					? TP extends Dict
						? (R extends "leaf" ? never : N) | KeysDeep<TP, R, N>
						: R extends "parent"
							? never
							: N
					: never
				: never;
		}>
	: never;

/**
 * Returns the keys of `T` whose values are assignable to `U`.
 *
 * @example
 * type R1 = KeyofType<{ a: 1, b: "b", c: 4 }, number>; // "a" | "c"
 * type R2 = KeyofType<{ a: 1, [x: string]: number }, number>; // string | number
 */
export type KeysOfType<T, U> = T extends T
	? keyof {
			[P in keyof T as T[P] extends U ? P : never]: T[P];
		}
	: never;

/**
 * Returns the keys of `T` whose values have one of the types in `U`.
 *
 * @example
 * type Obj = { a: number, b: boolean | number };
 *
 * type R1 = KeysOfType<Obj, number>; // "a"
 * type R2 = KeysWithType<Obj, number>; // "a" | "b"
 */
export type KeysWithType<T, U> = T extends T
	? keyof {
			[P in keyof T as HasType<T[P], U> extends true ? P : never]: T[P];
		}
	: never;

export type KeysWithExactType<T, U> = T extends T
	? keyof {
			[P in keyof T as AreEqual<T[P], U> extends true ? P : never]: T[P];
		}
	: never;

/**
 * A deep version of {@linkcode KeysOfType}.
 *
 * @example
 * type Config = { foo: string, bar: { baz: number } };
 *
 * type R1 = KeysOfTypeDeep<Config, string> // "foo"
 * type R2 = KeysOfTypeDeep<Config, number> // "bar.baz"
 */

export type KeysOfTypeDeep<T, U, _K extends string = ""> = T extends T
	? Values<{
			[
				P in keyof T as T[P] extends U ? P : HasType<T[P], Dict> extends true ? P : never
			]-?: T[P] extends infer TK
				? Next<P & string, _K> extends infer N extends string
					? HasType<TK, Dict> extends true
						? KeysOfTypeDeep<Extract<TK, Dict>, U, N>
						: N
					: never
				: never;
		}>
	: never;

export type KeysWithTypeDeep<T, U, _K extends string = ""> = T extends T
	? Values<{
			[P in keyof T as HasType<T[P], U | Dict> extends true ? P : never]-?: T[P] extends infer TK
				? Next<P & string, _K> extends infer N extends string
					? HasType<TK, Dict> extends true
						? KeysWithTypeDeep<Extract<TK, Dict>, U, N>
						: N
					: never
				: never;
		}>
	: never;

export type KeysWithExactTypeDeep<T, U, _K extends string = ""> = T extends T
	? Values<{
			[
				P in keyof T as AreEqual<T[P], U> extends true
					? P
					: HasType<T[P], Dict> extends true
						? P
						: never
			]-?: T[P] extends infer TK
				? Next<P & string, _K> extends infer N extends string
					? HasType<TK, Dict> extends true
						? KeysWithExactTypeDeep<Extract<TK, Dict>, U, N>
						: N
					: never
				: never;
		}>
	: never;

// ---Internal---
type Next<K extends string | number, _K extends string> = _K extends ""
	? Stringify<K>
	: `${_K}.${K}`;
