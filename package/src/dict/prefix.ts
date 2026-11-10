import type { EnsurePrefix, EnsureSuffix, Prefix, Suffix, UnPrefix, UnSuffix } from "../string";
import type { Dict } from "./utils";

/**
 * Adds a prefix to all keys of `T`.
 */
export type PrefixKeys<T, P extends string> = {
	[K in keyof T as K extends string ? Prefix<K, P> : K]: T[K];
};

/**
 * Adds a prefix to all keys of `T`, but only if the key does not already start with the prefix.
 */
export type PrefixKeysEnsure<T, P extends string> = {
	[K in keyof T as K extends string ? EnsurePrefix<K, P> : K]: T[K];
};

/**
 * Removes a prefix from all keys of `T`, if it exists.
 */
export type UnPrefixKeys<T, P extends string> = {
	[K in keyof T as K extends string ? UnPrefix<K, P> : K]: T[K];
};

/**
 * Adds a suffix to all keys of `T`.
 */
export type SuffixKeys<T, S extends string> = {
	[K in keyof T as K extends string ? Suffix<K, S> : K]: T[K];
};

/**
 * Adds a suffix to all keys of `T`, but only if the key does not already end with the suffix.
 */
export type SuffixKeysEnsure<T, S extends string> = {
	[K in keyof T as K extends string ? EnsureSuffix<K, S> : K]: T[K];
};

/**
 * Removes a suffix from all keys of `T`, if it exists.
 */
export type UnSuffixKeys<T, S extends string> = {
	[K in keyof T as K extends string ? UnSuffix<K, S> : K]: T[K];
};
