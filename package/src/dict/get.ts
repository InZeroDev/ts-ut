import type { IsNegative, IsNumber, IsTuple } from "../_internal";
import type { AreEqual, HasType, IsNever, IsSubtype, Not } from "../other";
import type { Stringify } from "../string";
import type { Keys, KeysDeep, Values } from "./keyof";
import type { Merge } from "./merge";
import type { Dict, Known, Prettify, SuggestKey } from "./utils";

/**
 * An alias for `Obj['Key']`.
 *
 * @example
 * type R1 = Get<{ a: 1, b: 2 }, 'a'>; // 1
 */
export type Get<T, K extends SuggestKey<Keys<Known<T>>>> = T extends T
	? K extends keyof T
		? T[K]
		: never
	: never;

/**
 * Set a value in an object.
 *
 * @remarks If the key doesn't exist, it will be added.
 *
 * @example
 * type R1 = Set<{ readonly c?: 1 }, 'c', 4>; // { readonly c?: 4 }
 *
 * type R2 = Set<{ a: 1 }, 'b', 2>; // { a: 1, b: 2 }
 */
export type Set<T, K extends SuggestKey<Keys<Known<T>>>, V> = T extends T
	? Prettify<{ [P in K]: V } & { [P in keyof T]: P extends K ? V : T[P] }>
	: never;

/**
 * Get a deeply nested value using dot-notation.
 *
 * @remarks Set `O` to `true` to preserve `undefined` if one of the parents is optional.
 *
 * @example
 * type Obj = { a: { b?: { c: 1 } } };
 *
 * type R1 = GetDeep<Obj, 'a.b.c'>; // 1
 * type R2 = GetDeep<Obj, 'a.b.c', true>; // 1 | undefined
 */
export type GetDeep<
	T,
	K extends SuggestKey<KeysDeep<Known<T>>, true>,
	O extends boolean = false,
> = T extends T
	? K extends K
		? Next<K> extends [infer N extends string, infer R]
			? _GetDeep<T, N, R, O>
			: never
		: never
	: never;

type _GetDeep<T, N extends string, R, O extends boolean> = Values<{
	[P in keyof (O extends true ? T : Required<T>)]: P extends N
		? IsNever<R> extends true
			? T[P & keyof T]
			: GetDeep<T[P & keyof T], R & string, O>
		: never;
}>;

/**
 * Set a deeply nested value using dot-notation.
 *
 * @remarks
 * - If a parent key doesn't exist, it will be created as an empty object.
 * - If a parent key is not an object type, it won't be modified.
 *
 * @example
 * type R1 = SetDeep<{ a: { b: { c: 1 } } }, 'a.b.c', 4>; // { a: { b: { c: 4 } } }
 *
 * type R2 = SetDeep<{}, 'a.b.c', 4>; // { a: { b: { c: 4 } } }
 * type R3 = SetDeep<{ a: boolean }, 'a.b.c', 4>; // { a: boolean }
 */
export type SetDeep<T, K extends SuggestKey<KeysDeep<Known<T>>, true>, V> = T extends T
	? K extends K
		? Next<K> extends [infer N extends string, infer R]
			? Prettify<_SetDeep<Merge<{ [P in N]: IsNever<R> extends true ? V : {} }, T>, N, R, V>>
			: never
		: never
	: never;

type _SetDeep<T, N extends string, R, V> = {
	[P in keyof T]: P extends N
		? IsNever<R> extends true
			? V
			: Exclude<T[P], Dict> | SetDeep<Extract<T[P], Dict>, R & string, V>
		: T[P];
};

// ---Internal---
type Next<K extends string | number> =
	Stringify<K> extends `${infer N extends string}.${infer R extends string}` ? [N, R] : [K, never];
