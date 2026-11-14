import type { Keys } from "./keyof";
import type { LooseOmit } from "./pick";
import type { Dict, Known, Prettify } from "./utils";

/**
 * Makes all properties of `T` mutable.
 */
export type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

/**
 * Makes all properties of `T` required (deep).
 */
export type RequiredDeep<T> = {
	[P in keyof T]-?: RequiredDeep<T[P]>;
} & {};

/**
 * Makes all properties of `T` optional (deep).
 */
export type PartialDeep<T> = {
	[P in keyof T]?: PartialDeep<T[P]>;
} & {};

/**
 * Makes all properties of `T` readonly (deep).
 */
export type ReadonlyDeep<T> = {
	readonly [P in keyof T]: ReadonlyDeep<T[P]>;
} & {};

/**
 * Makes all properties of `T` mutable (deep).
 */
export type MutableDeep<T> = {
	-readonly [P in keyof T]: MutableDeep<T[P]>;
} & {};

/**
 * Makes a property of `T` required.
 */
export type RequiredKey<T, K extends Keys<Known<T>>> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & LooseOmit<T, K>
>;

/**
 * Makes a property of `T` optional.
 */
export type PartialKey<T, K extends Keys<Known<T>>> = Prettify<
	{
		[P in keyof T as P extends K ? P : never]?: T[P];
	} & LooseOmit<T, K>
>;

/**
 * Makes a property of `T` readonly.
 */
export type ReadonlyKey<T, K extends Keys<Known<T>>> = Prettify<
	{
		readonly [P in keyof T as P extends K ? P : never]: T[P];
	} & LooseOmit<T, K>
>;

/**
 * Makes a property of `T` mutable.
 */
export type MutableKey<T, K extends Keys<Known<T>>> = Prettify<
	{
		-readonly [P in keyof T as P extends K ? P : never]: T[P];
	} & LooseOmit<T, K>
>;
