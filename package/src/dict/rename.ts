import type { Keys } from "./keyof";
import type { Dict, DictKey, Known } from "./utils";

/**
 * Renames a key of `T`.
 *
 * @example
 * type R1 = RenameKey<{rgb: RGB, a: number}, "a", "alpha">; // { rgb: RGB, alpha: number }
 */
export type RenameKey<T, K extends Keys<Known<T>>, N extends DictKey> = T extends T
	? {
			[P in keyof T as P extends K ? N : P]: T[P];
		}
	: never;

/**
 * Renames multiple keys of `T` using a key-to-new-key object.
 *
 * @example
 * type R1 = RenameKeys<{f: string, b: string, c: 4}, {f: "foo", b: "bar"}>; // { foo: string, bar: string, c: 4 }
 */
export type RenameKeys<T, M extends Partial<Dict<Keys<Known<T>>, DictKey>>> = T extends T
	? M extends M
		? {
				[P in keyof T as P extends keyof M ? M[P] & DictKey : P]: T[P];
			}
		: never
	: never;
