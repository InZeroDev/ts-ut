import type { Dict } from "./utils";

/**
 * Convert optional properties to required ones that can be `undefined`
 *
 * @example
 * type R1 = OptionalToUndefined<{ a: 1, b?: 2 }>; // { a: 1, b: 2 | undefined }
 */
export type OptionalToUndefined<T> = T extends T
	? {
			[P in keyof Required<T>]: T[P];
		} & {}
	: never;

/**
 * Deeply convert optional properties to required ones that can be `undefined`.
 *
 * @example
 * type R1 = OptionalToUndefinedDeep<{ a: 1, b?: { c?: 4 } }>; // { a: 1, b: { c: 4 | undefined } | undefined }
 */
export type OptionalToUndefinedDeep<T> = T extends T
	? {
			[P in keyof Required<T>]: T[P] extends infer TP
				? TP extends Dict
					? OptionalToUndefinedDeep<TP>
					: TP
				: never;
		} & {}
	: never;
