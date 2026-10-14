import type { ROList } from "../list";
import type { IsNever } from "../other";
import type { Keyof, KeyofDeep } from "./keyof";
import type { Dict } from "./utils";

export type Get<T extends Dict, K extends Keyof<T>> = T extends T
	? K extends keyof T
		? T[K]
		: never
	: never;

export type GetDeep<T extends Dict | ROList, K extends KeyofDeep<T>> = T extends T
	? K extends K
		? Next<K> extends [infer N extends string, infer R]
			? _GetDeep<T, N, R>
			: never
		: never
	: never;

type _GetDeep<T extends Dict | ROList, N extends string, R> = {
	[P in keyof (IsNever<R> extends false ? Required<T> : T)]: P extends N
		? IsNever<R> extends true
			? T[P]
			: // @ts-expect-error
				GetDeep<T[P], R>
		: never;
} extends infer R
	? R extends ROList
		? R[number]
		: R[keyof R]
	: never;

// ---Internal---
type Next<K extends string> = K extends `${infer N extends string}.${infer R extends string}`
	? [N, R]
	: [K, never];
