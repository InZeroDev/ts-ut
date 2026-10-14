import type { IsNegative } from "../_internal";
import type { List, ROList } from "../list";
import type { Decrement, Increment } from "../number";

export type Tuple<L extends number, T = unknown> = L extends L ? _Tuple<L, T> : never;

type _Tuple<L extends number, T, _L extends List = []> = _L["length"] extends L
	? []
	: [T, ..._Tuple<L, T, [..._L, any]>];

export type ROTuple<L extends number = -1, T = unknown> = Readonly<Tuple<L, T>>;

export type NonEmptyTuple<T = unknown, L extends number = 1> = [...Tuple<L, T>, ...T[]];

export type NonEmptyROTuple<T = unknown, L extends number = 1> = [
	...ROTuple<L, T>,
	...(readonly T[]),
];

export type KeyofTuple<T extends readonly unknown[]> = Exclude<keyof T, keyof any[]>;

export type NormalizeIndex<I extends number, L extends number | ROList> = (
	L extends ROList ? L["length"] : L
) extends infer Length extends number
	? IsNegative<I> extends false
		? IsNegative<Decrement<I, Length>> extends false
			? Decrement<Length>
			: I
		: Increment<Length, I> extends infer Result extends number
			? IsNegative<Result> extends true
				? 0
				: Result
			: never
	: never;

export type KnownTuple<T extends ROList> = T extends readonly [infer F, ...infer R]
	? [F, ...KnownTuple<R>]
	: [];
