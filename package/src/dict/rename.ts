import type { Keyof } from "./keyof";
import type { Dict, DictKey } from "./utils";

export type RenameKey<T extends Dict, K extends Keyof<T>, N extends DictKey> = T extends T
	? {
			[P in keyof T as P extends K ? N : P]: T[P];
		}
	: never;

export type RenameKeys<T extends Dict, M extends Record<Keyof<T>, DictKey>> = T extends T
	? M extends M
		? {
				[P in keyof T as P extends keyof M ? M[P] : P]: T[P];
			}
		: never
	: never;
