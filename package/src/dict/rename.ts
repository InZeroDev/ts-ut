import type { Keyof } from "./keyof";
import type { Dict, DictKey } from "./utils";

/**
 * Renames a key of `T`.
 *
 * @example
 * type R1 = RenameKey<{rgb: RGB, a: number}, "a", "alpha">; // { rgb: RGB, alpha: number }
 */
export type RenameKey<T extends Dict, K extends Keyof<T>, N extends DictKey> = T extends T
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
export type RenameKeys<T extends Dict, M extends Record<Keyof<T>, DictKey>> = T extends T
	? M extends M
		? {
				[P in keyof T as P extends keyof M ? M[P] : P]: T[P];
			}
		: never
	: never;
