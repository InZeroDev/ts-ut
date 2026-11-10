import type { Suggest } from "../string";
import type { Keys } from "./keyof";
import type { Dict, Known, SuggestKey } from "./utils";

/**
 * A distributive/loose version of the built-in {@linkcode Pick}.
 *
 * @example
 * type R1 = Pick<{a: 1}, "a" | "b">; // { a: 1, b: unknown }
 * type R2 = LoosePick<{a: 1}, "a" | "b">; // { a: 1 }
 */
export type LoosePick<T, K extends SuggestKey<Keys<Known<T>>>> = T extends T
	? {
			[P in keyof T as P extends K ? P : string extends P ? K : never]: T[P];
		}
	: never;

/**
 * A distributive version of the built-in {@linkcode Pick}.
 *
 * @example
 * type R1 = Pick<{a: 1} | {b: 2}, "a">; // { a: unknown } // + Error
 * type R2 = StrictPick<{a: 1} | {b: 2}, "a">; // { a: 1 } | {}
 */
export type StrictPick<T, K extends Keys<T>> = LoosePick<T, K>;

/**
 * A distributive version of the built-in {@linkcode Omit}.
 *
 * @example
 * type R1 = Omit<{a: 1, b: 2}, "a">; // { b: 2 }
 * type R2 = LooseOmit<{a: 1, b: 2}, "a">; // { b: 2 } // + Auto-completion for 'a'
 *
 * type R3 = Omit<{a: 1} | {b: 2}, "a">; // {}
 * type R4 = LooseOmit<{a: 1} | {b: 2}, "a">; // {} | {b: 2}
 */
export type LooseOmit<T, K extends SuggestKey<Keys<Known<T>>>> = T extends T
	? {
			[P in keyof T as P extends K ? never : P]: T[P];
		}
	: never;

/**
 * A distributive/strict version of the built-in {@linkcode Omit}.
 *
 * @example
 * type R1 = Omit<{a: 1}, "z">; // {a: 1}
 * type R2 = StrictOmit<{a: 1}, "z">; // {a: 1} // + Error saying 'z' is not an existing key
 *
 * type R3 = Omit<{a: 1} | {b: 2}, "a">; // {} // + Error
 * type R4 = StrictOmit<{a: 1} | {b: 2}, "a">; // {} | {b: 2}
 *
 */
export type StrictOmit<T, K extends Keys<T>> = LooseOmit<T, K>;
