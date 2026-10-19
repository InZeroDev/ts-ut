import type { As, IsTuple, MatchTuple, NegAbs, NormalizeIndex } from "../_internal";
import type { Mutable } from "../dict";
import type { List, ROList } from "../list";
import type { Increment, ToNumber } from "../number";
import type { IsSubtype } from "../other";
import type { EnsurePrefix, Stringify } from "../string";
import type { Tuple } from "./utils";

/**
 * Pushes an element to the end of a tuple.
 *
 * @remarks The tuple's shape is preserved.
 *
 * @example
 * type R1 = Push<[1, 2, 3], 4>; // [1, 2, 3, 4]
 * type R2 = Push<[1, 2, 3?], 4>; // [1, 2, 3?, 4?]
 */
export type Push<T extends ROList, E, S extends boolean = false> = [
	...Required<T>,
	...(IsSubtype<S, true> | IsSubtype<E, ROList> extends true ? As<ROList, E> : [E]),
] extends infer Result extends ROList
	? MatchTuple<Result, T>
	: never;

/**
 * Pops an element from the end of a tuple.
 *
 * @example
 * type R1 = Pop<[1, 2, 3]>; // [1, 2]
 * type R2 = Pop<[1, 2, 3?]>; // [1, 2]
 */
export type Pop<T extends ROList, N extends number = 1> =
	Required<T> extends readonly [...infer Head extends ROList, ...Tuple<N>]
		? MatchTuple<Head, T>
		: [];

/**
 * Adds an element to the beginning of a tuple.
 *
 * @example
 * type R1 = Unshift<[1, 2, 3], 4>; // [4, 1, 2, 3]
 * type R2 = Unshift<[1, 2, 3?], 4>; // [4, 1, 2, 3?]
 */
export type Unshift<T extends ROList, E, S extends boolean = false> = [
	...(IsSubtype<S, true> | IsSubtype<E, ROList> extends true ? As<ROList, E> : [E]),
	...Required<T>,
] extends infer Result extends ROList
	? MatchTuple<
			Result,
			T,
			IsSubtype<S, true> | IsTuple<E> extends true ? As<ROList, E>["length"] : 1
		>
	: never;

/**
 * Removes an element from the beginning of a tuple.
 *
 * @example
 * type R1 = Shift<[1, 2, 3]>; // [2, 3]
 * type R2 = Shift<[1, 2, 3?]>; // [2, 3?]
 */
export type Shift<T extends ROList, N extends number = 1> =
	Required<T> extends readonly [...Tuple<N>, ...infer Rest extends ROList]
		? MatchTuple<Rest, T, NegAbs<N>>
		: [];

// ---Internal---

