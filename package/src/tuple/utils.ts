import type { List, ROList } from "../list";

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
