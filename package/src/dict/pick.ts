import type { Suggest } from "../string";
import type { Keyof } from "./keyof";
import type { Dict } from "./utils";

export type LoosePick<T extends Dict, K extends Suggest<Keyof<T>>> = T extends T
	? {
			[P in keyof T as P extends K ? P : never]: T[P];
		}
	: never;

export type StrictPick<T extends Dict, K extends Keyof<T>> = LoosePick<T, K>;

export type LooseOmit<T extends Dict, K extends Suggest<Keyof<T>>> = T extends T
	? {
			[P in keyof T as P extends K ? never : P]: T[P];
		}
	: never;

export type StrictOmit<T extends Dict, K extends Keyof<T>> = LooseOmit<T, K>;
