import type { Dict, Prettify } from "./utils";

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

export type MergeDiff<A extends Dict, B extends Dict> = A extends A
	? B extends B
		? Prettify<_MergeDiff<A, B>>
		: never
	: never;

type _MergeDiff<A extends Dict, B extends Dict> = {
	[P in keyof A as P extends keyof B ? never : P]: A[P];
};

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

export type Merge<
	A extends Dict,
	B extends Dict,
	M extends "patch" | "patch-preserve" | "union" | "union-preserve" | "int" | "int-preserve" | "diff" | "symDiff",
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
