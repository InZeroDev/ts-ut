import type { Keyof } from "./keyof";
import type { LooseOmit } from "./pick";
import type { Dict, Prettify } from "./utils";

export type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export type RequiredDeep<T> = {
	[P in keyof T]-?: T[P] extends Dict ? RequiredDeep<T[P]> : T[P];
};

export type PartialDeep<T> = {
	[P in keyof T]?: T[P] extends Dict ? PartialDeep<T[P]> : T[P];
};

export type ReadonlyDeep<T> = {
	readonly [P in keyof T]: T[P] extends Dict ? ReadonlyDeep<T[P]> : T[P];
};

export type MutableDeep<T> = {
	-readonly [P in keyof T]: T[P] extends Dict ? MutableDeep<T[P]> : T[P];
};

export type RequiredKey<T extends Dict, K extends Keyof<T>> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & LooseOmit<T, K>
>;

export type PartialKey<T extends Dict, K extends Keyof<T>> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]?: T[P];
	} & LooseOmit<T, K>
>;

export type ReadonlyKey<T extends Dict, K extends Keyof<T>> = Prettify<
	{
		readonly [P in keyof T as P extends K ? P : never]: T[P];
	} & LooseOmit<T, K>
>;

export type MutableKey<T extends Dict, K extends Keyof<T>> = Prettify<
	{
		-readonly [P in keyof T as P extends K ? P : never]: T[P];
	} & LooseOmit<T, K>
>;
