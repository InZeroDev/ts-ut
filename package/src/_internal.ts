import type { Mutable } from "./dict";
import type { List, ROList } from "./list";
import type { Decrement, Increment, ToNumber } from "./number";
import type { AreEqual, IsAny, IsNever, IsSubtype, IsUnknown } from "./other";
import type { EnsurePrefix, Stringify } from "./string";

export type IsNegative<T extends string | number> = T extends T
	? StartsWith<Stringify<T>, "-"> extends true
		? true
		: false
	: never;

export type StartsWith<T extends string, P extends string> = T extends `${P}${string}`
	? true
	: false;

export type As<T, U> = Extract<U, T>;

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

export type NegAbs<T extends number> = T extends 0 ? 0 : ToNumber<EnsurePrefix<Stringify<T>, "-">>;

export type FOE<T extends ROList, _C extends List = []> =
	T extends Required<T>
		? -1
		: T extends readonly [unknown, ...infer R extends ROList]
			? FOE<R, [..._C, any]>
			: _C["length"];

export type SetFOE<T extends ROList, I extends number> = _SetFOE<T, NormalizeIndex<I, T["length"]>>;

export type _SetFOE<T extends ROList, I extends number, _I extends List = []> = T extends readonly [
	infer F,
	...infer R,
]
	? I extends _I["length"]
		? [F?, ...Partial<R>]
		: [F, ..._SetFOE<R, I, [..._I, any]>]
	: T;

export type MatchTuple<T extends ROList, R extends ROList, D extends number = 0> = MatchRO<
	MatchFOI<T, R, D>,
	R
>;

export type MatchFOI<T extends ROList, R extends ROList, D extends number = 0> =
	FOE<R> extends -1
		? BetterRequired<T>
		: SetFOE<BetterRequired<T>, Increment<FOE<R>, D>> extends infer R extends ROList
			? R
			: never;

export type MatchRO<T extends ROList, R extends ROList> =
	Readonly<R> extends R ? Readonly<T> : Mutable<T>;

type BetterRequired<T> = T extends T ? Required<T> : never;

export type IsTuple<T> = T extends T
	? Required<T> extends readonly [] | readonly [unknown, ...unknown[]]
		? true
		: false
	: never;

	export type IsPrimitive<T> = IsAny<T> | IsUnknown<T> | IsNever<T> extends false
	? _IsPrimitive<_Wrap<T>>
	: false;

type _IsPrimitive<T> = T extends T
	? AreEqual<T, [string]> | AreEqual<T, [number]> | AreEqual<T, [boolean]> extends false
		? false
		: true
	: never;

type _Wrap<T> = (T extends T ? [T] : never) extends infer R
	? IsSubtype<[true], R> | IsSubtype<[false], R> extends true
		? [boolean] | Exclude<R, [boolean]>
		: R
	: never;