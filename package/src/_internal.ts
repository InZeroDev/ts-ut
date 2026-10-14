import type { ROList } from "./list";
import type { Decrement, Increment } from "./number";
import type { Stringify } from "./string";

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
