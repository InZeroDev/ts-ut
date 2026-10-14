import type { As, NormalizeIndex } from "../_internal";
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

type NegAbs<T extends number> = T extends 0 ? 0 : ToNumber<EnsurePrefix<Stringify<T>, "-">>;

type FOE<T extends ROList, _C extends List = []> =
	T extends Required<T>
		? -1
		: T extends readonly [unknown, ...infer R extends ROList]
			? FOE<R, [..._C, any]>
			: _C["length"];

type SetFOE<T extends ROList, I extends number> = _SetFOE<T, NormalizeIndex<I, T["length"]>>;

type _SetFOE<T extends ROList, I extends number, _I extends List = []> = T extends readonly [
	infer F,
	...infer R,
]
	? I extends _I["length"]
		? [F?, ...Partial<R>]
		: [F, ..._SetFOE<R, I, [..._I, any]>]
	: T;

type MatchTuple<T extends ROList, R extends ROList, D extends number = 0> = MatchRO<
	MatchFOI<T, R, D>,
	R
>;

type MatchFOI<T extends ROList, R extends ROList, D extends number = 0> =
	FOE<R> extends -1
		? BetterRequired<T>
		: SetFOE<BetterRequired<T>, Increment<FOE<R>, D>> extends infer R extends ROList
			? R
			: never;

type MatchRO<T extends ROList, R extends ROList> = Readonly<R> extends R ? Readonly<T> : Mutable<T>;

type BetterRequired<T> = T extends T ? Required<T> : never;

type IsTuple<T> = T extends T
	? Required<T> extends readonly [] | readonly [unknown, ...unknown[]]
		? true
		: false
	: never;
