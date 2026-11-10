import type { AreEqual, HasType } from "../other";
import type { SuggestKey } from "../string";
import type { Keys, Values } from "./keyof";
import type { Dict, Known } from "./utils";

/**
 * Extracts union members whose specified properties contain at least one of the specified value types.
 *
 * @example
 * type Obj = { a: string } | { a: number | boolean } | { a: null };
 *
 * type R1 = Extract<Obj, { a: string | number }>; // { a: string }
 * type R2 = ExtractByValue<Obj, { a: string | number }>; // { a: string } | { a: number | boolean }
 */
export type ExtractByValue<T, M extends Dict<SuggestKey<Keys<Known<T>>>>> = T extends T
	? Values<{
			[P in keyof M]: P extends keyof T ? HasType<T[P], M[P]> : false;
		}> extends true
		? T
		: never
	: never;

/**
 * Extracts union members whose specified properties exactly match the specified value types.
 *
 * @example
 * type Obj = { a: string } | { a: string | boolean } | { a: null };
 *
 * type R1 = Extract<Obj, { a: string | boolean }>; // { a: string } | { a: string | boolean }
 * type R2 = ExtractByExactValue<Obj, { a: string | boolean }>; // { a: string | boolean }
 */
export type ExtractByExactValue<T, M extends Dict<SuggestKey<Keys<Known<T>>>>> = T extends T
	? Values<{
			[P in keyof M]: P extends keyof T ? AreEqual<T[P], M[P]> : false;
		}> extends true
		? T
		: never
	: never;
