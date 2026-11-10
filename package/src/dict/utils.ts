import type { ROList } from "../list";
import type { HasType } from "../other";
import type { KnownTuple } from "../tuple/utils";

/**
 * Types that can be used as keys for an object.
 */
export type DictKey = string | number | symbol;

/**
 * An alias for `Record<K, V>` with defaults.
 */
export type Dict<K extends DictKey = string, V = unknown> = Record<K, V>;

/**
 * Removes the index signature from an object.
 *
 * @example
 * type Config = { foo: string, bar: boolean, [x: string]: string };
 * type KnownConfig = Known<Config>; // { foo: string, bar: boolean }
 */
export type Known<T> = T extends T
	? { [P in keyof T as HasType<DictKey, P> extends true ? never : P]: T[P] }
	: never;

/**
 * Generates a type that suggests a pre-defined list of dictionary keys while accepting any other string or number.
 */
export type SuggestKey<T, S extends boolean = false> =
	Extract<T, DictKey> | (string & {}) | (number & {}) | (S extends true ? never : symbol & {});

/**
 * Prettifies an object.
 *
 * @example
 * type R1 = Readonly<{ a: 1 } | { b: 2 }>; // Readonly<{ a: 1 }> | Readonly<{ b: 2 }>
 * type R2 = Prettify<R1>; // { readonly a: 1 } | { readonly b: 2 }
 */
export type Prettify<T> = { [P in keyof T]: T[P] } & {};

/**
 * A deep version of {@linkcode Prettify}.
 */
export type PrettifyDeep<T> = {
	[P in keyof T]: T[P] extends infer V ? (V extends Dict ? PrettifyDeep<V> : V) : never;
} & {};
