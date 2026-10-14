import type { Dict, Prettify } from "./utils";

/**
 * Merge two objects by keeping all keys from `A` and `B`, on conflict, `B` wins.
 *
 * @remarks If `P` is `true`, then on conflict `B` wins but `A`'s shape is used.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB1 = MergeUnion<A, B>; // { a: "<>", b: 2, c: 4 }
 * type AB2 = MergeUnion<A, B, true>; // { readonly a: "<>", b: 2, c: 4 }
 */
export type MergeUnion<A extends Dict, B extends Dict, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergeUnionPreserve<A, B> : _MergeUnion<A, B>>
		: never
	: never;

type _MergeUnion<A extends Dict, B extends Dict> = {
	[P in keyof B as P extends keyof A ? P : never]: B[P];
} & _MergeSymDiff<A, B>;

type _MergeUnionPreserve<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? P : never]: B[P & keyof B];
} & _MergeSymDiff<A, B>;

/**
 * Merge two objects by keeping all keys from `A`, on conflict, `B` wins.
 *
 * @remarks If `P` is `true`, then on conflict `B` wins but `A`'s shape is used.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB1 = MergePatch<A, B>; // { a: "<>", b: 2 }
 * type AB2 = MergePatch<A, B, true>; // { readonly a: "<>", b: 2 }
 */
export type MergePatch<A extends Dict, B extends Dict, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergePatchPreserve<A, B> : _MergePatch<A, B>>
		: never
	: never;

type _MergePatch<A extends Dict, B extends Dict> = {
	[P in keyof B as P extends keyof A ? P : never]: B[P];
} & _MergeDiff<A, B>;

type _MergePatchPreserve<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? P : never]: B[P & keyof B];
} & _MergeDiff<A, B>;

/**
 * Merge two objects by keeping all keys from `A` that exist in `B`, values are taken from `B`.
 *
 * @remarks If `P` is `true`, then values will be taken from 'B', but `A`'s shape will be used.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB1 = MergeInt<A, B>; // { a: "<>" }
 * type AB2 = MergeInt<A, B, true>; // { readonly a: "<>" }
 */
export type MergeInt<A extends Dict, B extends Dict, P extends boolean = false> = A extends A
	? B extends B
		? Prettify<P extends true ? _MergeIntPreserve<A, B> : _MergeInt<A, B>>
		: never
	: never;

type _MergeInt<A extends Dict, B extends Dict> = {
	[P in keyof B as P extends keyof A ? P : never]: B[P];
};

type _MergeIntPreserve<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? P : never]: B[P & keyof B];
};

/**
 * Merge two objects by keeping all keys from `A` that `B` lacks.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB = MergeDiff<A, B>; // { b: 2 }
 * type BA = MergeDiff<B, A>; // { c: 4 }
 */
export type MergeDiff<A extends Dict, B extends Dict> = A extends A
	? B extends B
		? Prettify<_MergeDiff<A, B>>
		: never
	: never;

type _MergeDiff<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? never : P]: A[P];
};

/**
 * Merge two objects by keeping all non-shared keys from both `A` and `B`.
 *
 * @example
 * type A = { readonly a: 1, b: 2 };
 * type B = { a: "<>", c: 4 };
 *
 * type AB = MergeSymDiff<A, B>; // { b: 2, c: 4 }
 * type BA = AB;
 */
export type MergeSymDiff<A extends Dict, B extends Dict> = A extends A
	? B extends B
		? Prettify<_MergeSymDiff<A, B>>
		: never
	: never;

type _MergeSymDiff<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? never : P]: A[P];
} & {
	[P in keyof B as P extends keyof A ? never : P]: B[P];
};

/**
 * Merge two objects using the given method.
 *
 * @see {@linkcode MergeUnion}, {@linkcode MergePatch}, {@linkcode MergeInt}, {@linkcode MergeDiff} and {@linkcode MergeSymDiff}
 */
export type Merge<
	A extends Dict,
	B extends Dict,
	M extends
		| "patch"
		| "patch-preserve"
		| "union"
		| "union-preserve"
		| "int"
		| "int-preserve"
		| "diff"
		| "symDiff",
> = M extends "union"
	? MergeUnion<A, B>
	: M extends "union-preserve"
		? MergeUnion<A, B, true>
		: M extends "int"
			? MergeInt<A, B>
			: M extends "int-preserve"
				? MergeInt<A, B, true>
				: M extends "patch"
					? MergePatch<A, B>
					: M extends "patch-preserve"
						? MergePatch<A, B, true>
						: M extends "diff"
							? MergeDiff<A, B>
							: M extends "symDiff"
								? MergeSymDiff<A, B>
								: never;
