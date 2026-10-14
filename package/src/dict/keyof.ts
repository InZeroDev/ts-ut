import type { ROList } from "../list";
import type { Dict, Known } from "./utils";

export type OgKeyof<T extends Dict> = T extends T ? keyof T : never;

export type OgValueof<T extends Dict> = T extends T ? T[keyof T] : never;

export type Keyof<T extends Dict> = Known<T> extends infer T extends Dict ? keyof T : never;

export type Valueof<T extends Dict | ROList> =
	Known<T> extends infer T extends Dict ? T[keyof T] : never;

export type OgEntryOf<T extends Dict> = T extends T ? [keyof T, T[keyof T]] : never;

export type EntryOf<T extends Dict> =
	Known<T> extends infer T extends Dict ? [keyof T, T[keyof T]] : never;

export type KeyofDeep<
	T extends Dict | ROList,
	R extends "leaf" | "parent" | "both" = "both",
> = T extends T ? _KeyofDeep<T, R> : never;

type _KeyofDeep<
	T extends Dict | ROList,
	R extends "leaf" | "parent" | "both" = "both",
	_K extends string = "",
> = {
	[P in keyof T]: T[P] extends infer TK
		? NextKey<P & string, _K> extends infer N extends string
			? TK extends Dict | ROList
				? (R extends "leaf" ? never : N) | _KeyofDeep<TK, R, N>
				: R extends "parent"
					? never
					: N
			: never
		: never;
}[T extends ROList ? number & keyof T : keyof T];

export type KeyofType<T extends Dict, U> = T extends T
	? keyof {
			[P in keyof T as T[P] extends U ? P : never]: T[P];
		}
	: never;

export type KeyofTypeDeep<T extends Dict | ROList, U> = T extends T ? _KeyofTypeDeep<T, U> : never;

type _KeyofTypeDeep<T extends Dict | ROList, U, _K extends string = ""> = {
	[
		P in keyof T as T extends ROList
			? P extends `${number}`
				? T[P] extends U | Dict | ROList
					? P
					: never
				: never
			: T[P] extends U | Dict | ROList
				? P
				: never
	]: T[P] extends infer TK
		? NextKey<P & string, _K> extends infer N extends string
			? TK extends Dict | ROList
				? _KeyofTypeDeep<TK, U, N>
				: N
			: never
		: never;
} extends infer T
	? T extends ROList
		? T[number]
		: T[keyof T]
	: never;

// ---Internal---
type NextKey<K extends string, _K extends string> = _K extends "" ? K : `${_K}.${K}`;
