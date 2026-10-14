import type { ROList } from "../list";
import type { HasType } from "../other";
import type { KnownTuple } from "../tuple/utils";

export type DictKey = string | number | symbol;

export type Dict<K extends DictKey = string, V = unknown> = Record<K, V>;

export type Known<T extends Dict | ROList> = T extends T
	? T extends ROList
		? KnownTuple<T>
		: { [P in keyof T as HasType<DictKey, P> extends true ? never : P]: T[P] }
	: never;

export type Prettify<T> = { [P in keyof T]: T[P] } & {};

export type PrettifyDeep<T> = {
	[P in keyof T]: T[P] extends infer V ? (V extends Dict | ROList ? PrettifyDeep<V> : V) : never;
} & {};
