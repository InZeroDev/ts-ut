import type { IsNegative } from "../_internal";
import type { UnPrefix, Stringify } from "../string";
import type { ToNumber } from "./utils";

type Abs<T extends string | number> =
	UnPrefix<Stringify<T>, "-"> extends infer R extends string
		? T extends string
			? R
			: ToNumber<R>
		: never;

type IncrementMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

/**
 * A type that represents the digits 0 through 9.
 */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type IncrementSpecialCases = {
	"9": "10";
	"-1": "0";
};

type DecrementMap = {
	1: 0;
	2: 1;
	3: 2;
	4: 3;
	5: 4;
	6: 5;
	7: 6;
	8: 7;
	9: 8;
	0: 9;
};

type IncrementByOne<T extends string> = T extends keyof IncrementSpecialCases
	? IncrementSpecialCases[T]
	: IsNegative<T> extends true
		? `-${DecrementByOne<Abs<T>>}`
		: T extends `${infer First}${Digit}`
			? T extends `${First}${infer D extends Digit}`
				? D extends 9
					? `${IncrementByOne<First>}0`
					: `${First}${IncrementMap[D]}`
				: never
			: never;

type DecrementSpecialCases = {
	"0": "-1";
};

type DecrementByOne<T extends string> = T extends keyof DecrementSpecialCases
	? DecrementSpecialCases[T]
	: IsNegative<T> extends true
		? `-${IncrementByOne<Abs<T>>}`
		: T extends `${infer First}${Digit}`
			? T extends `${First}${infer D extends Digit}`
				? D extends 0
					? First extends "1"
						? "9"
						: `${DecrementByOne<First>}9`
					: `${First}${DecrementMap[D]}`
				: never
			: never;

type IncrementByTenSpecialCases = {
	"-1": "9";
	"-2": "8";
	"-3": "7";
	"-4": "6";
	"-5": "5";
	"-6": "4";
	"-7": "3";
	"-8": "2";
	"-9": "1";
	"-10": "0";
};

type IncrementByTen<T extends string> = T extends keyof IncrementByTenSpecialCases
	? IncrementByTenSpecialCases[T]
	: IsNegative<T> extends true
		? `-${DecrementByTen<Abs<T>>}`
		: T extends `${infer First}${Digit}`
			? T extends `${First}${infer D extends Digit}`
				? First extends "" | "-"
					? `1${D}`
					: `${IncrementByOne<First>}${D}`
				: never
			: never;

type DecrementByTenSpecialCases = {
	"1": "-9";
	"2": "-8";
	"3": "-7";
	"4": "-6";
	"5": "-5";
	"6": "-4";
	"7": "-3";
	"8": "-2";
	"9": "-1";
	"10": "0";
};

type DecrementByTen<T extends string> = T extends keyof DecrementByTenSpecialCases
	? DecrementByTenSpecialCases[T]
	: IsNegative<T> extends true
		? `-${IncrementByTen<Abs<T>>}`
		: T extends `${infer First}${Digit}`
			? T extends `${First}${infer D extends Digit}`
				? First extends "" | "-"
					? `9${D}`
					: First extends "1"
						? `${D}`
						: `${DecrementByOne<First>}${D}`
				: never
			: never;

type _Increment<T extends string, C extends string> = C extends "0"
	? T
	: C extends `${string}${Digit}${Digit}`
		? _Increment<IncrementByTen<T>, DecrementByTen<C>>
		: C extends `${string}${Digit}`
			? _Increment<IncrementByOne<T>, DecrementByOne<C>>
			: never;

type _Decrement<T extends string, C extends string> = C extends "0"
	? T
	: C extends `${string}${Digit}${Digit}`
		? _Decrement<DecrementByTen<T>, DecrementByTen<C>>
		: C extends `${string}${Digit}`
			? _Decrement<DecrementByOne<T>, DecrementByOne<C>>
			: never;

/**
 * Increments a number by a given amount.
 *
 * @example
 * type R1 = Increment<1>; // 2
 * type R2 = Increment<1, 2>; // 3
 * type R3 = Increment<1, -1>; // 0
 * type R4 = Increment<-1, 1>; // 0
 * type R5 = Increment<-1, -1>; // -2
 */
export type Increment<N extends number, C extends number = 1> = (
	IsNegative<C> extends true
		? _Decrement<Stringify<N>, Abs<Stringify<C>>>
		: _Increment<Stringify<N>, Stringify<C>>
) extends infer R extends string
	? ToNumber<R>
	: never;

/**
 * Decrements a number by a given amount.
 *
 * @example
 * type R1 = Decrement<1>; // 0
 * type R2 = Decrement<1, 2>; // -1
 * type R3 = Decrement<1, -1>; // 2
 * type R4 = Decrement<-1, 1>; // -2
 * type R5 = Decrement<-1, -1>; // 0
 */
export type Decrement<N extends number, C extends number = 1> = (
	IsNegative<C> extends true
		? _Increment<Stringify<N>, Abs<Stringify<C>>>
		: _Decrement<Stringify<N>, Stringify<C>>
) extends infer R extends string
	? ToNumber<R>
	: never;
