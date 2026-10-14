import type { Suggest } from "../string";
import type { Keyof } from "./keyof";
import type { Dict } from "./utils";

/**
 * Similar to the built-in {@linkcode Pick} type, except it lets you pass any keys
 * and it will only pick the keys that actually exist in `T`.
 * 
 * @example
 * type R1 = Pick<{a: 1}, "a" | "b">; // { a: 1, b: unknown }
 * type R2 = LoosePick<{a: 1}, "a" | "b">; // { a: 1 }
 */
export type LoosePick<T extends Dict, K extends Suggest<Keyof<T>>> = T extends T
	? {
			[P in keyof T as P extends K ? P : never]: T[P];
		}
	: never;


/**
 * Similar to the built-in {@linkcode Pick} type, except it works differently when `T` is a union of objects.
 * 
 * @example
 * type R1 = Pick<{a: 1} | {b: 2}, "a">; // { a: unknown } // + Error
 * type R2 = StrictPick<{a: 1} | {b: 2}, "a">; // { a: 1 } | {}
 */
export type StrictPick<T extends Dict, K extends Keyof<T>> = LoosePick<T, K>;



/**
 * Similar to the built-in {@linkcode Omit} type, except it suggests possible keys
 * and it works differently when `T` is a union of objects.
 * 
 * @example
 * type R1 = Omit<{a: 1, b: 2}, "a">; // { b: 2 }
 * type R2 = LooseOmit<{a: 1, b: 2}, "a">; // { b: 2 } // + Auto-completion for 'a'
 * 
 * type R3 = Omit<{a: 1} | {b: 2}, "a">; // {}
 * type R4 = LooseOmit<{a: 1} | {b: 2}, "a">; // {} | {b: 2}
 */
export type LooseOmit<T extends Dict, K extends Suggest<Keyof<T>>> = T extends T
	? {
			[P in keyof T as P extends K ? never : P]: T[P];
		}
	: never;

/**
 * Similar to the built-in {@linkcode Omit} type, except it enforces passing an existing key
 * and it works differently when `T` is a union of objects.
 * 
 * @example
 * type R1 = Omit<{a: 1}, "z">; // {a: 1}
 * type R2 = StrictOmit<{a: 1}, "z">; // {a: 1} // + Error saying 'z' is not an existing key
 * 
 * type R3 = Omit<{a: 1} | {b: 2}, "a">; // {} // + Error
 * type R4 = StrictOmit<{a: 1} | {b: 2}, "a">; // {} | {b: 2}
 * 
 */
export type StrictOmit<T extends Dict, K extends Keyof<T>> = LooseOmit<T, K>;
