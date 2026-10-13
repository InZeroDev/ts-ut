import type { Stringify } from "./string";

export type IsNegative<T extends string | number> = T extends T
	? StartsWith<Stringify<T>, "-"> extends true
		? true
		: false
	: never;

export type StartsWith<T extends string, P extends string> = T extends `${P}${string}` ? true : false;

export type As<T, U> = Extract<U, T>;