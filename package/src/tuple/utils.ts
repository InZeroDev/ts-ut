import type { IsTuple, NormalizeIndex } from "../_internal";
import type { Params } from "../func";
import type { List, ROList } from "../list";
import type { Not } from "../other";

/**
 * Creates a tuple of the given length and parameter type.
 *
 * @example
 * type R1 = Tuple<1>; // [unknown]
 * type RGB = Tuple<3, number>; // [number, number, number]
 */
export type Tuple<L extends number, T = unknown> = L extends L ? _Tuple<L, T> : never;

type _Tuple<L extends number, T, _L extends List = []> = _L["length"] extends L
	? []
	: [T, ..._Tuple<L, T, [..._L, any]>];

/**
 * A readonly version of {@linkcode Tuple}.
 */
export type ROTuple<L extends number = -1, T = unknown> = Readonly<Tuple<L, T>>;

/**
 * A tuple with at least `L` elements.
 *
 * @example
 * type R1 = NonEmptyTuple; // [unknown, ...unknown[]]
 * type R2 = NonEmptyTuple<number>; // [number, ...number[]]
 * type R3 = NonEmptyTuple<number, 2>; // [number, number, ...number[]]
 */
export type NonEmptyTuple<T = unknown, L extends number = 1> = [...Tuple<L, T>, ...T[]];

/**
 * A readonly version of {@linkcode NonEmptyTuple}.
 */
export type NonEmptyROTuple<T = unknown, L extends number = 1> = [
	...ROTuple<L, T>,
	...(readonly T[]),
];

/**
 * Returns the indexes of a tuple.
 *
 * @example
 * type R1 = KeyofTuple<[1, 2, 3]>; // "0" | "1" | "2"
 */
export type KeyofTuple<T extends readonly unknown[]> = Exclude<keyof T, keyof any[]>;

/**
 * Returns the guaranteed elements of a tuple.
 *
 * @example
 * type R1 = KnownTuple<[number, number, ...number[]]>; // [number, number]
 */
export type KnownTuple<T extends ROList> = T extends readonly [infer F, ...infer R]
	? [F, ...KnownTuple<R>]
	: [];

/**
 * Returns a section of a tuple.
 *
 * @remarks Negative indices are supported.
 *
 * @example
 * type MyFunc = (a: string, b: number, c: boolean, d: string) => void;
 * type Params = Parameters<MyFunc>;
 * type NeededParams = Slice<Params, 1, -1>; // [number, boolean]
 */
export type Slice<T extends ROList, S extends number, E extends number = never> = T extends T
	? _Slice<T, NormalizeIndex<S, T["length"]>, NormalizeIndex<E, T["length"]>>
	: never;
type _Slice<
	T extends ROList,
	S extends number,
	E extends number,
	_I extends ROList = [],
	_P extends boolean = false,
> = [_I["length"], [..._I, any]] extends [infer I extends number, infer N extends ROList]
	? T extends readonly [infer F, ...infer R]
		? I extends E
			? []
			: I extends S
				? [F, ..._Slice<R, S, E, N, true>]
				: _P extends true
					? [F, ..._Slice<R, S, E, N, _P>]
					: _Slice<R, S, E, N>
		: never
	: never;

/**
 * Removes duplicate elements from a tuple.
 *
 * @remarks It's better to only use it on strings and numbers.
 *
 * @example
 * type R1 = UniqueTuple<["foo", "foo", "bar", 1, 1, 2]>; // ["foo", "bar", 1, 2]
 */
export type UniqueTuple<T extends ROList> =
	Not<IsTuple<T>> extends true
		? T
		: T extends readonly [infer F, ...infer R]
			? [F] extends [R[number]]
				? UniqueTuple<R>
				: [F, ...UniqueTuple<R>]
			: [];

