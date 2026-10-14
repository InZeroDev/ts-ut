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

export type PrefixKeys<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? Prefix<Stringify<K>, P> : K]: T[K];
};

export type PrefixKeysEnsure<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? EnsurePrefix<Stringify<K>, P> : K]: T[K];
};

export type UnPrefixKeys<T extends Dict, P extends string> = {
	[K in keyof T as K extends string | number ? UnPrefix<Stringify<K>, P> : K]: T[K];
};

export type SuffixKeys<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? Suffix<Stringify<K>, S> : K]: T[K];
};

export type SuffixKeysEnsure<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? EnsureSuffix<Stringify<K>, S> : K]: T[K];
};

export type UnSuffixKeys<T extends Dict, S extends string> = {
	[K in keyof T as K extends string | number ? UnSuffix<Stringify<K>, S> : K]: T[K];
};
