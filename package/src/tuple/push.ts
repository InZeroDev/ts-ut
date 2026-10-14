import type { As } from "../_internal";
import type { Mutable } from "../dict";
import type { List, ROList } from "../list";
import type { Increment, ToNumber } from "../number";
import type { IsSubtype } from "../other";
import type { EnsurePrefix, Stringify } from "../string";
import type { NormalizeIndex, Tuple } from "./utils";
import type { IsTuple } from "./validation";

export type Push<T extends ROList, E, S extends boolean = false> = [
	...Required<T>,
	...(IsSubtype<S, true> | IsSubtype<E, ROList> extends true ? As<ROList, E> : [E]),
] extends infer Result extends ROList
	? MatchTuple<Result, T>
	: never;

export type Pop<T extends ROList, N extends number = 1> =
	Required<T> extends readonly [...infer Head extends ROList, ...Tuple<N>]
		? MatchTuple<Head, T>
		: [];

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
