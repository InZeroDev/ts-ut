import type {
	EnsurePrefix,
	EnsureSuffix,
	Prefix,
	Stringify,
	Suffix,
	UnPrefix,
	UnSuffix,
} from "../string";
import type { Dict } from "./utils";

/**
 * Adds a prefix to all keys of `T`.
 */
export type PrefixKeys<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? Prefix<Stringify<K>, P> : K]: T[K];
};

/**
 * Adds a prefix to all keys of `T`, but only if the key does not already start with the prefix.
 */
export type PrefixKeysEnsure<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? EnsurePrefix<Stringify<K>, P> : K]: T[K];
};

/**
 * Removes a prefix from all keys of `T`, if it exists.
 */
export type UnPrefixKeys<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? UnPrefix<Stringify<K>, P> : K]: T[K];
};

/**
 * Adds a suffix to all keys of `T`.
 */
export type SuffixKeys<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? Suffix<Stringify<K>, S> : K]: T[K];
};

/**
 * Adds a suffix to all keys of `T`, but only if the key does not already end with the suffix.
 */
export type SuffixKeysEnsure<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? EnsureSuffix<Stringify<K>, S> : K]: T[K];
};

/**
 * Removes a suffix from all keys of `T`, if it exists.
 */
export type UnSuffixKeys<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? UnSuffix<Stringify<K>, S> : K]: T[K];
};
