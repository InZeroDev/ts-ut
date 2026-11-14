import type { IsOptionalKey } from "../_internal";
import type { HasType, IsSubtype, Not } from "../other";
import type { Suggest } from "../string";
import type { Keys } from "./keyof";
import type { Dict, DictKey, Known, SuggestKey } from "./utils";

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

/**
 * Pick optional properties of `T`.
 *
 * @example
 * type R1 = PickOptional<{ a: 1, b: 2, c?: 4 }>; // { c?: 4 }
 */
export type PickOptional<T> = {
	[P in keyof T as IsOptionalKey<T, P> extends true ? P : never]: T[P];
};

/**
 * Recursively pick optional properties of `T`.
 *
 * @example
 * type Input = { a?: 1, b: { c?: 4, d: 5 } }
 *
 * type R1 = PickOptional<Input>; // { a?: 1 }
 * type R2 = PickOptionalDeep<Input>; // { a?: 2, b: { c?: 4 } }
 */
export type PickOptionalDeep<T> = {
	[
		P in keyof T as IsOptionalKey<T, P> | HasType<T[P], Dict> extends false ? never : P
	]: T[P] extends infer TP ? (TP extends Dict ? PickOptionalDeep<TP> : TP) : never;
} & {};

/**
 * Pick required properties of `T`.
 *
 * @example
 * type R1 = PickRequired<{ a: 1, b: 2, c?: 4 }>; // { a: 1, b: 2 }
 */
export type PickRequired<T> = {
	[P in keyof T as IsOptionalKey<T, P> extends true ? never : P]: T[P];
};

/**
 * Recursively pick required properties of `T`.
 *
 * @example
 * type Input = { a?: 1, b: { c?: 4, d: 5 } }
 *
 * type R1 = PickRequired<Input>; // { b: { c?: 4, d: 5 } }
 * type R2 = PickRequiredDeep<Input>; // { b: { d: 5 } }
 */
export type PickRequiredDeep<T> = {
	[
		P in keyof T as Not<IsOptionalKey<T, P>> | HasType<T[P], Dict> extends false ? never : P
	]: T[P] extends infer TP ? (TP extends Dict ? PickRequiredDeep<TP> : TP) : never;
} & {};
