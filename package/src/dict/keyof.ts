import type { ROList } from "../list";
import type { Dict, Known } from "./utils";

/**
 * Similar to `keyof Obj`, except it returns all possible keys instead of shared keys when `T` is a union of objects.
 *
 * @example
 * type MyObj = { a: 1 } | { b: 2 };
 *
 * type R1 = OgKeyof<MyObj>; // "a" | "b"
 * type R2 = keyof MyObj; // never
 */
export type OgKeyof<T extends Dict> = T extends T ? keyof T : never;

/**
 * Similar to `Obj[keyof Obj]`, except it returns all possible values instead of shared keys' values when `T` is a union of objects.
 *
 * @example
 * type MyObj = { a: 1 } | { b: 2 };
 *
 * type R1 = OgValueof<MyObj>; // 1 | 2
 * type R2 = Obj[keyof Obj]; // never
 */
export type OgValueof<T extends Dict> = T extends T ? T[keyof T] : never;

/**
 * Similar to {@linkcode OgKeyof}, except it returns all known keys instead of `string` when `T` contains `{ [x: string]: unknown }`.
 *
 * @example
 * type Config = { foo: string, bar: number, [x: string]: unknown };
 *
 * type R1 = OgKeyof<Config>; // keyof Config
 * type R2 = Keyof<Config>; // 'foo' | 'bar'
 */
export type Keyof<T extends Dict> = T extends T ? Known<T> extends infer T extends Dict ? keyof T : never : never;

/**
 * Similar to {@linkcode OgValueof}, except it returns all known keys' values instead of all possible values when `T` contains `{ [x: string]: unknown }`.
 *
 * @example
 * type Config = { foo: string, bar: number, [x: string]: unknown };
 *
 * type R1 = OgValueof<Config>; // unknown
 * type R2 = Valueof<Config>; // string | number
 */
export type Valueof<T extends Dict | ROList> =
T extends T ? Known<T> extends infer T extends Dict ? T[keyof T] : never : never;

/**
 * Returns `[OgKeyof<T>, OgValueof<T>]`.
 * 
 * @see {@linkcode OgKeyof} and {@linkcode OgValueof}
 */
export type OgEntryOf<T extends Dict> = T extends T ? [keyof T, T[keyof T]] : never;

/**
 * Returns `[Keyof<T>, Valueof<T>]`.
 * 
 * @see {@linkcode Keyof} and {@linkcode Valueof}
 */
export type EntryOf<T extends Dict> =
	T extends T ? Known<T> extends infer T extends Dict ? [keyof T, T[keyof T]] : never : never;

/**
 * A deep version of {@linkcode Keyof}.
 */
export type KeyofDeep<
	T extends Dict | ROList,
	R extends "leaf" | "parent" | "both" = "both",
> = T extends T ? _KeyofDeep<T, R> : never;

type _KeyofDeep<
	T extends Dict | ROList,
	R extends "leaf" | "parent" | "both" = "both",
	_K extends string = "",
> = {
	[P in keyof T]: T[P] extends infer TK
		? NextKey<P & string, _K> extends infer N extends string
			? TK extends Dict | ROList
				? (R extends "leaf" ? never : N) | _KeyofDeep<TK, R, N>
				: R extends "parent"
					? never
					: N
			: never
		: never;
}[T extends ROList ? number & keyof T : keyof T];

/**
 * A version of {@linkcode Keyof} that returns only keys with values of type `U`.
 * 
 * @example
 * type R1 = KeyofType<{ a: 1, b: "b", c: 4 }, number>; // "a" | "c"
 */
export type KeyofType<T extends Dict, U> = T extends T
	? keyof {
			[P in keyof T as T[P] extends U ? P : never]: T[P];
		}
	: never;

/**
 * A deep version of {@linkcode KeyofType}.
 */
export type KeyofTypeDeep<T extends Dict | ROList, U> = T extends T ? _KeyofTypeDeep<T, U> : never;

type _KeyofTypeDeep<T extends Dict | ROList, U, _K extends string = ""> = {
	[
		P in keyof T as T extends ROList
			? P extends `${number}`
				? T[P] extends U | Dict | ROList
					? P
					: never
				: never
			: T[P] extends U | Dict | ROList
				? P
				: never
	]: T[P] extends infer TK
		? NextKey<P & string, _K> extends infer N extends string
			? TK extends Dict | ROList
				? _KeyofTypeDeep<TK, U, N>
				: N
			: never
		: never;
} extends infer T
	? T extends ROList
		? T[number]
		: T[keyof T]
	: never;

// ---Internal---
type NextKey<K extends string, _K extends string> = _K extends "" ? K : `${_K}.${K}`;
