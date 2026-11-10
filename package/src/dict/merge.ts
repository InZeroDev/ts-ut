import type { HasType, IsSubtype } from "../other";
import type { Dict, Prettify, PrettifyDeep } from "./utils";

/**
 * Merge two objects, keeping all keys from both. On conflict, `B` wins.
 *
 * @remarks Set `P` to true to use `A`'s modifiers.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB1 = MergeUnion<A, B>; // { a: "<>", b: 2, c: 4 }
 * type AB2 = MergeUnion<A, B, true>; // { readonly a: "<>", b: 2, c: 4 }
 */
export type MergeUnion<A, B, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergeUnionPreserve<A, B> : _MergeUnion<A, B>>
		: never
	: never;

type _MergeUnion<A, B> = _MergeInt<A, B> & MergeSymDiff<A, B>;

type _MergeUnionPreserve<A, B> = _MergeIntPreserve<A, B> & MergeSymDiff<A, B>;

/**
 * Merge two objects deeply, keeping all keys from both. On conflict, values are recursively merged if both are objects, otherwise `B` wins.
 *
 * @remarks
 * - Set `P` to true to use `A`'s modifiers.
 * - Non-object members of `A` are discarded while those of `B` are preserved.
 *
 * @example
 * type A = { readonly a: 1, b: { c: 1, d: "b" } };
 * type B = { a: 99, b: { c: 4 } };
 *
 * type AB1 = MergeUnion<A, B>; // { a: 99, b: { c: 4 } }
 * type AB2 = MergeUnionDeep<A, B>; // { a: 99, b: { c: 4, d: "b" } }
 */
export type MergeUnionDeep<A, B, P extends boolean = false> = A extends A
	? B extends B
		? PrettifyDeep<P extends true ? _MergeUnionDeepPreserve<A, B> : _MergeUnionDeep<A, B>>
		: never
	: never;

type _MergeUnionDeep<A, B> = _MergeIntDeep<A, B> & MergeSymDiffDeep<A, B>;

type _MergeUnionDeepPreserve<A, B> = _MergeIntDeepPreserve<A, B> & MergeSymDiffDeep<A, B>;

/**
 * Merge two objects, keeping all keys from `A`. On conflict, `B` wins.
 *
 * @remarks Set `P` to true to use `A`'s modifiers.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", extra: "ignored" };
 *
 * type AB1 = MergePatch<A, B>; // { a: "<>", b: 2 }
 * type AB2 = MergePatch<A, B, true>; // { readonly a: "<>", b: 2 }
 */
export type MergePatch<A, B, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergePatchPreserve<A, B> : _MergePatch<A, B>>
		: never
	: never;

type _MergePatch<A, B> = _MergeInt<A, B> & MergeDiff<A, B>;

type _MergePatchPreserve<A, B> = _MergeIntPreserve<A, B> & MergeDiff<A, B>;

/**
 * Merge two objects deeply, keeping all keys from `A`. On conflict, values are recursively merged if both are objects, otherwise `B` wins.
 *
 * @remarks
 * - Set `P` to true to use `A`'s modifiers.
 * - Non-object members of `A` are discarded while those of `B` are preserved.
 *
 * @example
 * type A = { a: 1, b: { c: 1, d: "b" } };
 * type B = { a: 99, extra: "key", b: { c: 4, extra: "key" } };
 *
 * type AB1 = MergePatch<A, B>; // { a: 99, b: { c: 4, extra: "key" } }
 * type AB2 = MergePatchDeep<A, B>; // { a: 99, b: { c: 4, d: "b" } }
 */
export type MergePatchDeep<A, B, P extends boolean = false> = A extends A
	? B extends B
		? PrettifyDeep<P extends true ? _MergePatchDeepPreserve<A, B> : _MergePatchDeep<A, B>>
		: never
	: never;

type _MergePatchDeep<A, B> = _MergeIntDeep<A, B> & MergeDiffDeep<A, B>;

type _MergePatchDeepPreserve<A, B> = _MergeIntDeepPreserve<A, B> & MergeDiffDeep<A, B>;

/**
 * Merge two objects, keeping all keys from `A` that exist in `B`. Values are taken from `B`.
 *
 * @remarks Set `P` to true to use `A`'s modifiers.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB1 = MergeInt<A, B>; // { a: "<>" }
 * type AB2 = MergeInt<A, B, true>; // { readonly a: "<>" }
 */
export type MergeInt<A, B, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergeIntPreserve<A, B> : _MergeInt<A, B>>
		: never
	: never;

type _MergeInt<A, B> = {
	[P in keyof B as P extends keyof A ? P : never]: B[P];
};

type _MergeIntPreserve<A, B> = {
	[P in keyof A as P extends keyof B ? P : never]: Required<B>[P & keyof B];
};

/**
 * Merge two objects deeply, keeping all keys from `A` that exist in `B`. Values are recursively merged if both are objects, otherwise they are taken from `B`.
 *
 * @remarks
 * - Set `P` to true to use `A`'s modifiers.
 * - Non-object members of `A` are discarded while those of `B` are preserved.
 *
 * @example
 * type A = { a: 1, b: { c: 1, d: "b" } };
 * type B = { a: 9, b: { c: 4 } };
 *
 * type AB1 = MergeInt<A, B>; // { a: 9, b: { c: 4 } }
 * type AB2 = MergeIntDeep<A, B>; // { a: 9, b: { c: 4, d: "b" } }
 */
export type MergeIntDeep<A, B, P extends boolean = false> = A extends A
	? B extends B
		? PrettifyDeep<P extends true ? _MergeIntDeepPreserve<A, B> : _MergeIntDeep<A, B>>
		: never
	: never;

type _MergeIntDeep<A, B> = {
	[P in keyof B as P extends keyof A ? P : never]: [
		Required<A>[P & keyof A],
		Required<B>[P],
	] extends [infer AP, infer BP]
		? HasType<AP, Dict> | HasType<BP, Dict> extends true
			? Exclude<BP, Dict> | _MergeIntDeep<Extract<AP, Dict>, Extract<BP, Dict>>
			: BP
		: never;
};

type _MergeIntDeepPreserve<A, B> = {
	[P in keyof A as P extends keyof B ? P : never]: [
		Required<A>[P],
		Required<B>[P & keyof B],
	] extends [infer AP, infer BP]
		? HasType<AP, Dict> | HasType<BP, Dict> extends true
			? Exclude<BP, Dict> | _MergeIntDeepPreserve<Extract<AP, Dict>, Extract<BP, Dict>>
			: BP
		: never;
};

/**
 * Merge two objects, keeping all keys that exist only in `A`.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB = MergeDiff<A, B>; // { b: 2 }
 * type BA = MergeDiff<B, A>; // { c: 4 }
 */
export type MergeDiff<A, B> = A extends A
	? B extends B
		? {
				[P in keyof A as P extends keyof B ? never : P]: A[P];
			}
		: never
	: never;

/**
 * Merge two objects deeply, keeping all keys that exist only in `A` and recursively merging keys that exist in both when both values are objects.
 *
 * @example
 * type A = { a: 1, b: { c: 1, d: "b" } };
 * type B = { b: { d: "b" } };
 *
 * type AB1 = MergeDiff<A, B>; // { a: 1 }
 * type AB2 = MergeDiffDeep<A, B>; // { a: 1, b: { c: 1 } }
 */
export type MergeDiffDeep<A, B> = A extends A
	? B extends B
		? {
				[
					P in keyof A as P extends keyof B ? (HasType<B[P], Dict> extends true ? P : never) : P
				]: P extends keyof B
					? HasType<B[P], Dict> | HasType<A[P], Dict> extends true
						? MergeDiffDeep<A[P], B[P]>
						: A[P]
					: A[P];
			}
		: never
	: never;

/**
 * Merge two objects, keeping all non-shared keys.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB = MergeSymDiff<A, B>; // { b: 2, c: 4 }
 * type BA = AB;
 */
export type MergeSymDiff<A, B> = A extends A
	? B extends B
		? Prettify<MergeDiff<A, B> & MergeDiff<B, A>>
		: never
	: never;

/**
 * Merge two objects deeply, keeping all non-shared keys and recursively merges shared keys when both are objects.
 *
 * @example
 * type A = { a: 1, b: { c: 1, d: "b" } };
 * type B = { b: { d: "b" } };
 *
 * type AB1 = MergeDiff<A, B>; // { a: 1 }
 * type AB2 = MergeDiffDeep<A, B>; // { a: 1, b: { c: 1 } }
 */
export type MergeSymDiffDeep<A, B> = A extends A
	? B extends B
		? PrettifyDeep<MergeDiffDeep<A, B> & MergeDiffDeep<B, A>>
		: never
	: never;

/**
 * Merge two objects using the given method. (default: "union")
 *
 * @see {@linkcode MergeUnion}, {@linkcode MergePatch}, {@linkcode MergeInt}, {@linkcode MergeDiff} and {@linkcode MergeSymDiff}
 */
export type Merge<
	A,
	B,
	M extends
		| "int"
		| "int-preserve"
		| "union"
		| "union-preserve"
		| "patch"
		| "patch-preserve"
		| "diff"
		| "sym-diff" = "union",
> = M extends "int"
	? MergeInt<A, B>
	: M extends "int-preserve"
		? MergeInt<A, B, true>
		: M extends "union"
			? MergeUnion<A, B>
			: M extends "union-preserve"
				? MergeUnion<A, B, true>
				: M extends "patch"
					? MergePatch<A, B>
					: M extends "patch-preserve"
						? MergePatch<A, B, true>
						: M extends "diff"
							? MergeDiff<A, B>
							: M extends "sym-diff"
								? MergeSymDiff<A, B>
								: never;

/**
 * Merge two objects deeply using the specified method. (default: "union")
 */
export type MergeDeep<
	A,
	B,
	M extends
		| "patch"
		| "patch-preserve"
		| "union"
		| "union-preserve"
		| "int"
		| "int-preserve"
		| "diff"
		| "sym-diff" = "union",
> = M extends "int"
	? MergeIntDeep<A, B>
	: M extends "int-preserve"
		? MergeIntDeep<A, B, true>
		: M extends "union"
			? MergeUnionDeep<A, B>
			: M extends "union-deep"
				? MergeUnionDeep<A, B, true>
				: M extends "patch"
					? MergePatchDeep<A, B>
					: M extends "patch-preserve"
						? MergePatchDeep<A, B, true>
						: M extends "diff"
							? MergeDiffDeep<A, B>
							: M extends "sym-diff"
								? MergeSymDiffDeep<A, B>
								: never;
