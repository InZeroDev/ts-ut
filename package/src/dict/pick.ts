import type { IsOptionalKey, IsReadonlyKey, SplitDeepKey, UnionToIntersection } from "../_internal";
import type {
	AreEqual,
	AreNotEqual,
	HasType,
	IsNever,
	IsNotSubtype,
	IsSubtype,
	Not,
} from "../other";
import type { ExcludeIfStartsWith, Join, Prefix, Stringify, Suggest } from "../string";
import type { Keys, KeysDeep } from "./keyof";
import type { Dict, DictKey, Known, Prettify, PrettifyDeep, SuggestKey } from "./utils";

/**
 * Pick deeply nested properties using dot-separated paths.
 *
 * @example
 * type Input = { a: 1, b: { c: 4, cc: 500 }, e: { door: { f: 5, ff: true } } };
 *
 * type Result = PickDeep<Input, "a" | "b.c" | "e.door.ff">; // { a: 1, b: { c: 4 }, e: { doo: { ff: true } } }
 */
export type PickDeep<T, K extends SuggestKey<KeysDeep<Known<T>>>> = T extends T
	? PrettifyDeep<
			UnionToIntersection<
				K extends string | number
					? SplitDeepKey<K> extends [infer H extends string, infer R]
						? {
								[
									P in keyof T as HasType<DictKey, P> extends true ? H : P extends H ? P : never
								]: IsNever<R> extends true ? T[P] : PickDeep<T[P], R & DictKey>;
							}
						: never
					: never
			>
		>
	: never;

/**
 * Omit deeply nested properties using dot-separated paths
 *
 * @example
 * type Input = { a: 1, b: { c: 4, cc: 500 }, e: { door: { f: 5, ff: true } } };
 *
 * type Result = OmitDeep<Input, "a" | "b.c" | "e.door.ff">; // { b: { cc: 500 }, e: { doo: { f: 5 } } }
 */
export type OmitDeep<T, K extends SuggestKey<KeysDeep<Known<T>>>> = PickDeep<
	T,
	Filter<KeysDeep<T>, Stringify<K>>
>;

/**
 * Exclude keys if their parents, children or they themselves are included in `KeysToOmit`
 */
type Filter<T extends string, K extends string, _C extends string = T> = T extends T
	? IsSubtype<T, K> | HasType<Parents<T>, K> | HasChildren<T, _C> extends false
		? T
		: never
	: never;

type HasChildren<T extends string, C extends string> = (
	C extends `${T}.${string}` ? true : false
) extends false
	? false
	: true;

type Parents<T extends string> = T extends `${infer P extends string}.${infer R extends string}`
	? P | `${P}.${Parents<R>}`
	: never;

/* -------------------------------------------------------------------------- */

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
export type PickOptional<T> = T extends T
	? {
			[P in keyof T as IsOptionalKey<T, P> extends true ? P : never]: T[P];
		} & {}
	: never;

/**
 * Recursively pick optional properties of `T`.
 *
 * @example
 * type Input = { a?: 1, b: { c?: 4, d: 5 } }
 *
 * type R1 = PickOptional<Input>; // { a?: 1 }
 * type R2 = PickOptionalDeep<Input>; // { a?: 2, b: { c?: 4 } }
 */
export type PickOptionalDeep<T> = T extends T
	? {
			[
				P in keyof T as IsOptionalKey<T, P> | HasType<T[P], Dict> extends false ? never : P
			]: T[P] extends infer TP ? (TP extends Dict ? PickOptionalDeep<TP> : TP) : never;
		} & {}
	: never;

/**
 * Pick required properties of `T`.
 *
 * @example
 * type R1 = PickRequired<{ a: 1, b: 2, c?: 4 }>; // { a: 1, b: 2 }
 */
export type PickRequired<T> = T extends T
	? {
			[P in keyof T as IsOptionalKey<T, P> extends true ? never : P]: T[P];
		} & {}
	: never;

/**
 * Recursively pick required properties of `T`.
 *
 * @example
 * type Input = { a?: 1, b: { c?: 4, d: 5 } }
 *
 * type R1 = PickRequired<Input>; // { b: { c?: 4, d: 5 } }
 * type R2 = PickRequiredDeep<Input>; // { b: { d: 5 } }
 */
export type PickRequiredDeep<T> = T extends T
	? {
			[
				P in keyof T as Not<IsOptionalKey<T, P>> | HasType<T[P], Dict> extends false ? never : P
			]: T[P] extends infer TP ? (TP extends Dict ? PickRequiredDeep<TP> : TP) : never;
		} & {}
	: never;

/**
 * Pick readonly properties of `T`.
 *
 * @example
 * type R1 = PickReadonly<{ a: 1, readonly c: 4 }>; // { readonly c: 4 }
 */
export type PickReadonly<T> = T extends T
	? {
			[P in keyof T as IsReadonlyKey<T, P> extends true ? P : never]: T[P];
		} & {}
	: never;

/**
 * Recursively pick readonly properties of `T`.
 *
 * @example
 * type Input = { readonly a: 1; b: { readonly c: 4, d: 5 }, e: 6 };
 *
 * type R1 = PickReadonly<Input>; // { readonly a: 1 }
 * type R2 = PickReadonlyDeep<Input>; // { readonly a: 1, b: { readonly c: 4 } }
 */
export type PickReadonlyDeep<T> = T extends T
	? {
			[
				P in keyof T as IsReadonlyKey<T, P> | HasType<T[P], Dict> extends false ? never : P
			]: T[P] extends infer TP ? (TP extends Dict ? PickReadonlyDeep<TP> : TP) : never;
		} & {}
	: never;

/**
 * Pick mutable properties of `T`.
 *
 * @example
 * type R1 = PickMutable<{ a: 1, readonly c: 4 }>; // { a: 1 }
 */
export type PickMutable<T> = T extends T
	? {
			[P in keyof T as IsReadonlyKey<T, P> extends true ? never : P]: T[P];
		} & {}
	: never;

/**
 * Recursively pick mutable properties of `T`.
 *
 * @example
 * type Input = { readonly a: 1; b: { readonly c: 4, d: 5 }, e: 6 };
 *
 * type R1 = PickMutable<Input>; // { b: { readonly c: 4, d: 5 }, e: 6 }
 * type R2 = PickMutableDeep<Input>; // { b: { d: 5 }, e: 6 }
 */
export type PickMutableDeep<T> = T extends T
	? {
			[
				P in keyof T as Not<IsReadonlyKey<T, P>> | HasType<T[P], Dict> extends false ? never : P
			]: T[P] extends infer TP ? (TP extends Dict ? PickMutableDeep<TP> : TP) : never;
		} & {}
	: never;
